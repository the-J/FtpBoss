FtpBoss
=========

Current state - unstable. 
I'll need to rebuild main process network handling to use native node.net and remove easy-ftp package. 

Simple program for handling ftp servers. 
* electron
* cra + redux
* semantic + styled-components

#### App remembers provided settings
![settings](readme-src/settings.png)

#### Main window
![main](readme-src/main.png)

#### Create directory on server
![mk dir](readme-src/mkdir.png)

#### Delete dir or file
![confirm delete](readme-src/confirmdelete.png)

#### Upload files or whole directories
![upload](readme-src/upload.png)
 
 ##### TODO
 There are some small things that need to be added: 
 * hashing stored password
 * upload status notifier
 * storing multiple ftp credentials
