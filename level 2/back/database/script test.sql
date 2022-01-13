CREATE DATABASE stolen_bike;

USE stolen_bike;

CREATE TABLE bike_owner (
    `id` int NOT NULL AUTO_INCREMENT,
    `firstname` varchar(100) NOT NULL,
    `lastname` varchar(100) NOT NULL,
    `email` varchar(100) UNIQUE NOT NULL,
    `adress` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
  );
  
CREATE TABLE `stolen_bike`.`bike` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `serial_number` VARCHAR(55) NOT NULL,
  `id_owner` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bike_bike_owner_idx` (`id_owner` ASC) VISIBLE,
  CONSTRAINT `fk_bike_bike_owner`
    FOREIGN KEY (`id_owner`)
    REFERENCES `stolen_bike`.`bike_owner` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE officer (
   `id` int NOT NULL AUTO_INCREMENT primary key,
   `disponibility` tinyint NOT NULL);
    
CREATE TABLE report (
   `id` int NOT NULL AUTO_INCREMENT primary key,
   `status` tinyint,
  `id_officer` INT NULL,
  `id_bike` INT NOT NULL,
  INDEX `fk_report_officer_idx` (`id_officer` ASC) VISIBLE,
  CONSTRAINT `fk_report_officer`
    FOREIGN KEY (`id_officer`)
    REFERENCES `stolen_bike`.`officer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_report_bike`
    FOREIGN KEY (`id_bike`)
    REFERENCES `stolen_bike`.`bike` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO officer (disponibility) VALUES (1);