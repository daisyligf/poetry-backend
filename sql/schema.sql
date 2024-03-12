CREATE TABLE `poetry_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT NULL,
  `dynasty` varchar(64) DEFAULT NULL,
  `author` varchar(256) DEFAULT NULL,
  `period` varchar(64) DEFAULT NULL,
  `prolog` varchar(256) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `poetry_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `poetry_meta_id` int(11) DEFAULT NULL,
  `seq` int(11) DEFAULT NULL,
  `content` varchar(256) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


