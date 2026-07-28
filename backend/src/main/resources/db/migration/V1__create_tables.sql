CREATE TABLE users (
                       id              BIGSERIAL PRIMARY KEY,
                       email           VARCHAR(255) NOT NULL UNIQUE,
                       password        VARCHAR(255) NOT NULL,
                       name            VARCHAR(100) NOT NULL,
                       target_score    INTEGER CHECK (target_score BETWEEN 10 AND 990),
                       next_exam_date  DATE,
                       created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                       updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE study_sessions (
                                id          BIGSERIAL PRIMARY KEY,
                                user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                                date        DATE NOT NULL,
                                duration    INTEGER NOT NULL CHECK (duration BETWEEN 1 AND 1440),
                                category    VARCHAR(20) NOT NULL,
                                memo        TEXT CHECK (char_length(memo) <= 500),
                                created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                                updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

                                CONSTRAINT chk_category
                                    CHECK (category IN (
                                                        'LISTENING',
                                                        'VOCABULARY',
                                                        'GRAMMAR',
                                                        'MOCK_EXAM'
                                        ))
);

CREATE TABLE scores (
                        id                  BIGSERIAL PRIMARY KEY,
                        user_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                        exam_date           DATE NOT NULL,
                        total_score         INTEGER NOT NULL CHECK (total_score BETWEEN 10 AND 990),
                        listening_score     INTEGER NOT NULL CHECK (listening_score BETWEEN 5 AND 495),
                        reading_score       INTEGER NOT NULL CHECK (reading_score BETWEEN 5 AND 495),
                        memo                TEXT CHECK (char_length(memo) <= 200),
                        created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                        updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

                        CONSTRAINT chk_score_sum
                            CHECK (listening_score + reading_score = total_score)
);

CREATE TABLE vocabularies (
                              id              BIGSERIAL PRIMARY KEY,
                              user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                              word            VARCHAR(200) NOT NULL,
                              word_class      VARCHAR(20) NOT NULL,
                              meaning         TEXT NOT NULL,
                              status          VARCHAR(20) NOT NULL DEFAULT 'unacquired',
                              memo            TEXT CHECK (char_length(memo) <= 500),
                              created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                              updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),

                              CONSTRAINT chk_word_class
                                  CHECK (word_class IN (
                                                        'noun',
                                                        'verb',
                                                        'adjective',
                                                        'adverb',
                                                        'preposition',
                                                        'conjunction',
                                                        'auxiliaryVerb'
                                      )),

                              CONSTRAINT chk_status
                                  CHECK (status IN (
                                                    'acquired',
                                                    'unacquired'
                                      ))
);

CREATE INDEX idx_study_sessions_user_date
    ON study_sessions(user_id, date);

CREATE INDEX idx_scores_user_date
    ON scores(user_id, exam_date);

CREATE INDEX idx_vocabularies_user
    ON vocabularies(user_id);

CREATE INDEX idx_vocabularies_user_status
    ON vocabularies(user_id, status);

CREATE INDEX idx_vocabularies_user_word
    ON vocabularies(user_id, word);