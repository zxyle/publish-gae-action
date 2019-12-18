# publish-gae-action
[![Build Status](https://github.com/zxyle/publish-gae-action/workflows/Test%20Actions/badge.svg)](https://github.com/zxyle/publish-gae-action/actions?query=workflow%3A%22Test+Actions%22)


This workflow publish your application to Google App Engine.

## Example

This project uses this Actions to deploy to Google App Engine.

[BoardCAM.org](https://github.com/BoardCAM/BoardCAM.org/blob/master/.github/workflows/publishgae.yml)

## Usage
```yaml
- name: Publish app to Google App Engine
  uses: zxyle/publish-gae-action@master
  with:
    service_account_email: ${{ secrets.GCP_SA_EMAIL }}
    service_account_key: ${{ secrets.GCP_SA_KEY }}
    project_id: ${{ secrets.PROJECT_ID }}

- name: Publish app to Google App Engine
  run: |
    gcloud auth activate-service-account ${{ secrets.GCP_SA_EMAIL }} --key-file=client-secret.json
    gcloud config set project ${{ secrets.PROJECT_ID }}
    gcloud -q app deploy app.yaml --promote
    gcloud -q app deploy cron.yaml
```
## Inputs

* `service_account_email`: (Optional) The service account email which will be used for authentication.

* `service_account_key`: The service account key which will be used for authentication. This key should be [created](https://cloud.google.com/iam/docs/creating-managing-service-account-keys), encoded as a [Base64](https://en.wikipedia.org/wiki/Base64) string (eg. `cat my-key.json | base64` on macOS or Linux), and stored as a [secret](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets). 

* `project_id`: The project id is google cloud platform project id. See this [page](https://console.cloud.google.com/home/dashboard) to get it.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
