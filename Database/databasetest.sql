insert into users (username, email, password, sexo, fechaNac) values
    ('joe1', '1e@mail.com','postgrs','var','10/10/2002'),
    ('joe2', 'e1@mail.com','postgrs','var','10/10/2002'),
    ('joe3', 'e3@mail.com','postgrs','muer','10/10/2002'),
    ('Flor', 'diosa@mail.com','postgrs','muer','10/10/2002'),
    ('rubia', 'diosa@mail.','postgrs','muer','10/10/2002');

insert into casos(coordenadas, titulo, descripcion, idUsuario) values 
    ('{"41°24'12.2", "2°10'26.5"}', 'tutulo', 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).', 10);
