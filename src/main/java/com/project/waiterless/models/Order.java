package com.project.waiterless.models;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Map;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int orderId;
    int totalPrice;
    @ElementCollection
    @Column(name = "quantity", nullable = false)
    @MapKeyJoinColumn
    Map<String, Integer> dishes;
    @ManyToOne
    Client client;
    @ManyToOne
    FoodPlace place;
    LocalDate orderDate;
    String orderStatus;

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", totalPrice=" + totalPrice +
                ", dishes=" + dishes +
                ", orderDate=" + orderDate +
                ", orderStatus='" + orderStatus + '\'' +
                '}';
    }
}
