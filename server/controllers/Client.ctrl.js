// ===== Conttroler Client.ctrl.JS ======
// ===== date:  2019-11-22         ======
//
const Client = require('../models/Client.model');

module.exports = { 
    list: (req, res) => {
        console.log("SERVER > CONTROLLER > client > list")
        Client.findAll({
            attributes: ['id', 'cnpj', 'razao_social', 'nome_fantasia', 'valor_hh', 'prazo_pgto' ],
            order: [ ['razao_social', 'ASC'], ]
            })
            .then(client => res.json(client))
            .catch(error => console.log(error));
    },
    new: async (req, res) => {
        console.log("SERVER > CONTROLLER > client > new", req.body );
        try {
            const {
                cnpj,
                razao_social,
                nome_fantasia,
                valor_hh,
                prazo_pgto
            } = req.body;

                const client = await Client.create({ cnpj, razao_social, nome_fantasia, valor_hh, prazo_pgto });
                client.addContact(req.body.contato);
                client.addEndereco(req.body.endereco);
                console.log('sucesso savando usuario');
                return res.json(user);
            }
        catch(err) {
                console.log('Ocorreu erro salvando cliente.');
                return res.json(err)
        }
    },
    getClientById: function(req, res) {
        console.log("SERVER > CONTROLLER > getClientById  " );
        // Client.findByPk({ 
        //     include: [
        //         {
        //             model: Projects,
        //         }
        //     ],
        //     where: { id: req.params.id}
        // })
        // .populate('clientProjects')
        // .then(cliente => res.json(cliente))
        // .catch(error => console.log(error));
    },
    // edit: (req, res) => {
    //     console.log("SERVER > CONTROLLER > cliente > edit  " );
    //     Cliente.findOne({
    //         _id: req.params.id
    //     }, function (err, eCliente) {
    //         if (err) {
    //             console.log('Ocorreu erro lendo cliente antes da edição', err);
    //         } else { 
    //             eCliente.cnpj = req.body.cnpj;
    //             eCliente.razaoSocial = req.body.razaoSocial;
    //             eCliente.nomeFantasia = req.body.nomeFantasia;
    //             eCliente.valorHH = req.body.valorHH; 
    //             eCliente.prazoPgto = req.body.prazoPgto; 
    //             eCliente.endereco.logradouro = req.body.endereco.logradouro;
    //             eCliente.endereco.complemento = req.body.endereco.complemento;  
    //             eCliente.endereco.cidade = req.body.endereco.cidade; 
    //             eCliente.endereco.estado = req.body.endereco.estado;
    //             eCliente.endereco.cep = req.body.endereco.cep;
    //             eCliente.contatos = req.body.contatos;
    //             eCliente.save(function(err, result){
    //                 if(err) {
    //                     console.log('Ocorreu erro editando cliente', err);
    //                     res.json(err);
    //                 } else { 
    //                     console.log('sucesso editando cliente');
    //                     res.json(result);
    //                 };
    //             });
    //         };
    //     });
    // },
    // destroy: (req, res) => {
    //     console.log("SERVER > CONTROLLER > cliente > destroy   " );
    //     Cliente.findByIdAndRemove({_id: req.params.id})
    //         .then(cliente => res.json(cliente))
    //         .catch(error => console.log(error));
    // }

}