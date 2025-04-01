## ------------------------------------------------
# Author 	: Scared                               ¦
# Date 		: 31.03.2025                           ¦
# Goal 		: Create table and data for messages   ¦
## ------------------------------------------------

# Create table 
CREATE TABLE Messages (
    msgId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    msg TEXT NOT NULL,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INT NOT NULL,
    channelId INT NOT NULL
);

# ADD primary key
ALTER TABLE Messages
ADD PRIMARY KEY (msgId); 

# ADD foreign key for userId
ALTER TABLE Messages
ADD CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES Users(idUsr);

# ADD foreign key for channelId with delet on cascade
ALTER TABLE Messages
ADD CONSTRAINT fk_channel FOREIGN KEY (channelId) REFERENCES Channel(chl_id) ON DELETE CASCADE;