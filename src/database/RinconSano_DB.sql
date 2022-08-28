DROP SCHEMA IF EXISTS `rinconsano_db` ;
CREATE SCHEMA IF NOT EXISTS `rinconsano_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `rinconsano_db` ;


SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS `Productos`;
CREATE TABLE `Productos`(
    `idProducto` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL,
    `Descripcion` TEXT NOT NULL,
    `idCategoria` INT UNSIGNED NOT NULL,
    `Precio` INT NOT NULL,
    `Descuento` INT NOT NULL,
    `Imagen` VARCHAR(255) NOT NULL
);
DROP TABLE IF EXISTS `Usuarios`;
CREATE TABLE `Usuarios`(
    `idUsuario` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL,
    `User` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    `Birthday` DATE NOT NULL,
    `Avatar` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `idRol` INT UNSIGNED NOT NULL,
    `Domicilio` VARCHAR(255) NOT NULL,
    `Ciudad` VARCHAR(255) NOT NULL,
    `Pais` VARCHAR(255) NOT NULL
);
DROP TABLE IF EXISTS `Compras`;
CREATE TABLE `Compras`(
    `idCompra` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Fecha` DATE NOT NULL,
    `idUsuario` INT UNSIGNED NOT NULL,
    `idEstado` INT UNSIGNED NOT NULL
);

DROP TABLE IF EXISTS `Categoria`;
CREATE TABLE `Categoria`(
    `idCategoria` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `NombreCategoria` VARCHAR(255) NOT NULL
);
DROP TABLE IF EXISTS `CompraProducto`;
CREATE TABLE `CompraProducto`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `idCompra` INT NOT NULL,
    `idProducto` INT NOT NULL,
    `Cantidad` INT NOT NULL
);

DROP TABLE IF EXISTS `Estado`;
CREATE TABLE `Estado`(
    `idEstado` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS `Rol`;
CREATE TABLE `Rol`(
    `idRol` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Nombre` VARCHAR(255) NOT NULL,
    `Descripcion` VARCHAR(255) NOT NULL
);

ALTER TABLE
	`Usuarios` ADD FOREIGN KEY (`idRol`) REFERENCES `Rol`(`idRol`);
ALTER TABLE
	`Compras` ADD FOREIGN KEY (`idEstado`) REFERENCES `Estado`(`idEstado`);
ALTER TABLE
	`Compras` ADD FOREIGN KEY (`idUsuario`) REFERENCES `Usuarios`(`idUsuario`);
ALTER TABLE
	`CompraProducto` ADD FOREIGN KEY (`idCompra`) REFERENCES `Compras`(`idCompra`);
ALTER TABLE
	`CompraProducto` ADD FOREIGN KEY (`idProducto`) REFERENCES `Productos`(`idProducto`);
ALTER TABLE
	`Productos` ADD FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`idCategoria`);