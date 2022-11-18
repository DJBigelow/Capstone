
FROM almalinux:8

RUN dnf -y install \
      https://download.oracle.com/otn_software/linux/instantclient/213000/oracle-instantclient-basic-21.3.0.0.0-1.el8.x86_64.rpm \
      openssh-clients \
      tar \
      gzip \
      git \
      nodejs \
      python38 python38-pip \
      gcc \
      python38-devel \
      openldap-devel && \
    rm -rf /var/cache/yum && \
    npm i -g n && \
    n stable

  
RUN groupadd --gid 1000 developer \
    && useradd --uid 1000 --gid 1000 -m developer \
    && chown -R developer. /home/developer

USER developer

RUN python3 -m venv /home/developer/.virtualenvs/docstorage \
  && source /home/developer/.virtualenvs/docstorage/bin/activate \
  && pip install --upgrade pip

WORKDIR /app
