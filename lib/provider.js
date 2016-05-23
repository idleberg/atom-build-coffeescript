'use babel';

const self = '[build-coffeescript] ';
const debug = atom.config.get('build-coffeescript.debug');

import {exec} from 'child_process';
import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

export function provideBuilder() {
  return class CoffeescriptProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
    }

    getNiceName() {
      return 'CoffeeScript';
    }

    isEligible() {
      exec('coffee --version', function (error, stdout, stderr) {
        if (error !== null) {
          if (debug === true) console.log(self + error);
          // No CoffeeScript installed
          return false;
        }
        if (debug === true) console.log(self + stdout);
      });
      // Confirmed 'coffee' is installed, now check for '.coffee' or '.cson' file
      var isThereCoffee = function(startPath) {
        if (!fs.existsSync(startPath)) {
          return false;
        }

        var files = fs.readdirSync(startPath);
        for(var i = 0; i < files.length; i++) {
          var filename = path.join(startPath, files[i]);
          if(!filename.endsWith('node_modules') && !filename.endsWith('.git')) {
            var stat = fs.lstatSync(filename);

            if((stat.isDirectory() && isThereCoffee(filename))
              || filename.indexOf('.coffee') >= 0) {
              return true;
            }
          }
        }
      }

      return isThereCoffee(this.cwd);
    }

    settings() {
      const errorMatch = [
        '(?<file>([^:]+)):(?<line>\\d+):(?<col>\\d+):(?<message>.+)\\n'
      ];

      return [
        {
          name: 'CoffeeScript',
          exec: 'coffee',
          args: [ '--compile', '{FILE_ACTIVE}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-b',
          atomCommandName: 'coffeescript:compile',
          errorMatch: errorMatch
        },
        {
          name: 'CoffeeScript --bare',
          exec: 'coffee',
          args: [ '--compile', '--bare', '{FILE_ACTIVE}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-shift-b',
          atomCommandName: 'coffeescript:compile-bare',
          errorMatch: errorMatch
        },
        {
          name: 'CoffeeScript --map',
          exec: 'coffee',
          args: [ '--compile', '--map', '{FILE_ACTIVE}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-cmd-b',
          atomCommandName: 'coffeescript:compile-and-create-map',
          errorMatch: errorMatch
        },
        {
          name: 'CoffeeScript --ignore',
          exec: 'echo',
          args: ['"File ignored, no coffee was brewed"']
        }
      ];
    }
  };
}
