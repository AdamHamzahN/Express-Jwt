create database movies_db_rawMySQL_JWT;
use movies_db_rawMySQL_JWT;

-- users
CREATE TABLE `Users`(
	id INT auto_increment primary key,
    email varchar(255) not null unique,
    name varchar(255),
    password varchar(255) not null,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP on update current_timestamp
);

-- Categories
CREATE TABLE `Categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT primary key,
    `name` VARCHAR(255) NOT NULL,
    `description` text NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP on update current_timestamp,
    userId int,
    constraint fk_categories_user foreign key (userId) REFERENCES users(id) on delete Set Null
);

-- movies
CREATE TABLE `Movies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT primary key,
    `title` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `picture` text,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP on update current_timestamp,
    
    `categoryId` INTEGER NULL,
	userId int,
	CONSTRAINT `Movie_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Categories`(`id`) ON DELETE SET NULL,
	constraint fk_movies_user foreign key (userId) REFERENCES users(id) on delete Set Null
);

drop database movies_db_rawMySQL_JWT

