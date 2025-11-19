-- Users data
INSERT IGNORE INTO user (id, user, password, role, created_at) VALUES
('user1_uuid', 'john_doe', 'password123', 'USER', '2025-01-15'),
('user2_uuid', 'jane_smith', 'securepass', 'USER', '2025-02-20'),
('user3_uuid', 'admin_user', 'admin123', 'ADMIN', '2025-03-10'),
('user4_uuid', 'bob_wilson', 'bobpass456', 'USER', '2025-04-05'),
('user5_uuid', 'alice_jones', 'alicepass789', 'USER', '2025-05-12'),
('user6_uuid', 'charlie_brown', 'charliepass', 'USER', '2025-06-18');

-- Authors data
INSERT IGNORE INTO author (id, name) VALUES
('author1_uuid', 'Akira Toriyama'),
('author2_uuid', 'Masashi Kishimoto'),
('author3_uuid', 'Eiichiro Oda'),
('author4_uuid', 'Naoko Takeuchi'),
('author5_uuid', 'Kentaro Miura'),
('author6_uuid', 'Junji Ito'),
('author7_uuid', 'Hiromu Arakawa');

-- Manga data
INSERT IGNORE INTO manga (id, title, description, banner, status, poster, count_view, author_id, created_at, updated_at) VALUES
('manga1_uuid', 'Dragon Ball', 'The adventures of Goku', 'dragon_ball_banner.jpg', 'completed', 'dragon_ball_poster.jpg', 1000000, 'author1_uuid', '2025-01-10', '2025-10-20 14:30:00'),
('manga2_uuid', 'Naruto', 'Ninja adventure', 'naruto_banner.jpg', 'completed', 'naruto_poster.jpg', 950000, 'author2_uuid', '2025-01-15', '2025-10-21 15:45:00'),
('manga3_uuid', 'One Piece', 'Pirate adventure', 'one_piece_banner.jpg', 'ongoing', 'one_piece_poster.jpg', 1200000, 'author3_uuid', '2025-01-20', '2025-10-22 16:30:00'),
('manga4_uuid', 'Sailor Moon', 'Magical girl', 'sailor_moon_banner.jpg', 'completed', 'sailor_moon_poster.jpg', 800000, 'author4_uuid', '2025-02-01', '2025-10-23 12:15:00'),
('manga5_uuid', 'Berserk', 'Dark fantasy', 'berserk_banner.jpg', 'ongoing', 'berserk_poster.jpg', 600000, 'author5_uuid', '2025-02-10', '2025-10-24 13:20:00'),
('manga6_uuid', 'Uzumaki', 'Horror spiral', 'uzumaki_banner.jpg', 'completed', 'uzumaki_poster.jpg', 400000, 'author6_uuid', '2025-03-05', '2025-10-25 11:10:00'),
('manga7_uuid', 'Fullmetal Alchemist', 'Alchemy adventure', 'fma_banner.jpg', 'completed', 'fma_poster.jpg', 850000, 'author7_uuid', '2025-03-15', '2025-10-26 17:25:00');

-- Follow data
INSERT IGNORE INTO follow (id, user_id, manga_id, created_at, updated_at) VALUES
('follow1_uuid', 'user1_uuid', 'manga1_uuid', '2025-01-20 10:00:00', '2025-10-20 10:00:00'),
('follow2_uuid', 'user1_uuid', 'manga2_uuid', '2025-01-22 11:30:00', '2025-10-21 11:30:00'),
('follow3_uuid', 'user2_uuid', 'manga3_uuid', '2025-02-25 12:15:00', '2025-10-22 12:15:00'),
('follow4_uuid', 'user3_uuid', 'manga4_uuid', '2025-03-12 13:45:00', '2025-10-23 13:45:00'),
('follow5_uuid', 'user4_uuid', 'manga5_uuid', '2025-04-08 14:20:00', '2025-10-24 14:20:00'),
('follow6_uuid', 'user5_uuid', 'manga1_uuid', '2025-05-15 15:30:00', '2025-10-20 15:30:00');