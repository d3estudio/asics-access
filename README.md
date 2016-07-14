# asics-access

## Running
`docker` and `docker-compose` is required in order to get this up and running. First, build it up using `docker-compose build`, then fire it up through `docker-compose up`. An nginx instance should be available in your port 80 after the process is completed.

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
- in the left panel: `Server > Asics > Databases > production > Schemas > public > tables > guests|logs`
- right click on table and: `View Data > View All Rows`
