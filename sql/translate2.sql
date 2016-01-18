-- MySQL dump 10.13  Distrib 5.6.19, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: homestead
-- ------------------------------------------------------
-- Server version	5.6.19-1~exp1ubuntu2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `translate_values`
--

DROP TABLE IF EXISTS `translate_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `translate_values` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `language_id` int(10) unsigned NOT NULL,
  `namespace_id` int(10) unsigned NOT NULL,
  `text` mediumtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `translate_values_language_id_foreign` (`language_id`),
  KEY `translate_values_namespace_id_foreign` (`namespace_id`),
  CONSTRAINT `translate_values_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`),
  CONSTRAINT `translate_values_namespace_id_foreign` FOREIGN KEY (`namespace_id`) REFERENCES `translate_namespaces` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translate_values`
--

LOCK TABLES `translate_values` WRITE;
/*!40000 ALTER TABLE `translate_values` DISABLE KEYS */;
INSERT INTO `translate_values` VALUES (1,1,1,'Usuario no encontrado','2016-01-18 01:36:30','2016-01-18 01:36:30'),(2,2,1,'user_not_found','2016-01-18 01:36:30','2016-01-18 01:36:30'),(3,1,2,'Usuario/password no correctos','2016-01-18 01:36:30','2016-01-18 01:36:30'),(4,2,2,'auth_wrong_email_password','2016-01-18 01:36:30','2016-01-18 01:36:30'),(5,1,3,'El correo ya existe','2016-01-18 01:36:30','2016-01-18 01:36:30'),(6,2,3,'email_already_taken','2016-01-18 01:36:30','2016-01-18 01:36:30'),(7,1,4,'Como creador ya se encuentra unido','2016-01-18 01:36:30','2016-01-18 01:36:30'),(8,2,4,'join_as_owner_already_joined','2016-01-18 01:36:30','2016-01-18 01:36:30'),(9,1,5,'Ya se encuentra unido','2016-01-18 01:36:30','2016-01-18 01:36:30'),(10,2,5,'join_already_joined','2016-01-18 01:36:30','2016-01-18 01:36:30'),(11,1,6,'Como creador no puede abandonar','2016-01-18 01:36:30','2016-01-18 01:36:30'),(12,2,6,'left_owner_cant','2016-01-18 01:36:30','2016-01-18 01:36:30'),(13,1,7,'No se encuentra unido','2016-01-18 01:36:30','2016-01-18 01:36:30'),(14,2,7,'left_first_join','2016-01-18 01:36:30','2016-01-18 01:36:30'),(15,1,8,'El Winwin ya se encuentra sumado','2016-01-18 01:36:30','2016-01-18 01:36:30'),(16,2,8,'group_add_winwin_already_joined','2016-01-18 01:36:30','2016-01-18 01:36:30'),(17,1,9,'El Winwin no pertenece al grupo','2016-01-18 01:36:30','2016-01-18 01:36:30'),(18,2,9,'group_remove_winwin_not_joined','2016-01-18 01:36:30','2016-01-18 01:36:30'),(19,1,10,'Usted no es sponsor','2016-01-18 01:36:30','2016-01-18 01:36:30'),(20,2,10,'you_are_not_an_sponsor','2016-01-18 01:36:30','2016-01-18 01:36:30'),(21,1,11,'Ya se encuentra esponsoreando al grupo','2016-01-18 01:36:30','2016-01-18 01:36:30'),(22,2,11,'you_are_already_sponsored_this_group','2016-01-18 01:36:30','2016-01-18 01:36:30'),(23,1,12,'Usted no es un sponsor','2016-01-18 01:36:30','2016-01-18 01:36:30'),(24,2,12,'you_are_not_an_sponsor','2016-01-18 01:36:30','2016-01-18 01:36:30'),(25,1,13,'No puede realizar esta operacion hasta que no confirme su cuenta','2016-01-18 01:36:30','2016-01-18 01:36:30'),(26,2,13,'operation_not_until_activate_account','2016-01-18 01:36:30','2016-01-18 01:36:30'),(27,1,14,'Ya se encuentra unido','2016-01-18 01:36:30','2016-01-18 01:36:30'),(28,2,14,'join_already_join','2016-01-18 01:36:30','2016-01-18 01:36:30'),(29,1,15,'Debe realizar un primer post para activar el Winwin','2016-01-18 01:36:30','2016-01-18 01:36:30'),(30,2,15,'winwin_at_least_one_post_to_activate','2016-01-18 01:36:30','2016-01-18 01:36:30'),(31,1,16,'No es administrador de este Winwin para realizar la operacion','2016-01-18 01:36:30','2016-01-18 01:36:30'),(32,2,16,'winwin_you_are_not_the_admin','2016-01-18 01:36:30','2016-01-18 01:36:30'),(33,1,17,'No es sponsor para realizar esta operacion','2016-01-18 01:36:30','2016-01-18 01:36:30'),(34,2,17,'winwin_you_are_not_an_sponsor','2016-01-18 01:36:30','2016-01-18 01:36:30'),(35,1,18,'Ya se encuentra esponsoreando este Winwin','2016-01-18 01:36:30','2016-01-18 01:36:30'),(36,2,18,'winwin_you_are_already_sponsored_this_winwin','2016-01-18 01:36:30','2016-01-18 01:36:30'),(37,1,19,'Ya se encuentra esponsoreando este Winwin','2016-01-18 01:36:30','2016-01-18 01:36:30'),(38,2,19,'winwin_is_already_sponsored_this_winwin','2016-01-18 01:36:30','2016-01-18 01:36:30'),(39,1,20,'Solo el creador puede cerrar este Winwin','2016-01-18 01:36:30','2016-01-18 01:36:30'),(40,2,20,'winwin_only_owner_can_close','2016-01-18 01:36:30','2016-01-18 01:36:30'),(41,1,21,'Clave actual incorrecta','2016-01-18 01:36:30','2016-01-18 01:36:30'),(42,2,21,'user_current_password_wrong','2016-01-18 01:36:30','2016-01-18 01:36:30'),(43,1,22,'No ha ingresado al sitio','2016-01-18 01:36:30','2016-01-18 01:36:30'),(44,2,22,'follow_not_logged','2016-01-18 01:36:30','2016-01-18 01:36:30'),(45,1,23,'No puede seguirse a usted mismo','2016-01-18 01:36:30','2016-01-18 01:36:30'),(46,2,23,'follow_not_himself','2016-01-18 01:36:30','2016-01-18 01:36:30'),(47,1,24,'Ya se encuentra siguiendo a este usuario','2016-01-18 01:36:30','2016-01-18 01:36:30'),(48,2,24,'follow_already_folllowing','2016-01-18 01:36:30','2016-01-18 01:36:30'),(49,1,25,'Usted no se encuentra siguiendo a esta persona','2016-01-18 01:36:30','2016-01-18 01:36:30'),(50,2,25,'follow_follow_first_to_unfollow','2016-01-18 01:36:30','2016-01-18 01:36:30'),(51,1,26,'Sponsor no encontrado','2016-01-18 01:36:30','2016-01-18 01:36:30'),(52,2,26,'sponsor_not_found','2016-01-18 01:36:30','2016-01-18 01:36:30'),(53,1,27,'No se puede seguir a usted mismo','2016-01-18 01:36:30','2016-01-18 01:36:30'),(54,2,27,'sponsor_as_owner_you_are_aleady_following','2016-01-18 01:36:30','2016-01-18 01:36:30'),(55,1,28,'Ya se encuntra siguiendo','2016-01-18 01:36:30','2016-01-18 01:36:30'),(56,2,28,'sponsor_already_following','2016-01-18 01:36:30','2016-01-18 01:36:30'),(57,1,29,'No puede dejar de seguirse','2016-01-18 01:36:30','2016-01-18 01:36:30'),(58,2,29,'sponsor_owner_cant_left','2016-01-18 01:36:30','2016-01-18 01:36:30'),(59,1,30,'No se encuntra siguiendo','2016-01-18 01:36:30','2016-01-18 01:36:30'),(60,2,30,'sponsor_left_first_follow','2016-01-18 01:36:30','2016-01-18 01:36:30'),(61,1,31,'No es sponsor','2016-01-18 01:36:30','2016-01-18 01:36:30'),(62,2,31,'not_sponsor_user','2016-01-18 01:36:30','2016-01-18 01:36:30');
/*!40000 ALTER TABLE `translate_values` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-18  8:44:22
