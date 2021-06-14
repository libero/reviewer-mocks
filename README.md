### Reviewer Mocks

A stub / mock service used by other Reviewer services during development & testing.

## Get started

Starts reviewer-mocks in a docker container exposed on port `3003` but default

```
make build
docker-compose up
```

### development

Starts reviewer-mocks in a local node process. The files are watched for updates, changes to code should appear nearly instantly.
```
yarn start:dev
```