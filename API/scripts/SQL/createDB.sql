/* ----- INITIALISATION ----- */

DROP TABLE IF EXISTS person CASCADE;
CREATE TABLE person(
    id serial primary key,
    pseudo varchar(250) primary key,
    last_name varchar(250) not null,
    first_name varchar(250) not null,
    email varchar(250) not null,
    is_admin boolean not null
);

DROP TABLE IF EXISTS toilet CASCADE;
CREATE TABLE toilet
    (
    id serial primary key,
    is_reduced_mobility boolean not null,
    isPaid boolean not null
    );

DROP TABLE IF EXISTS report CASCADE;
CREATE TABLE report
    (
    id serial primary key,
    reason varchar(250) not null,
    date DATE not null, 
    is_done boolean not null,
    user_pseudo varchar(250) not null, 
    foreign KEY(user_pseudo) references person(pseudo)
    );

DROP TABLE IF EXISTS review CASCADE;
CREATE TABLE review
    (
    id serial primary key,
    note int not null,
    comment varchar(250) not null,
    user_id int not null,
    toilet_id int not null,
    foreign KEY(user_pseudo) references person(pseudo),
    foreign KEY(toilet_id) references toilet(id)
    );

DROP TABLE IF EXISTS locationToilet CASCADE;
CREATE TABLE locationToilet
    (
    id serial primary key,
    position_x varchar(250) not null,
    position_y varchar(250) not null,
    toilet_id int not null,
    foreign KEY(toilet_id) references toilet(id)
    );


/* ----- REMPLISSAGE ----- */

INSERT INTO person (pseudo, last_name, first_name, email, is_admin)
(
    "youyou",
    "youri",
    "Dautrebande",
    "ydautrebande@gmail.com",
    TRUE,
)


