## react-guacamoli
UI for HKUST25 Guacamoli Project

Deployed on HKUST ITSC server pvs0087.ust.hk (www.guacamoli.ust.hk)

## Deployment Process
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

sudo stop guacamoli-image-service
sudo start guacamoli-image-service
```
## Server Management
edit service configuration file:
```sh
sudo vim /etc/init/guacamoli.conf
sudo vim /etc/init/guacamoli-image-service.conf
```

view log history:
```sh
tail -100 /var/log/node.log
tail -100 /var/log/image-service.log
```

access Postgres Database:
```sh
psql
\d meal
\q
```

Backup & Restore Database:
```sh
cd /home/guacamoli/database_backup
pg_dump guacamoli > backup_filename
psql guacamoli < backup_filename
```
