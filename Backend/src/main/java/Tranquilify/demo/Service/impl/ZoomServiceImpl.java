package Tranquilify.demo.Service.impl;

import Tranquilify.demo.Entities.ZoomEntity;
import Tranquilify.demo.Repository.ZoomRepository;
import Tranquilify.demo.Service.ZoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ZoomServiceImpl implements ZoomService {

    @Autowired
    private ZoomRepository zoomRepo;

    @Override
    public List<ZoomEntity> findMeetingsByUserId(Long UserId) {

        return zoomRepo.findByUser_UserId(UserId);
    }

    @Override
    public Optional<ZoomEntity> findMeetingsById(Long meetingId) {

        return zoomRepo.findById(meetingId);
    }

    @Override
    public ZoomEntity saveMeeting(ZoomEntity meeting) {

        zoomRepo.save(meeting);

        return meeting;
    }

    @Override
    public void deleteMeeting(ZoomEntity meeting) {

        zoomRepo.delete(meeting);
    }
}
