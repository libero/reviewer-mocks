
IMAGE_TAG ?= "local"

DOCKER_COMPOSE = IMAGE_TAG=${IMAGE_TAG} docker-compose -f docker-compose.build.yml

get_deps:
	yarn

lint: get_deps
	yarn lint

test: get_deps
	yarn test

build:
	${DOCKER_COMPOSE} build reviewer-mocks
