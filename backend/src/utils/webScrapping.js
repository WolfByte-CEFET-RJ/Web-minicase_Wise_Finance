const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.google.com/search?q=cotacao+dolar#ip=1';

function getTaxaDolar(req, res){
    
    axios.get(url)
    .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    //"DFlfde SwHCTb".
    const cotacaoDolar = $('.DFlfde.SwHCTb').text();
    console.log(cotacaoDolar)
    console.log(typeof(cotacaoDolar))
    if (cotacaoDolar) {
        res.json({ status: true, cotacao_dolar: cotacaoDolar });
    } else {
        res.json({ status: false, message: 'Valor da cotação do dólar não encontrado' });
    }
    return

    })
    .catch(error => {
        res.status(500).json({
            status: false,
            message: error.message,
          });
    });
}

module.exports = {
    getTaxaDolar
}