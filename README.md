## Projeto de Micro Serviços (Cadastro Positivo)

* Utilizando - Node.js - Express - MongoDB

* Integrantes:

    - Bruno Nogueira
    - João Victor Alves
    - Matheus Guedes
    - Palloma Lobo

## Requisitos para execução

* Node.js instalado.
* MongoDB instalado e executando.

## MongoDB

* Executando o Mongo (digitar no prompt)

    `mongod`

* Necessário na primeira execução (digitar no prompt)

    `mkdir c:\\data\db`
    
* Criando o banco (executar apenas na primeira vez)
 
    `mongo`
    
    `use db_emprestimo`

## NPM

* Instalando as dependencias

    `npm install`

* Executando o projeto

    `npm run dev`

## Executando Serviços via Postman

* Consultar Cadastro Pessoa por CPF (GET)

    http://localhost:3000/api/cadastro-positivo/pessoa/92385830213
        
* Criando novo Cadastro (POST)

    http://localhost:3000/api/cadastro-positivo/pessoa

    {
       "nome":"Maria da Silva",
       "sexo":"FEMININO",
       "cpf":"098767834",
       "nascimento":"1992-11-20",
       "profissao":"advogada",
       "salario":1800.00
    }

* Criando Alerta para o CPF (POST)

    http://localhost:3000/api/cadastro-positivo/pessoa/92385830213/alerta

* Negativando um  CPF (POST)

    http://localhost:3000/api/cadastro-positivo/pessoa/92385830213/negativa