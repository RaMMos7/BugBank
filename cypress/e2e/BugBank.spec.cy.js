describe('Fluxo completo de criação, login, transferência e extrato', () => {
  const nome = 'Miguel';
  const email = 'miguel@examplo.com';
  const senha = 'senha123';
  const email2 = 'henry@gmail.com';
  const valorTransferencia = '200';
  const nome2 = 'Henry';
  const senha2 = '123';

  it('1. Cria uma nova conta com saldo', () => {
    cy.visit('index.html');
    cy.contains('Registrar').click();
    cy.url().should('include', 'cadastro.html');

    cy.get('#nome').type(nome);
    cy.get('#email').type(email);
    cy.get('#senha').type(senha);
    cy.get('#confirmar-senha').type(senha);
    cy.get('#conta-com-saldo').check();
    cy.get('button[type="submit"]').click();

     
    cy.contains('Registrar').click();
    cy.url().should('include', 'cadastro.html');

    cy.get('#nome').type(nome2);
    cy.get('#email').type(email2);
    cy.get('#senha').type(senha2);
    cy.get('#confirmar-senha').type(senha2);
    cy.get('#conta-com-saldo').check();
    cy.get('button[type="submit"]').click();

    cy.visit('index.html');
    cy.get('#login-email').type(email);
    cy.get('#login-password').type(senha);
    cy.get('button[type="submit"]').click();


    cy.location('pathname', { timeout: 10000 }).should('include', 'dashboard.html');

    cy.contains('Transferência').click();
    cy.get('#destinatario').type(email2);
    cy.get('#valor').type('200');
    cy.get('button[type="submit"]').click();


    cy.contains('Extrato').click();
    cy.get('#lista-extrato', { timeout: 10000 }).should('contain', 'Transferência enviada');

    cy.visit('index.html');
    cy.get('#login-email').type(email2);
    cy.get('#login-password').type(senha2);
    cy.get('button[type="submit"]').click();

    cy.contains('Extrato').click();
    cy.get('#lista-extrato', { timeout: 10000 }).should('contain', 'Transferência recebida');

    cy.visit('index.html');
    cy.get('#login-email').type(email);
    cy.get('#login-password').type(senha);
    cy.get('button[type="submit"]').click();
    cy.location('pathname', { timeout: 10000 }).should('include', 'dashboard.html');
    cy.contains('800');


  });
  
});



 
