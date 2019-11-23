export class Client {
    cnpj = '';
    razaoSocial = '';
    nomeFantasia = '';
    endereco = '';
    contatos: Contato[];
  }
  
  export class Contato {
    nome     = '';
    email    = '';
    telefone = '';
    skype    = '';
  }