const puppeteer = require('puppeteer');

async function getTaxaDolar(req, res){
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
            res.json({ status: true, cotacao_dolar: cotacaoDolar });
        } else {
            res.json({ status: false, message: 'Valor da cotação do dólar não encontrado' });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

module.exports = {
    getTaxaDolar
}