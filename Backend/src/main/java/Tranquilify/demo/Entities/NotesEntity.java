package Tranquilify.demo.Entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Notes")
public class NotesEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long noteId;

    @Column(name = "content")
    private String content;

    @Column(name = "date")
    private Date date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "User_Id", referencedColumnName = "UserID")
    private UserEntity user;

    public NotesEntity() {
    }

    public Date getDate() { return date; }

    public void setDate(Date date) { this.date = date; }

    public Long getNoteId() {
        return noteId;
    }

    public void setNoteId(Long noteId) {
        this.noteId = noteId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}