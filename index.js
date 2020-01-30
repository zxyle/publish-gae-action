const fs = require('fs');
const core = require('@actions/core');
const yaml = require('js-yaml');
const deepmerge = require('deepmerge');

/**
 * Add support for updating environment variables with actions secrets
 *
 */
try {
    const fileContents = fs.readFileSync('./app.yaml', 'utf8');

    let data = yaml.safeLoad(fileContents);

    // @todo Only run this if the user wants to
    const secrets = core.getInput('gae_variables');
    if (secrets) {
        const secrets_buffer = Buffer.from(secrets, 'base64');
        data = deepmerge(data, JSON.parse(secrets_buffer.toString()));
        let yamlStr = yaml.safeDump(data);
        fs.writeFileSync('app.yaml', yamlStr, 'utf8');
    }

} catch (error) {
    core.setFailed(error.message);
}

try {
    const service_account_key = core.getInput('service_account_key');
    const buf = Buffer.from(service_account_key, 'base64');

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
