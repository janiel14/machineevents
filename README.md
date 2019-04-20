# machineevents
project web for monit and take events to the machines control

### Requirements
- Node JS >=10.15
- MongoDB >=4.0.0
- npm install -g bower

### How to deploy in Linux
- export NODE_ENV=${enviroment} ex: production
- export NODE_DEBUG=${debug} ex: false
- export NODE_PORT=${port_run_app}
- export NODE_MONGO_HOST=${ip} ex: 10.22.0.3
- export NODE_MONGO_PORT=${port} ex 27017
- export NODE_MONGO_USER=${user} ex: machineevents
- export NODE_MONGO_PASS=${pass} ex: a1sd23f1a3ds2
- export NODE_MONGO_DBNAME=${dbname} ex: machineevents
- npm install
- bower install
- npm start

### How to deploy in Windows
- SET NODE_ENV=${enviroment} ex: production
- SET NODE_DEBUG=${debug} ex: false
- SET NODE_PORT=${port_run_app}
- SET NODE_MONGO_HOST=${ip} ex: 10.22.0.3
- SET NODE_MONGO_PORT=${port} ex 27017
- SET NODE_MONGO_USER=${user} ex: machineevents
- SET NODE_MONGO_PASS=${pass} ex: a1sd23f1a3ds2
- SET NODE_MONGO_DBNAME=${dbname} ex: machineevents
- npm install
- bower install
- npm start
