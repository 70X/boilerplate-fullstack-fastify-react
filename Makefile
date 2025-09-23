.PHONY: test dev dev-error dev-empty reseed

test:
	cd ./frontend && npm i && npm run lint && CI=true npm run test
	cd ./backend && npm i && npm run lint && npm run test
