#!/bin/bash

docker build --no-cache=true -t kesakiyo/ims:client-base . && docker push kesakiyo/ims:client-base
