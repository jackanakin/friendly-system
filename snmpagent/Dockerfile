FROM python:3.8.5-buster

RUN pip install --upgrade pip

WORKDIR /opt

COPY app/ app/
COPY snmpagent/ snmpagent/
COPY pip_requirements.txt manage.py startup.sh .

RUN pip install -r pip_requirements.txt
RUN chmod +x /opt/startup.sh

EXPOSE 8000

#ENTRYPOINT ["python", "/opt/manage.py", "runserver", "0.0.0.0:8000"]
ENTRYPOINT ["/opt/startup.sh"]