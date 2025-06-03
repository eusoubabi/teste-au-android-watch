import { config as loadEnv } from 'dotenv';
loadEnv(); // Carrega variáveis do .env

class LoginPage {
  // Botão "Apenas esta vez"
  public get btnApenasUmaVez() {
    return $('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_one_time_button"]');
  }

  // Botão "Entrar" da tela inicial
  public get btnEntrarInicial() {
    return $('//android.widget.Button[@text="Entrar"]');
  }

  // Botão "Pular"
  public get btnPular() {
    return $('//android.widget.Button[@text="Pular"]');
  }

  // Botão "Acessar conta"
  public get btnAcessarConta() {
    return $('//android.widget.Button[@text="Acessar conta"]');
  }

  // Campo de e-mail
  public get inputEmail() {
    return $('//android.widget.EditText[@resource-id="email"]');
  }

  // Campo de senha
  public get inputSenha() {
    return $('//android.widget.EditText[@resource-id="password"]');
  }

  // Botão "Entrar" da tela de login (após preencher email/senha)
  public get btnEntrarLogin() {
    return $('//android.widget.Button[@text="Entrar"]');
  }

  // Ação: clicar em "Apenas esta vez" se aparecer
  public async permitirUmaVez(): Promise<void> {
    if (await this.btnApenasUmaVez.isDisplayed()) {
      await this.btnApenasUmaVez.click();
      await browser.pause(2000);
    }
  }

   // Ação: pular onboarding 3 vezes com verificação a cada clique
  public async pularOnboarding(): Promise<void> {
    let tentativas = 0;
    while (tentativas < 3) {
      if (await this.btnPular.isDisplayed()) {
        await this.btnPular.click();
        await browser.pause(1000);
        tentativas++;
      } else {
        await browser.pause(500); // espera e tenta de novo se não estiver visível
      }
    }
  }

  // Ação: clicar em "Acessar conta"
  public async acessarConta(): Promise<void> {
    await this.btnAcessarConta.waitForDisplayed({ timeout: 10000 });
    await this.btnAcessarConta.click();
    await browser.pause(3000);
  }

  // Ação: clicar no botão "Entrar" da tela inicial
  public async clicarEmEntrar(): Promise<void> {
    await this.btnEntrarInicial.waitForDisplayed({ timeout: 20000 });
    await this.btnEntrarInicial.click();
    await browser.pause(2000);
  }

  // Ação: preencher e-mail/senha do .env e clicar em "Entrar"
  public async realizarLogin(): Promise<void> {
    const email = process.env.LOGIN_EMAIL ?? '';
    const senha = process.env.LOGIN_SENHA ?? '';

    await this.inputEmail.waitForDisplayed({ timeout: 10000 });
    await this.inputEmail.setValue(email);

    await this.inputSenha.waitForDisplayed({ timeout: 10000 });
    await this.inputSenha.setValue(senha);

    await this.btnEntrarLogin.waitForDisplayed({ timeout: 10000 });
    await this.btnEntrarLogin.click();

    await browser.pause(5000); // Espera o login processar
  }
}

export default new LoginPage();
