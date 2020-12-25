package com.project.waiterless.models;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int dishId;
    String dishTitle;
    int price;
    String menuSection;
    @ManyToOne
    FoodPlace place;
    String picture;
}
