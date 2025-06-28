# Tutorial para Rodar a Aplicação Atlantis

## Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** versão 16 ou superior.
- **NPM** versão 8 ou superior.

## Passo 1: Instalar as Dependências

### Dependências Globais
Abra um terminal na raiz do projeto e execute:
```bash
npm install
```
Este comando instalará a dependência `concurrently` utilizada para executar múltiplos processos simultaneamente.

### Dependências do Servidor
Navegue até a pasta `server` e instale as dependências:
```bash
cd server
npm install
```

### Dependências do Front-end
Navegue até a pasta `web` e instale as dependências:
```bash
cd web
npm install
```

## Passo 2: Executar o Projeto

### Executar Server e Front-end em Paralelo
Para rodar o servidor e o front-end simultaneamente, volte para a raiz do projeto e execute o seguinte comando:
```bash
npm run start:all
```
Este comando utiliza o pacote `concurrently` para iniciar tanto o servidor quanto o front-end.

### Executar Individualmente
#### Servidor
Navegue até a pasta `server` e execute:
```bash
npm start
```
#### Front-end
Navegue até a pasta `web` e execute:
```bash
npm run dev
```

Pronto! Sua aplicação estará rodando e acessível via navegador ou conforme instruções adicionais do projeto.

## Observações

Certifique-se de que as portas padrão utilizadas (por exemplo, 3000 para o front-end e 3333 para o servidor) estejam livres no seu sistema.

Se ocorrerem erros, verifique as versões de Node.js e NPM instaladas em seu sistema.

Boa sorte e aproveite a aplicação!
