module.exports = function(app) {
    const _self = {};
    const MachineEvents = app.models.machineEvents;
    const Events = app.models.events;

    /**
     * getMachineEvents
     * @params {Object} req
     * @params {Object} res
     * @route /api/machineevents/:machine/:pag/:limit
     * @method GET
     */
    _self.getMachineEvents = async (req, res) => {
        try {
            req.params.pag = isNaN(req.params.pag) ? 0 : req.params.pag;
            req.params.limit = isNaN(req.params.limit) ? 10 : req.params.limit;
            const eventsCount = await MachineEvents.find({
                machine: req.params.machine
            }).countDocuments();
            if (req.params.pag == 2) {
                req.params.pag = req.params.limit; 
            } else if (req.params.pag > 3) {
                req.params.pag = (parseInt(req.params.pag) * parseInt(req.params.limit));
            }
            const eventsDetails = [];
            const machineEvents = await MachineEvents.find({
                machine: req.params.machine
            })
                .skip(parseInt(req.params.pag))
                .limit(parseInt(req.params.limit))
                .sort({created_date: -1});
            if (machineEvents.length > 0) {
                await Promise.all(machineEvents.map(async (item) => {
                    const event = await Events.findOne({
                        code: item.code
                    });
                    eventsDetails.push({
                        event: event,
                        detail: item
                    });
                }));
            }
            res.status(200).json({
                message: 'Machine events found',
                data: eventsDetails,
                total: eventsCount
            });
        } catch (error) {
            console.error('app - controllers - machineEvents - getMachineEvents: ', error);
            app.logger.error('app - controllers - machineEvents - getMachineEvents: ' + error);
            res.status(500).json({
                message: 'Internal server error',
                data: null
            }); 
        }
    }

    return _self;
}