#!/bin/bash

docker build --no-cache=true -t kesakiyo/ims:client . && docker push kesakiyo/ims:client
