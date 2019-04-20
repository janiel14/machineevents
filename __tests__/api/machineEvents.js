const frisby = require('frisby');
const _host = process.env.NODE_PORT == null ? `http://localhost:7000` : `http://localhost:${process.env.NODE_PORT}`;
it('should be a create MachineEvents, edit MachineEvents, get MachineEvents and delete MachineEvents', function() {
    return frisby.get(`${_host}/api/machineevents/PCX123/0/100`).expect('status', 200);
});