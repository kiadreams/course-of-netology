/* Удаление всех созданных таблиц */
DROP TABLE IF EXISTS
    genres,
    performers,
    albums,
    tracks,
    genres_of_performers,
    albums_by_performers,
    collections,
    collections_of_tracks;

/* creating music site */
/* Таблица жанров: */
CREATE TABLE IF NOT EXISTS Genres (
    genre_id   SERIAL      PRIMARY KEY,
    genre_name VARCHAR(50) NOT NULL
);

/* Таблица исполнителей: */
CREATE TABLE IF NOT EXISTS Performers (
    performer_id SERIAL      PRIMARY KEY,
    nickname     VARCHAR(50) NOT NULL
);

/* Таблица альбомов: */
CREATE TABLE IF NOT EXISTS Albums (
    album_id        SERIAL      PRIMARY KEY,
    album_name      VARCHAR(50) NOT NULL,
    year_of_release SMALLINT    NULL,
                    CONSTRAINT year_of_release_range
                    CHECK(year_of_release BETWEEN 1000 AND 9999)
);

/* Таблица треков: */
CREATE TABLE IF NOT EXISTS Tracks (
    track_id   SERIAL      PRIMARY KEY,
    track_name VARCHAR(70) NOT NULL,
    duration   INTERVAL    DEFAULT '00:00:00' NOT NULL,
    album_id   INTEGER     NOT NULL REFERENCES Albums
);

/* Таблица жанров исполнителей: */
CREATE TABLE IF NOT EXISTS Genres_of_performers (
    performer_id INTEGER REFERENCES Performers,
    genre_id     INTEGER REFERENCES Genres,
                 CONSTRAINT  pg_id
                 PRIMARY KEY (performer_id, genre_id)
);

/* Таблица альбомов исполнителей: */
CREATE TABLE IF NOT EXISTS Albums_by_performers (
    album_id     INTEGER REFERENCES Albums,
    performer_id INTEGER REFERENCES Performers,
                 CONSTRAINT  ap_id
                 PRIMARY KEY (album_id, performer_id)
);

/* Создание таблицы коллекций: */
CREATE TABLE IF NOT EXISTS Collections (
    collection_id    SERIAL       PRIMARY KEY,
    collection_name  VARCHAR(100) NOT NULL,
    year_of_creation SMALLINT     NULL,
                     CONSTRAINT year_of_creation_range
                     CHECK(year_of_creation BETWEEN 1000 AND 9999)
);

/* Создание таблицы колекций треков: */
CREATE TABLE IF NOT EXISTS Collections_of_tracks (
    collection_id INTEGER REFERENCES Collections,
    track_id      INTEGER REFERENCES Tracks,
                  CONSTRAINT  ct_id
                  PRIMARY KEY (collection_id, track_id)
);
