## --------------------------------------------------
# Author 	: Scared                                 ¦
# Date 		: 31.03.2025                             ¦
# Goal 		: Create table and test data for Channel ¦
## --------------------------------------------------

# Drop table if it already exists
DROP TABLE IF EXISTS Channel;

# Create Table 
CREATE TABLE Channel (
    chl_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    isOnline BOOLEAN NOT NULL,
    usersId INT NOT NULL,
    FOREIGN KEY (usersId) REFERENCES Users(idUsr)
);
