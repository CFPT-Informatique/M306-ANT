## ------------------------------------------------
# Author 	: Scared                               ¦
# Date 		: 31.03.2025                           ¦
# Goal 		: Create table and data for messages   ¦
## ------------------------------------------------

# Drop table if it already exists
DROP TABLE IF EXISTS Messages;

# Create Table 

CREATE TABLE Messages (
    msgId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    msg TEXT NOT NULL,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INT NOT NULL,
    channelId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(idUsr),
    FOREIGN KEY (channelId) REFERENCES Channel(chl_id) ON DELETE CASCADE
);
