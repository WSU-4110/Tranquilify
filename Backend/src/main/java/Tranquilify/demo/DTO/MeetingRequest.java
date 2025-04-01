package Tranquilify.demo.DTO;

import org.springframework.lang.NonNull;

import java.time.LocalDateTime;

public class MeetingRequest {

    @NonNull
    private String topic;

    @NonNull
    private Integer type;

    @NonNull
    private LocalDateTime startTime;

    @NonNull
    private Integer duration;

    @NonNull
    private String timezone;

    @NonNull
    private String password;

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
