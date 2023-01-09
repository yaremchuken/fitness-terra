# Getting Started

### <span style="color:yellow">Initialize Database</span>
#### Connect to Postgres
```sudo -u postgres psql```

#### Create user
```sql
CREATE ROLE fitness_terra WITH
    LOGIN
    SUPERUSER
    INHERIT
    CREATEDB
    CREATEROLE
    NOREPLICATION
    PASSWORD 'fitness_terra';
```

#### Create table
```sql
CREATE DATABASE fitness_terra
    WITH 
    OWNER = fitness_terra
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
```
<a href="https://www.liquibase.com" target="_blank">Liquibase</a> will take care of tables creation

### <span style="color:yellow">Initialize Amazon S3 Storage</span>

You will need <a href="http://aws.amazon.com" target="_blank">Amazon AWS</a> account
and S3 bucket (you can use <a href="https://s3.console.aws.amazon.com/s3/buckets" target="_blank">S3 Management console</a>).
Don`t forget to create IAM User with S3 permissions in *Security Credentials* of your account.<br>
Fill application.yaml with Amazon AWS credentials:
``` yaml
cloud:
  aws:
    bucket: fitness-terra
    region:
      static: eu-north-1
      auto: false
    credentials:
      access-key: XXX
      secret-key: XXXX
```
