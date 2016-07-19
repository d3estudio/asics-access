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

COPY ./run-backup.sh /code/run-backup.sh
COPY ./start.sh /code/start.sh

RUN touch /code/backups-cron.log

RUN chmod +x /code/start.sh
RUN chmod +x /code/run-backup.sh
RUN chmod 777 /code/backups-cron.log

ENV croncmd "/bin/bash -c '/code/run-backup.sh >> /code/backups-cron.log'"
ENV cronjob "00 0-23/2 * * * env - `cat /tmp/env.sh` $croncmd >/dev/null 2>&1"
RUN echo "$cronjob" | crontab -

RUN crontab -l | { cat; echo "* * * * * /bin/bash -c 'echo Heartbeat >> /code/backups-cron.log' >/dev/null 2>&1"; } | crontab -

CMD bash start.sh
