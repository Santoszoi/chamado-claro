# Roteiro de cinco dias — Chamado Claro

## Dia 1 — Entender o problema e executar (45–60 min)
- Instale Node 24, extraia o ZIP e rode `npm ci` e `npm run dev`.
- Faça um envio vazio, corrija os erros e conclua uma simulação.
- Leia `src/validation.ts` e identifique os campos obrigatórios.
- Entrega: explique em um minuto por que manter os dados após uma falha é importante.

## Dia 2 — Validação e TypeScript (60–90 min)
- Estude `TicketInput`, `Field`, `Errors` e a diferença entre validar e normalizar.
- Execute `npm test` e observe os limites de 20 e 1.000 caracteres da descrição.
- Experimento: altere uma regra e seu teste, execute e depois restaure ambos.
- Pergunta de entrevista: por que validar no frontend não dispensa validação no backend?

## Dia 3 — Teclado e acessibilidade (60–90 min)
- Comece no topo com Tab. Acione “Pular para o conteúdo” e preencha sem mouse.
- Provoque erros, ative um link do resumo e observe o campo que recebe foco.
- Inspecione label, aria-describedby, aria-invalid, fieldset e legend.
- Se disponível, teste NVDA ou VoiceOver e anote o que foi anunciado. Não declare conformidade apenas com axe.
- Entrega: checklist com navegador, tecnologia assistiva, comportamento e dúvidas.

## Dia 4 — Testes e limites (60–90 min)
- Rode `npm run build`, instale Chromium e execute `npm run test:e2e`.
- Leia o teste de envio completo por teclado e o de renderização de texto.
- Teste manualmente zoom de 200% e 400%, orientação e alto contraste; registre resultados reais.
- Leia o relatório: o problema de overflow em 320 px foi encontrado e corrigido.
- Pergunta de entrevista: que falhas esses testes não conseguem detectar?

## Dia 5 — Apresentar e publicar (45–60 min)
- Explique o fluxo, as decisões e os limites sem ler o código.
- Revise o README em inglês e assista ao vídeo.
- Publique somente quando entender e conseguir reproduzir o resultado. Siga PUBLICAR.md.
- Use o texto de LINKEDIN.md e ajuste à sua própria experiência de estudo.
- Não invente métricas, usuários reais, certificação de acessibilidade ou histórico de trabalho.

## Pitch técnico sugerido
“Chamado Claro é um estudo de formulário em React e TypeScript. A validação fica em uma função pura. Quando o envio falha, preservo os dados e movo o foco para um resumo com links para os campos. No sucesso, o foco vai para a confirmação. Testei regras de negócio, navegação por teclado e alguns critérios automáticos de acessibilidade. Não há backend; leitores de tela ainda precisam de validação manual.”
