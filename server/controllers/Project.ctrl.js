// ===== Conttroler Projects.ctrl.JS ======
// ===== date:  2019-11-21           ======
//
const Project = require('../models/Project.model');
const Appointment = require('../models/Appointment.model');
const Op = require('Sequelize').Op;
const dateFormat = require('dateformat');


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
            .then(projects => { console.log('Sucesso obtendo projetos!'), res.status(200).json(projects) })
            .catch(error =>  res.status(400).json(error));
       
    },

    new: async (req, res) => {
        console.log("SERVER > CONTROLLER > project > new ");
        const newProject = Project.build(req.body,
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
            })
        await newProject.save()    
        .then(projects => { console.log('Resultado OK! ', res.status(200).send(projects).toString()),
              err => {console.log('Rejeitado! '), res.status(400).send((err).toString()) } })
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

    projectsEstado: (req, res) => {
        console.log("SERVER > CONTROLLER > projectsEstado");
        Project.findAll(
            { 
                where: { situacao: { [Op.in]: req.body } 
            },
            order: [ ['codigo', 'DESC'], ], })
            .then(projects => res.json(projects))
            .catch(error => console.log(error));
    },

    edit: (req, res) => {
        console.log("SERVER > CONTROLLER > project > edit");
        Project.findByPk(req.params.id)
        .then(project => {
            project.update(req.body)
            .then(res => { console.log('Resultado OK! '), res.json() },
                  err => {console.log('Rejeitado! ', err), res.json(err)})
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
        console.log("SERVER > CONTROLLER > getApptTimeUser");
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
    getListApptTimeUser: (req, res) => {
        console.log("SERVER > CONTROLLER > getListApptTimeUser");
        let form1 = dateFormat.masks.hammerTime = 'yyyy-mm-dd"T"00:00:000"Z"';
        let form2 = dateFormat.masks.hammerTime = 'yyyy-mm-dd"T"24:59:999"Z"';
        let inicio = dateFormat(req.body.inicio, form1);
        let fim = dateFormat(req.body.fim, form2);
        console.log(" INICIO : FIM ====> ", inicio, fim);
        Appointment.findAll({
            attributes: ['id', 'user_id', 'project_id', 'tipo', 'inicio', 'fim', 'valor_hh'],
            where: { 
                tipo:  'hora',
                user_id: {[Op.eq]: req.params.id},
                project_id:  {[Op.eq]: req.body.project_id},
                inicio: { 
                    [Op.and]: {
                        [Op.gte]: [ inicio ] ,
                        [Op.lte]: [ fim  ] } } },
                order: [ ['data', 'DESC'], ]  
            })
            .then(appt => res.status(200).json(appt))
            .catch(error =>  res.status(400).json(error))
    },
    getApptExpense: (req, res) => {
        console.log("SERVER > CONTROLLER > getApptExpense", req.body);
        let form1 = dateFormat.masks.hammerTime = 'yyyy-mm-dd"T"00:00:000"Z"';
        let form2 = dateFormat.masks.hammerTime = 'yyyy-mm-dd"T"24:59:999"Z"';
        let inicio = dateFormat(req.body.inicio, form1);
        let fim = dateFormat(req.body.fim, form2);
        if (req.body.project_id) {
            Appointment.findAll(
                {
                    attributes: ['id', 'user_id', 'project_id', 'tipo', 'descricao', 'valor', 'data', 'reembolso' ],
                    where: { 
                        tipo: req.body.tipo,
                        user_id: {[Op.eq]: req.body.user_id}, 
                        project_id: {[Op.eq]: req.body.project_id}, 
                        data: { 
                            [Op.and]: {
                                [Op.gte]: [ inicio ] ,
                                [Op.lte]: [ fim ] } }
                    },
                    order: [ ['data', 'DESC'], ]
                })
                .then(appt => res.status(200).json(appt))
                .catch(error =>  res.status(400).json(error))
        } else {
            Appointment.findAll(
                {
                    attributes: ['id', 'user_id', 'project_id', 'tipo', 'descricao', 'valor', 'data', 'reembolso' ],
                    where: { 
                        tipo: req.body.tipo,
                        user_id: {[Op.eq]: req.body.user_id}
                    }, 
                    order: [ ['data', 'DESC'], ]
                })
                .then(appt => res.status(200).json(appt))
                .catch(error =>  res.status(400).json(error))
        }
    },
    newAppt: async (req, res) => {
        console.log("SERVER > CONTROLLER > newAppt ");

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
            .then(appt => { console.log('Resultado OK! '), res.json(appt) },
            err => {console.log('Rejeitado! ', err), res.json(err)})
            .catch(err => {
                console.log('Ocorreu erro salvando appt', err),
                res.json(err)
      })

    },
    closeAppt: (req, res) => {
        console.log("SERVER > CONTROLLER > closeAppt() ");
        Appointment.update( 
            {fim: req.body.fim},
            {where: { id: req.params.id } })
            .then(projeto => res.json(projeto))
            .catch(error => console.log(error));
    },
    getTotalAppts: (req, res) => {
        console.log("SERVER > CONTROLLER > getTotalAppts");
        Appointment.findAll({
            attributes: ['id', 
                         'user_id', 
                         'project_id', 
                         'tipo', 
                         'valor_hh', 
                         'inicio', 
                         'fim', 
                         'descricao', 
                         'valor', 
                         'data',
                         'reembolso' ],
            where: 
            { 
                project_id:  {[Op.eq]: req.params.id}, 
                [Op.or]: 
                    [
                        {
                            [Op.and]: 
                                {
                                    tipo: { [Op.eq]: 'hora' },
                                    fim: { [Op.ne]: ''} 
                                }
                        },
                        { tipo: { [Op.eq]: 'despesa' } }
                    ] 
            } 
            })
            .then(appt => res.status(200).json(appt))
            .catch(error =>  res.status(400).json(error))
    },

}