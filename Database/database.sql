CREATE TABLE usuario( 
        username VARCHAR (50) NOT NULL unique,
        email VARCHAR (70) NOT NULL unique,
        password VARCHAR (50) NOT NULL,
        sexo VARCHAR (10) NOT NULL,
        fechaActual timestamp default current_date,
        fechaNac DATE NOT NULL,
        id serial NOT NULL,
        PRIMARY KEY (id)
);

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
