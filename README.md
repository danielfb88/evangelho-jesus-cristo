# ejc Backend

Pre-requisites:

- Docker
- Node >= 10.13.0

## Env file setup

Use **.env.stage.dev** to configure env vars to development

### run unit tests

```shell
yarn docker:test:unit
```

### run database integration tests

```shell
yarn docker:test:integration
```

### start the dev environment with docker

```shell
yarn up
```
