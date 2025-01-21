package com.example.backend.repository;

import com.example.backend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface ProfileRepository extends JpaRepository<Profile, UUID> {
    @Query(value = "SELECT * FROM public.profiles WHERE user_id = ?1", nativeQuery = true)
    Profile findByUUID(UUID user_id);

}
