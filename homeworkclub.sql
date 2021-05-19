--create database homeworkclub;
--SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'some_table'; a query to show a tab
CREATE TABLE users (
id SERIAL PRIMARY KEY,
name  VARCHAR(100) NOT NULL ,
email VARCHAR(100)NOT NULL,
password VARCHAR(200) NOT NULL,
role VARCHAR (100) NOT NULL
);

-- ADMIN : kARI,SIAN,KIRSTY,DORA

CREATE TABLE admin (
  id       INT REFERENCES users (id) PRIMARY KEY,
  name    VARCHAR(50) 

); 

CREATE TABLE volunteer (
  id       INT REFERENCES users (id) PRIMARY KEY,
  name    VARCHAR(50) 

); 

CREATE TABLE trainee (
  id       INT REFERENCES users (id) PRIMARY KEY,
  name    VARCHAR(50) ,
  region   VARCHAR(50)

); 

CREATE TABLE expertise (
id SERIAL PRIMARY KEY,
name  VARCHAR(100) NOT NULL 
);

 INSERT INTO expertise  (name) values ('JavaScript'),('Bootstrap'),('Git and GitHub'),('DOM'),('React'),('API'),('Node'),('SQL'),('Postgres'),('MongoDb');

CREATE TABLE volunteer_expertise (

volunteer_id    INT REFERENCES volunteer(id) NOT NULL  ,
expertise_id  INT REFERENCES expertise(id)NOT NULL,
PRIMARY KEY (volunteer_id,expertise_id)

);
INSERT INTO users  (name,email,password,role) values ('Kari','kari@capgemini.com','letmein','Admin');
INSERT INTO users  (name,email,password,role) values ('Kirsty','kirsty@capgemini.com','letmein','Admin');
INSERT INTO users  (name,email,password,role) values ('Sian','sian@capgemini.com','letmein','Admin');
INSERT INTO users  (name,email,password,role) values ('Dora','dora@capgemini.com','letmein','Admin');
