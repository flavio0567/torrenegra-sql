// ===== Conttroler Projects.ctrl.JS ======
// ===== date:  2019-11-21           ======
//
const Project = require('../models/Project.model');
const Client  = require('../models/Client.model'); 

module.exports = { 
    list: (req, res) => {
        console.log("SERVER > CONTROLLER > project > list");
        Project.findAll({ 
           attributes: ['id','codigo', 'descricao', 'pedido', 'situacao'],
            // attributes: ['id', 'codigo', 'descricao', '_clienteId', 'pedido', 'situacao' ],
            where: { situacao: { $contains: [0, 1, 2] } }, 
            order: [ ['codigo', 'DESC'], ], })
            .then(project => res.json(project))
            .catch(error => console.log(error));
    },
    new: async (req, res) => {
        console.log("SERVER > CONTROLLER > project > new > req.body");
        const project = await Project.create({
            fields: ['codigo',
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
            })
            .then( 
                console.log('sucesso savando projeto'),
                res.json(project)
             )
            .catch(
                console.log('Ocorreu erro salvando projeto', err),
                res.json(err)
            )
    },
    getProjectByPk: function(req, res) {
        console.log("SERVER > CONTROLLER > getProjectByPk ", req.params.id);
        // Project.findByPk({id: req.params.id})
        // .populate('apontamentos')
        // .then(project => res.json(project))
        // .catch(error => console.log(error));
    },
    // projetosEstado: (req, res) => {
    //     console.log("SERVER > CONTROLLER > projeto > estados", req.body);
    //     Projeto.find({ situacao: { $in: req.body } }).sort({ 'codigo': -1 })
    //         .then(projeto => res.json(projeto))
    //         .catch(error => console.log(error));
    // },

    // edit: (req, res) => {
    //     console.log("SERVER > CONTROLLER > projeto > edit");
    //     Projeto.findOne({
    //         _id: req.body._id
    //     }, function (err, eProjeto) {
    //         if (err) {
    //             console.log('Ocorreu erro lendo projeto antes da edição', err);
    //         } else { 
    //             eProjeto.descricao  = req.body.descricao;
    //             eProjeto._clienteId = req.body._clienteId;
    //             eProjeto.pedido     = req.body.pedido;
    //             eProjeto.valorPedido = req.body.valorPedido;   
    //             eProjeto.horasPLC   = req.body.horasPLC;
    //             eProjeto.horasIHM   = req.body.horasIHM;
    //             eProjeto.valorTerceiros = req.body.valorTerceiros;   
    //             eProjeto.valorMateriais = req.body.valorMateriais; 
    //             eProjeto.valorViagens   = req.body.valorViagens;   
    //             eProjeto.save(function(err, result){
    //                 if(err) {
    //                     console.log('Ocorreu erro salvando projeto', err);
    //                     res.json(err);
    //                 } else { 
    //                     console.log('sucesso savando projeto');
    //                     res.json(result);
    //                 };
    //             });
    //         };
    //     });
    // },  
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

    // changeSituationProject: (req, res) => {
    //     console.log("SERVER > CONTROLLER > changeSituationProject");
    //     Project.update( 
    //         { situacao: req.body },
    //         { where: { id: req.params.id } })
    //         .success(project => 
    //             console.log('sucesso salvando situação do projeto'),
    //             res.json(project))
    //         .error(error => 
    //             console.log('Ocorreu erro salvando situação do projeto'),
    //             handleError(error));
    // },
    
    // encerrarApontamento: (req, res) => {
    //     console.log("SERVER > CONTROLLER > encerrar apontamento " );
    //     Apontamento.findOneAndUpdate( { _id: req.params.id }, { 'hora.fim': req.body.fim  })
    //         .then(projeto => res.json(projeto))
    //         .catch(error => console.log(error));
    // }

}