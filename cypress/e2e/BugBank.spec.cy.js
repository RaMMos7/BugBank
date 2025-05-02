describe('Criação de um User', () => {
  it('Deve acessar a página inicial e clicar em Registrar', () => {
    cy.visit('index.html');
    cy.get('[data-cy="registrar"]').click();
    cy.url().should('include', 'cadastro.html');
  });

  it('Criação de um Usuário', () => {
    cy.visit('cadastro.html');
    cy.get('#nome').type('Miguel Ramos');
    cy.get('#email').type('miguelramos@gmail.com');
    cy.get('#senha').type('senha007');
    cy.get('#confirmar-senha').type('senha007');
    cy.get('#conta-com-saldo').check();
    cy.get('button[type="submit"]').click();
  });
});

describe('Fazendo o login', () => {
  it('Login e acesso ao Dashboard', () => {
    cy.visit('index.html');
    cy.get('#login-email').type('miguelramos@gmail.com');
    cy.get('#login-password').type('senha007');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'dashboard.html');
  });
});

describe('Conhecendo a dashboard', () => {
  it('Fazendo uma transferência', () => {
    cy.visit('dashboard.html');
    cy.get('[data-cy="transferencia"]').click();
    cy.url().should('include', 'transferencia.html');
    cy.get('#destinatario').type('cinderela@gmail.com')
    cy.get('#valor').type('35000')
    cy.get('button').click()
  });

  it('Fazendo um extrato', () => {
    cy.visit('dashboard.html');
    cy.get('[data-cy="extrato"]').click();
  });
});
