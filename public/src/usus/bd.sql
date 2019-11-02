CREATE TABLE ROL (
  ROL_ID VARCHAR(255) PRIMARY KEY,
  ROL_DESCRIPCION VARCHAR(255) NOT NULL
)
CHARSET = utf8
COLLATE = utf8_spanish_ci
ENGINE = InnoDB;
CREATE TABLE IMAGEN (
  IMG_ID INTEGER PRIMARY KEY AUTO_INCREMENT,
  IMG_VERSION INTEGER,
  IMG_BYTES LONGBLOB NOT NULL
)
CHARSET = utf8
COLLATE = utf8_spanish_ci
ENGINE = InnoDB;
CREATE TABLE USUARIO (
  USU_CUE VARCHAR(255),
  USU_VERSION INTEGER,
  IMG_ID INTEGER,
  USU_MATCH VARCHAR(255) NOT NULL,
  USU_NOMBRE VARCHAR(255) NOT NULL,
  PAS_ID INTEGER,
  CONSTRAINT USU_UNK_NOMBRE UNIQUE (USU_NOMBRE),
  CONSTRAINT USU_PK PRIMARY KEY (USU_CUE),
  CONSTRAINT USU_IMG_FK FOREIGN KEY (IMG_ID) REFERENCES IMAGEN (IMG_ID),
  CONSTRAINT USU_PAS_FK FOREIGN KEY (PAS_ID) REFERENCES PASATIEMPO (PAS_ID)
)
CHARSET = utf8
COLLATE = utf8_spanish_ci
ENGINE = InnoDB;
CREATE TABLE USUARIO_ROL (
  USU_CUE VARCHAR(255) NOT NULL,
  ROL_ID VARCHAR(255) NOT NULL,
  CONSTRAINT URL_PK PRIMARY KEY (USU_CUE, ROL_ID),
  CONSTRAINT URL_USU_PK FOREIGN KEY (USU_CUE) REFERENCES USUARIO (USU_CUE),
  CONSTRAINT URL_ROL_PK FOREIGN KEY (ROL_ID) REFERENCES ROL (ROL_ID)
)
CHARSET = utf8
COLLATE = utf8_spanish_ci
ENGINE = InnoDB;
INSERT INTO PASATIEMPO (PAS_NOMBRE) VALUES ('Patinar'), ('Nadar'),('Bailar');
INSERT INTO ROL (ROL_ID,ROL_DESCRIPCION) VALUES
  ('Administrador', 'Administra el sistema.'),
  ('Cliente', 'Hace cosas.'),
  ('Invitado', 'No hace nada.');
INSERT INTO USUARIO (USU_CUE,USU_NOMBRE,USU_MATCH) VALUES
  ('pedro','Pedro', SHA2('lobo', 256)),
  ('pepito','Pepe', SHA2('cuentos', 256));
INSERT INTO USUARIO_ROL (USU_CUE,ROL_ID) VALUES
  ('pedro', 'Administrador'), ('pepito', 'Invitado');