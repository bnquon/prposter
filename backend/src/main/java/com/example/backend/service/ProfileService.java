package com.example.backend.service;

import com.example.backend.model.Profile;
import com.example.backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    public boolean isProfileCreated(UUID user_id) {
        Profile profile = profileRepository.findByUUID(user_id);
        if (profile.getUsername() == null) {
            return false;
        } else {
            return !profile.getUsername().isEmpty();
        }
    }

    public Profile updateProfile(Profile newProfileInfo) {
        Profile profile = profileRepository.findByUUID(newProfileInfo.getUser_id());
        profile.setUsername(newProfileInfo.getUsername());
        profile.setAge(newProfileInfo.getAge());
        profile.setWeight(newProfileInfo.getWeight());
        return profileRepository.save(profile);
    }
}
