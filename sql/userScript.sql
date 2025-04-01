## ------------------------------------------------
# Author 	: Scared                               ¦
# Date 		: 31.03.2025                           ¦
# Goal 		: Create table and test data for users ¦
## ------------------------------------------------

# Drop table if it already exists
DROP TABLE IF EXISTS Users;

# Create Users table
CREATE TABLE Users (
    idUsr INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    isOnline BOOLEAN NOT NULL DEFAULT FALSE
);

# Insert test data
