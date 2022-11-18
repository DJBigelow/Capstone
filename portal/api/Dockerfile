FROM almalinux:8

RUN dnf -y install \
      https://download.oracle.com/otn_software/linux/instantclient/213000/oracle-instantclient-basic-21.3.0.0.0-1.el8.x86_64.rpm \
      python38 \
      python38-pip \
      gcc \
      python38-devel \
      openldap-devel && \
    rm -rf /var/cache/yum && \
    pip3 install --upgrade pip

WORKDIR /app

COPY ./requirements.txt requirements.txt

RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

COPY ./src src

CMD ["uvicorn", "src.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]


