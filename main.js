/**
 * @author 成雨
 * @date 2019/5/5 0005$
 * @Description:
 */

const shell = require('shelljs');

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

shell.cp('-Rf', 'client/dist/*', 'public');