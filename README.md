## react-guacamoli
UI for HKUST25 Guacamoli Project

Deployed on HKUST ITSC server pvs0087.ust.hk (www.guacamoli.ust.hk)

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
**make sure that production mode is set!!**
navigate to `server.js` in app root directory, and set</br>
`RUNNING_ON_ITSC_SERVER = true;`</br>
else, node app assumes that it is running on local or heroku testing environment.

### restart service
```sh
sudo stop guacamoli
sudo start guacamoli
```

edit service configuration file:
```sh
vim /etc/init/guacamoli.conf
```

view service log:
```sh
tail -[no. of lines] /var/log/node.log
```
