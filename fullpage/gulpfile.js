var requireDir = require('require-dir');

//Require all task in gulp/tasks, including subfolder.
requireDir('./gulp/tasks', { recurse: true })