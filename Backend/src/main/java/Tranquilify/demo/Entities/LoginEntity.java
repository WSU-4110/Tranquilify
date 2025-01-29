package Tranquilify.demo.Entities;

import jakarta.persistence.*;

@Entity
@Table(name = "Logins")
public class LoginEntity {

    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Long loginId;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "User_Id", referencedColumnName = "UserID")
    private UserEntity user;

    public LoginEntity() {
    }

    public LoginEntity(Long loginId, String email, String password, UserEntity user) {
        this.loginId = loginId;
        this.email = email;
        this.password = password;
        this.user = user;
    }

    public Long getLoginId() {
        return loginId;
    }

    public void setLoginId(Long loginId) {
        this.loginId = loginId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
