package com.toeictracker.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getUser() {
        User user = userService.getUser(1L);
        return ResponseEntity.ok(user); // 100% 成功時のみここに到達する
    }

    @PutMapping("/me")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        // リクエストボディでそのまま User を受け取り、更新後の User を返却
        User updatedUser = userService.updateUser(1L, user);
        return ResponseEntity.ok(updatedUser);
    }
}
