#!/usr/bin/env bash

export serviceAccountEmail="$1"
export tmpKeyFilePath="client-secret.json"

pwd=$(base64 -d <<<"$2")
echo "$pwd" >>"client-secret.json"

gcloud config set project "$3"

gcloud auth activate-service-account "$1" --key-file="client-secret.json"


pwd
