#!/bin/bash

docker build --no-cache=true -t kesakiyo/ims:client-exp . && docker push kesakiyo/ims:client-exp
