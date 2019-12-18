# publish-gae-action
[![Build Status](https://github.com/zxyle/publish-gae-action/workflows/Test%20Actions/badge.svg)](https://github.com/zxyle/publish-gae-action/actions?query=workflow%3A%22Test+Actions%22)


This workflow deploying your application to Google App Engine.

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
```

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)