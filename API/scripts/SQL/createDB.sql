/* ----- INITIALISATION ----- */

DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person
    (
    id serial primary key,
    pseudo varchar(250) unique not null,
    last_name varchar(250) not null,
    first_name varchar(250) not null,
    email varchar(250) unique not null,
    is_admin boolean not null,
    password varchar(250) not null
    );

DROP TABLE IF EXISTS toilet CASCADE;
CREATE TABLE toilet
    (
    id serial primary key,
    is_reduced_mobility boolean not null,
    is_paid boolean not null
    );

DROP TABLE IF EXISTS location_toilet CASCADE;
CREATE TABLE location_toilet
    (
    id serial primary key,
    latitude float not null,
    longitude float not null,
    toilet_id int not null,
    foreign KEY(toilet_id) references toilet(id)
    );

DROP TABLE IF EXISTS report CASCADE;
CREATE TABLE report
    (
    id serial primary key,
    reason varchar(250) not null,
    "date" date not null DEFAULT CURRENT_DATE, 
    is_done boolean not null,
    user_id int not null, 
    foreign KEY(user_id) references person(id)
    );

DROP TABLE IF EXISTS review CASCADE;
CREATE TABLE review
    (
    id serial primary key,
    note int not null,
    comment varchar(250) not null,
    "date" date not null DEFAULT CURRENT_DATE,
    user_id int not null,
    toilet_id int not null,
    foreign KEY(user_id) references person(id),
    foreign KEY(toilet_id) references toilet(id)
    );



/* ----- REMPLISSAGE ----- */

-- PERSON
INSERT INTO person (pseudo, last_name, first_name, email, is_admin, password)
VALUES 
    ( 'youyou', 'Dautrebande', 'Youri', 'ydautrebande@gmail.com', TRUE, 'password'),
    ( 'tim', 'Ciciotti', 'Timothé', 'timothecicio@gmail.com', TRUE, 'motdepasse'),
    ( 'tom', 'Gedusor', 'Tom', 'tomgedusore@gmail.com', FALSE, 'test');

-- TOILET
INSERT INTO toilet (is_reduced_mobility, is_paid)
VALUES
    (TRUE, TRUE),
    (FALSE, FALSE),
    (TRUE, FALSE),
    (FALSE, TRUE);

-- TOILET_LOCATION
INSERT INTO location_toilet (latitude, longitude, toilet_id)
VALUES
    (50.46535, 4.86461, 1),
    (50.47104, 4.85807, 2),
    (50.47104, 4.86809, 3),
    (50.46535, 4.85975, 4);

-- REPORT
INSERT INTO report (reason, "date", is_done, user_id) 
VALUES
    ('reason 1 short', TO_DATE('2021/11/15', 'YYYY/MM/DD'), TRUE, 3),
    ('reason 2 more longer than the first', TO_DATE('2022/09/10', 'YYYY/MM/DD'), FALSE, 1),
    ('reason 3, more more longer than the second one', CURRENT_DATE, FALSE, 2);
INSERT INTO report (reason, is_done, user_id)
VALUES 
    ('reason', FALSE, 3);

-- REVIEW
INSERT INTO review (note, comment, user_id, toilet_id)
VALUES
    (3, 'I don"t have comment', 1, 1),
    (5, 'Really clean this toilet', 3, 2),
    (2, 'You have to clean this toilet guys', 2, 1),
    (4, 'Nothing to say', 2, 2),
    (5, 'yes it"s a toilet', 3, 3);

