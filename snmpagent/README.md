#Running app
1. Create virtualenv
virtualenv venv
2. Enable virtualenv
source venv/bin/activate
3. Install pip requirements
pip install -r pip_requirements.txt
4. Run migrations
python manage.py migrate
5. Run app
nohup python manage.py runserver 0.0.0.0:3030 &> /opt/snmpagent.out &
