export const categories = ['Acesso e conta', 'Sistema e aplicativo', 'Equipamento', 'Outro'] as const;
export const priorities = ['Normal', 'Alta'] as const;
export type TicketInput = { name: string; email: string; title: string; category: string; priority: string; description: string };
export type Field = keyof TicketInput;
export type Errors = Partial<Record<Field, string>>;
export const initialTicket: TicketInput = { name: '', email: '', title: '', category: '', priority: 'Normal', description: '' };
export const labels: Record<Field, string> = { name: 'Nome', email: 'E-mail', title: 'Resumo do problema', category: 'Categoria', priority: 'Prioridade', description: 'Descrição' };
export function validateTicket(input: TicketInput): Errors {
  const errors: Errors = {};
  const name = input.name.trim(), email = input.email.trim(), title = input.title.trim(), description = input.description.trim();
  if (name.length < 2 || name.length > 80) errors.name = 'Informe um nome entre 2 e 80 caracteres.';
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Informe um e-mail no formato nome@exemplo.com.';
  if (title.length < 5 || title.length > 100) errors.title = 'Resuma o problema em 5 a 100 caracteres.';
  if (!categories.some(value => value === input.category)) errors.category = 'Selecione uma categoria para o chamado.';
  if (!priorities.some(value => value === input.priority)) errors.priority = 'Selecione uma prioridade válida.';
  if (description.length < 20 || description.length > 1000) errors.description = 'Descreva o problema em 20 a 1.000 caracteres.';
  return errors;
}
export function normalizeTicket(input: TicketInput): TicketInput {
  return { ...input, name: input.name.trim(), email: input.email.trim(), title: input.title.trim(), description: input.description.trim() };
}
