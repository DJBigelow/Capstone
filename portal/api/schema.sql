CREATE TABLE employee (
  "ID"                      VARCHAR(9) PRIMARY KEY,
  "DISP_FIRST_NAME"         VARCHAR(60),
  "FIRST_NAME"              VARCHAR(60),
  "PREF_NAME"               VARCHAR(60),
  "MI"                      VARCHAR(60),
  "LAST_NAME"               VARCHAR(240),
  "SNOW_EMAIL"              VARCHAR(128),
  "POSN"                    VARCHAR(6),
  "POSITION"                VARCHAR(120),
  "DEPT_CODE"               VARCHAR(30),
  "DEPT_DESC"               VARCHAR(60),
  "CAMPUS"                  VARCHAR(30),
  "OFFICE_BLDG_CODE"        VARCHAR(30),
  "BUILDING_DESC"           VARCHAR(60),
  "OFFICE_ROOM"             VARCHAR(12),
  "OFFICE_AREA"             VARCHAR(6),
  "OFFICE_PHONE"            VARCHAR(12)
);

CREATE SEQUENCE pending_change_id_seq;
CREATE SEQUENCE historical_change_id_seq;

CREATE TABLE pending_change (
  id                INT DEFAULT NEXTVAL('pending_change_id_seq') PRIMARY KEY,
  badger_id         VARCHAR(9) REFERENCES employee("ID") ON DELETE CASCADE,
  portal_column     VARCHAR(32),
  banner_value      TEXT,
  portal_value      TEXT
);

CREATE TABLE historical_change (
  id                INT DEFAULT NEXTVAL('historical_change_id_seq') PRIMARY KEY,
  badger_id         VARCHAR(9) REFERENCES employee("ID") ON DELETE CASCADE,
  approval_time     TIMESTAMP,
  portal_column     VARCHAR(32),
  banner_value      TEXT,
  portal_value      TEXT
);


