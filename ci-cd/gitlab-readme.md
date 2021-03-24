
```bash
kubectl create ns gitlab
```

## Create PSQL secret
```bash
kubectl -n gitlab create secret generic gitlab-postgresql-password --from-literal=postgres-password='PWD'
```

## PSQL config
```sql
CREATE USER gitlab WITH PASSWORD 'PWD';
CREATE DATABASE gitlab template template1;
GRANT ALL PRIVILEGES ON DATABASE gitlab to gitlab;
GRANT gitlab TO root;
ALTER DATABASE gitlab OWNER TO gitlab;
\c gitlab
CREATE EXTENSION btree_gist;
CREATE EXTENSION pg_trgm;
\dx
```

## Scaleway s3 endpoints
[doc](https://www.scaleway.com/en/docs/object-storage-feature/?_ga=2.91059871.443880960.1616603950-1883882262.1608799869)

## Create s3 secrets

### rails
```bash
kubectl create -n gitlab secret generic gitlab-rails-storage --from-file=connection=rails.yaml
```

### backup
```bash
kubectl create -n gitlab secret generic storage-config --from-file=config=s3cmd.config
```

### registry
```bash
kubectl create -n gitlab secret generic registry-storage --from-file=config=registry-storage.yaml
```
