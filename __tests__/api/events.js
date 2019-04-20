const frisby = require('frisby');
const _host = process.env.NODE_PORT == null ? `http://localhost:7000` : `http://localhost:${process.env.NODE_PORT}`;
it('should be a create events, edit events, get events and delete events', function() {
    return frisby.setup({
        request: {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }
    }).post(`${_host}/api/events`, {
        body: 'active=Y&code=0123&name=SHUTDOWN'
    }).expect('status', 200).then(function(response) {
        return frisby.get(`${_host}/api/events/0/100`).expect('status', 200).then(function(res) {
            return frisby.get(`${_host}/api/events/SHUTDOWN`).expect('status', 200).then(function(res) {
                return frisby.del(`${_host}/api/events/SHUTDOWN`).expect('status', 200);
            });
        });
    });
});