ALTER TABLE vocabularies DROP CONSTRAINT chk_status;
ALTER TABLE vocabularies ADD CONSTRAINT chk_status
    CHECK (status IN ('ACQUIRED', 'UNACQUIRED'));

ALTER TABLE vocabularies DROP CONSTRAINT chk_word_class;
ALTER TABLE vocabularies ADD CONSTRAINT chk_word_class
    CHECK (word_class IN (
                          'NOUN',
                          'VERB',
                          'ADJECTIVE',
                          'ADVERB',
                          'PREPOSITION',
                          'CONJUNCTION',
                          'AUXILIARY_VERB'
        ));

ALTER TABLE vocabularies ALTER COLUMN status SET DEFAULT 'UNACQUIRED';