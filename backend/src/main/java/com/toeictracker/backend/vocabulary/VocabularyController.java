package com.toeictracker.backend.vocabulary;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vocabularies")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class VocabularyController {

    private final VocabularyService vocabularyService;

    @GetMapping
    public ResponseEntity<List<Vocabulary>> getVocabulary(){
        List<Vocabulary> data=vocabularyService.getVocabulary(1L);
        return ResponseEntity.ok(data);
    }

    @PostMapping
    public ResponseEntity<Vocabulary> addVocabulary(@RequestBody Vocabulary vocabulary){
        Vocabulary data=vocabularyService.addVocabulary(vocabulary);
        return ResponseEntity.ok(data);
    }
}
