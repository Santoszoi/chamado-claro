# Publicação pronta para revisar

Um formulário deve ajudar a corrigir um erro sem obrigar a pessoa a começar de novo.

O Chamado Claro é um novo estudo de interface do meu portfólio em React e TypeScript, focado na abertura de chamados e na recuperação de erros.

Quando o envio está incompleto:
• Os dados digitados são preservados.
• O foco vai para um resumo dos erros.
• Cada erro tem um link para o campo correspondente.
• A confirmação recebe foco após o preenchimento válido.

A validação incluiu 8 testes de regras de negócio e 5 testes de navegador. Um deles encontrou rolagem horizontal em 320 px; o cabeçalho foi ajustado e o teste passou.

Também foi executada uma checagem automática de acessibilidade nos estados inicial, de erro e de confirmação. Ela não substitui testes com leitores de tela e usuários, que seguem como próximos passos.

O vídeo mostra a interface real e a conclusão do preenchimento usando o teclado. É uma demonstração com dados fictícios, sem abertura de atendimento real.

#React #TypeScript #Acessibilidade #Frontend

---

## Antes de publicar
- Estude e execute o projeto para poder explicar o comportamento e os resultados.
- Anexe `media/chamado-claro.mp4` como vídeo ou use `media/02-erros.png` como imagem.
- Acrescente o link real do repositório somente depois de criá-lo; nenhum link público foi criado nesta entrega.
- Texto alternativo sugerido para a captura: “Formulário de abertura de chamados com resumo dos erros, links para os campos e mensagens de correção. O nome fictício preenchido permanece no formulário.”
- O vídeo não tem áudio. A legenda acima descreve o fluxo. Não se trata de uma auditoria completa de acessibilidade.
