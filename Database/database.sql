CREATE TABLE users( 
        username VARCHAR (50) NOT NULL unique,
        email VARCHAR (70) NOT NULL unique,
        password VARCHAR (50) NOT NULL,
        sexo VARCHAR (10) NOT NULL,
        fechaRegistro timestamp DEFAULT current_date,
        fechaNac DATE NOT NULL,
        rol VARCHAR(15) DEFAULT 'simple',
        id serial NOT NULL,
        PRIMARY KEY (id)
);

CREATE TABLE casos(
    coordenadas json NOT NULL,
    titulo varchar(60) not null,
    descripcion TEXT,
    idUsuario INT NOT NULL,
    idCaso SERIAL NOT NULL,
    PRIMARY KEY (idCaso),
    FOREIGN KEY (idUsuario) REFERENCES users (id)
);
