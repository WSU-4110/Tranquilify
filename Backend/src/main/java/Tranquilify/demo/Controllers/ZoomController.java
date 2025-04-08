package Tranquilify.demo.Controllers;

import Tranquilify.demo.DTO.MeetingRequest;
import Tranquilify.demo.Entities.UserEntity;
import Tranquilify.demo.Entities.ZoomEntity;
import Tranquilify.demo.Exceptions.ZoomException;
import Tranquilify.demo.Service.UserService;
import Tranquilify.demo.Service.ZoomService;
import Tranquilify.demo.Service.impl.ZoomApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/zoom")
public class ZoomController {

    @Autowired
    final private ZoomService zoomService;

    @Autowired
    final private UserService userService;

    @Autowired
    final private ZoomApiService zoomApiService;

    public ZoomController(ZoomService zoomService, UserService userService, ZoomApiService zoomApiService) {
        this.zoomService = zoomService;
        this.userService = userService;
        this.zoomApiService = zoomApiService;
    }

    @GetMapping("/")
    public ResponseEntity<List<ZoomEntity>> getMeetings(Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        List<ZoomEntity> meetings = zoomService.findMeetingsByUserId(userId);

        return ResponseEntity.ok(meetings);
    }

    @GetMapping("/create")
    public Mono<ResponseEntity<ZoomEntity>> createMeeting(@RequestBody MeetingRequest request, Authentication authentication) {

        Long userId = (Long) authentication.getPrincipal();

        return Mono.justOrEmpty(userService.findUserById(userId))

                .flatMap(user -> {

                    return zoomApiService.createMeeting(request)

                            .map(zoomEntity -> {

                                return ResponseEntity
                                        .status(HttpStatus.CREATED)

                                        .body(zoomEntity);
                            })

                            .onErrorResume(throwable -> {

                                if (throwable instanceof ZoomException) {

                                    ZoomException zoomException = (ZoomException) throwable;

                                    // return Mono.just(ResponseEntity<ZoomEntity>(zoomException)); // this will not work the class casting error
                                    return Mono.just(ResponseEntity
                                        .status(HttpStatus.BAD_REQUEST)
                                        .body((ZoomEntity)null));
                                }

                                return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));
                            });
                })

                .defaultIfEmpty(ResponseEntity.badRequest().build());
    }

}