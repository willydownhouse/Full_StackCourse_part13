CREATE TABLE blogs (^Jid SERIAL PRIMARY KEY,^Jauthor text,^Jurl text NOT NULL,^Jtitle text NOT NULL,^Jlikes INT DEFAULT 0);

insert into blogs (author, url, title) values ('Willy Downhouse', 'www.ciao.com', 'haloo lyngen');

insert into blogs (author, url, title) values ('Waldo', 'www.jippii.com', 'ciao aosta');

