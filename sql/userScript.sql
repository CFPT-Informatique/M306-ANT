## ------------------------------------------------
# Author 	: Scared                               ¦
# Date 		: 31.03.2025                           ¦
# Goal 		: Create table and data for users      ¦
## ------------------------------------------------

# creat table 
CREATE TABLE Users (
    idUsr INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    isOnline BOOLEAN NOT NULL DEFAULT FALSE
);


# ADD primary key 
ALTER TABLE Users
ADD PRIMARY KEY (idUsr); 

# create test data


