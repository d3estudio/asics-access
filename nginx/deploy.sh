docker-compose stop
git pull -f
docker-compose build
docker-compose run web rake db:migrate
docker-compose start
docker-compose run web rails assets:precompile
