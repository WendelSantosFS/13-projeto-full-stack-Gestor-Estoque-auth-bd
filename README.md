<pre>

RESUMO: SPA Gestor de Estoque com Autenticação JWT e persistência com o SGBD PostgreSQL
	Linguagens: React + Node.js( Express) + PostgreSQL




SCRIPTS SQL:
    1- CREATE TABLE IF NOT EXISTS users (    NOME & SENHA
	    id SERIAL PRIMARY KEY,
	    nome VARCHAR(150) NOT NULL,
	    senha TEXT NOT NULL
    );


    2- CREATE TABLE IF NOT EXISTS admins (    NOME & SENHA & CARGO
	    id SERIAL PRIMARY KEY,
	    nome VARCHAR(150) NOT NULL,
	    senha TEXT NOT NULL,
	    cargo VARCHAR(10) NOT NULL
    );

    3- CREATE TABLE IF NOT EXISTS produtos ( 
		id SERIAL PRIMARY KEY,
		nome VARCHAR(255) NOT NULL,
		preco DECIMAL(10,2) NOT NULL,
		foto TEXT,
		categoria VARCHAR(100) NOT NULL,

		criado DATE DEFAULT CURRENT_DATE NOT NULL,
		alterado DATE DEFAULT CURRENT_DATE NOT NULL,

		+ query (ALTER TABLE produtos ADD COLUMN quantidade INTEGER);

		++++ ADICIONADO CAMPO COM RELACIONAMENTO: todo produto terá a COLUNA de "user_id" que diz qual USUÁRIO o criou. 
		+ query (ALTER TABLE produtos ADD COLUMN user_id INT NOT NULL;)
		+ query (ALTER TABLE produtos ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id);)
	);




PRÓXIMOS PASSOS:
	° colocar relacionamentos entre tabelas para que cada usário tenha seus próprios produtos, separadamente.
	° utilizar o REACT-QUERY( TanStack) para ESTADO GLOBAL de informações ASSÍNCRONAS.
	°



MELHORIA
	1- tornar a coluna "nome" como UNIQUE


<pre>