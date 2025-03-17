.PHONY: start deploy-dev deploy-prod

start:
	deno task start

deploy-dev:
	deno task build
	deployctl deploy --env-file=.env

deploy-prod:
	deno task build
	deployctl deploy --env-file=.env --prod

count:
	cloc --exclude-dir=node_modules .
