NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m

SERVICE_NAME=chatbot

.PHONY: all test build
all: clean build

install:
	@echo "$(OK_COLOR)==> Installing packages for $(SERVICE_NAME)...$(NO_COLOR)"
	@yarn install

build:
	@echo "$(OK_COLOR)==> Building $(SERVICE_NAME)...$(NO_COLOR)"
	@yarn build

run:
	@echo "$(OK_COLOR)==> Running $(SERVICE_NAME)...$(NO_COLOR)"
	@yarn serve