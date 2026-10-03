-- BANCO DE DADOS
CREATE DATABASE IronClubDB;
GO

USE IronClubDB;
GO

-- TABELA USUARIO
CREATE TABLE Usuario (
	id_usuario INT IDENTITY(1,1) PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(150) NOT NULL UNIQUE, 
	senha VARCHAR(255) NOT NULL,
	tipo_usuario VARCHAR(200) NOT NULL,
	objetivo_fisico VARCHAR(200) NULL
);
GO

-- TABELA TREINO
CREATE TABLE Treino (
	id_treino INT IDENTITY(1,1) PRIMARY KEY,
	id_usuario INT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	grupo_muscular VARCHAR(100) NOT NULL,

	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
GO

-- TABELA EXERCICIO
CREATE TABLE Exercicio (
	id_exercicio INT IDENTITY(1,1) PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	grupo_muscular VARCHAR(100) NOT NULL
);
GO

-- TABELA TREINO_EXERCICIO
CREATE TABLE Treino_Exercicio (
	id_treino_exercicio INT IDENTITY(1,1) PRIMARY KEY,
	id_treino INT NOT NULL,
	id_exercicio INT NOT NULL,
	series INT NOT NULL,
	repeticoes INT NOT NULL,
	descanso INT NOT NULL,

	FOREIGN KEY (id_treino) REFERENCES Treino(id_treino),
	FOREIGN KEY (id_exercicio) REFERENCES Exercicio(id_exercicio)
);
GO

-- TABELA PRODUTO
CREATE TABLE Produto (
	id_produto INT IDENTITY(1,1) PRIMARY KEY,
	nome VARCHAR(100) NOT NULL,
	categoria VARCHAR(100) NOT NULL,
	preco DECIMAL(10,2) NOT NULL,
	estoque INT NOT NULL
);
GO

-- TABELA PEDIDO
CREATE TABLE Pedido (
	id_pedido INT IDENTITY(1,1) PRIMARY KEY,
	id_usuario INT NOT NULL,
	data_pedido DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
	forma_entrega VARCHAR(50) NOT NULL,

	FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);
GO

-- TABELA ITEM_PEDIDO
CREATE TABLE Item_Pedido (
	id_item_pedido INT IDENTITY(1,1) PRIMARY KEY,
	id_pedido INT NOT NULL,
	id_produto INT NOT NULL,
	quantidade INT NOT NULL,
	valor_unitario DECIMAL(10,2) NOT NULL,

	FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido),
	FOREIGN KEY (id_produto) REFERENCES Produto(id_produto)
);
GO