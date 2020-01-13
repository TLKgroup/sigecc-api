-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: localhost    Database: sabinas
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `modulo_permisos_role`
--

DROP TABLE IF EXISTS `modulo_permisos_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulo_permisos_role` (
  `id_modulo_permisos_role` int(11) NOT NULL AUTO_INCREMENT,
  `id_role` int(11) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `id_permiso_nivel_1` int(11) DEFAULT NULL,
  `id_permiso_nivel_2` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_modulo_permisos_role`),
  KEY `fk_roles_modulos_permisos_nivel_1` (`id_role`),
  KEY `fk_modulos_modulos_permisos_nivel_1` (`id_modulo`),
  KEY `fk_permisos_modulos_permisos_nivel_1` (`id_permiso_nivel_1`),
  KEY `fk_permisos_nivel_2_permisos_1_2` (`id_permiso_nivel_2`),
  CONSTRAINT `fk_modulos_modulos_permisos_nivel_1` FOREIGN KEY (`id_modulo`) REFERENCES `modulos` (`id_modulo`),
  CONSTRAINT `fk_permisos_modulos_permisos_nivel_1` FOREIGN KEY (`id_permiso_nivel_1`) REFERENCES `permisos_nivel_1` (`id_permiso_nivel_1`),
  CONSTRAINT `fk_permisos_nivel_2_permisos_1_2` FOREIGN KEY (`id_permiso_nivel_2`) REFERENCES `permisos_nivel_2` (`id_permiso_nivel_2`),
  CONSTRAINT `fk_roles_modulos_permisos_nivel_1` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo_permisos_role`
--

LOCK TABLES `modulo_permisos_role` WRITE;
/*!40000 ALTER TABLE `modulo_permisos_role` DISABLE KEYS */;
INSERT INTO `modulo_permisos_role` VALUES (1,1,1,NULL,NULL),(2,1,2,NULL,NULL),(3,1,2,3,NULL),(4,1,2,2,NULL),(5,1,2,5,NULL),(6,1,2,4,NULL),(7,1,2,3,NULL),(8,1,2,4,NULL),(9,1,2,5,NULL),(10,1,2,2,NULL),(11,1,2,2,NULL),(12,1,2,3,NULL),(13,1,2,4,NULL),(14,1,2,5,NULL);
/*!40000 ALTER TABLE `modulo_permisos_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulos` (
  `id_modulo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_modulo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_modulo`),
  UNIQUE KEY `un_nombre_modulo` (`nombre_modulo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
INSERT INTO `modulos` VALUES (1,'Reportes'),(2,'Usuarios');
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos_nivel_1`
--

DROP TABLE IF EXISTS `permisos_nivel_1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos_nivel_1` (
  `id_permiso_nivel_1` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_permiso` varchar(45) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  PRIMARY KEY (`id_permiso_nivel_1`),
  UNIQUE KEY `un_nombre_permiso` (`nombre_permiso`),
  KEY `fk_id_modulo_permisos_nivel_1` (`id_modulo`),
  CONSTRAINT `fk_id_modulo_permisos_nivel_1` FOREIGN KEY (`id_modulo`) REFERENCES `modulos` (`id_modulo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos_nivel_1`
--

LOCK TABLES `permisos_nivel_1` WRITE;
/*!40000 ALTER TABLE `permisos_nivel_1` DISABLE KEYS */;
INSERT INTO `permisos_nivel_1` VALUES (2,'canAddUsers','Agregar usuarios',2),(3,'canEditUsers','Editar usuarios',2),(4,'canDeleteUsers','Eliminar usuarios',2),(5,'canEditRoles','Editar roles',2);
/*!40000 ALTER TABLE `permisos_nivel_1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos_nivel_2`
--

DROP TABLE IF EXISTS `permisos_nivel_2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos_nivel_2` (
  `id_permiso_nivel_2` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_permiso` varchar(45) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `id_permiso_nivel_1` int(11) NOT NULL,
  PRIMARY KEY (`id_permiso_nivel_2`),
  KEY `fk_id_permiso_nivel_1_permisos_nivel_2` (`id_permiso_nivel_1`),
  CONSTRAINT `fk_id_permiso_nivel_1_permisos_nivel_2` FOREIGN KEY (`id_permiso_nivel_1`) REFERENCES `permisos_nivel_1` (`id_permiso_nivel_1`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos_nivel_2`
--

LOCK TABLES `permisos_nivel_2` WRITE;
/*!40000 ALTER TABLE `permisos_nivel_2` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisos_nivel_2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id_role` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_role` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id_role`),
  UNIQUE KEY `un_nombre_role` (`nombre_role`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Administrador');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_empleado` varchar(50) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` text NOT NULL,
  `id_role` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_ultima_modificacion` datetime DEFAULT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'A',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nombre_usuario_un` (`nombre_usuario`),
  KEY `fk_usuarios_roles` (`id_role`),
  CONSTRAINT `fk_usuarios_roles` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`),
  CONSTRAINT `chk_status_usuarios` CHECK ((`status` in (_utf8mb4'A',_utf8mb4'I')))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','admin','$2b$10$/NVqW3A9gsBv1zESc.RxM.K4U2iyA6seoc/9FPFOSsvUrEW8qfQye',1,'2019-10-22 12:41:30','2019-10-23 09:08:34','A');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sabinas'
--

--
-- Dumping routines for database 'sabinas'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-24 16:42:15
