# saml-sample-nodejs

Uma simples demonstração de um server Node.js usando [Express 4](http://expressjs.com/) e [passport-saml](http://www.passportjs.org/packages/passport-saml/) para autenticação SAML2.

## Pré-requisitos

Tenha certeza que possui o [Node.js](http://nodejs.org/) instalado.

## Clonar o repositório

```sh
git clone git@github.com:eBZtec/saml-sample-nodejs.git # or clone your own fork
cd saml-sample-nodejs
npm install
```

## Configurando variáveis de ambiente

Antes de executar o server, deve-se configurar:

```
SESSION_TOKEN=<STRING APENAS PARA A SESSÃO>

SSO_ENTRYPOINT=<URL PARA AUTENTICAÇÃO NO IDP>
SSO_ISSUER=< IDENTIFICADOR DO SERVICE PROVIDER>
SSO_CALLBACK_URL=<URL QUE RECEBERÁ OS DADOS DO USUÁRIO AUTENTICADO>
SSO_CERT=<CERTIFICADO PUBLICO DO IDENTITY PROVIDER>
```

Para executar localmente, crie um arquivo .env na raíz do projeto com estas variáveis preenchidas.

## Executando a aplicação

Para subir a aplicação execute:

```sh
npm dev
```

## Gerando o metadata do Service Provider

Abra o link [http://localhost:3000/user/v1/metadata](http://localhost:3000/user/v1/metadata) e salve o XML, envie o XML para a equipe responsável pela configuração do IdP. 

Este metadata reperesenta o Service Provider e serve para que o IdP entenda quem é o Service provider que está solicitando autenticação e para onde deve-se retornar os dados autenticados.

## Testando a autenticação

Após a configuração do metadata no IdP, pode-se testar a autenticação através do link [http://localhost:3000/user/v1/login/sso](http://localhost:3000/user/v1/login/sso)