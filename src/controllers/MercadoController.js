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
        let mercado = await MercadoService.buscarUmId(id);

        if(mercado){
            json.result = mercado;
        }

        res.json(json)
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };
    
        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let stock = req.body.stock;
    
        try {
            // Verifica se o item já existe pelo nome
            const existingProduct = await MercadoService.buscarUm(name);
            if (existingProduct) {
                return res.status(409).json({ message: 'Produto já existe.' });
            }
    
            if (price <= 0) {
                return res.status(400).json({ message: 'O preço do item deve ser um valor positivo.' });
            }
    
            if (name && price && stock) {
                let MercadoId = await MercadoService.inserir(name, description, price, stock);
                json.result = {
                    id: MercadoId,
                    name,
                    description,
                    price,
                    stock
                };
            } else {
                json.error = 'Campos não preenchidos.';
            }
    
            res.json(json);
        } catch (error) {
            console.error('Erro ao inserir o produto:', error);
            res.status(500).json({ error: 'Erro interno do servidor ao inserir o produto.' });
        }
    },
    

    alterar: async (req, res) => {
        let json = { error: '', result: {} };
    
        let id = req.params.id;
        let name = req.body.name;
        let description = req.body.description;
        let price = req.body.price;
        let stock = req.body.stock;
    
        try {
            // Verifica se o item já existe pelo ID
            const existingProduct = await MercadoService.buscarUmId(id);
            if (!existingProduct) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }
    
            // Verifica se o nome do item fornecido é diferente do nome atual e se já existe outro produto com o novo nome
            if (name !== existingProduct.name) {
                const anotherProductWithSameName = await MercadoService.buscarUm(name);
                if (anotherProductWithSameName) {
                    return res.status(409).json({ message: 'Já existe um item com esse nome.' });
                }
            }
            // Verifica se o valor do item é positivo
            if (price <= 0) {
                return res.status(400).json({ message: 'O preço do item deve ser um valor positivo.' });
            }
    
            await MercadoService.alterar(id, name, description, price, stock);
            json.result = {
                id,
                name,
                description,
                price,
                stock
            };
            res.json(json);
        } catch (error) {
            console.error('Erro ao alterar o produto:', error);
            res.status(500).json({ error: 'Erro interno do servidor ao alterar o produto.' });
        }
    },
    

    excluir: async(req, res) => {
        let json = {error:'', result:{}};

        await MercadoService.excluir(req.params.id);
        return res.status(400).json({ message: 'Deletado com Sucesso' });

        res.json(json)
    },
    
};