const MercadoService = require('../services/MercadoService');

module.exports = {
    buscarTudo: async (req, res)=> {
        let json = {error:'', result:[]};

        let mercado = await MercadoService.buscarTudo();

        for(let i in mercado){
            json.result.push({
                id: mercado[i].id,
                name: mercado[i].name,
                description: mercado[i].description,
                price: mercado[i].price,
                stock: mercado[i].stock
            });
        }
        res.json(json)
    },

    buscarUm: async(req, res) => {
        let json = {error:'', result:{}};

        let id = req.params.id;
        let mercadoo = await MercadoService.buscarUm(id);

        if(mercadoo){
            json.result = mercadoo;
        }

        res.json(json)
    },

    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let stock = req.body.stock;

         // Verificar se o produto já existe pelo nome
         const existingProduct = await MercadoService.buscarUm(name);
         if (existingProduct) {
             return res.status(400).json({ message: 'Produto já existe.' });
         }

         if(price <= 0){
            return res.status(600).json({
                message: 'O preco do item deve ser um valor positivo'
            });
         }

        if(name && price && stock){
            let MercadoId = await MercadoService.inserir(name, description, price, stock);
            json.result = {
                id: MercadoId,
                name,
                description,
                price,
                stock
            };
        }else{
            json.error = 'Campos Nao Preenchidos';
        }

        res.json(json)
    },

    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        let id = req.params.id;
        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let stock = req.body.stock;

         // Verificar se o produto já existe pelo nome
         const existingProduct = await MercadoService.buscarUm(name);
         if (existingProduct) {
             return res.status(400).json({ message: 'Produto já existe.' });
         }

        if(id && name && price && stock){
            await MercadoService.alterar(id, name, description, price, stock);
            json.result = {
                id,
                name,
                description,
                price,
                stock
            };
        }else{
            json.error = 'Campos Nao Preenchidos';
        }
        res.json(json)
    },

    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await MercadoService.excluir(req.params.id);
        return res.status(400).json({ message: 'Deletado com Sucesso' });

        res.json(json)
    },
    
};