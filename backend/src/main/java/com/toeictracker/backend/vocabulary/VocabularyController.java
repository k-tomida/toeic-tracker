package com.toeictracker.backend.vocabulary;

import com.toeictracker.backend.vocabulary.dto.VocabularyRequest;
import com.toeictracker.backend.vocabulary.dto.VocabularyResponse;
import com.toeictracker.backend.vocabulary.dto.VocabularyTestRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vocabularies")
@RequiredArgsConstructor
public class VocabularyController {

    private final VocabularyService vocabularyService;

    @GetMapping
    public ResponseEntity<List<VocabularyResponse>> getVocabulary(Authentication authentication){
        List<Vocabulary> vocabularies=vocabularyService.getVocabulary(authentication.getName());
        List<VocabularyResponse> responses=vocabularies.stream()
                .map(vocabulary -> new VocabularyResponse(
                        vocabulary.getId(),
                        vocabulary.getWord(),
                        vocabulary.getWordClass(),
                        vocabulary.getMeaning(),
                        vocabulary.getStatus(),
                        vocabulary.getMemo(),
                        vocabulary.getCreatedAt()
                )).toList();
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<VocabularyResponse> addVocabulary(
            Authentication authentication,
            @RequestBody VocabularyRequest request){
        Vocabulary vocabulary=vocabularyService.addVocabulary(authentication.getName(), request);
        VocabularyResponse response=new VocabularyResponse(
                vocabulary.getId(),
                vocabulary.getWord(),
                vocabulary.getWordClass(),
                vocabulary.getMeaning(),
                vocabulary.getStatus(),
                vocabulary.getMemo(),
                vocabulary.getCreatedAt()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VocabularyResponse> updateVocabulary(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody VocabularyRequest request){
        Vocabulary vocabulary=vocabularyService.updateVocabulary(authentication.getName(), id, request);
        VocabularyResponse response=new VocabularyResponse(
                vocabulary.getId(),
                vocabulary.getWord(),
                vocabulary.getWordClass(),
                vocabulary.getMeaning(),
                vocabulary.getStatus(),
                vocabulary.getMemo(),
                vocabulary.getCreatedAt()
        );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVocabulary(
            Authentication authentication,
            @PathVariable Long id){
        vocabularyService.deleteVocabulary(authentication.getName(), id);
        return  ResponseEntity.noContent().build();
    }

    @PutMapping("/test")
    public ResponseEntity<List<VocabularyResponse>> testVocabulary(
            Authentication authentication,
            @RequestBody List<VocabularyTestRequest> request){
        List<Vocabulary> vocabularies=vocabularyService.testVocabulary(authentication.getName(), request);
        List<VocabularyResponse> responses=vocabularies.stream()
                .map(vocabulary -> new VocabularyResponse(
                        vocabulary.getId(),
                        vocabulary.getWord(),
                        vocabulary.getWordClass(),
                        vocabulary.getMeaning(),
                        vocabulary.getStatus(),
                        vocabulary.getMemo(),
                        vocabulary.getCreatedAt()
                )).toList();
        return ResponseEntity.ok(responses);
    }
}
