use myblog;

-- show tables;

-- insert into users (username,`password`, realname) values ('lisi','123','李四');

-- select * from users;

-- select id, username from users;

-- select * from users where username = 'zhangsan'&& password = '123';

-- select * from users where username like '%zhang%';

-- select * from users where password like '%1%' order by id desc;

-- SET SQL_SAFE_UPDATES = 0;
-- update users set realname = '李四2' where username = 'lisi';

-- select * from users;

-- insert into users (username,`password`, realname) values ('liuwu','123','刘五');

-- select * from users;

-- delete from users where username = 'liuwu';

-- select * from users where state='1';

-- update users set state = '1' where username = 'lisi';

-- select * from users;

-- insert into blogs(title, content, createtime, author) values ('标题A', '内容A', 1554040396709,'zhangsan')

select * from blogs;

-- update blogs set createtime = 1554040505700 where author = 'lisi';