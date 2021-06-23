INSERT INTO users(first_name, surname, email, password)
VALUES ('James', 'Bond', 'bondjames@gmail.com', 'spy1234');

INSERT INTO users(first_name, surname, email, password)
VALUES ('Donald', 'Duck', 'donaldduck@gmail.com', 'daisy1234');

INSERT INTO users(first_name, surname, email, password)
VALUES ('Mickey', 'Mouse', 'mickeymouse@gmail.com', 'minnie156234');

INSERT INTO schedules(user_id, day, start_at, end_at)
VALUES (1, 4, '1000', '1330');

INSERT INTO schedules(user_id, day, start_at, end_at)
VALUES (1, 3, '0230', '0530');

INSERT INTO schedules(user_id, day, start_at, end_at)
VALUES (0, 1, '0930', '1200');