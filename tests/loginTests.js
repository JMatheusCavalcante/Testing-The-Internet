// Importar a biblioteca do Selenium WebDriver
const { Builder, By, Key, until } = require('selenium-webdriver');

// Função assíncrona para definir e executar o teste
async function loginTest() {
    // Configurar o navegador
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {

//--------------------------TESTE 1 - LOGIN --------------------------------------------

        // Navegar até a página de login do site "The Internet"
        await driver.get('https://the-internet.herokuapp.com/login');
        console.log('Teste de login iniciado...');
        // Localizar os campos de usuário e senha e preenchê-los
        await driver.findElement(By.id('username')).sendKeys('tomsmith');
        await driver.findElement(By.id('password')).sendKeys('SuperSecretPassword!');

        // Clicar no botão de login
        await driver.findElement(By.css('button[type="submit"]')).click();
        console.log('Logando...');
        
        // Aguardar até que a página de sucesso de login seja carregada (você pode ajustar isso conforme necessário)
        await driver.wait(until.titleIs('The Internet'), 5000);

        // Se o título da página for 'Secure Area', o login foi bem-sucedido
        console.log('Login bem-sucedido!');

//--------------------------TESTE 2 - Checkboxex --------------------------------------------

        // Navega novamente para o início do site.
        await driver.get('https://the-internet.herokuapp.com/');
        console.log('Página Home é acessada novamente')
        
        // Seleciona um dos links, no caso o dos checkboxes
        const checkboxesLink = await driver.findElement(By.linkText('Checkboxes'));

        // Clique no link do teste "Checkboxes"
        await checkboxesLink.click();   

        // Tenta ver se pelo H3 consegue ver se chegou na página correta.
        try {
            await driver.wait(until.elementLocated(By.css('h3')), 5000);
            const pageTitle = await driver.findElement(By.css('h3')).getText();
            if (pageTitle === 'Checkboxes') {
                console.log('Página de "Checkboxes" foi carregada com sucesso!');
            } else {
                console.log('Página de "Checkboxes" não foi carregada corretamente.');
            }
        } catch (error) {
            console.log('Erro ao verificar a página de "Checkboxes":', error.message);
        }

        // Interação com Checkboxes:
        try {
            // Espera até que os checkboxes sejam carregados na página
            await driver.wait(until.elementsLocated(By.css('input[type="checkbox"]')), 5000);
            
            // Localiza os checkboxes na página
            const checkboxes = await driver.findElements(By.css('input[type="checkbox"]'));
        
            // Verifica se o primeiro checkbox está marcado e o desmarca
            if (await checkboxes[0].isSelected()) {
                console.log('O primeiro checkbox está marcado. Desmarcando...');
                await checkboxes[0].click();
            } else {
                console.log('O primeiro checkbox está desmarcado. Marcando...');
                await checkboxes[0].click();
            }
        
            // Verifica se o segundo checkbox está marcado e o marca
            if (!(await checkboxes[1].isSelected())) {
                console.log('O segundo checkbox está desmarcado. Marcando...');
                await checkboxes[1].click();
            } else {
                console.log('O segundo checkbox já está marcado.');
            }
        } catch (error) {
            console.log('Ocorreu um erro durante a interação com os checkboxes:', error.message);
        }
        
        console.log('Interação com Checkboxes finalizada, retornando para página inicial...');
        await driver.sleep(3000);


//-------------------------- TESTE 3 - DROPDOWN --------------------------------------------

        // Navega novamente para o início do site.
        await driver.get('https://the-internet.herokuapp.com/');
        console.log('Página Home é acessada novamente')

      

        // Encontra o Link do próximo Teste
        // Seleciona o link do Dropdown
        const dropdownLink = await driver.findElement(By.linkText('Dropdown'));
    
      
        // Clique no link do teste "Dropdown"
        await dropdownLink.click()


         // Tenta ver se pelo H3 consegue ver se chegou na página correta.
         try {
            await driver.wait(until.elementLocated(By.css('h3')), 5000);
            const pageTitle = await driver.findElement(By.css('h3')).getText();
            if (pageTitle === 'Dropdown List') {
                console.log('Página de "Dropdown" foi carregada com sucesso!');
            } else {
                console.log('Página de "Dropdown" não foi carregada corretamente.');
            }
            } catch (error) {
            console.log('Erro ao verificar a página de "Dropdown":', error.message);
            }


        // Interação com Dropdown:
        try {
            // Espera até que o dropdown seja carregado na página
            await driver.wait(until.elementLocated(By.id('dropdown')), 5000);

            // Localiza o dropdown na página
            const dropdown = await driver.findElement(By.id('dropdown'));

            // Seleciona a segunda opção no dropdown
            await dropdown.findElement(By.css('option[value="2"]')).click();
            console.log('A segunda opção do dropdown foi selecionada.');

            // Aguarda alguns segundos
            await driver.sleep(3000);

            // Seleciona a primeira opção no dropdown
            await dropdown.findElement(By.css('option[value="1"]')).click();
            console.log('A primeira opção do dropdown foi selecionada.');
            // Aguarda alguns segundos
            await driver.sleep(2000);
           
        } catch (error) {
            console.log('Ocorreu um erro durante a interação com o dropdown:', error.message);
        }

        console.log('Interação com Dropdown finalizada, retornando para página inicial...');
        await driver.sleep(3000);

        // Navega novamente para o início do site.
        await driver.get('https://the-internet.herokuapp.com/');
        console.log('Página Home é acessada novamente');
        console.log('Sucesso!')
        await driver.sleep(3000);


           
        //-------------------------- TESTE 4 - Horizontal Slider --------------------------------------------

    
        // Seleciona o link do Horizontal Slider
        const sliderLink = await driver.findElement(By.linkText('Horizontal Slider'));

        // Clique no link do teste "Horizontal Slider"
        await sliderLink.click();

        // Tenta ver se pelo H3 consegue ver se chegou na página correta.
        try {
            await driver.wait(until.elementLocated(By.css('h3')), 5000);
            const pageTitle = await driver.findElement(By.css('h3')).getText();
            if (pageTitle === 'Horizontal Slider') {
                console.log('Página de "Horizontal Slider" foi carregada com sucesso!');
            } else {
                console.log('Página de "Horizontal Slider" não foi carregada corretamente.');
            }
        } catch (error) {
            console.log('Erro ao verificar a página de "Horizontal Slider":', error.message);
        }

        // Interação com o Slider:
        try {
            // Espera até que o slider seja carregado na página
            await driver.wait(until.elementLocated(By.css('input[type="range"]')), 5000);

            // Localiza o slider na página
            const slider = await driver.findElement(By.css('input[type="range"]'));

            // Move o slider para o valor desejado (por exemplo, 4.0)
            await slider.sendKeys(Key.RIGHT, Key.RIGHT, Key.RIGHT, Key.RIGHT);
            console.log('O slider foi movido para a direita.');

            // Aguarda alguns segundos
            await driver.sleep(2000);

             // Variações Aleatórias
             await slider.sendKeys(Key.LEFT, Key.LEFT, Key.RIGHT, Key.LEFT);
             console.log('O slider foi movido algumas vezes.');
 
             // Aguarda alguns segundos
             await driver.sleep(2000);

             // Variações Aleatórias2
             await slider.sendKeys(Key.RIGHT, Key.LEFT, Key.RIGHT, Key.RIGHT);
             console.log('O slider foi movido mais algumas vezes.');
 
            // Aguarda alguns segundos
             await driver.sleep(2000);
 

            // Move o slider para o valor inicial (por exemplo, 0.0)
            await slider.sendKeys(Key.LEFT, Key.LEFT, Key.LEFT, Key.LEFT);
            console.log('O slider foi movido para a esquerda.');

            // Verifica o valor do slider
            const sliderValue = await driver.findElement(By.id('range')).getText();
            console.log(`O valor do slider é: ${sliderValue}`);
        } catch (error) {
            console.log('Ocorreu um erro durante a interação com o slider:', error.message);
        }

        console.log('Interação com Slider finalizada, retornando para página inicial...');
        await driver.sleep(3000);








        } catch (error) {
            // Se ocorrer algum erro durante o teste, capturá-lo e exibi-lo
            console.error('Ocorreu um erro durante o teste:', error);
        } finally {
            // Fechar o navegador ao final do teste
            await driver.quit();
        }
    }

// Chamar a função de teste
loginTest();

