# TesteApi

Projeto gerado com [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

## Servidor de desenvolvimento

Rode `ng serve` para o servidor de desenvolvimento. Navegar por `http://localhost:4200/`. Recarregamento é automático para arquivos alterados e salvos.


## Build

Rode `ng build` para gerar o build do projeto. Os artefatos do build ficam no diretório `dist/`. Use o `--prod` para marcar o build para produção.

## OBS.

Projeto forkado de https://github.com/aleloauto/front-end-test.
Com o endpoint base https://5e1f3d7d39f7a80014a5a349.mockapi.io/api/v1/.

Projeto feito em angular com angular material.

## Pontos de melhoria e discussão.

### Projeto já necessita de refatoração para:

- Componentizar data table, para ser mais viável a reutilização.

- Componentizar todos os 'detail', para ser mais viável a reutilização.

Obs. Hoje existe redundância, por não estar componentizado.


### Ponto de discussão:

- Pediu-se para uma rota para cada função, e foi feito, porém acredito que algunas casos no ponto de vista de UX, fazem o usúario traçar um caminho maior que o necessário.

- Não se sabe se era para utilizar o canActivate para fechar o caminho das rotas, fiz aberto, porém com o resolver, para que o link sempre faça as requisições.

- Existem uns pacotes e arquivos a mais pois pretendia subir no heroku, mas não vou conseguir fazer esse momento.




