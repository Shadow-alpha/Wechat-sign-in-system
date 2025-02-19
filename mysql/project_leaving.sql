-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `leaving`
--

DROP TABLE IF EXISTS `leaving`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaving` (
  `code` int NOT NULL AUTO_INCREMENT COMMENT '请假编号',
  `stu_id` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '学生学号',
  `course_id` char(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '课程编号',
  `class_num` tinyint unsigned NOT NULL COMMENT '课次',
  `leave_time` datetime NOT NULL COMMENT '请假提交时间',
  `reason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '请假理由',
  `leave_status` enum('待审核','通过','不通过') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '待审核' COMMENT '审核状态',
  PRIMARY KEY (`code`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  KEY `fk_stu_id_3_idx` (`stu_id`),
  KEY `fk_courseid_classnum_2_idx` (`course_id`,`class_num`),
  CONSTRAINT `fk_courseid_week_2` FOREIGN KEY (`course_id`, `class_num`) REFERENCES `class` (`course_id`, `class_num`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_stu_id_3` FOREIGN KEY (`stu_id`) REFERENCES `student_info` (`stu_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='请假关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaving`
--

LOCK TABLES `leaving` WRITE;
/*!40000 ALTER TABLE `leaving` DISABLE KEYS */;
INSERT INTO `leaving` VALUES (32,'20385769285','DATA130023.01',1,'2023-02-21 12:25:13','抱歉老师，我昨天肚子不舒服，下节课会带来请假条。','通过'),(33,'18307117654','DATA130023.01',2,'2023-02-26 17:30:37','老师，我今天下午参加社团活动，请假一次。','不通过'),(34,'21374659987','DATA130023.01',2,'2023-02-23 16:27:18','老师，那天睡过了，能不能事后补交一次假。','不通过'),(35,'19309136452','DATA130023.01',3,'2023-03-08 16:27:18','我就是要请假，你就说你批不批吧。','待审核'),(37,'21312345678','DATA130023.01',2,'2023-06-22 22:47:44','今天身体不舒服，想请个假','通过'),(40,'21312345678','DATA130023.01',4,'2023-06-23 10:28:38','JJ技术监督局好好说说','通过'),(42,'21312345678','DATA130023.01',5,'2023-06-23 11:30:16','今天身体不舒服，申请请假，望批准','待审核');
/*!40000 ALTER TABLE `leaving` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-23 13:06:47
