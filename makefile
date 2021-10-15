SHELL=/bin/bash

DB_DATABASE = $(shell echo $$(grep DB_DATABASE .env.stage.dev | cut -d= -f 2))
DB_HOST = $(shell echo $$(grep DB_HOST .env.stage.dev | cut -d= -f 2))
DB_PORT = $(shell echo $$(grep DB_PORT .env.stage.dev | cut -d= -f 2))
DB_USERNAME = $(shell echo $$(grep DB_USERNAME .env.stage.dev | cut -d= -f 2))
DB_PASSWORD = $(shell echo $$(grep DB_PASSWORD .env.stage.dev | cut -d= -f 2))

.PHONY = help
help: ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/\t\t- /'

start_db: ## Start database.
	@docker-compose up -d db

create_db: ## Create database.
	@docker-compose exec db sh \
		-c 'PGPASSWORD="${DB_PASSWORD}" psql \
		-v ON_ERROR_STOP=1 \
		--username=${DB_USERNAME} \
		--host=${DB_HOST} \
		--port=${DB_PORT} \
		-c "CREATE DATABASE ${DB_DATABASE}"'
	@echo "Database '${DB_DATABASE}' created successfully!"

init_db: ## Start and create database.
	$(MAKE) start_db
	sleep 5
	yarn migration:run

down: # Shutdown containers
	@docker-compose down -v

