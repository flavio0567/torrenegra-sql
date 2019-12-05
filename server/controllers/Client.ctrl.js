// ===== Conttroler Client.ctrl.JS ======
// ===== date:  2019-11-22         ======
//
const Client = require('../models/Client.model');
const Contact = require('../models/Contact.model');
const Address = require('../models/Address.model');
const Sequelize = require('sequelize');

module.exports = { 
    list: async (req, res) => {
        console.log("SERVER > CONTROLLER > client > list")
        await Client.findAll(
            {
                attributes: ['id', 'cnpj', 'razao_social', 'nome_fantasia', 'valor_hh', 'prazo_pgto' ],
                order: [ ['razao_social', 'ASC'], ],
                include: 
                    [
                        {model: Contact, as: 'contacts'},
                        {model: Address, as: 'addresses'},           
                    ]
            }
        )
        .then(client => res.json(client))
        .catch(error => console.log(error));
    },
    new: async (req, res) => {
        console.log("SERVER > CONTROLLER > client > new", req.body );
        // create new client
        const client = await Client.build(req.body, 
            {
                fields: ['id','cnpj', 'razao_social', 'nome_fantasia', 'valo_hh', 'prazo_pgto']
            }
        );
        await client.save()
        .then(() => {
            console.log(':: Sucesso criando novo cliente')
        })
        .catch(Sequelize.UniqueConstraintError, function (err) {
            console.log('Cnpj do cliente já utilizado')
            return res.json(err);
        })
        // .catch(Sequelize.ValidationError, function (err) {
        //     console.log('Erro na inclusão do novo cliente: ', err),
        //     res.json(err);
        // })

        // create address
        const endereco = await Address.build(
            {
                cliente_id: client.id,
                logradouro: req.body.endereco.logradouro,
                complemento:req.body.endereco.complemento,
                cidade:req.body.endereco.cidade,
                estado:req.body.endereco.estado,
                cep:req.body.endereco.cep
            }
        )
        await endereco.save()
        .then(() => {
            console.log(':: Sucesso criando endereco do cliente')
        })
        .catch((err) => {
            console.log('Erro na inclusão do novo cliente: ', err),
            res.json(err);
        })
        // create contacts
        const contacts = req.body.contatos
        .map(contatos => ({
            cliente_id: client.id,
            nome:  contatos.nome,
            email: contatos.email,
            fone:  contatos.fone,
            skype: contatos.skype,
            main: contatos.main 
        }))
        await Contact.bulkCreate(contacts)
        .then(
            console.log(':: Sucesso criando contatos do cliente'),
            res.status(201).send()
        )
        .catch((err) => {
            console.log('Erro na inclusão de contatos para o cliente: ', err),
            res.json(err);
        })  
    },
    getClientByPk: function(req, res) {
        console.log("SERVER > CONTROLLER > getClientByPk  " );
        Client.findAll({ 
            attributes: ['id', 'cnpj', 'razao_social', 'nome_fantasia', 'valor_hh', 'prazo_pgto' ],
            where: { id: req.params.id},
            include: 
                [
                    {model: Contact, as: 'contacts'},
                    {model: Address, as: 'addresses'}
                ]
        })
        .then(cliente => res.status(200).send(cliente).toString())
        .catch(error =>  res.status(400).send((error).toString())
        )
    },
    edit: (req, res) => {
        console.log("SERVER > CONTROLLER > cliente > edit  " );
        // editing client
        Client.findByPk(req.params.id)
        .then(client => {
            client.update(req.body)
            .then(client => 
                console.log('Success updating client!'),
            )
            .catch(error =>  res.status(400).send((error).toString()))
        })
        .catch(error =>  res.status(401).send((error).toString()))
        // editing address
        Address.findOne({
            where: {cliente_id: req.params.id} })
       .then(address => {
           address.logradouro = req.body.endereco.logradouro,
           address.complemento = req.body.endereco.complemento,
           address.cidade = req.body.endereco.cidade,
           address.estado = req.body.endereco.estado,
           address.cep = req.body.endereco.cep,
           address.save(),
           console.log('Success updating clients address!')
        })
        .catch(error =>  res.status(402).send((error).toString()));
        // editing contacts
        const id = req.params.id;
        Contact.destroy({
            where: {cliente_id: id}
        })
        .then(contactsDeleted => { console.log('Success deleting clients contacts!', contactsDeleted) })
        .catch(error =>  res.status(400).send((error).toString()))

        const contacts = req.body.contatos
        .map(contatos => ({
            cliente_id: id,
            nome:  contatos.nome,
            email: contatos.email,
            fone:  contatos.fone,
            skype: contatos.skype,
            main: contatos.main  
        }))

        Contact.bulkCreate(contacts)
        .then(contacts => {
            console.log('Sucesso criando contatos do cliente!', contacts),
            res.status(200).send((contacts).toString())
        })
        .catch(error =>  res.status(403).send((error).toString()))
    },
    destroy: (req, res) => {
        console.log("SERVER > CONTROLLER > cliente > destroy" );
        Client.destroy({
            where: { id: req.params.id},
            include: 
            [
                {model: Contact, as: 'contacts'},
                {model: Address, as: 'addresses'}
            ]
        })
        .then(clientDeleted => res.status(200).send((clientDeleted).toString()))
        .catch(error =>  res.status(400).send((error).toString()))
    },

}