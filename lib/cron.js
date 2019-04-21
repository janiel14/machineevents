module.exports = function(app) {
    const _self = {};
    const Cron = app.models.cron;
    const Machines = app.models.machines;
    const Events = app.models.events;
    const MachineEvents = app.models.machineEvents;

    /**
     * getCron
     * @return {Object} cron
     */
    const getCron = async () => {
        try {
            return await Cron.findOne({
                id: 1
            });
        } catch (error) {
            console.error('lib - cron - getCron: ', error);
            throw error;
        }
    }

    /**
     * getMachines
     * @return {Array} machines
     */
    const getMachines = async () => {
        try {
            return await Machines.find({
                active: 'Y'
            });
        } catch (error) {
            console.error('lib - cron - getMachines: ', error);
            throw error;
        }
    }

    /**
     * getRandomEvent
     * @return {Object} event
     */
    const getRandomEvent = async () => {
        try {
            const count = await Events.find({
                active: 'Y'
            }).countDocuments();
            const skip = Math.floor(Math.random() * count);
            return await Events.findOne().skip(skip);
        } catch (error) {
            console.error('lib - cron - getRandomEvent: ', error);
            throw error;
        }
    }

    /**
     * init
     */
    _self.init = async () => {
        try {
            const cron = await getCron();
            const machines = await getMachines();
            if (machines.length > 0) {
                Promise.all(machines.map(async (machine) => {
                    const event = await getRandomEvent();
                    if (event) {
                        machine.status = event.name;
                        machine.updated_date = new Date();
                        await Machines.updateOne({
                            name: machine.name
                        }, machine);
                        await MachineEvents.create({
                            created_date: new Date(),
                            machine: machine.name,
                            code: event.code
                        });
                    }
                }));
            }
            if (cron) {
                setTimeout(() => {
                    _self.init();
                }, (parseInt(cron.time)*60)*1000);
            } else {
                setTimeout(() => {
                    _self.init();
                }, 60000); //restart in 1 minute
            }
        } catch (error) {
            console.error('lib - cron - init: ', error);
            setTimeout(() => {
                _self.init();
            }, 60000); //restart in 1 minute
        }
    }

    return _self;
}