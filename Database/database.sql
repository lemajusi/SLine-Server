CREATE TABLE usuario( 
        id serial NOT NULL,
        username VARCHAR (50) NOT NULL unique,
        email VARCHAR (70) NOT NULL unique,
        password VARCHAR (50) NOT NULL,
        sexo VARCHAR (10) NOT NULL,
        fechaNac DATE default current_date,
        PRIMARY KEY (id)
);

alter table usuario 
CREATE TABLE registrado(
    idUsuario INT NOT NULL,
    PRIMARY KEY (idUsuario),
    FOREIGN KEY (idUsuario) REFERENCES usuario (id)
);

CREATE TABLE administrador(
	idUsuario INT NOT NULL,
            PRIMARY KEY (idUsuario),
	FOREIGN KEY (idUsuario) REFERENCES usuario (id)
);
CREATE TABLE casos(
    idCaso SERIAL NOT NULL,
    coordenadas json NOT NULL,
    titulo varchar(60) not null,
    descripcion TEXT NOT NULl,
    idUsuario INT NOT NULL,
    PRIMARY KEY (idCaso),
    FOREIGN KEY (idUsuario) REFERENCES usuario (id)
);
