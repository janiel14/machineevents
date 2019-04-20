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
- export NODE_MONGODB_HOST=${ip_couch_db} ex: 10.70.0.15:30017
- export NODE_MONGODB_USER=${user_couch_db} ex: root
- export NODE_MONGODB_PASS=${pass_couch_db} ex: m200k9
- export NODE_MONGODB_DBNAME=${dbname} ex: machineevents
- npm install
- bower install
- npm start

### How to deploy in Windows
- SET NODE_ENV=${enviroment} ex: production
- SET NODE_DEBUG=${debug} ex: false
- SET NODE_PORT=${port_run_app}
- SET NODE_MONGODB_HOST=${ip_couch_db} ex: 10.70.0.15:30017
- SET NODE_MONGODB_USER=${user_couch_db} ex: root
- SET NODE_MONGODB_PASS=${pass_couch_db} ex: m200k9
- SET NODE_MONGODB_DBNAME=${dbname} ex: machineevents
- npm install
- bower install
- npm start
