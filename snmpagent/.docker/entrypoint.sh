#!/bin/bash

echo "Entrypoint runnning"
echo `date`
echo "Setting up cronjob"
cron
echo "Setting up gunicorn"
BASEDIR=$(dirname $0)
gunicorn --workers 3 --timeout 120 -b 0.0.0.0:8000 --access-logfile=/opt/access.log --error-logfile=/opt/error.log --chdir "${BASEDIR}" snmpagent.wsgi && tail -f /opt/access.log