DROP TABLE a;
DROP TABLE b;
DROP TABLE c;

CREATE TABLE a (a_id TEXT, b_id TEXT, attr TEXT);
CREATE TABLE b (b_id TEXT, c_id TEXT, attr TEXT);
CREATE TABLE c (c_id TEXT, attr TEXT);

INSERT INTO a VALUES ('a1', 'b1', 'la la la la la');
INSERT INTO a VALUES ('a2', 'b2', 'la la la la la');
INSERT INTO a VALUES ('a3', 'b3', 'la la la la la');

INSERT INTO b VALUES ('b1', 'c10', 'de de de de de');
INSERT INTO b VALUES ('b2', 'c20', 'de de de de de');
INSERT INTO b VALUES ('b3', '', 'de de de de de');

INSERT INTO c VALUES ('c10', 'da da da da da');
INSERT INTO c VALUES ('c20', 'da da da da da');

CREATE VIEW doc AS
SELECT a.attr AS aa, b.attr AS ba, c.attr AS ca
FROM   a
LEFT JOIN b ON b.b_id = a.b_id
LEFT OUTER JOIN c ON c.c_id = b.c_id;
