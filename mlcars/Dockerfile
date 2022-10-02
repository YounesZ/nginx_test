# --- Install python, gunicorn and git
FROM python:3.7
RUN apt-get update && apt-get -y install python3-pip 
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip3 install gunicorn flask

COPY . /root/mlcars
WORKDIR /root/mlcars
RUN pip3 install -r requirements.txt

CMD cd /root/mlcars; gunicorn --bind 0.0.0.0:5000 wsgi:app; echo "DONE"


