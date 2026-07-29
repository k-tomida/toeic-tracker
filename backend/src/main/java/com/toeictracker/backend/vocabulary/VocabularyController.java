package com.toeictracker.backend.vocabulary;

import com.toeictracker.backend.vocabulary.DTO.VocabularyTestRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vocabularies")
@RequiredArgsConstructor
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

    @PutMapping("/{id}")
    public ResponseEntity<Vocabulary> updateVocabulary(@PathVariable Long id, @RequestBody Vocabulary vocabulary){
        Vocabulary data=vocabularyService.updateVocabulary(id, vocabulary);
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVocabulary(@PathVariable Long id){
        vocabularyService.deleteVocabulary(id);
        return  ResponseEntity.noContent().build();
    }

    @PutMapping("/test")
    public ResponseEntity<List<Vocabulary>> testVocabulary(@RequestBody List<VocabularyTestRequest> vocabularies){
        List<Vocabulary> data=vocabularyService.testVocabulary(vocabularies);
        return  ResponseEntity.ok(data);
    }
}
