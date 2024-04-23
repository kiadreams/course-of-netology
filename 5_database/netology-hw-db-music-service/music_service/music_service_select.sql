/* Select-запросы задания №2 */ 
/* Название и продолжительность самого длительного трека */
SELECT track_name, duration
  FROM tracks
 WHERE duration
    IN (SELECT MAX(duration)
          FROM tracks);

/* Название треков, продолжительность которых не менее 3,5 минут */
SELECT track_name
  FROM tracks
 WHERE duration >= INTERVAL '00:03:30';

/* Названия сборников, вышедших в период с 2018 по 2020 год включительно */ 
SELECT collection_name
  FROM collections
 WHERE year_of_creation BETWEEN 2018 AND 2020;

/* Исполнители, чьё имя состоит из одного слова */
SELECT nickname
  FROM performers
 WHERE nickname NOT LIKE '% %';
 
/* Название треков, которые содержат слово «мой» или «my */
SELECT track_name 
  FROM tracks t
 WHERE LOWER(track_name) LIKE '%my%'
    OR LOWER(track_name) LIKE '%мой%';


/* Select-запросы задания №3 */
/* Количество исполнителей в каждом жанре */
SELECT g.genre_name, COUNT(gop.performer_id) AS number_of_performers 
  FROM genres_of_performers gop
       INNER JOIN genres g
       ON gop.genre_id = g.genre_id
 GROUP BY g.genre_name;
 
/* Количество треков, вошедших в альбомы 2019–2020 годов */
SELECT COUNT(t.track_id) AS number_of_tracks 
  FROM tracks t
       INNER JOIN albums a
       ON t.album_id = a.album_id
 WHERE a.year_of_release IN (2019, 2020);

/* Средняя продолжительность треков по каждому альбому */
SELECT a.album_name, AVG(t.duration) AS avr_track_lenght 
  FROM tracks t
       INNER JOIN albums a
       ON t.album_id = a.album_id
 GROUP BY album_name;

/* Все исполнители, которые не выпустили альбомы в 2020 году */
SELECT p.nickname 
  FROM performers p
       LEFT JOIN 
       (SELECT p.performer_id, p.nickname
          FROM albums_by_performers abp
               INNER JOIN albums a
               ON abp.album_id = a.album_id
               INNER JOIN performers p
               ON abp.performer_id = p.performer_id
         WHERE a.year_of_release = 2020
       ) AS p2
       ON p.performer_id = p2.performer_id
 WHERE p2.nickname IS NULL;

/* Названия сборников, в которых присутствует конкретный исполнитель (выберите его сами) */
SELECT DISTINCT c.collection_name
  FROM collections_of_tracks cot
       INNER JOIN tracks t
       ON cot.track_id = t.track_id
       INNER JOIN collections c
       ON cot.collection_id = c.collection_id
       INNER JOIN albums_by_performers abp
       ON t.album_id  = abp.album_id
       INNER JOIN performers p
       ON abp.performer_id = p.performer_id
 WHERE p.nickname = 'Тальков';

/* Select-запросы задания №4 (необязательное) */
/* Названия альбомов, в которых присутствуют исполнители более чем одного жанра */
SELECT DISTINCT a.album_name
  FROM albums_by_performers abp
       INNER JOIN
       (SELECT gop.performer_id
          FROM genres_of_performers gop
         GROUP BY gop.performer_id
        HAVING COUNT(gop.genre_id) > 1
       ) AS pgs
       ON abp.performer_id = pgs.performer_id
       INNER JOIN albums a
       ON abp.album_id = a.album_id;

/* Наименования треков, которые не входят в сборники */
SELECT t.track_name
  FROM tracks t
       LEFT JOIN
       (SELECT DISTINCT cot.track_id
          FROM collections_of_tracks cot
       ) AS cts
       ON t.track_id = cts.track_id
 WHERE cts.track_id IS NULL;
       
/* Исполнитель или исполнители, написавшие самый короткий по продолжительности трек,
 *  — теоретически таких треков может быть несколько */
SELECT DISTINCT p.nickname
  FROM albums_by_performers abp
       INNER JOIN performers p
       ON abp.performer_id = p.performer_id
       LEFT JOIN
       (SELECT t.album_id 
          FROM tracks t
         WHERE t.duration
            IN (SELECT MIN(duration)
                  FROM tracks t)
       ) AS a
       ON abp.album_id = a.album_id
 WHERE a.album_id IS NOT NULL;

/* Названия альбомов, содержащих наименьшее количество треков */
SELECT a.album_name 
  FROM tracks t
       INNER JOIN albums a
       ON t.album_id = a.album_id
 GROUP BY a.album_id, a.album_name  
HAVING COUNT(t.track_id)
    IN (SELECT MIN(cn.count)
          FROM (SELECT COUNT(t.track_id)
                  FROM tracks t
                 GROUP BY t.album_id
               ) AS cn
        );

