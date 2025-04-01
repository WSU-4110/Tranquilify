package Tranquilify.demo.Entities;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "mood")
public class MoodEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long moodId;

    @Column(name = "value")
    private Long value;

    @Column(name = "date")
    private Date date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "User_Id", referencedColumnName = "UserID")
    private UserEntity user;


    public MoodEntity() {
    }

    public Long getMoodId() {
        return moodId;
    }

    public void setMoodId(Long moodId) {
        this.moodId = moodId;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
