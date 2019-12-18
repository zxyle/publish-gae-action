const fs = require('fs');
const core = require('@actions/core');

try {
    const service_account_key = core.getInput('service_account_key');
    const buf = Buffer.from(service_account_key, 'base64');
    console.log(buf.toString());

    fs.writeFile('./client-secret.json', buf.toString(), function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('write success.');
        }
    });
} catch (error) {
    core.setFailed(error.message);
}