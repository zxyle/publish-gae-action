FROM ubuntu:16.04

# Make sure gcloud command is on our PATH and the App Engine SDK is in the Python path
ENV GAE_PYTHONPATH=${HOME}/.cache/google_appengine \
    PATH=$PATH:${HOME}/google-cloud-sdk/bin \
    PYTHONPATH=${PYTHONPATH}:${GAE_PYTHONPATH} \
    CLOUDSDK_CORE_DISABLE_PROMPTS=1 \
    CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"

#RUN sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN apt-get update && apt-get install -y \
  lsb-core \
  python3-pip

# Install Google App Engine Python SDK
# Create environment variable for correct distribution
#RUN export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
#RUN export CLOUD_SDK_REPO="cloud-sdk-xenial"

# Add the Cloud SDK distribution URI as a package source
RUN echo "deb http://packages.cloud.google.com/apt cloud-sdk-xenial main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# Import the Google Cloud Platform public key
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

# Update the package list and install the Cloud SDK
RUN apt-get update && \
    apt-get install -y \
    google-cloud-sdk \
    google-cloud-sdk-cloud-build-local \
    google-cloud-sdk-app-engine-python \
    google-cloud-sdk-cbt \
    google-cloud-sdk-app-engine-python-extras
