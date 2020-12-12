const fs = require('fs');
const core = require('@actions/core');
const yaml = require('js-yaml');
const deepmerge = require('deepmerge');

/**
 * Add support for updating environment variables with actions secrets
 *
 */
try {
    console.log(core.getInput('gae_config_path'));
    const gaeConfigPath = core.getInput('gae_config_path') || './app.yaml';
    console.log(gaeConfigPath);
    const fileContents = fs.readFileSync(gaeConfigPath, 'utf8');

    let data = yaml.safeLoad(fileContents);

    // @todo Only run this if the user wants to
    const secrets = core.getInput('gae_variables');
    if (secrets) {
        const secrets_buffer = Buffer.from(secrets, 'base64');
        data = deepmerge(data, JSON.parse(secrets_buffer.toString()));
        let yamlStr = yaml.safeDump(data);
        fs.writeFileSync(gaeConfigPath, yamlStr, 'utf8');
    }

} catch (error) {
    core.setFailed(error.message);
}

try {
    const service_account_key = core.getInput('service_account_key');
    const client_secret_file = core.getInput('client_secret_file');
    const buf = Buffer.from(service_account_key, 'base64');
    const save_path = client_secret_file ? client_secret_file : './client-secret.json'

    fs.writeFile(save_path, buf.toString(), function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('write success.');
        }
    });
} catch (error) {
    core.setFailed(error.message);
}
