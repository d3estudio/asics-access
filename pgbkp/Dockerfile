FROM debian:jessie
MAINTAINER Matheus Portillo

USER root

RUN apt-get update
RUN apt-get install -q -y --force-yes cron python-pip wget

RUN touch /etc/apt/sources.list.d/pgdg.list
RUN echo 'deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main' >> /etc/apt/sources.list.d/pgdg.list
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update

RUN apt-get install -q -y --force-yes postgresql-9.5
RUN pip install awscli==1.9.15

RUN mkdir -p /code
WORKDIR /code

CMD bash start.sh

COPY . ./

# RUN chmod +x /code/start.sh
# RUN chmod 777 /code/cron.log
