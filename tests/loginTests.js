// Importar a biblioteca do Selenium WebDriver
const { Builder, By, Key, until } = require('selenium-webdriver');

// Função assíncrona para definir e executar os testes
async function runTests() {
    // Configurar o navegador
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        //-------------------------- TESTE 1 - LOGIN --------------------------------------------

        // Navegar até a página de login do site "The Internet"
        await driver.get('https://the-internet.herokuapp.com/login');
        console.log('Teste de login iniciado...');

        // Localizar os campos de usuário e senha e preenchê-los
        await driver.findElement(By.id('username')).sendKeys('tomsmith');
        await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');

        // Clicar no botão de login
        await driver.findElement(By.css('button[type="submit"]')).click();
        console.log('Logando...');
        
        // Aguardar até que a página de sucesso de login seja carregada
        await driver.wait(until.urlContains('/secure'), 5000);

        // Verifica se a mensagem de sucesso é exibida
        const successMessage = await driver.findElement(By.css('.flash.success')).getText();
        if (successMessage.includes('You logged into a secure area!')) {
            console.log('Login bem-sucedido!');
        } else {
            console.log('Falha no login.');
        }

        // Voltar para a página inicial
        await driver.get('https://the-internet.herokuapp.com/');

        //-------------------------- TESTE 2 - CHECKBOXES --------------------------------------------

        // Navegar para a página de Checkboxes
        await driver.get('https://the-internet.herokuapp.com/checkboxes');
        console.log('Página de "Checkboxes" carregada.');

        // Localizar e interagir com os checkboxes
        const checkboxes = await driver.findElements(By.css('input[type="checkbox"]'));
        
        // Verificar e alterar o estado dos checkboxes
        if (await checkboxes[0].isSelected()) {
            console.log('O primeiro checkbox está marcado. Desmarcando...');
            await checkboxes[0].click();
        } else {
            console.log('O primeiro checkbox está desmarcado. Marcando...');
            await checkboxes[0].click();
        }

        if (!(await checkboxes[1].isSelected())) {
            console.log('O segundo checkbox está desmarcado. Marcando...');
            await checkboxes[1].click();
        } else {
            console.log('O segundo checkbox já está marcado.');
        }

        // Voltar para a página inicial
        await driver.get('https://the-internet.herokuapp.com/');

        //-------------------------- TESTE 3 - DROPDOWN --------------------------------------------

        // Navegar para a página de Dropdown
        await driver.get('https://the-internet.herokuapp.com/dropdown');
        console.log('Página de "Dropdown" carregada.');

        // Localizar o dropdown e selecionar opções
        const dropdown = await driver.findElement(By.id('dropdown'));
        await dropdown.findElement(By.css('option[value="2"]')).click();
        console.log('A segunda opção do dropdown foi selecionada.');

        await driver.sleep(1000); // Pequena pausa para visualização

        await dropdown.findElement(By.css('option[value="1"]')).click();
        console.log('A primeira opção do dropdown foi selecionada.');

        // Voltar para a página inicial
        await driver.get('https://the-internet.herokuapp.com/');

        //------------------- TESTE 4 - HORIZONTAL SLIDER --------------------------------------------

        // Navegar para a página de Horizontal Slider
        await driver.get('https://the-internet.herokuapp.com/horizontal_slider');
        console.log('Página de "Horizontal Slider" carregada.');

        // Localizar e interagir com o slider
        const slider = await driver.findElement(By.css('input[type="range"]'));

        // Movendo o slider para diferentes valores
        await slider.sendKeys(Key.RIGHT, Key.RIGHT, Key.RIGHT, Key.RIGHT);
        console.log('O slider foi movido para a direita.');

        await driver.sleep(1000); // Pequena pausa para visualização

        await slider.sendKeys(Key.LEFT, Key.LEFT);
        console.log('O slider foi movido para a esquerda.');

        const sliderValue = await driver.findElement(By.id('range')).getText();
        console.log(`O valor do slider é: ${sliderValue}`);

        // Voltar para a página inicial
        await driver.get('https://the-internet.herokuapp.com/');

        //------------------- TESTE 5 - REDIRECIONAMENTO DO LINK ------------------------------

        console.log("Teste de Redirecionamento do Link");
        await driver.findElement(By.linkText('A/B Testing')).click();
        
        // Adicionar uma pausa para visualizar o redirecionamento
        await driver.sleep(2000); // Espera de 2 segundos

        await driver.wait(until.urlContains('abtest'), 5000);
        console.log("Redirecionado com sucesso para a página A/B Testing!");

        // Voltar para a página inicial
        await driver.navigate().back();
        await driver.sleep(2000); // Espera de 2 segundos para visualizar a navegação de volta
        await driver.get('https://the-internet.herokuapp.com/');

        //------------------- TESTE 6 - ALERT ------------------------------

        console.log("Teste de Alert");
        await driver.findElement(By.linkText('JavaScript Alerts')).click();
        await driver.wait(until.urlContains('javascript_alerts'), 5000);

        // Interage com o alert
        await driver.findElement(By.xpath("//button[text()='Click for JS Alert']")).click();
        await driver.wait(until.alertIsPresent(), 5000);
        let alert = await driver.switchTo().alert();
        await driver.sleep(2000);
        console.log('Alerta exibido com sucesso!');
        await alert.accept();

        // Verifica a mensagem exibida após aceitar o alert
        const resultMessage = await driver.findElement(By.id('result')).getText();
        if (resultMessage === 'You successfully clicked an alert') {
            console.log('O alerta foi aceito com sucesso!');
        } else {
            console.log('Falha ao aceitar o alerta.');
        }

        // Voltar para a página inicial
        await driver.get('https://the-internet.herokuapp.com/');

    } catch (error) {
        // Se ocorrer algum erro durante o teste, capturá-lo e exibi-lo
        console.error('Ocorreu um erro durante o teste:', error);
    } finally {
        // Fechar o navegador ao final do teste
        await driver.quit();
    }
}

// Chamar a função de teste
runTests();
