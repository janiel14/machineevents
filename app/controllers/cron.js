module.exports = function(app) {
    const _self = {};
    const Cron = app.models.cron;

    /**
     * createOrUpdate
     * @params {Object} req
     * @params {Object} res
     * @route /api/cron
     * @method POST
     */
    _self.createOrUpdate = async (req, res) => {
        try {
            req.checkBody('time', 'Not found time!').notEmpty();
            const errors = await req.asyncValidationErrors();
            if (errors) {
                res.status(500).json({
                    message: 'Params not found!',
                    data: errors
                });
            } else {
                const cron = await Cron.findOne({
                    id: 1
                });
                if (cron) {
                    cron.time = req.body.time;
                    cron.updated_date = new Date();
                    await Cron.updateOne({
                        id: 1
                    }, cron);
                    res.status(200).json({
                        message: 'Cron updated!',
                        data: cron
                    });
                } else {
                    req.body.id = 1;
                    req.body.created_date = new Date();
                    req.body.updated_date = req.body.created_date;
                    const newCron = await Cron.create(req.body);
                    res.status(200).json({
                        message: 'New cron created!',
                        data: newCron
                    });
                }
            }
        } catch (error) {
            console.error('app - controllers - cron - createOrUpdate: ', error);
            app.logger.error('app - controllers - cron - createOrUpdate: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: null
            });
        }
    }

    /**
     * getCron
     * @params {Object} req
     * @params {Object} res
     * @route /api/cron
     * @method GET
     */
    _self.getCron = async (req, res) => {
        try {
            const cron = await Cron.findOne({
                id: 1
            });
            res.status(200).json({
                message: 'get a cron',
                data: cron
            });
        } catch (error) {
            console.error('app - controllers - cron - getCron: ', error);
            app.logger.error('app - controllers - cron - getCron: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: null
            });
        }
    }

    return _self;
}