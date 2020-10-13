#!/bin/bash
source .gitlab-ci.env && gitlab-runner exec shell deploy \
    --env DO_KEY=$DO_KEY \
    --env DO_USER=$DO_USER \
    --env DO_HOST=$DO_HOST \
    --env CI_REGISTRY_CHATBOT=$CI_REGISTRY_CHATBOT \
    --env CI_REGISTRY_STATIC=$CI_REGISTRY_STATIC