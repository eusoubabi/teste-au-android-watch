import LoginPage from '../pageobjects/login.page';

describe('Login', () => {
  it('Deve iniciar app, avançar onboarding e realizar login com sucesso', async () => {
    // GIVEN que o app foi aberto
    await browser.pause(2000); // Aguarda abertura inicial

    // WHEN localizar e clicar em "Apenas esta vez"
    await LoginPage.permitirUmaVez();

    // AND esperar carregar tela inicial
    await browser.pause(2000);

    // WHEN aparecer o botão "Pular"
    await LoginPage.pularOnboarding();

     // THEN localizar e clicar em "Acessar conta"
    await LoginPage.acessarConta();

    // GIVEN que a tela carregou e o botão "Entrar" está visível
    await LoginPage.clicarEmEntrar();

    // THEN preencher email e senha
    await LoginPage.realizarLogin();

    // THEN aguarda resultado do login
    await browser.pause(5000);
  });
});
