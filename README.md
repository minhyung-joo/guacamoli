## react-guacamoli
UI for HKUST25 Guacamoli Project

Deployed on HKUST ITSC server, <pvs0087.ust.hk> <(www.guacamoli.ust.hk)>

## Deployment
### SSH into server
```sh
ssh guacamoli@pvs0087.ust.hk
cd guacamoli
```

### pull from github
```sh
git pull
```

### set to production mode
**make sure that production mode is set**
navigate to `server.js` in app root directory, and set
`RUNNING_ON_ITSC_SERVER = true;` 

### restart service
```sh
sudo stop guacamoli
sudo start guacamoli
```

in order to setup configuration,
```sh
vim /etc/init.guacamoli.conf
```
and edit the configuration script

to view logs,
```sh
tail -[#of lines] /var/log/node.log
```

