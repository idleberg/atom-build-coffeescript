'use babel';

import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';

export function provideBuilder()  {

  return class CoffeescriptProvider extends EventEmitter {
    constructor(cwd) {
      super();
      this.cwd = cwd;
    }

    getNiceName() {
      return 'CoffeeScript';
    }

    isEligible() {
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

    on(event, cb) {
      if(event == 'refresh') {
        atom.commands.dispatch('atom-workspace', 'build:refresh-targets');
      }
      this.emit(event);
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
  }
}
