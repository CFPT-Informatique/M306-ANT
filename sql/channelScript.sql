## --------------------------------------------------
# Author 	: Scared                                 ¦
# Date 		: 31.03.2025                             ¦
# Goal 		: Create Table and Data Test for Channel ¦
## --------------------------------------------------

# Create Table 
CREATE TABLE Channel (
    chl_id int NOT NULL AUTO_INCREMENT,
    name varchar(20) NOT NULL,
   	isOnline bool NOT NULL,
   	usersId int NOT NULL
); 

# ADD primary key
ALTER TABLE Users
ADD PRIMARY KEY (chl_id);

# ADD Foreign key for usersId
ALTER TABLE Users
ADD CONSTRAINT fk_user FOREIGN KEY (usersId) REFERENCES Users(idUsr);




