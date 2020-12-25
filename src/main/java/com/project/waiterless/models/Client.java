package com.project.waiterless.models;

import com.project.waiterless.enums.Sex;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Component
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue("Client")
public class Client extends User {
    @Enumerated(EnumType.STRING)
    Sex sex;

    @Override
    public String toString() {
        return "Client{" +
                "sex=" + sex +
                ", id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + role +
                ", token='" + token + '\'' +
                '}';
    }
}