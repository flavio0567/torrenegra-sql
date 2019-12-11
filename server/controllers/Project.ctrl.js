// ===== Conttroler Projects.ctrl.JS ======
// ===== date:  2019-11-21           ======
//
const Project = require('../models/Project.model');
const Appointment = require('../models/Appointment.model');
const Op = require('Sequelize').Op;
const Sequelize = require('sequelize');

module.exports = { 
    list: (req, res) => {
        console.log("SERVER > CONTROLLER > project > list");
        Project.findAll({ 
           attributes: ['id',
                        'codigo', 
                        'descricao', 
                        'cliente_id', 
                        'pedido', 
                        'situacao'],
            where: { situacao: { [Op.in]: [0, 1, 2] } }, 
            order: [ ['codigo', 'DESC'], ], })
            .then(project => res.status(200).json(project))
            .catch(error =>  res.status(400).json(error))
    },

    new: (req, res) => {
        console.log("SERVER > CONTROLLER > project > new ");
        const project = Project.build(req.body,
            {
            fields: ['id',
                     'codigo',
                     'descricao', 
                     'cliente_id', 
                     'pedido', 
                     'valor_pedido', 
                     'horas_plc', 
                     'horas_ihm', 
                     'valor_terceiros', 
                     'valor_materiais', 
                     'valor_viagens', 
                     'bloquear_apontamento', 
                     'situacao']
            }).save()
        .then(res => { console.log('R E S U L T A D O - O K ', res.json()) },
          err => {console.log('R E J E I T A D O ', err), res.json(err)})
        .catch(err => {
            console.log('Ocorreu erro salvando projeto', err),
            res.json(err)
        })
    },

    getProjectByPk: function(req, res) {
        console.log("SERVER > CONTROLLER > getProjectByPk ");
        Project.findAll({ 
            attributes: ['id',
                        'codigo',
                        'descricao', 
                        'cliente_id', 
                        'pedido', 
                        'valor_pedido', 
                        'horas_plc', 
                        'horas_ihm', 
                        'valor_terceiros', 
                        'valor_materiais', 
                        'valor_viagens', 
                        'bloquear_apontamento', 
                        'situacao'],
            where: { id: req.params.id},
            include: 
                [
                    {model: Appointment, as: 'appointments'}
                ]
        })
        .then(project => res.status(200).send(project).toString())
        .catch(error =>  res.status(400).send((error).toString())
        )
    },

    projetosEstado: (req, res) => {
        console.log("SERVER > CONTROLLER > project > estados");
        Projeto.find({ situacao: { [Op.eq]: req.body },
        order: [ ['codigo', 'DESC'], ], })
            .then(projeto => res.json(projeto))
            .catch(error => console.log(error));
    },

    edit: (req, res) => {
        console.log("SERVER > CONTROLLER > project > edit");
        Project.findByPk(req.params.id)
        .then(project => {
            project.update(req.body)
            .then(project => 
                console.log('Success updating project!'),
                res.status(200).json())
            .catch(error =>  res.status(400).send((error).toString()))
        })
        .catch(error =>  res.status(401).send((error).toString()))
    }, 
    
    changeSituationProject: (req, res) => {
        console.log("SERVER > CONTROLLER > changeSituationProject");
        Project.update( 
            { situacao: req.body },
            { where: { id: req.params.id } })
            .then(project => {
                // console.log('sucesso salvando situação do projeto'),
                res.json(project) } )
            .error(error => {
                console.log('Ocorreu erro salvando situação do projeto'),
                handleError(error) });
    },

    // obterApontamentoHoraPorUsuario: (req, res) => {
    //     console.log("SERVER > CONTROLLER > obterApontamentoHoraPorUsuario");
    //     // Apontamento.find({ $and: [ { tipo : { $eq: ['hora'] } }, { 'hora.inicio': { $ne: [''] } }, { 'hora.fim': { $eq: [''] }}, { usuario: { $eq: ['usuario']} } ] })
    //     // Apontamento.find({ $and: [ { 'hora.inicio': { $ne: [''] } }, { 'hora.fim': { $eq: [''] }}, { usuario: { $eq: [req.query.usuario]} } ] })
    //     Apontamento.find({ tipo : 'hora', 'hora.fim': '', usuario: req.query.usuario })
    //         .populate('apontamentos') 
    //         .exec(function (err, apontamento) {
    //             if (err) return handleError(err);
    //             console.log('sucesso obtendo apontamentos ');
    //             res.json(apontamento);
    //         })
    // },
    // obterApontamento: (req, res) => {
    //     console.log("SERVER > CONTROLLER > obterApontamento > req.body", req.body);
    //     // console.log('projeto: ', ObjectId(req.body._projetoId), 'email:', req.body.email, 'data1:', req.body.data1, 'data2:', req.body.data2);
    //     if (req.body._projetoId) {
    //         // Apontamento.find({ $and: [ { usuario: {$eq: req.query.email }}, { _projeto: ObjectId(req.query._projetoId) }, { tipo : 'hora' }, { 'hora.inicio': { $gte: req.query.data1 }  },  { 'hora.inicio': { $lte: req.query.data2 }  }, { 'hora.fim': { $ne: [''] }} ] })
    //         // Apontamento.find({ $and: [ { usuario: {$eq: req.body.email }}, { _projeto: ObjectId(req.body._projetoId) }, { tipo : req.body.tipo } ] })
    //         Apontamento.find({tipo : req.body.tipo,  usuario: {$eq: req.body.email}, _projeto: ObjectId(req.body._projetoId), 'hora.inicio': { $gte: (req.body.data1), $lte: (req.body.data2) }  })
    //         .populate('apontamentos') 
    //         .exec(function (err, apontamento) {
    //             console.log('Os apontamentos são %s', apontamento);
    //             res.json(apontamento);
    //         })
    //         .catch(error => console.log(error));  
    //     } else {
    //         // Apontamento.find({ $and: [ { usuario: {$eq: req.query.email }}, { _projeto: req.query._projetoId }, { tipo : 'hora' }, { 'hora.inicio': { $gte: req.query.data1 }  },  { 'hora.inicio': { $lte: req.query.data2 }  }, { 'hora.fim': { $ne: [''] }} ] })
    //         Apontamento.find({ $and: [ { usuario: {$eq: req.body.email }}, { tipo : req.body.tipo }, { 'hora.inicio': { $gte: (req.body.data1), $lte: (req.body.data2) } } ] })
    //             .populate('apontamentos') 
    //             .exec(function (err, apontamento) {
    //                 // if (err) return handleError(err);
    //                 console.log('sucesso obtendo apontamentos hora ');
    //                 res.json(apontamento);
    //             })
    //             .catch(error => console.log(error));
    //     }
    // },
    // obterApontamentoDespesaPorUsuario: (req, res) => {
    //     console.log("SERVER > CONTROLLER > obterApontamentoDespesaPorUsuario", req.body);
    //     // Apontamento.find({ $and: [ { tipo : { $eq: ['despesa'] } }, { usuario: { $eq: [req.query.usuario]} } ] } )
    //     if (req.body._projetoId) {
    //         Apontamento.find({tipo : req.body.tipo,  usuario: {$eq: req.body.email}, _projeto: ObjectId(req.body._projetoId), 'despesa.data': { $gte: (req.body.data1), $lte: (req.body.data2) }  })
    //         .populate('apontamentos') 
    //         .exec(function (err, apontamento) {
    //             console.log('Os apontamentos são %s', apontamento);
    //             res.json(apontamento);
    //         })
    //         .catch(error => console.log(error));  
    //     } else {
    //         Apontamento.find({ $and: [ { usuario: {$eq: req.body.email }}, { tipo : req.body.tipo }, { 'despesa.data': { $gte: (req.body.data1), $lte: (req.body.data2) } } ] })
    //             .populate('apontamentos') 
    //             .exec(function (err, apontamento) {
    //                 // if (err) return handleError(err);
    //                 console.log('sucesso obtendo apontamentos despesa ');
    //                 res.json(apontamento);
    //             })
    //             .catch(error => console.log(error));
    //     }
    // },
    // obterApontamentoTotal: (req, res) => {
    //     console.log("SERVER > CONTROLLER > obterApontamentoTotalHora");
    //     Apontamento.find( { $and: [{ _projeto: req.params.id }, { $or: [{ tipo: 'hora'}, { 'hora.fim' : { $ne: '' } },  {tipo: 'despesa'} ] }  ] } )
    //         .then(apontamentos => res.json(apontamentos))
    //         .catch(error => console.log(error));
    // },
    // apontamentoNovo: (req, res) => {
    //     console.log("SERVER > CONTROLLER > apontamentoNovo ");
    //     Projeto.findOne({_id: req.params.id}, function (err, projeto){
    //         let apontamento = new Apontamento(req.body);
    //         apontamento._projeto = req.params.id;
    //         projeto.apontamentos = projeto.apontamentos.concat([apontamento]);            
    //         apontamento.save(function(err, apontamento){
    //             if(err){
    //                 console.log('Ocorreu um erro salvando apontamento ', err);
    //                 res.json(err);
    //             } else {
    //                 projeto.save(function(err, projeto){
    //                     if(err){
    //                         console.log('Erro salvando projeto após apontamento', err);
    //                         res.json(err);
    //                     } else {
    //                         console.log('Apontamento registrado com sucesso!');
    //                         res.json(projeto);
    //                     };
    //                 });
    //             };
    //         });
    //     });
    // },
    
    // encerrarApontamento: (req, res) => {
    //     console.log("SERVER > CONTROLLER > encerrar apontamento " );
    //     Apontamento.findOneAndUpdate( { _id: req.params.id }, { 'hora.fim': req.body.fim  })
    //         .then(projeto => res.json(projeto))
    //         .catch(error => console.log(error));
    // }

}