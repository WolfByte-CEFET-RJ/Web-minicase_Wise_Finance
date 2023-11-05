const puppeteer = require('puppeteer');


async function getTaxaDolarServico(){
    const url = 'https://www.google.com/search?q=cotacao+dolar';

    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
    
        await page.goto(url);
    
        const cotacaoDolar = await page.evaluate(() => {
            const element = document.querySelector('.DFlfde.SwHCTb');
            return element ? element.getAttribute('data-value') : null;
        });
    
        await browser.close();
        
        if (cotacaoDolar) {
            return { status: true, cotacao_dolar: cotacaoDolar };
        } else {
            return{ status: false, message: 'Valor da cotação do dólar não encontrado' };
        }

    } catch (error) {
        return{
            status: false,
            message: error.message
        };
    }
}

async function getTaxaEuroServico(){
    const url = 'https://www.google.com/search?q=cotacao+euro';

    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
    
        await page.goto(url);
    
        const cotacaoEuro = await page.evaluate(() => {
            const element = document.querySelector('.DFlfde.SwHCTb');
            return element ? element.getAttribute('data-value') : null;
        });
    
        await browser.close();
        
        if (cotacaoEuro) {
            return { status: true, cotacao_euro: cotacaoEuro };
        } else {
            return{ status: false, message: 'Valor da cotação do euro não encontrado' };
        }

    } catch (error) {
        return{
            status: false,
            message: error.message
        };
    }
}

module.exports = {
    getTaxaDolarServico,
    getTaxaEuroServico
}