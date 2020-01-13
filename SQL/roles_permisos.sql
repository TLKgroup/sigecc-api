create table roles(
id_role int auto_increment,
nombre_role varchar(25),
constraint pk_id_role primary key(id_role),
constraint un_nombre_role unique(nombre_role)
);


create table usuarios(
  id_usuario int auto_increment,
  nombre_empleado varchar(50) not null,
  nombre_usuario varchar(50) not null,
  contrasena text NOT NULL,
  id_role int  not null,
  fecha_creacion datetime not null,
  creado_por varchar(30) not null,
  fecha_ultima_modificacion datetime,
  fecha_modificacion_por varchar(30),
  status varchar(1) NOT NULL DEFAULT 'A',
  CONSTRAINT id_usuario_pk primary key(id_usuario),
  CONSTRAINT nombre_usuario_un unique(nombre_usuario),
  CONSTRAINT chk_status_usuarios CHECK(status in ('A', 'I')),
  constraint fk_usuarios_roles foreign key (id_role) references roles(id_role)
);


create table modulos(
	id_modulo int auto_increment,
	nombre_modulo varchar(45),
	constraint pk_id_modulo primary key (id_modulo),
    constraint un_nombre_modulo unique(nombre_modulo)
);


create table permisos_nivel_1(
	id_permiso_nivel_1 int auto_increment,
	nombre_permiso varchar(45) not null,
	descripcion varchar(100) not null, 
  id_modulo int not null, 
	constraint pk_id_permiso primary key (id_permiso_nivel_1),
  constraint fk_id_modulo_permisos_nivel_1 foreign key (id_modulo) references modulos(id_modulo),
  constraint un_nombre_permiso unique(nombre_permiso)
);


create table permisos_nivel_2(
	id_permiso_nivel_2 int auto_increment,
	nombre_permiso varchar(45),
	descripcion varchar(100), 
    id_permiso_nivel_1 int not null,
	constraint pk_id_permiso_nivel_2 primary key (id_permiso_nivel_2),
    constraint fk_id_permiso_nivel_1_permisos_nivel_2 foreign key (id_permiso_nivel_1) references permisos_nivel_1(id_permiso_nivel_1)
);


create table modulo_permisos_role(
	id_modulo_permisos_role int auto_increment,
	id_role int not null, 
	id_modulo int not null,
  id_permiso_nivel_1 int null,
  id_permiso_nivel_2 int null,
  constraint pk_id_modulos_permisos_n_1 primary key (id_modulo_permisos_role),
  constraint fk_roles_modulos_permisos_nivel_1 foreign key (id_role) references roles(id_role),
	constraint fk_modulos_modulos_permisos_nivel_1 foreign key (id_modulo) references modulos(id_modulo),
  constraint fk_permisos_modulos_permisos_nivel_1 foreign key (id_permiso_nivel_1) references permisos_nivel_1(id_permiso_nivel_1),
	constraint fk_permisos_nivel_2_permisos_1_2 foreign key (id_permiso_nivel_2) references permisos_nivel_2(id_permiso_nivel_2)
);

insert into roles(nombre_role) values('Administrador');
select * from roles;
insert into modulos(nombre_modulo) values ('Reportes');