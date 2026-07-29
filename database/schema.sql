-- Dream More Platform - AppWorks Database Schema
-- Database: `dreammore_db`

CREATE DATABASE IF NOT EXISTS `dreammore_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `dreammore_db`;

-- 1. Users Table (Shared dependency table)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `role` ENUM('student', 'teacher', 'employer', 'freelancer', 'admin') NOT NULL DEFAULT 'freelancer',
  `avatar` VARCHAR(255) DEFAULT NULL,
  `title` VARCHAR(150) DEFAULT NULL,
  `bio` TEXT DEFAULT NULL,
  `rating` DECIMAL(3,2) DEFAULT 5.00,
  `completed_jobs` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Jobs Table (AppWorks Marketplace)
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `employer_id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `category` ENUM('Technology', 'Creative', 'Engineering', 'Business') NOT NULL,
  `budget` DECIMAL(10,2) NOT NULL,
  `deadline` DATE NOT NULL,
  `status` ENUM('open', 'in_progress', 'completed', 'cancelled') DEFAULT 'open',
  `proposals_count` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`employer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Proposals Table (Submitted by Freelancers)
CREATE TABLE IF NOT EXISTS `proposals` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `job_id` INT NOT NULL,
  `freelancer_id` INT NOT NULL,
  `proposal_text` TEXT NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `delivery_days` INT NOT NULL DEFAULT 7,
  `status` ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`freelancer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Reviews Table
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `job_id` INT NOT NULL,
  `reviewer_id` INT NOT NULL,
  `reviewee_id` INT NOT NULL,
  `rating` INT NOT NULL CHECK (`rating` >= 1 AND `rating` <= 5),
  `comment` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`job_id`) REFERENCES `jobs`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`reviewer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`reviewee_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- SEED MOCK DATA --
INSERT INTO `users` (`id`, `name`, `email`, `role`, `title`, `bio`, `rating`, `completed_jobs`) VALUES
(1, 'TechCorp Ethiopia', 'hr@techcorp.et', 'employer', 'Enterprise Software Solutions', 'Leading software development firm in Addis Ababa.', 4.9, 12),
(2, 'Ethio-Creative Studio', 'contact@ethiocreative.com', 'employer', 'Media & Branding Agency', 'Top tier branding agency.', 4.8, 8),
(3, 'Tilahun Abebe', 'tilahun@example.com', 'freelancer', 'Full-Stack Developer', 'Experienced React 19 and PHP REST API Specialist.', 4.95, 15),
(4, 'Selamawit Kassa', 'selam@example.com', 'freelancer', 'UI/UX & Graphics Designer', 'Creative UI designer with Figma & Tailwind expertise.', 5.0, 9);

INSERT INTO `jobs` (`id`, `employer_id`, `title`, `description`, `category`, `budget`, `deadline`, `status`, `proposals_count`) VALUES
(1, 1, 'Build E-Learning Dashboard in React & PHP API', 'We are looking for a developer to implement an interactive LMS dashboard with React 19, Tailwind CSS, and REST API integration.', 'Technology', 1200.00, '2026-08-15', 'open', 3),
(2, 2, 'Brand Identity & Logo Redesign for Dream More', 'Redesign logo and corporate identity materials. Need SVG icons, color palettes, and mobile splash designs.', 'Creative', 450.00, '2026-08-10', 'open', 2),
(3, 1, '3D Mechanical Model Simulation in SolidWorks', 'Need a CAD expert for stress analysis and 3D modeling of a mechanical gear prototype.', 'Engineering', 800.00, '2026-08-20', 'open', 1),
(4, 2, 'Digital Marketing & Social Media Campaign Strategy', 'Execute a 1-month marketing campaign for online platform launch targeting tech graduates in Ethiopia.', 'Business', 600.00, '2026-08-25', 'open', 4);

INSERT INTO `proposals` (`id`, `job_id`, `freelancer_id`, `proposal_text`, `amount`, `delivery_days`, `status`) VALUES
(1, 1, 3, 'I can build this React 19 dashboard within 5 days with clean component architecture and responsive CSS.', 1100.00, 5, 'accepted'),
(2, 2, 4, 'I specialize in branding and SVG design. Check my portfolio for past Ethiopian brand identities.', 400.00, 3, 'pending');
