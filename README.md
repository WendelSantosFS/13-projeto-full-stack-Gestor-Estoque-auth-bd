<pre>
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

    


<pre>