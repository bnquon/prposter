package com.example.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "profiles", schema = "public")
public class Profile {
    @Id
    @Column(name = "user_id")
    private UUID user_id; // managed by the Supabase SQL trigger

    private String email;
    private String username;
    private String age;
    private String weight;

    public UUID getUser_id() {
        return user_id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getAge() {
        return age;
    }

    public String getWeight() {
        return weight;
    }
}
