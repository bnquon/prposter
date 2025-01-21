package com.example.backend.controller;

import com.example.backend.model.Profile;
import com.example.backend.service.ProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public boolean isProfileCreated(@RequestParam String email) {
        return profileService.isProfileCreated(email);
    }

    @PatchMapping()
    public Profile updateProfile(@RequestBody Profile newProfileInfo) {
        return profileService.updateProfile(newProfileInfo);
    }
}
