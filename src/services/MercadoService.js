const db = require('../db')

module.exports = {
    buscarTudo: () =>{
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM mercado', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            })
        })
    },

    buscarUm: (id) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM mercado WHERE id = ?', [id], (error, results)=>{
                if(error) { rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(null);
                }
            });
        });
    },

    inserir: (name, description, price, stock) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('INSERT INTO mercado (name, description, price, stock) VALUES (?, ?, ?, ?)', [name, description, price, stock], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertId);
                }
            )
        });
    },

    alterar: (id, name, description, price, stock) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('UPDATE mercado SET name = ?, description = ?, price = ?, stock = ? WHERE id = ? ', [name, description, price, stock, id], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results);
                }
            )
        });
    },

        excluir: (id) =>{
            return new Promise((aceito, rejeitado)=>{
    
                db.query('DELETE FROM mercado WHERE id = ?', [id], (error, results)=>{
                    if(error) { rejeitado(error); return; }
                    aceito(results);
            })
        })
    }
};