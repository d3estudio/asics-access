export RAILS_ENV=production

echo ENTERING WEB
docker-compose run web bash <<'ENDWEBSH'
echo CLEANING ASSETS...
rake assets:clobber
echo PRECOMPILING ASSETS...
rails assets:precompile
ENDWEBSH

echo STARTING DOCKER INSTANCES
docker-compose restart
