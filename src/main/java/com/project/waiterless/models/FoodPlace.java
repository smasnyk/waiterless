package com.project.waiterless.models;

import com.project.waiterless.enums.MenuSection;
import com.project.waiterless.enums.PlaceType;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@DiscriminatorValue("Place")
public class FoodPlace extends User {
    @Enumerated(EnumType.STRING)
    PlaceType placeType;
    @ElementCollection
    List<String> orderStatuses;
    @ElementCollection
    @MapKeyEnumerated(EnumType.STRING)
    @Column(name = "title")
    Map<MenuSection, String> menuSections;

    @Override
    public String toString() {
        return "FoodPlace{" +
                "placeType=" + placeType +
                ", id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + role +
                ", token='" + token + '\'' +
                '}';
    }
}
