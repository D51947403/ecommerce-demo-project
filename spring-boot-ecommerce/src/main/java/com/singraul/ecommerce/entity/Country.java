package com.singraul.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="country")
//@Data disabling due to known bugs
@Setter
@Getter

public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;
    @Column(name="code")
    private String code;
    @Column(name="name")
    private String name;
    @OneToMany(mappedBy = "country")
    // ignoring the state data
    @JsonIgnore
    private List<State> stateList;

}
