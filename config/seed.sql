insert into mytodos_user (user_id,first_name,last_name,email,pwd) values (0,'john','doe','johndoe@gmail.com','john_doe');
insert into mytodos_user (user_id,first_name,last_name,email,pwd) values (1,'jane','doe','janedoe@gmail.com','jane_doe');

insert into mytodos_task ("name",done,user_id) values ('Wake up',true,0);
insert into mytodos_task ("name",done,user_id) values ('Meditate',false,1);
insert into mytodos_task ("name",done,user_id) values ('Brush teeth',false,0);
