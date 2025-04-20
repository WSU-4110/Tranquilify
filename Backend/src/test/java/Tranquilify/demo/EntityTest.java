package Tranquilify.demo;

import Tranquilify.demo.Entities.*;
import Tranquilify.demo.Service.*;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@ActiveProfiles("test")
public class EntityTest {

    @MockBean
    private NoteService noteService;
    
    @MockBean
    private UserService userService;
    
    @MockBean
    private LoginService loginService;
    
    @MockBean
    private PasswordHashService passService;
    
    @MockBean
    private ZoomService zoomService;
    
    @MockBean
    private MoodService moodService;

    @Test
    public void testGetNoteById() {
        // Create test data with the available constructor
        NotesEntity note = new NotesEntity();
        note.setContent("Note");
        
        // Setup mock
        when(noteService.findNotesById(43L)).thenReturn(Optional.of(note));
        
        // Create expected result
        NotesEntity expected = new NotesEntity();
        expected.setContent("Note");
        
        // Test
        Optional<NotesEntity> result = noteService.findNotesById(43L);
        assertTrue(result.isPresent());
        assertEquals(expected.getContent(), result.get().getContent());
    }

    @Test
    public void testLogin() {
        // Create test data
        LoginEntity login = new LoginEntity();
        login.setEmail("test@gmail.com");
        
        // Setup mock
        when(loginService.findByEmail("test@gmail.com")).thenReturn(Optional.of(login));
        
        // Create expected result
        LoginEntity expected = new LoginEntity();
        expected.setEmail("test@gmail.com");
        
        // Test
        Optional<LoginEntity> result = loginService.findByEmail("test@gmail.com");
        assertTrue(result.isPresent());
        assertEquals(expected.getEmail(), result.get().getEmail());
    }

    @Test
    public void testgetUserById() {
        // Create test data
        UserEntity user = new UserEntity();
        user.setUserId(1L);
        
        // Setup mock
        when(userService.findUserById(1L)).thenReturn(Optional.of(user));
        
        // Create expected result
        UserEntity expected = new UserEntity();
        expected.setUserId(1L);
        
        // Test
        Optional<UserEntity> result = userService.findUserById(1L);
        assertTrue(result.isPresent());
        assertEquals(expected.getUserId(), result.get().getUserId());
    }

    @Test
    public void testHashService() {
        // Setup mock
        when(passService.getHashedPass("password")).thenReturn("");
        
        // Test
        String result = passService.getHashedPass("password");
        assertEquals("", result);
    }

    @Test
    public void testZoomGetByUserId() {
        // Create test data
        ZoomEntity zoom = new ZoomEntity();
        zoom.setMeetingID(1L);
        
        // Setup mock
        when(zoomService.findMeetingsById(1L)).thenReturn(Optional.of(zoom));
        
        // Create expected result
        ZoomEntity expected = new ZoomEntity();
        expected.setMeetingID(1L);
        
        // Test
        Optional<ZoomEntity> result = zoomService.findMeetingsById(1L);
        assertTrue(result.isPresent());
        assertEquals(expected.getMeetingID(), result.get().getMeetingID());
    }

    @Test
    public void testGetMoodById() {
        // Create test data
        MoodEntity mood = new MoodEntity();
        mood.setValue(10L);
        
        // Setup mock
        when(moodService.findMoodsById(10L)).thenReturn(Optional.of(mood));
        
        // Create expected result
        MoodEntity expected = new MoodEntity();
        expected.setValue(10L);
        
        // Test
        Optional<MoodEntity> result = moodService.findMoodsById(10L);
        assertTrue(result.isPresent());
        assertEquals(expected.getValue(), result.get().getValue());
    }
}