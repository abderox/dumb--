import figlet from 'figlet';
import chalk from 'chalk';

function drawDumb(version = "v0.0.0.1") {
    return new Promise((resolve, reject) => {
        figlet.text('dumb--', {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        }, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve({ art: data, version: version });
            }
        });
    });
}

async function displayDumb() {
    try {
        const result = await drawDumb();
        console.log(chalk.blue(result.art));
        console.log('\x1b[31m%s\x1b[0m', `${result.version} ${chalk.blueBright('  Built on top of JavaScript, my beloved language.')}`);
        console.log('\n')
    } catch (error) {
        console.log('Error occurred: ' + error);
    }
}

export { displayDumb }