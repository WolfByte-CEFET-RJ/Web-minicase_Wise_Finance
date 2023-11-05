const {getTaxaDolarServico, getTaxaEuroServico} = require("../servicos/taxaServico")

async function getTaxaDolar(req, res){
    try {
        
        const cotacaoDolar = await getTaxaDolarServico();
        res.json(cotacaoDolar);

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

async function getTaxaEuro(req, res){
    try {
        
        const cotacaoEuro = await getTaxaEuroServico();
        res.json(cotacaoEuro);

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

module.exports = {
    getTaxaDolar,
    getTaxaEuro
}