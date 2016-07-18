echo INITIALIZING DEPLOY

ssh asics@107.170.123.42 <<'ENDSSH'
echo ENTERING FOLDER
cd asics-access
echo STOPPING INSTANCES
docker-compose stop
echo PULLING UPDATES FROM GIT MASTER
git pull -f
echo BUILDING DOCKER INSTANCES
docker-compose build
echo STARTING DOCKER INSTANCES
docker-compose start
echo ENTERING WEB
docker-compose run web bash
echo MIGRATING DATABASE
rake db:migrate
echo PRECOMPILING ASSETS...
rails assets:precompile
ENDSSH

echo DEPLOY COMPLETED
