insert into usuario (userName, email, password, sexo,fechaNac ) values
    ('joe', 'e@mail.com','postgrs','10/10/2002','var'),
    ("jasmin", "jas@mail.com","postgrs","01/04/2019","mujer"),
    ("Flor", "Love@mail.com","postgrs","25/12/2002",'mujer');


insert into usuario (userName, email, password, sexo, fechaNac) values
    ('joe1', '1e@mail.com','postgrs','var','10/10/2002'),
    ('joe2', 'e1@mail.com','postgrs','var','10/10/2002'),
    ('joe3', 'e3@mail.com','postgrs','muer','10/10/2002'),
    ('Flor', 'diosa@mail.com','postgrs','muer','10/10/2002'),
    ('rubia', 'diosa@mail.','postgrs','muer','10/10/2002');
borrar tabla 

drop table registrado, administrador, casos;
drop table usuario;