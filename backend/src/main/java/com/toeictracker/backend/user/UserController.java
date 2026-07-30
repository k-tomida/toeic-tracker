package com.toeictracker.backend.user;

import com.toeictracker.backend.user.dto.UpdatePasswordRequest;
import com.toeictracker.backend.user.dto.UpdateTargetScoreAndNextExamRequest;
import com.toeictracker.backend.user.dto.UserResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getUser(Authentication authentication) {
        User user = userService.getUser(authentication.getName());

        UserResponse response=new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getTargetScore(),
                user.getNextExamDate()
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateTargetScoreAndNextExamDate(Authentication authentication, @RequestBody UpdateTargetScoreAndNextExamRequest request) {

        User updatedUser = userService.updateTargetScoreAndNextExam(authentication.getName(), request);

        UserResponse response = new UserResponse(
                updatedUser.getId(),
                updatedUser.getName(),
                updatedUser.getEmail(),
                updatedUser.getTargetScore(),
                updatedUser.getNextExamDate()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(Authentication authentication, @RequestBody UpdatePasswordRequest request){
        userService.updatePassword(authentication.getName(), request.password());
        return ResponseEntity.noContent().build();
    }
}


