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
-- Table structure for table `translate_namespaces`
--

DROP TABLE IF EXISTS `translate_namespaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `translate_namespaces` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('EMAIL','MOBILE','WEB','NOTIFICATION','SETTING','GLOBAL') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'GLOBAL',
  `module` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sub_module` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `translate_namespaces`
--

LOCK TABLES `translate_namespaces` WRITE;
/*!40000 ALTER TABLE `translate_namespaces` DISABLE KEYS */;
INSERT INTO `translate_namespaces` VALUES (1,'GLOBAL','error','','user_not_found','2016-01-18 01:36:30','2016-01-18 01:36:30'),(2,'GLOBAL','error','','auth_wrong_email_password','2016-01-18 01:36:30','2016-01-18 01:36:30'),(3,'GLOBAL','error','','email_already_taken','2016-01-18 01:36:30','2016-01-18 01:36:30'),(4,'GLOBAL','error','','join_as_owner_already_joined','2016-01-18 01:36:30','2016-01-18 01:36:30'),(5,'GLOBAL','error','','join_already_joined','2016-01-18 01:36:30','2016-01-18 01:36:30'),(6,'GLOBAL','error','','left_owner_cant','2016-01-18 01:36:30','2016-01-18 01:36:30'),(7,'GLOBAL','error','','left_first_join','2016-01-18 01:36:30','2016-01-18 01:36:30'),(8,'GLOBAL','error','','group_add_winwin_already_joined','2016-01-18 01:36:30','2016-01-18 01:36:30'),(9,'GLOBAL','error','','group_remove_winwin_not_joined','2016-01-18 01:36:30','2016-01-18 01:36:30'),(10,'GLOBAL','error','','you_are_not_an_sponsor','2016-01-18 01:36:30','2016-01-18 01:36:30'),(11,'GLOBAL','error','','you_are_already_sponsored_this_group','2016-01-18 01:36:30','2016-01-18 01:36:30'),(12,'GLOBAL','error','','you_are_not_an_sponsor','2016-01-18 01:36:30','2016-01-18 01:36:30'),(13,'GLOBAL','error','','operation_not_until_activate_account','2016-01-18 01:36:30','2016-01-18 01:36:30'),(14,'GLOBAL','error','','join_already_join','2016-01-18 01:36:30','2016-01-18 01:36:30'),(15,'GLOBAL','error','','winwin_at_least_one_post_to_activate','2016-01-18 01:36:30','2016-01-18 01:36:30'),(16,'GLOBAL','error','','winwin_you_are_not_the_admin','2016-01-18 01:36:30','2016-01-18 01:36:30'),(17,'GLOBAL','error','','winwin_you_are_not_an_sponsor','2016-01-18 01:36:30','2016-01-18 01:36:30'),(18,'GLOBAL','error','','winwin_you_are_already_sponsored_this_winwin','2016-01-18 01:36:30','2016-01-18 01:36:30'),(19,'GLOBAL','error','','winwin_is_already_sponsored_this_winwin','2016-01-18 01:36:30','2016-01-18 01:36:30'),(20,'GLOBAL','error','','winwin_only_owner_can_close','2016-01-18 01:36:30','2016-01-18 01:36:30'),(21,'GLOBAL','error','','user_current_password_wrong','2016-01-18 01:36:30','2016-01-18 01:36:30'),(22,'GLOBAL','error','','follow_not_logged','2016-01-18 01:36:30','2016-01-18 01:36:30'),(23,'GLOBAL','error','','follow_not_himself','2016-01-18 01:36:30','2016-01-18 01:36:30'),(24,'GLOBAL','error','','follow_already_folllowing','2016-01-18 01:36:30','2016-01-18 01:36:30'),(25,'GLOBAL','error','','follow_follow_first_to_unfollow','2016-01-18 01:36:30','2016-01-18 01:36:30'),(26,'GLOBAL','error','','sponsor_not_found','2016-01-18 01:36:30','2016-01-18 01:36:30'),(27,'GLOBAL','error','','sponsor_as_owner_you_are_aleady_following','2016-01-18 01:36:30','2016-01-18 01:36:30'),(28,'GLOBAL','error','','sponsor_already_following','2016-01-18 01:36:30','2016-01-18 01:36:30'),(29,'GLOBAL','error','','sponsor_owner_cant_left','2016-01-18 01:36:30','2016-01-18 01:36:30'),(30,'GLOBAL','error','','sponsor_left_first_follow','2016-01-18 01:36:30','2016-01-18 01:36:30'),(31,'GLOBAL','error','','not_sponsor_user','2016-01-18 01:36:30','2016-01-18 01:36:30');
/*!40000 ALTER TABLE `translate_namespaces` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-01-18  8:43:54
