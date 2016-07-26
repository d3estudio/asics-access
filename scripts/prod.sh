export RAILS_ENV=production

echo STOPPING INSTANCES
docker-compose stop

echo BUILDING DOCKER INSTANCES
docker-compose build

echo ENTERING WEB
docker-compose run web bash <<'ENDWEBSH'
echo MIGRATING DATABASE
rake db:migrate
echo CLEANING ASSETS...
rake assets:clobber
echo PRECOMPILING ASSETS...
rails assets:precompile
ENDWEBSH

echo STARTING DOCKER INSTANCES
docker-compose start
