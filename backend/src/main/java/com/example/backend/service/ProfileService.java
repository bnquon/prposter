package com.example.backend.service;

import com.example.backend.model.Profile;
import com.example.backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    public boolean isProfileCreated(int id) {
        Optional<Profile> profile = profileRepository.findById(id);
        return profile.map(p -> p.getUsername() != null).orElse(false);
    }

    public Profile updateProfile(int id, Profile newProfileInfo) {
        Optional<Profile> existingProfile = profileRepository.findById(id);
        if (existingProfile.isPresent()) {
            Profile profile = existingProfile.get();
            profile.setUsername(newProfileInfo.getUsername());
            profile.setAge(newProfileInfo.getAge());
            profile.setWeight(newProfileInfo.getWeight());
            return profileRepository.save(profile);
        } else {
            throw new RuntimeException("No user found");
        }
    }
}
