# How to Run

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
    PASSWORD 'XXX';
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

### <span style="color:yellow">Initialize S3 Storage</span>

For Amazon S3 you will need <a href="http://aws.amazon.com" target="_blank">Amazon AWS</a> account
and S3 bucket (you can use <a href="https://s3.console.aws.amazon.com/s3/buckets" target="_blank">S3 Management console</a>).
Don`t forget to create IAM User with S3 permissions in *Security Credentials* of your account.<br>
Or you can use <a href="http://cloud.yandex.ru/services/storage" target="_blank">Yandex Object Storage</a><br>
Change <b>application.yaml</b> with yours Amazon AWS properties:
``` yaml
cloud:
  aws:
    # Use endpoint property only for Yandex Storage
    endpoint: storage.yandexcloud.net  
    bucket: fitness-terra
    region:
      # For Amazon S3 use region according to bucket location
      static: ru-central1
      auto: false
```

### <span style="color:yellow">Secrets</span>
You need to add credentials for Postgres database, Amazon AWS, JWT token.<br>
create <b>secrets.yaml</b> in same directory as <b>application.yaml</b> and fill it accordingly
``` yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/fitness_terra
    username: fitness_terra
    password: ***

cloud:
  aws:
    credentials:
      access-key: ***
      secret-key: ***

jwt:
  secret-key: ***
```
Keep in mind - secret key for JWT token must be minimum <b>256</b> bits long<br>
