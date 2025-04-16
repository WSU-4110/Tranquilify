package Tranquilify.demo;

import Tranquilify.demo.Entities.*;
import Tranquilify.demo.Service.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class EntityTest {

    @Autowired
    private NoteService noteService;

    @Autowired
    private UserService userService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private PasswordHashService passService;

    @Autowired
    private ZoomService zoomService;

    @Autowired
    private MoodService moodService;

    @BeforeEach
    void setUp() {
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
    public void testLogin(){

        LoginEntity expected = new LoginEntity();

        expected.setEmail("test@gmail.com");

        Optional<LoginEntity> result = loginService.findByEmail("test@gmail.com");

        assertTrue(result.isPresent());

        assertEquals(expected.getEmail(), result.get().getEmail());
    }

    @Test
    public void testgetUserById(){

        UserEntity expected = new UserEntity();

        expected.setUserId(1L);

        Optional<UserEntity> result = userService.findUserById(1L);

        assertTrue(result.isPresent());

        assertEquals(expected.getUserId(), result.get().getUserId());
    }

    @Test
    public void testHashService(){

        String expected = "";

        String result = passService.getHashedPass("password");

        assertEquals(expected, result);
    }

    @Test
    public void testZoomGetByUserId(){

        ZoomEntity expected = new ZoomEntity();

        expected.setMeetingID(1L);

        Optional<ZoomEntity> result = zoomService.findMeetingsById(1L);

        assertTrue(result.isPresent());

        assertEquals(expected.getMeetingID(), result.get().getMeetingID());
    }

    @Test
    public void testGetMoodById(){

        MoodEntity expected = new MoodEntity();

        expected.setValue(10L);

        Optional<MoodEntity> result = moodService.findMoodsById(10L);

        assertTrue(result.isPresent());

        assertEquals(expected.getValue(), result.get().getValue());
    }
}
