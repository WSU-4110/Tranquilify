package Tranquilify.demo;

import Tranquilify.demo.Entities.*;
import Tranquilify.demo.Service.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class EntityTest {

    @Mock
    private NoteService noteService;
    
    @Mock
    private UserService userService;
    
    @Mock
    private LoginService loginService;
    
    @Mock
    private PasswordHashService passService;
    
    @Mock
    private ZoomService zoomService;
    
    @Mock
    private MoodService moodService;

    @BeforeEach
    void setUp() {
        // Set up test data
        NotesEntity noteEntity = new NotesEntity();
        noteEntity.setNoteId(43L);
        noteEntity.setContent("Note");
        when(noteService.findNotesById(43L)).thenReturn(Optional.of(noteEntity));
        
        // Login entity setup
        LoginEntity loginEntity = new LoginEntity();
        loginEntity.setEmail("test@gmail.com");
        when(loginService.findByEmail("test@gmail.com")).thenReturn(Optional.of(loginEntity));
        
        // User entity setup
        UserEntity userEntity = new UserEntity();
        userEntity.setUserId(1L);
        when(userService.findUserById(1L)).thenReturn(Optional.of(userEntity));
        
        // Zoom entity setup
        ZoomEntity zoomEntity = new ZoomEntity();
        zoomEntity.setMeetingID(1L);
        when(zoomService.findMeetingsById(1L)).thenReturn(Optional.of(zoomEntity));
        
        // Mood entity setup
        MoodEntity moodEntity = new MoodEntity();
        moodEntity.setValue(10L);
        when(moodService.findMoodsById(10L)).thenReturn(Optional.of(moodEntity));
        
        // Mock password hash service to return empty string for "password"
        when(passService.getHashedPass("password")).thenReturn("");
    }

    @Test
    public void testGetNoteById() {
        NotesEntity expected = new NotesEntity();
        expected.setContent("Note");
        Optional<NotesEntity> result = noteService.findNotesById(43L);
        assertTrue(result.isPresent());
        assertEquals(expected.getContent(), result.get().getContent());
    }

    @Test
    public void testLogin() {
        LoginEntity expected = new LoginEntity();
        expected.setEmail("test@gmail.com");
        Optional<LoginEntity> result = loginService.findByEmail("test@gmail.com");
        assertTrue(result.isPresent());
        assertEquals(expected.getEmail(), result.get().getEmail());
    }

    @Test
    public void testgetUserById() {
        UserEntity expected = new UserEntity();
        expected.setUserId(1L);
        Optional<UserEntity> result = userService.findUserById(1L);
        assertTrue(result.isPresent());
        assertEquals(expected.getUserId(), result.get().getUserId());
    }

    @Test
    public void testHashService() {
        String expected = "";
        String result = passService.getHashedPass("password");
        assertEquals(expected, result);
    }

    @Test
    public void testZoomGetByUserId() {
        ZoomEntity expected = new ZoomEntity();
        expected.setMeetingID(1L);
        Optional<ZoomEntity> result = zoomService.findMeetingsById(1L);
        assertTrue(result.isPresent());
        assertEquals(expected.getMeetingID(), result.get().getMeetingID());
    }

    @Test
    public void testGetMoodById() {
        MoodEntity expected = new MoodEntity();
        expected.setValue(10L);
        Optional<MoodEntity> result = moodService.findMoodsById(10L);
        assertTrue(result.isPresent());
        assertEquals(expected.getValue(), result.get().getValue());
    }
}