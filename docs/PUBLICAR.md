# Preparação para GitHub e LinkedIn

Nome sugerido do repositório: `chamado-claro`.
Descrição em inglês: `React and TypeScript support request form with keyboard navigation, actionable validation and tested focus management.`
Topics sugeridos: `react`, `typescript`, `accessibility`, `forms`, `frontend`, `playwright`, `portfolio`.

1. Extraia o ZIP. Mantenha os arquivos na raiz da pasta chamado-claro.
2. Rode instalação, testes e build conforme README.md.
3. Crie um repositório vazio no seu GitHub. Escolha a visibilidade conscientemente. Não envie node_modules, dist, .env ou test-results.
4. Na pasta do projeto:

```bash
git init
git add .
git commit -m "feat: add support request form with accessible error recovery"
git branch -M main
```

5. Copie do GitHub o comando `git remote add origin ...` do repositório que você realmente criou. Execute-o e depois `git push -u origin main`.
6. Confira o README, as imagens e a execução do Actions. O workflow está preparado, mas ainda não rodou no GitHub.
7. No LinkedIn, anexe o MP4 e cole o texto revisado. Inclua o endereço real do repositório.

O GitHub pode oferecer o MP4 como download em vez de reprodução dentro do README. Anexar o vídeo diretamente à publicação do LinkedIn evita depender desse comportamento.

Publicar no GitHub ou fazer um deploy não foi realizado nesta entrega. A aplicação é estática: um eventual deploy usa `npm run build` e a pasta `dist`, sem variáveis secretas. O fluxo continua sendo apenas uma simulação.
