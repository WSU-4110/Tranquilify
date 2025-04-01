package Tranquilify.demo.Service;

import Tranquilify.demo.Entities.ZoomEntity;

import java.util.List;
import java.util.Optional;

public interface ZoomService {

    List<ZoomEntity> findMeetingsByUserId(Long UserId);

    Optional<ZoomEntity> findMeetingsById(Long meetingId);
    ZoomEntity saveMeeting(ZoomEntity meeting);

    void deleteMeeting(ZoomEntity meeting);
}

