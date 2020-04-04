#!/bin/bash
source .gitlab-ci.env && gitlab-runner exec shell build --env CI_REGISTRY_IMAGE=$CI_REGISTRY_IMAGE --env CI_REGISTRY=$CI_REGISTRY