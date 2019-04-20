const frisby = require('frisby');
const _host = process.env.NODE_PORT == null ? `http://localhost:7000` : `http://localhost:${process.env.NODE_PORT}`;
it('should be a post cron', function() {
    return frisby.setup({
        request: {
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }
    }).post(`${_host}/api/cron`, {
        body: 'time=1'
    }).expect('status', 200)
});