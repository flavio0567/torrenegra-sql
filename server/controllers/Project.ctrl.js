// ===== Conttroler Projects.ctrl.JS ======
// ===== date:  2019-11-21           ======
//
const Project = require('../models/Project.model');
const Appointment = require('../models/Appointment.model');
const Op = require('Sequelize').Op;

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
            .then(res => { console.log('R E S U L T A D O - O K ') },
                  err => {console.log('R E J E I T A D O ', err), res.json(err)})
            .catch(err => {
                 {console.log('Ocorreu erro editando projeto', err), res.json(err)}
            })
        .catch(error =>  res.status(401).send((error).toString()))
        })
    }, 
    
    changeSituationProject: (req, res) => {
        console.log("SERVER > CONTROLLER > changeSituationProject");
        Project.update( 
            { situacao: req.body },
            { where: { id: req.params.id } })
            .then(project => { res.json(project) } )
            .error(error => {
                console.log('Ocorreu erro salvando situação do projeto'),
                handleError(error) });
    },

    getApptTimeUser: (req, res) => {
        console.log("SERVER > CONTROLLER > getApptTimeUser",req.params.id);
        Appointment.findAll({
            attributes: ['id', 'user_id', 'project_id', 'tipo', 'inicio', 'fim', 'valor_hh'],
            where: { 
                tipo:  'hora',
                user_id: {[Op.eq]: req.params.id}, 
                fim:     {[Op.eq]: ""}  } 
            })
            .then(appt => res.status(200).json(appt))
            .catch(error =>  res.status(400).json(error))
    },
    appointments: (req, res) => {
        console.log("SERVER > CONTROLLER > obterApontamento > req.body", req.body);
        console.log('projeto: ', ObjectId(req.body._projetoId), 'email:', req.body.email, 'data1:', req.body.data1, 'data2:', req.body.data2);
        // if (req.body._projetoId) {
        //     Apontamento.find({tipo : req.body.tipo,  usuario: {$eq: req.body.email}, _projeto: ObjectId(req.body._projetoId), 'hora.inicio': { $gte: (req.body.data1), $lte: (req.body.data2) }  })
        //     .populate('apontamentos') 
        //     .exec(function (err, apontamento) {
        //         console.log('Os apontamentos são %s', apontamento);
        //         res.json(apontamento);
        //     })
        //     .catch(error => console.log(error));  
        // } else {
        //     Apontamento.find({ $and: [ { usuario: {$eq: req.body.email }}, { tipo : req.body.tipo }, { 'hora.inicio': { $gte: (req.body.data1), $lte: (req.body.data2) } } ] })
        //         .populate('apontamentos') 
        //         .exec(function (err, apontamento) {
        //             // if (err) return handleError(err);
        //             console.log('sucesso obtendo apontamentos hora ');
        //             res.json(apontamento);
        //         })
        //         .catch(error => console.log(error));
        // }
    },
    getApptExpense: (req, res) => {
        console.log("SERVER > CONTROLLER > getApptExpense");
        if (req.body.project_id) {
            Appointment.findAll(
                {
                    attributes: ['id', 'user_id', 'project_id', 'tipo', 'descricao', 'valor', 'data', 'reembolso' ],
                    where: { 
                        tipo: req.body.tipo,
                        user_id: {[Op.eq]: req.body.user_id}, 
                        project_id: {[Op.eq]: req.body.project_id}, 
                        data: { [Op.in]: [req.body.data1, req.body.data2] }
                }
                })
                .then(appt => { console.log('R E S U L T A D O - O K ', res.json(appt)) },
                      err => {console.log('R E J E I T A D O ', err), err.json(err)})
                .catch(error => res.status(400).json(error))  
        } else {
            Appointment.findAll(
                {
                    attributes: ['id', 'user_id', 'project_id', 'tipo', 'descricao', 'valor', 'data', 'reembolso' ],
                    where: { 
                        tipo: req.body.tipo,
                        user_id: {[Op.eq]: req.body.user_id}, 
                        // data: { [Op.in]: [req.body.data1, req.body.data2] }
                }
                })
                .then(appt => res.json(appt))
                .catch(error => console.log(error));
        }
    },
    // obterApontamentoTotal: (req, res) => {
    //     console.log("SERVER > CONTROLLER > obterApontamentoTotalHora");
    //     Apontamento.find( { $and: [{ _projeto: req.params.id }, { $or: [{ tipo: 'hora'}, { 'hora.fim' : { $ne: '' } },  {tipo: 'despesa'} ] }  ] } )
    //         .then(apontamentos => res.json(apontamentos))
    //         .catch(error => console.log(error));
    // },
    newAppt: async (req, res) => {
        console.log("SERVER > CONTROLLER > newAppt ", req.body);

        const appt = Appointment.build(req.body,
            {
                fields: ['id',
                        'valor_hh',
                        'inicio',
                        'fim',
                        'descricao',
                        'valor',
                        'data',
                        'reembolso',
                        'project_id',
                        'user_id']
            }).save()
            .then(appt => { console.log('R E S U L T A D O - O K ') },
            err => {console.log('R E J E I T A D O ', err), res.json(err)})
            .catch(err => {
                console.log('Ocorreu erro salvando appt', err),
                res.json(err)
      })

    },
    
    closeAppt: (req, res) => {
        console.log("SERVER > CONTROLLER > closeAppt() " , req.params.id, req.body.fim);
        Appointment.update( 
            {fim: req.body.fim},
            {where: { id: req.params.id } })
            .then(projeto => res.json(projeto))
            .catch(error => console.log(error));
    }

}