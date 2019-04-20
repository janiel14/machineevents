module.exports = function(app) {
    const _self = {};
    const Machines = app.models.machines;

    /**
     * createOrUpdate
     * @params {Object} req
     * @params {Object} res
     * @route /api/machines
     * @method POST
     */
    _self.createOrUpdate = async (req, res) => {
        try {
            req.checkBody('active', 'Not found active!').notEmpty();
            req.checkBody('status', 'Not found status!').notEmpty();
            req.checkBody('name', 'Not found name!').notEmpty();
            const errors = await req.asyncValidationErrors();
            if (errors) {
                res.status(500).json({
                    message: 'Params not found!',
                    data: errors
                });
            } else {
                const machine = await Machines.findOne({
                    name: req.body.name
                });
                if (machine) {
                    machine.active = req.body.active;
                    machine.status = req.body.status;
                    machine.updated_date = new Date();
                    await Machines.updateOne({
                        name: req.body.name
                    }, machine);
                    res.status(200).json({
                        message: 'Machine updated!',
                        data: machine
                    });
                } else {
                    req.body.created_date = new Date();
                    req.body.updated_date = req.body.created_date;
                    const newMachine = await Machines.create(req.body);
                    res.status(200).json({
                        message: 'New machine created!',
                        data: newMachine
                    });
                }
            }
        } catch (error) {
            console.error('app - controllers - machines - createOrUpdate: ', error);
            app.logger.error('app - controllers - machines - createOrUpdate: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: null
            });
        }
    }

    /**
     * delete
     * @params {Object} req
     * @params {Object} res
     * @route /api/machines/:name
     * @method DELETE
     */
    _self.delete = async (req, res) => {
        try {
            await Machines.deleteOne({
                name: req.params.name
            });
            res.status(200).json({
                message: 'Machine deleted!',
                data: req.params
            });
        } catch (error) {
            console.error('app - controllers - machines - delete: ', error);
            app.logger.error('app - controllers - machines - delete: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: null
            });   
        }
    }

    /**
     * getMachine
     * @params {Object} req
     * @params {Object} res
     * @route /api/machines/:name
     * @method GET
     */
    _self.getMachine = async (req, res) => {
        try {
            const machine = Machines.findOne({
                name: req.params.name
            });
            if (machine) {
                res.status(200).json({
                    message: 'Machine found!',
                    data: machine
                });
            } else {
                res.status(200).json({
                    message: 'Machine not found!',
                    data: null
                });
            }
        } catch (error) {
            console.error('app - controllers - machines - getMachine: ', error);
            app.logger.error('app - controllers - machines - getMachine: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: null
            }); 
        }
    }

    /**
     * getMachines
     * @params {Object} req
     * @params {Object} res
     * @route /api/machines/:pag/:limit
     * @method GET
     */
    _self.getMachines = async (req, res) => {
        try {
            req.params.pag = isNaN(req.params.pag) ? 0 : req.params.pag;
            req.params.limit = isNaN(req.params.limit) ? 10 : req.params.limit;
            const machineCount = await Machines.find().count();
            if (req.params.pag == 2) {
                req.params.pag = req.params.limit; 
            } else if (req.params.pag > 3) {
                req.params.pag = (parseInt(req.params.pag) * parseInt(req.params.limit));
            }
            const machines = await Machines.find()
                .skip(parseInt(req.params.pag))
                .limit(parseInt(req.params.limit))
                .sort({name: 1});
            res.status(200).json({
                message: 'Machines found',
                data: machines,
                total: machineCount
            });
        } catch (error) {
            console.error('app - controllers - machines - getMachines: ', error);
            app.logger.error('app - controllers - machines - getMachines: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: null
            }); 
        }
    }

    return _self;
}