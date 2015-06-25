-- Host: localhost    Database: homestead
-- ------------------------------------------------------
-- Server version	5.6.19-1~exp1ubuntu2


--
-- Table structure for table `activity_types`
--

CREATE TABLE `activity_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` mediumtext,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
)

--
-- Table structure for table `blacklist_users`
--

CREATE TABLE `blacklist_users` (
  `user_id` int(10) unsigned NOT NULL,
  `blocked_user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`user_id`,`blocked_user_id`),
  KEY `blacklist_users_blocked_user_id_foreign` (`blocked_user_id`),
  CONSTRAINT `blacklist_users_blocked_user_id_foreign` FOREIGN KEY (`blocked_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `blacklist_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `content` longtext NOT NULL,
  `canceled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `comments_post_id_foreign` (`post_id`),
  KEY `comments_user_id_foreign` (`user_id`),
  CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
)

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `followed_id` int(10) unsigned NOT NULL,
  `follower_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`followed_id`,`follower_id`),
  KEY `followers_follower_id_foreign` (`follower_id`),
  CONSTRAINT `followers_followed_id_foreign` FOREIGN KEY (`followed_id`) REFERENCES `users` (`id`),
  CONSTRAINT `followers_follower_id_foreign` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`)
)

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext,
  `photo` mediumtext NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT '0',
  `control_ww` tinyint(1) NOT NULL DEFAULT '0',
  `confirm_ww` tinyint(1) NOT NULL DEFAULT '0',
  `canceled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `groups_user_id_foreign` (`user_id`),
  CONSTRAINT `groups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

--
-- Table structure for table `groups_users`
--

CREATE TABLE `groups_users` (
  `group_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `moderator` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`group_id`,`user_id`),
  KEY `groups_users_user_id_foreign` (`user_id`),
  CONSTRAINT `groups_users_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `groups_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

--
-- Table structure for table `groups_winwins`
--

CREATE TABLE `groups_winwins` (
  `group_id` int(10) unsigned NOT NULL,
  `winwin_id` int(10) unsigned NOT NULL,
  `pending` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`group_id`,`winwin_id`),
  KEY `groups_winwins_winwin_id_foreign` (`winwin_id`),
  CONSTRAINT `groups_winwins_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `groups_winwins_winwin_id_foreign` FOREIGN KEY (`winwin_id`) REFERENCES `winwins` (`id`)
)

--
-- Table structure for table `interests`
--

CREATE TABLE `interests` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` mediumtext,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
)

--
-- Table structure for table `interests_interested`
--

CREATE TABLE `interests_interested` (
  `interest_id` int(10) unsigned NOT NULL,
  `interested_id` int(10) unsigned NOT NULL,
  `type` enum('WINWIN','USER','SPONSOR') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
)

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` mediumtext,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
)

--
-- Table structure for table `marital_status`
--

CREATE TABLE `marital_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` mediumtext,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
)

--
-- Table structure for table `medias`
--

CREATE TABLE `medias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `type` enum('VIDEO','IMAGE','DATA') NOT NULL DEFAULT 'IMAGE',
  `name` varchar(255) NOT NULL,
  `ext` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` mediumtext,
  `path` mediumtext,
  `bucket` varchar(255) DEFAULT NULL,
  `thumb_path` mediumtext,
  `disabled` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `medias_user_id_foreign` (`user_id`),
  CONSTRAINT `medias_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
)

--
-- Table structure for table `poll_answers`
--

CREATE TABLE `poll_answers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `poll_id` int(10) unsigned NOT NULL,
  `content` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `poll_answers_poll_id_foreign` (`poll_id`),
  CONSTRAINT `poll_answers_poll_id_foreign` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`)
)

--
-- Table structure for table `poll_votes`
--

CREATE TABLE `poll_votes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `answer_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `content` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `poll_votes_answer_id_foreign` (`answer_id`),
  KEY `poll_votes_user_id_foreign` (`user_id`),
  CONSTRAINT `poll_votes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `poll_votes_answer_id_foreign` FOREIGN KEY (`answer_id`) REFERENCES `poll_answers` (`id`)
)

--
-- Table structure for table `polls`
--

CREATE TABLE `polls` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `winwin_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `selected` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `polls_winwin_id_foreign` (`winwin_id`),
  KEY `polls_user_id_foreign` (`user_id`),
  CONSTRAINT `polls_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `polls_winwin_id_foreign` FOREIGN KEY (`winwin_id`) REFERENCES `winwins` (`id`)
)

--
-- Table structure for table `post_votes`
--

