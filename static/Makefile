NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m

SERVICE_NAME=static

.PHONY: all build
all: build

build:
	@echo "$(OK_COLOR)==> Building $(SERVICE_NAME)... $(NO_COLOR)"
	@hugo -D --minify

run:
	@echo "$(OK_COLOR)==> Running $(SERVICE_NAME)... $(NO_COLOR)"
	@hugo -D server