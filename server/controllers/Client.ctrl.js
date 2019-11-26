// ===== Conttroler Client.ctrl.JS ======
// ===== date:  2019-11-22         ======
//
const Client = require('../models/Client.model');
const Contact = require('../models/Contact.model');
const Address = require('../models/Address.model');

module.exports = { 
    list: async (req, res) => {
        console.log("SERVER > CONTROLLER > client > list")
        await Client.findAll({
            attributes: ['id', 'cnpj', 'razao_social', 'nome_fantasia', 'valor_hh', 'prazo_pgto' ],
            order: [ ['razao_social', 'ASC'], ],
            include: 
                [
                    {model: Contact, as: 'contacts'},
                    {model: Address, as: 'addresses'},           
                ]
            })
            .then(client => res.json(client))
            .catch(error => console.log(error));
    },
    new: async (req, res) => {
        console.log("SERVER > CONTROLLER > client > new", req.body );
        try {
            // const {
            //     cnpj,
            //     razao_social,
            //     nome_fantasia,
            //     valor_hh,
            //     prazo_pgto,
            //     contatos:[],
            //     endereco
            // } = req.body;

            const client = await Client.create(req.body);
            console.log('sucesso criando cliente');
            const endereco = await Address.create({
                cliente_id: client.id,
                logradouro: req.body.endereco.logradouro,
                complemento:req.body.endereco.complemento,
                cidade:req.body.endereco.cidade,
                estado:req.body.endereco.estado,
                cep:req.body.endereco.cep
            });
            console.log('sucesso criando endereco do cliente');
            // return res.status(201).json(client, endereco);
            res.status(200).send((client).toString());

                // const client = await Client.create({
                //     cnpj: req.body.cnpj, 
                //     razao_social: req.body.razao_social, 
                //     nome_fantasia: req.body.nome_fantasia, 
                //     valor_hh: req.body.valor_hh, 
                //     prazo_pgto: req.body.prazo_pgto,
                //     contacts: [{
                //         nome: req.body.contatos.nome,
                //         email: req.body.contatos.email,
                //         fone: req.body.contatos.fone,
                //         skype: req.body.contatos.skype
                //     }]} , {
                //     include: [{
                //         association: Contact,
                //         as: 'contacts'
                //       }]
                //     }
                // );
                // const c_id = client.id;
                // console.log('  cliente_id: contatos =====>' , client.id, req.body.contatos);
                // const contacts = await Contact.bulkBuild( [{
                //     cliente_id: client.id,
                //     nome: req.body.contatos.nome,
                //     email: req.body.contatos.email,
                //     fone: req.body.contatos.fone,
                //     skype: req.body.contatos.skype
                // }]);
                // client.addAddress(req.body.endereco);
                // console.log('sucesso savando usuario');
                // return res.json(client);
            }
        catch(err) {
                console.log('Ocorreu erro salvando cliente.', err);
                res.status(400).send((err).toString());
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