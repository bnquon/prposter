package com.example.backend.controller;

import com.example.backend.model.Profile;
import com.example.backend.service.ProfileService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public boolean isProfileCreated(@RequestParam UUID user_id) {
        return profileService.isProfileCreated(user_id);
    }

    @PatchMapping()
    public Profile updateProfile(@RequestBody Profile newProfileInfo) {
        return profileService.updateProfile(newProfileInfo);
    }

    @GetMapping("/bio")
    public Profile getProfileByUserId(@RequestParam UUID user_id) {
        return profileService.getProfileByUserId(user_id);
    }
}
