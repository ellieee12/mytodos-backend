create table mytodos_user (
    user_id serial primary key,
    first_name text not null,
    last_name text,
    email text not null,
    pwd text not null
);

create table mytodos_task (
    task_id serial,
    name text not null,
    done boolean,
    user_id integer not null references mytodos_user(user_id) on delete cascade,
    primary key (task_id,user_id)
);