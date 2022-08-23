FROM python:3.8.5-buster

# Setting up cronjob
RUN apt update && apt -y install cron
COPY .docker/cronjob_fh /etc/cron.d/cronjob_fh
COPY .docker/cronjob_mk /etc/cron.d/cronjob_mk
RUN chmod 0644 /etc/cron.d/cronjob_fh
RUN chmod 0644 /etc/cron.d/cronjob_mk
RUN crontab /etc/cron.d/cronjob_fh
RUN crontab /etc/cron.d/cronjob_mk
RUN touch /var/log/cron.log
######

RUN pip install --upgrade pip

WORKDIR /opt

COPY app/ app/
COPY snmpagent/ snmpagent/
COPY pip_requirements.txt manage.py .docker/entrypoint.sh .

RUN pip install -r pip_requirements.txt
RUN chmod +x /opt/entrypoint.sh

EXPOSE 8000

#ENTRYPOINT ["python", "/opt/manage.py", "runserver", "0.0.0.0:8000"]
ENTRYPOINT ["/opt/entrypoint.sh"]