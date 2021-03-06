#!/usr/bin/env node

'use strict';

var pkg = require('../package.json'),
  update = require('../lib/update'),
  recipes = require('../lib/recipes'),
  setup = require('../lib/setup');

var args = process.argv.slice(2);

if (args[0] !== '-h' && args[0] !== '--help' && args[0] !== 'help') {
  var cmd = args.shift();

  // version
  if (cmd === '-v' || cmd === '--version' || args[0] === 'version') {
    console.log(pkg.version);
    return;
  }

  var target;

  // project
  if (cmd === 'project') {
    cmd = args.shift();
    target = 'project';
  }

  // list
  if (cmd === 'list' || cmd === 'recipes') {
    displayBanner();

    recipes.list(args[0] === 'readme');
  }

  // default
  else if (cmd === 'default') {
    displayBanner();

    recipes.setDefault(args);
  }

  // set
  else if (cmd === 'save') {
    displayBanner();

    recipes.save(args.shift(), args, target);
  }

  // rename
  else if (cmd === 'rename') {
    displayBanner();

    recipes.rename(args[0], args[1], target);
  }

  // remove
  else if (cmd === 'remove') {
    displayBanner();

    recipes.remove(args[0], target);
  }

  // reset
  else if (cmd === 'reset') {
    displayBanner();

    recipes.reset(target);
  }

  // reset
  else if (cmd === 'generate') {
    displayBanner();

    setup.generate();
  }  

  // install
  else if (cmd === 'install') {
    displayBanner(false);

    setup.install();
  }

  // uninstall
  else if (cmd === 'uninstall') {
    displayBanner(false);

    setup.uninstall();
  }

  // unknown: display help
  else {
    displayHelp();
  }

} else {
  displayHelp();
}

// help
function displayHelp() {

  displayBanner();

  console.log('Commands:');
  console.log();
  console.log('  list, recipes'.cyan + '\t\t\t' + 'lists all recipes in the book');
  console.log();
  console.log('  Add ' + 'project'.yellow + ' before the next commands to use ' + 'tn.json'.yellow + ' in current dir.');
  console.log();
  console.log('  [project] save <name> *'.cyan + '\t' + 'save a recipe, possibly overriding a built-in.');
  console.log('  [project] rename <old> <new>'.cyan + '\t' + 'renames a recipe.');
  console.log('  [project] remove <name>'.cyan + '\t' + 'removes a recipe, possibly restoring an overridden built-in');
  console.log('  [project] reset'.cyan + '\t\t' + 'removes all custom recipes, restoring the built-in');
  console.log();
  console.log('  generate'.cyan + '\t\t\t' + 'generates simulators/device user-recipes (' + 'ti iphone6plus'.yellow + ')');
  console.log();
  console.log('  install'.cyan + '\t\t\t' + 'installs the Titanium CLI hook');
  console.log('  uninstall'.cyan + '\t\t\t' + 'uninstalls the Titanium CLI hook');
  console.log();
  console.log('  -h, --help, help'.cyan + '\t\t' + 'displays help');
  console.log('  -v, --version, version'.cyan + '\t' + 'displays the current version');
  console.log();
}

function displayBanner(doUpdate) {

  if (doUpdate !== false) {
    update({
      packageName: pkg.name,
      packageVersion: pkg.version
    });
  }

  // display banner
  console.log('TiNy'.cyan.bold + ', version ' + pkg.version);
  console.log(pkg.about.copyright);
  console.log();
}