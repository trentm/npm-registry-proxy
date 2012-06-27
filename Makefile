
all:

.PHONY: cutarelease
cutarelease:
	./tools/cutarelease.py -p npm-registry-proxy -f package.json