CREATE TABLE `post_votes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `positive` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `post_votes_post_id_foreign` (`post_id`),
  KEY `post_votes_user_id_foreign` (`user_id`),
  CONSTRAINT `post_votes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `post_votes_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
)

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reference_id` int(10) unsigned NOT NULL,
  `type` enum('WINWIN','GROUP','WW_COMMENT','USER_TESTIMONIAL','DASHBOARD') NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `title` mediumtext,
  `content` longtext NOT NULL,
  `canceled` tinyint(1) NOT NULL DEFAULT '0',
  `allow_voting` tinyint(1) NOT NULL DEFAULT '0',
  `sticky` tinyint(1) NOT NULL DEFAULT '0',
  `sticky_date` datetime DEFAULT NULL,
  `media_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `posts_user_id_foreign` (`user_id`),
  KEY `posts_media_id_foreign` (`media_id`),
  CONSTRAINT `posts_media_id_foreign` FOREIGN KEY (`media_id`) REFERENCES `medias` (`id`),
  CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

--
-- Table structure for table `sponsors`
--

CREATE TABLE `sponsors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `about` longtext,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `cover_photo` mediumtext NOT NULL,
  `photo` mediumtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `sponsors_user_id_foreign` (`user_id`),
  CONSTRAINT `sponsors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

--
-- Table structure for table `sponsors_groups`
--

CREATE TABLE `sponsors_groups` (
  `group_id` int(10) unsigned NOT NULL,
  `sponsor_id` int(10) unsigned NOT NULL,
  `moderator` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`group_id`,`sponsor_id`),
  KEY `sponsors_groups_sponsor_id_foreign` (`sponsor_id`),
  CONSTRAINT `sponsors_groups_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  CONSTRAINT `sponsors_groups_sponsor_id_foreign` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors` (`id`)
)

--
-- Table structure for table `sponsors_winwins`
--

CREATE TABLE `sponsors_winwins` (
  `sponsor_id` int(10) unsigned NOT NULL,
  `winwin_id` int(10) unsigned NOT NULL,
  `ww_message` longtext,
  `sponsor_message` longtext,
  `sponsor_text` longtext,
  `ww_accept` tinyint(1) NOT NULL DEFAULT '0',
  `sponsor_accept` tinyint(1) NOT NULL DEFAULT '0',
  `order` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`sponsor_id`,`winwin_id`),
  KEY `sponsors_winwins_winwin_id_foreign` (`winwin_id`),
  CONSTRAINT `sponsors_winwins_sponsor_id_foreign` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors` (`id`),
  CONSTRAINT `sponsors_winwins_winwin_id_foreign` FOREIGN KEY (`winwin_id`) REFERENCES `winwins` (`id`)
)

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `private` tinyint(1) NOT NULL DEFAULT '0',
  `language_code` varchar(255) NOT NULL DEFAULT 'ES',
  `email_notification` tinyint(1) NOT NULL DEFAULT '1',
  `invite_ww` tinyint(1) NOT NULL DEFAULT '1',
  `ww_to_finish` tinyint(1) NOT NULL DEFAULT '1',
  `invite_group` tinyint(1) NOT NULL DEFAULT '1',
  `not_message` tinyint(1) NOT NULL DEFAULT '0',
  `lastname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `study` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `about` longtext,
  `interests` longtext,
  `sex` enum('M','F') DEFAULT NULL,
  `cover_photo` mediumtext NOT NULL,
  `photo` mediumtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `user_details_user_id_foreign` (`user_id`),
  CONSTRAINT `user_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `google` varchar(255) DEFAULT NULL,
  `yahoo` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `last_access` datetime DEFAULT NULL,
  `canceled` tinyint(1) NOT NULL DEFAULT '0',
  `suspend` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `accept_terms` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
)

--
-- Table structure for table `winwins`
--

CREATE TABLE `winwins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `title` varchar(255) NOT NULL,
  `what_happen` varchar(500) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `what_we_do` varchar(500) NOT NULL,
  `users_amount` int(11) NOT NULL DEFAULT '2',
  `closing_date` date DEFAULT NULL,
  `scope` enum('GLOBAL','REGION','COUNTRY','STATE','CITY') NOT NULL DEFAULT 'GLOBAL',
  `region` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `image` mediumtext,
  `canceled` tinyint(1) NOT NULL DEFAULT '0',
  `emailed` tinyint(1) NOT NULL DEFAULT '0',
  `published` tinyint(1) NOT NULL DEFAULT '0',
  `selected` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `winwins_user_id_foreign` (`user_id`),
  CONSTRAINT `winwins_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)

--
-- Table structure for table `winwins_users`
--

CREATE TABLE `winwins_users` (
  `winwin_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `moderator` tinyint(1) NOT NULL DEFAULT '0',
  `process_rate` int(11) NOT NULL DEFAULT '0',
  `materialized_rate` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`winwin_id`,`user_id`),
  KEY `winwins_users_user_id_foreign` (`user_id`),
  CONSTRAINT `winwins_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `winwins_users_winwin_id_foreign` FOREIGN KEY (`winwin_id`) REFERENCES `winwins` (`id`)
)

