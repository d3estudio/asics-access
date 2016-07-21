# asics-access

## Running
`docker` and `docker-compose` is required in order to get this up and running. First, build it up using `docker-compose build`, then fire it up through `docker-compose up`. An nginx instance should be available in your port 80 after the process is completed.

***

## ENV / CONFIG FILES
nginx/.htpasswd
	`user:pass`

db/.env
	`POSTGRES_USER=xxx
	POSTGRES_PASSWORD=xxx`

pgbkp/.env
	`AWS_ACCESS_KEY_ID=XXX
	AWS_SECRET_ACCESS_KEY=XXX`

web/.env
	`RAILS_LOG_TO_STDOUT=true
	SECRET_TOKEN=XXX
	MAILGUN_PASSWORD=XXX
	PASSBOOK_CERTIFICATE_PASSWORD=XXX`
	
web/config/valid_tokens
	`- 'XXX'
	- 'XXX'`

***

## db admin

If server is not configured yet:
- `http://asicshub.com.br:2052/`
- click in *Add New Server*
- put any value on *Name* (e.g. Asics)
- click on tab *Connection*
- fill *Host Name/Address* field with `db`
- ~~change username and password~~

After configuring server:
- `http://asicshub.com.br:2052/`
- in the left panel: `Server > Asics > Databases > production > Schemas > public > tables > guests|logs`
- right click on table and: `View Data > View All Rows`
