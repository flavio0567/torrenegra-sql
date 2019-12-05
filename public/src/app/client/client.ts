export class Client {
  cnpj = '';
  razao_social = '';
  nome_fantasia = '';
  endereco = '';
  contatos: Contato[];
}

export class Contato {
  nome     = '';
  email    = '';
  telefone = '';
  skype    = '';
  main     = false;
}