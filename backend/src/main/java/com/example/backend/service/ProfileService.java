package com.example.backend.service;

import com.example.backend.model.Profile;
import com.example.backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    public boolean isProfileCreated(String email) {
        Profile profile = profileRepository.findByEmail(email);
        return !profile.getUsername().isEmpty();
    }

    public Profile updateProfile(Profile newProfileInfo) {
        Profile profile = profileRepository.findByEmail(newProfileInfo.getEmail());
        profile.setUsername(newProfileInfo.getUsername());
        profile.setAge(newProfileInfo.getAge());
        profile.setWeight(newProfileInfo.getWeight());
        return profileRepository.save(profile);
    }
}
