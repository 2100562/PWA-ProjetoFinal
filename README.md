# Programação Web Avançada 2024

## Projeto Final - Plataforma de Questionários

### Iniciar Componentes:

Frontend:

```sh
$ npm run frontend:dev
```

Backend:

```sh
$ docker compose up -d
$ npm run backend:dev
```

### Utilizadores de teste pré-carregados (user/password)
Formador : lecturer/lecturer

Aluno: student/student

### Desenvolvimento:

Lint:

```sh
$ npm run lint
```

Testes unitários:

```sh
$ nx run-many -t test --all
```

Testes de integração:

```sh
$ nx run-many -t e2e --all
```

Format + Lint + Testes:

```sh
$ npm run all
```
