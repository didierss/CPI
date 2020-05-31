
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `CONTROL_SCI`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CONTROL_SCI` (
  `idPrestador` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` int(11) DEFAULT NULL,
  `nomRegional` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipoDoc` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nroDoc` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codSede` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombreIPS` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NomGerente` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `diligencia` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `representante` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CODIGO_LEGAL` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DESC_ADICIONAL` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DESCRIPCION` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codHab` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idPrestador`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `GIP_TBL_PARAM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GIP_TBL_PARAM` (
  `ID_PARAM` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CODIGO_LEGAL` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DESCRIPCION` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CODIGO_ADICIONAL` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DESC_ADICIONAL` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PRIORIDAD` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEC_ULT_ACTUAL` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `GIP_TBL_REF_PRESTADOR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GIP_TBL_REF_PRESTADOR` (
  `COD_COMPAÑIA` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `COMPAÑIA` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `COD_PLAN` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DESC_PLAN` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FORMA_CONTRATACION` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NUM_IDENT` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DIGITO_VERIFICACION` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TIPO_IDENT` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TIPO_PERSONA` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RELACION_EPS` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `COD_SUCURSAL` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NOMBRE_SUCURSAL` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CIUDAD` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DESC_CIUDAD` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DEPARTAMENTO` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `REGIONAL` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ESPECIALIDAD` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DESC_ESPECIALIDAD` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ESTADO` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TIPO_CONVENIO` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DIRECCION` varchar(125) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TELEFONO_1` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EXTENSION_1` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TELEFONO_2` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EXTENSION_2` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CORREO_ELECTRONICO` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEC_INI_PORTABIL` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEC_FIN_PORTABIL` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `COD_HABILITA_SUCUR` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HABILITA_SEDE_SUCUR` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEC_INI_HABILITA` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEC_VENCIM_HABILITA` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NUM_CONTRATO` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEC_INI_CONVENIO` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEC_FIN_CONVENIO` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AGRUPA_NT_VALOR` varchar(125) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `GIP_TBL_REF_RESP_PREST`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `GIP_TBL_REF_RESP_PREST` (
  `FECHA` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DEPARTAMENTO` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MUNICIPIO` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `COD_IPS` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NOM_IPS` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `COD_HABILITACION` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `COD_SEDE` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `COD_HAB_UNIDO` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `NOMBRE_SEDE` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `GERENTE` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TIPO_ZONA` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DIRECCION` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BARRIO` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CEPO_COD` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CENT_POBLADO` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TELEFONO` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FAX` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EMAIL` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEC_APERTURA` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEC_CIERRE` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NITS` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DV` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CLASE_PERS` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NAJU_COD` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NATURALEZA` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CLPR_COD` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CLASE_IPS` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ESE` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NIVEL` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CARACTER` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SEDE_PRINCIPAL` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HABILITADO` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NUM_SEDE_PPTAL` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HRS_LUNES` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HRS_MARTES` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HRS_MIERCOLES` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HRS_JUEVES` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HRS_VIERNES` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HRS_SABADO` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HRS_DOMINGO` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FEC_ULT_ACT` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `stream` enum('stdout','stderr') NOT NULL,
  `time` char(30) NOT NULL,
  `log_hash` char(32) NOT NULL,
  `log` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stream_time_log_hash` (`stream`,`time`,`log_hash`),
  KEY `stream_time` (`stream`,`time`),
  KEY `time` (`time`),
  FULLTEXT KEY `log` (`log`)
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `customerNumber` int(11) NOT NULL,
  `customerName` varchar(50) NOT NULL,
  `contactLastName` varchar(50) NOT NULL,
  `contactFirstName` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postalCode` varchar(15) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `salesRepEmployeeNumber` int(11) DEFAULT NULL,
  `creditLimit` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`customerNumber`),
  KEY `salesRepEmployeeNumber` (`salesRepEmployeeNumber`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`salesRepEmployeeNumber`) REFERENCES `employees` (`employeeNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `employeeNumber` int(11) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `extension` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `officeCode` varchar(10) NOT NULL,
  `reportsTo` int(11) DEFAULT NULL,
  `jobTitle` varchar(50) NOT NULL,
  PRIMARY KEY (`employeeNumber`),
  KEY `reportsTo` (`reportsTo`),
  KEY `officeCode` (`officeCode`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`reportsTo`) REFERENCES `employees` (`employeeNumber`),
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`officeCode`) REFERENCES `offices` (`officeCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `offices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offices` (
  `officeCode` varchar(10) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `addressLine1` varchar(50) NOT NULL,
  `addressLine2` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `postalCode` varchar(15) NOT NULL,
  `territory` varchar(10) NOT NULL,
  PRIMARY KEY (`officeCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetails` (
  `orderNumber` int(11) NOT NULL,
  `productCode` varchar(15) NOT NULL,
  `quantityOrdered` int(11) NOT NULL,
  `priceEach` decimal(10,2) NOT NULL,
  `orderLineNumber` smallint(6) NOT NULL,
  PRIMARY KEY (`orderNumber`,`productCode`),
  KEY `productCode` (`productCode`),
  CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orderNumber`) REFERENCES `orders` (`orderNumber`),
  CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `orderNumber` int(11) NOT NULL,
  `orderDate` date NOT NULL,
  `requiredDate` date NOT NULL,
  `shippedDate` date DEFAULT NULL,
  `status` varchar(15) NOT NULL,
  `comments` text,
  `customerNumber` int(11) NOT NULL,
  PRIMARY KEY (`orderNumber`),
  KEY `customerNumber` (`customerNumber`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerNumber`) REFERENCES `customers` (`customerNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `productlines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productlines` (
  `productLine` varchar(50) NOT NULL,
  `textDescription` varchar(4000) DEFAULT NULL,
  `htmlDescription` mediumtext,
  `image` mediumblob,
  PRIMARY KEY (`productLine`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `productCode` varchar(15) NOT NULL,
  `productName` varchar(70) NOT NULL,
  `productLine` varchar(50) NOT NULL,
  `productScale` varchar(10) NOT NULL,
  `productVendor` varchar(50) NOT NULL,
  `productDescription` text NOT NULL,
  `quantityInStock` smallint(6) NOT NULL,
  `buyPrice` decimal(10,2) NOT NULL,
  `MSRP` decimal(10,2) NOT NULL,
  PRIMARY KEY (`productCode`),
  KEY `productLine` (`productLine`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`productLine`) REFERENCES `productlines` (`productLine`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;