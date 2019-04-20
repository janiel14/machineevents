module.exports = function(app) {
    const _self = {};
    const Events = app.models.events;

    /**
     * createOrUpdate
     * @params {Object} req
     * @params {Object} res
     * @route /api/events
     * @method POST
     */
    _self.createOrUpdate = async (req, res) => {
        try {
            req.checkBody('active', 'Not found active!').notEmpty();
            req.checkBody('code', 'Not found code!').notEmpty();
            req.checkBody('name', 'Not found name!').notEmpty();
            const errors = await req.asyncValidationErrors();
            if (errors) {
                res.status(500).json({
                    message: 'Params not found!',
                    data: errors
                });
            } else {
                const event = await Events.findOne({
                    name: req.body.name
                });
                if (event) {
                    event.active = req.body.active;
                    event.code = req.body.code;
                    event.updated_date = new Date();
                    await Events.updateOne({
                        name: req.body.name
                    }, event);
                    res.status(200).json({
                        message: 'Event updated!',
                        data: event
                    });
                } else {
                    req.body.created_date = new Date();
                    req.body.updated_date = req.body.created_date;
                    const newEvent = await Events.create(req.body);
                    res.status(200).json({
                        message: 'New event created!',
                        data: newEvent
                    });
                }
            }
        } catch (error) {
            console.error('app - controllers - Events - createOrUpdate: ', error);
            app.logger.error('app - controllers - Events - createOrUpdate: ' + error);
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
     * @route /api/events/:name
     * @method DELETE
     */
    _self.delete = async (req, res) => {
        try {
            await Events.deleteOne({
                name: req.params.name
            });
            res.status(200).json({
                message: 'Event deleted!',
                data: req.params
            });
        } catch (error) {
            console.error('app - controllers - Events - delete: ', error);
            app.logger.error('app - controllers - Events - delete: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: null
            });   
        }
    }

    /**
     * getEvent
     * @params {Object} req
     * @params {Object} res
     * @route /api/events/:name
     * @method GET
     */
    _self.getEvent = async (req, res) => {
        try {
            const event = Events.findOne({
                name: req.params.name
            });
            if (event) {
                res.status(200).json({
                    message: 'Event found!',
                    data: event
                });
            } else {
                res.status(200).json({
                    message: 'Event not found!',
                    data: null
                });
            }
        } catch (error) {
            console.error('app - controllers - Events - getEvent: ', error);
            app.logger.error('app - controllers - Events - getEvent: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: null
            }); 
        }
    }

    /**
     * getEvents
     * @params {Object} req
     * @params {Object} res
     * @route /api/events/:pag/:limit
     * @method GET
     */
    _self.getEvents = async (req, res) => {
        try {
            req.params.pag = isNaN(req.params.pag) ? 0 : req.params.pag;
            req.params.limit = isNaN(req.params.limit) ? 10 : req.params.limit;
            const eventCount = await Events.find().count();
            if (req.params.pag == 2) {
                req.params.pag = req.params.limit; 
            } else if (req.params.pag > 3) {
                req.params.pag = (parseInt(req.params.pag) * parseInt(req.params.limit));
            }
            const events = await Events.find()
                .skip(parseInt(req.params.pag))
                .limit(parseInt(req.params.limit))
                .sort({name: 1});
            res.status(200).json({
                message: 'Events found',
                data: events,
                total: eventCount
            });
        } catch (error) {
            console.error('app - controllers - Events - getEvents: ', error);
            app.logger.error('app - controllers - Events - getEvents: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: null
            }); 
        }
    }

    return _self;
}