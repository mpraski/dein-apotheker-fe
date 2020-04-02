NO_COLOR=\033[0m
OK_COLOR=\033[32;01m
ERROR_COLOR=\033[31;01m
WARN_COLOR=\033[33;01m

SERVICE_NAME=chatbot

.PHONY: all test build
all: clean build

install:
	@echo "$(OK_COLOR)==> Installing packages for $(SERVICE_NAME)...$(NO_COLOR)"
	@npm install

build: test
	@echo "$(OK_COLOR)==> Building $(SERVICE_NAME)...$(NO_COLOR)"
	@npm run build

run:
	@echo "$(OK_COLOR)==> Running $(SERVICE_NAME)...$(NO_COLOR)"
	@npm run serve

test: lint
	@echo "$(OK_COLOR)==> Running tests...$(NO_COLOR)"
	@npm run test:unit

lint:
	@echo "$(OK_COLOR)==> Checking code style...$(NO_COLOR)"
	@npm run lint