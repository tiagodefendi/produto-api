# Produto API

Produto API é uma técnologia desenvolvida para o gerenciamento de produtos usando Express e PostgreSQL

---

# Técnologias Usadas

![NodeJS](https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white)
<!--
![Docker](https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white)
-->

---

# Pré-Requisitos

Primeiro, para começar é preciso que você tenha instalado em sua máquinas os seguintes requesitos:

- Git

- Node.js - NPM

<!--
- Docker
-->

- PostgreSQL

- Postman

---

# Instalação

## 1º Baixar todos requisitos

Antes de começar a instalação é preciso primeiro ter todos os requisitos instalados em sua máquina:

- https://git-scm.com/

- https://nodejs.org/en

- https://www.docker.com/

- https://www.postgresql.org/

    - *https://www.pgadmin.org/*

- https://www.postman.com/

## 2º Clonar repositório com uso do ```git```

Tendo todos requisitos já instalados, a próxima etapa é clonar o repositório localmente na sua máquina:

```{shell}
git clone https://github.com/tiagodefendi/produto-api.git
```

## 3º Configurar o arquivo ```.env```

Na sequência é necessário criar um arquivo ```.env```. O modelo pode ser encontrado no arquivo ```.env.example``` localizado na raiz do projeto

Se você rodar o sistema em modo local (servidores backend e frontend na mesma máquina), apenas crie uma cópia do arquivo ```.env.example``` para ```.env```

```{shell}
cp .env.example .env
```

## 4º Preparar ambiente

Agora está no momento final da instalação, agora vamos terminar de configurar o ambiente para a api funcionar

### Acessar Clone do repositório

Primeiro acesse com o terminal a pasta clone do projeto ```./produto-api/```

```{shell}
cd produto-api
```

### Instalar dependências

Agora você deve instalar as dependências para executar o código

```{shell}
npm init
```

### Execute a API

Com tudo pronto, basta testar se deu tudo certo

```{shell}
npm start
```

Verifique se não deu nenhuma mensagem de erro, e acesse ```http://localhost:3000/produtos``` e veja se o banco de dados foi populado com a seed de exemplo

Exemplo de resultado esperado:

```
[
    {
        "id":1,
        "description":"Maçã",
        "price":"999.99",
        "quantity":2,
        "date":"2024-10-23T03:00:00.000Z"
    },
    {
        "id":2,
        "description":"Batata",
        "price":"1.99","quantity":33,
        "date":"2024-10-11T03:00:00.000Z"
    },
    {
        "id":3,"description":"Bornia",
        "price":"0.01",
        "quantity":1,
        "date":"2024-09-12T03:00:00.000Z"
    }
]
```

Ou ainda em ```http://localhost:3000/products/3```

```
{
    "id":3,
    "description":"Bornia",
    "price":"0.01",
    "quantity":1,
    "date":"2024-09-12T03:00:00.000Z"
}
```

---

# Contado

> Qualquer dúvida entrar em contado:
> https://mailto:tiagodefendidasilva@gmail.com/
