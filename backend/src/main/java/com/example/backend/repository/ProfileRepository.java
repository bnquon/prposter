package com.example.backend.repository;

import com.example.backend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    @Query(value = "SELECT * FROM public.profiles WHERE email = ?1", nativeQuery = true)
    Profile findByEmail(String email);
}
