const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Cadastro
const cadastroForm = document.getElementById('cadastro-form');
if (cadastroForm) {
  cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const saldoInicial = document.getElementById('conta-com-saldo').checked ? 1000 : 0;

    if (senha !== confirmarSenha) return alert('Senhas não coincidem');

    users.push({ nome, email, senha, saldo: saldoInicial, extrato: [] });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'index.html';
  });
}

// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.senha === senha);
    if (!user) return alert('Credenciais inválidas');

    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  });
}

// Dashboard
const userName = document.getElementById('user-name');
const saldo = document.getElementById('saldo');
if (userName && saldo && currentUser) {
  userName.textContent = currentUser.nome;
  saldo.textContent = currentUser.saldo.toFixed(2);
}

// Transferência
const transferenciaForm = document.getElementById('transferencia-form');
if (transferenciaForm) {
  transferenciaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const destinatarioEmail = document.getElementById('destinatario').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const destinatario = users.find(u => u.email === destinatarioEmail);

    if (!destinatario) return alert('Usuário não encontrado');
    if (valor > currentUser.saldo) return alert('Saldo insuficiente');

    currentUser.saldo -= valor;
    destinatario.saldo += valor;
    currentUser.extrato.push({ tipo: 'Transferência enviada', valor: -valor });
    destinatario.extrato.push({ tipo: 'Transferência recebida', valor: valor });

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    alert('Transferência realizada com sucesso!');
    window.location.href = 'dashboard.html';
  });
}

// Extrato
const extratoSaldo = document.getElementById('saldo-extrato');
const listaExtrato = document.getElementById('lista-extrato');
if (extratoSaldo && listaExtrato && currentUser) {
  extratoSaldo.textContent = currentUser.saldo.toFixed(2);
  currentUser.extrato.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.tipo}: R$ ${item.valor.toFixed(2)}`;
    listaExtrato.appendChild(li);
  });
}

//Saque e Pagamentos
function   indisponivel(){
  alert("Ação indisponível no momento!")
}
