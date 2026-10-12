import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { categories, initialTicket, labels, normalizeTicket, priorities, validateTicket } from './validation';
import type { Errors, Field, TicketInput } from './validation';

type Confirmation = { ticket: TicketInput; id: string };
export function App() {
  const [values, setValues] = useState<TicketInput>({ ...initialTicket });
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const summary = useRef<HTMLDivElement>(null);
  const success = useRef<HTMLHeadingElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  const shouldFocusFirst = useRef(false);
  const entries = Object.entries(errors) as [Field, string][];

  useEffect(() => { if (attempt && entries.length) summary.current?.focus(); }, [attempt]);
  useEffect(() => {
    if (confirmation) success.current?.focus();
    else if (shouldFocusFirst.current) { firstField.current?.focus(); shouldFocusFirst.current = false; }
  }, [confirmation]);
  function update(field: Field, value: string) {
    setValues(current => ({ ...current, [field]: value }));
    // Keep errors visible until the next submission to avoid noisy announcements on every keystroke.
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateTicket(values);
    setErrors(next);
    setAttempt(value => value + 1);
    if (Object.keys(next).length) return;
    setConfirmation({ ticket: normalizeTicket(values), id: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}` });
  }
  function restart() {
    shouldFocusFirst.current = true;
    setValues({ ...initialTicket }); setErrors({}); setAttempt(0); setConfirmation(null);
  }
  function a11y(field: Field) {
    return { id: field, name: field, 'aria-invalid': Boolean(errors[field]), 'aria-describedby': `${field}-hint${errors[field] ? ` ${field}-error` : ''}` };
  }
  function error(field: Field) { return errors[field] ? <p className="field-error" id={`${field}-error`}>{errors[field]}</p> : null; }

  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <header className="header"><a className="brand" href="#main" aria-label="Chamado Claro, ir para o conteúdo"><span className="brand-icon" aria-hidden="true">c.</span><span>Chamado Claro<small>por Marcos Solutions</small></span></a><span className="demo-badge"><span aria-hidden="true">●</span> Ambiente demonstrativo</span></header>
    <main id="main" tabIndex={-1}>
      <div className="intro"><p className="eyebrow">SUPORTE, COM CLAREZA</p><h1>O primeiro passo para<br/>resolver o problema.</h1><p>Conte o que aconteceu. Um relato claro ajuda a entender<br className="desktop-break"/> a situação e organizar o atendimento.</p></div>
      <div className="layout">
        <aside className="guide" aria-labelledby="guide-title"><p className="eyebrow">UM CAMINHO SIMPLES</p><h2 id="guide-title">Cada detalhe ajuda.</h2><ol><li><span className="step">01</span><div><h3>Identifique o contato</h3><p>Use um nome e um e-mail fictícios nesta demonstração.</p></div></li><li><span className="step">02</span><div><h3>Explique o que aconteceu</h3><p>Inclua a ação realizada e o resultado que você esperava.</p></div></li><li><span className="step">03</span><div><h3>Confira a confirmação</h3><p>Revise o resumo e o protocolo simulado gerado ao final.</p></div></li></ol><div className="keyboard-note"><span aria-hidden="true">↹</span><div><strong>Prefere usar o teclado?</strong><p>Use Tab para avançar, Shift + Tab para voltar e Enter nos botões.</p></div></div><p className="privacy-note">Sem envio de e-mail, servidor ou armazenamento permanente. Atualizar a página apaga os dados.</p></aside>
        <section className="form-panel" aria-labelledby={confirmation ? 'success-title' : 'form-title'}>
          {!confirmation ? <><div className="panel-heading"><div><p className="eyebrow">NOVO CHAMADO</p><h2 id="form-title">Como podemos ajudar?</h2></div><span className="form-tag">Demonstração</span></div><p className="required-note">Todos os campos são obrigatórios. Use apenas dados fictícios.</p>
          <form onSubmit={submit} noValidate>
            {entries.length > 0 && <div className="error-summary" ref={summary} tabIndex={-1} aria-labelledby="error-title"><h3 id="error-title">Revise {entries.length} {entries.length === 1 ? 'campo' : 'campos'} para continuar</h3><p>Seus dados foram mantidos. Selecione um erro para corrigir.</p><ul>{entries.map(([field, message]) => <li key={field}><a href={`#${field}`} onClick={event => { event.preventDefault(); document.getElementById(field)?.focus(); }}>{labels[field]}: {message}</a></li>)}</ul></div>}
            <fieldset><legend><span>01</span> Seu contato</legend><div className="two-col">
              <div className="field"><label htmlFor="name">Nome</label><input {...a11y('name')} ref={firstField} autoComplete="name" required maxLength={80} value={values.name} onChange={e => update('name', e.target.value)}/><p className="hint" id="name-hint">Exemplo fictício: Alex Silva.</p>{error('name')}</div>
              <div className="field"><label htmlFor="email">E-mail</label><input {...a11y('email')} type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={e => update('email', e.target.value)}/><p className="hint" id="email-hint">Exemplo: alex@example.com.</p>{error('email')}</div>
            </div></fieldset>
            <fieldset><legend><span>02</span> Sobre o problema</legend>
              <div className="field"><label htmlFor="title">Resumo do problema</label><input {...a11y('title')} required maxLength={100} value={values.title} onChange={e => update('title', e.target.value)}/><p className="hint" id="title-hint">De 5 a 100 caracteres. Ex.: Não consigo acessar o painel.</p>{error('title')}</div>
              <div className="two-col"><div className="field"><label htmlFor="category">Categoria</label><select {...a11y('category')} required value={values.category} onChange={e => update('category', e.target.value)}><option value="">Selecione uma opção</option>{categories.map(item => <option key={item}>{item}</option>)}</select><p className="hint" id="category-hint">Escolha o assunto mais próximo.</p>{error('category')}</div>
              <div className="field"><label htmlFor="priority">Prioridade</label><select {...a11y('priority')} required value={values.priority} onChange={e => update('priority', e.target.value)}>{priorities.map(item => <option key={item}>{item}</option>)}</select><p className="hint" id="priority-hint">Alta: atividade bloqueada. Normal: demais situações.</p>{error('priority')}</div></div>
              <div className="field"><label htmlFor="description">Descrição</label><textarea {...a11y('description')} required maxLength={1000} rows={4} value={values.description} onChange={e => update('description', e.target.value)}/><div className="description-help"><p className="hint" id="description-hint">De 20 a 1.000 caracteres. Não inclua senhas ou dados pessoais reais.</p><span className="count" aria-hidden="true">{values.description.length}/1000</span></div>{error('description')}</div>
            </fieldset>
            <div className="form-footer"><p>Este envio é uma simulação.<br/>Nenhuma equipe receberá o chamado.</p><button className="primary" type="submit">Simular abertura <span aria-hidden="true">→</span></button></div>
          </form></> : <div className="success-view"><span className="success-icon" aria-hidden="true">✓</span><p className="eyebrow">SIMULAÇÃO CONCLUÍDA</p><h2 id="success-title" tabIndex={-1} ref={success}>Seu relato está organizado.</h2><p>O chamado abaixo foi criado apenas nesta página. Nenhum atendimento real foi aberto.</p><div className="protocol"><span>PROTOCOLO DEMONSTRATIVO</span><strong>{confirmation.id}</strong></div><dl className="receipt"><dt>Resumo</dt><dd>{confirmation.ticket.title}</dd><dt>Contato fictício</dt><dd>{confirmation.ticket.name} · {confirmation.ticket.email}</dd><dt>Categoria / prioridade</dt><dd>{confirmation.ticket.category} / {confirmation.ticket.priority}</dd><dt>Descrição</dt><dd className="multiline">{confirmation.ticket.description}</dd></dl><button className="primary" onClick={restart}>Iniciar outra simulação <span aria-hidden="true">→</span></button><p className="hint">Recarregar a página também limpa esta simulação.</p></div>}
        </section>
      </div>
    </main><footer className="site-footer"><span>Marcos Solutions</span><span>Projeto de portfólio · React + TypeScript</span></footer>
  </>;
}
