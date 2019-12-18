#!/bin/sh -l

export serviceAccountEmail="$1"

# shellcheck disable=SC2039
pwd=$(base64 -d <<<"$2") # 解码
echo "$pwd" >>"client-secret.json"
