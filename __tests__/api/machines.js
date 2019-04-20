const frisby = require('frisby');
const _host = process.env.NODE_PORT == null ? `http://localhost:7000` : `http://localhost:${process.env.NODE_PORT}`;
it('should be a create machines, edit machines, get machines and delete machines', function() {
    return frisby.setup({
        request: {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }
    }).post(`${_host}/api/machines`, {
        body: 'active=Y&status=SHUTDOWN&name=PC123'
    }).expect('status', 200).then(function(response) {
        return frisby.get(`${_host}/api/machines/0/100`).expect('status', 200).then(function(res) {
            return frisby.get(`${_host}/api/machines/PC123`).expect('status', 200).then(function(res) {
                return frisby.del(`${_host}/api/machines/PC123`).expect('status', 200);
            });
        });
    });
});