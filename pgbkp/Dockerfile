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


RUN cp /usr/share/zoneinfo/Brazil/East /etc/localtime

RUN locale-gen en en_US en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8


RUN mkdir -p /code
WORKDIR /code

CMD bash start.sh

COPY . ./

# RUN chmod +x /code/start.sh
# RUN chmod 777 /code/cron.log
