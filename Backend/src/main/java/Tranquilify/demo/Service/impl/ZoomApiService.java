package Tranquilify.demo.Service.impl;

import Tranquilify.demo.DTO.MeetingRequest;
import Tranquilify.demo.Entities.ZoomEntity;
import Tranquilify.demo.Exceptions.ZoomException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import reactor.core.publisher.Mono;

@Service
public class ZoomApiService{

    private final WebClient webClient;


    public ZoomApiService(WebClient.Builder webClientBuilder, @Value("${zoom.api.base.url}") String zoomBaseUrl, @Value("${zoom.api.jwt.token}") String zoomApiToken) {

        this.webClient = webClientBuilder.baseUrl(zoomBaseUrl)

                .defaultHeader("Authorization", "Bearer " + zoomApiToken).build();
    }

    public Mono<ZoomEntity> createMeeting(MeetingRequest meetingRequest) throws Exception{

        String jsonRequestBody = "{"
                + "\"topic\": \"" + meetingRequest.getTopic() + "\","
                + "\"type\": " + meetingRequest.getType() + ","
                + "\"start_time\": \"" + meetingRequest.getStartTime().toString() + "\","
                + "\"duration\": " + meetingRequest.getDuration() + ","
                + "\"timezone\": \"" + meetingRequest.getTimezone() + "\","
                + "\"password\": \"" + meetingRequest.getPassword() + "\""
                + "}";

        return this.webClient.post()

                .uri("/users/me/meetings")

                .contentType(org.springframework.http.MediaType.APPLICATION_JSON)

                .bodyValue(jsonRequestBody)

                .retrieve()

                .onStatus(

                        status -> status.is4xxClientError() || status.is5xxServerError(),

                        clientResponse -> {

                            return clientResponse.bodyToMono(String.class)

                                    .flatMap(responseBody -> {

                                        ResponseEntity<String> responseEntity = ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error occurred: " + responseBody);

                                        ZoomException exception = new ZoomException(responseEntity);

                                        return Mono.just(exception);
                                    });
                        }
                )
                .bodyToMono(String.class)

                .map(response -> {

                    ObjectMapper mapper = new ObjectMapper();

                    ZoomEntity zoomEntity = new ZoomEntity();

                    try {
                        JsonNode jsonNode = mapper.readTree(response);

                        long meetingId = jsonNode.get("id").asLong();

                        zoomEntity.setMeetingID(meetingId);

                        zoomEntity.setTopic(meetingRequest.getTopic());

                        zoomEntity.setDuration(meetingRequest.getDuration());

                        zoomEntity.setPassword(meetingRequest.getPassword());

                        zoomEntity.setTimezone(meetingRequest.getTimezone());

                        zoomEntity.setType(meetingRequest.getType());

                        zoomEntity.setStartTime(meetingRequest.getStartTime());

                    } catch (Exception e) {

                        throw new RuntimeException("Failed to parse meetingId from response", e);
                    }
                    return zoomEntity;
                });
    }
}
