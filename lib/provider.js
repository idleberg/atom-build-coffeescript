'use babel';

const self = '[build-coffee] ';
const debug = atom.config.get('build-coffee.debug');

import {exec} from 'child_process';

export function provideBuilder() {
  return class CoffeeProvider {
    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'CoffeeScript';
    }

    isEligible() {
      exec('coffee --version', function (error, stdout, stderr) {
        if (error !== null) {
          if (debug === true) console.log(self, error);
          // No CoffeeScript installed
          return false;
        }
        if (debug === true) console.log(self, stdout);
      });

      return true;
    }

    settings() {
      const errorMatch = [
        '(?<file>([^:]+)):(?<line>\\d+):(?<col>\\d+): error: (?<message>.+)'
      ];

      const warningMatch = [
        '(?<file>([^:]+)):(?<line>\\d+):(?<col>\\d+): warning: (?<message>.+)'
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
          errorMatch: errorMatch,
          warningMatch: warningMatch
        },
        {
          name: 'CoffeeScript --bare',
          exec: 'coffee',
          args: [ '--compile', '--bare', '{FILE_ACTIVE}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-shift-b',
          atomCommandName: 'coffeescript:compile-bare',
          errorMatch: errorMatch,
          warningMatch: warningMatch
        },
        {
          name: 'CoffeeScript --map',
          exec: 'coffee',
          args: [ '--compile', '--map', '{FILE_ACTIVE}' ],
          cwd: '{FILE_ACTIVE_PATH}',
          sh: false,
          keymap: 'cmd-alt-cmd-b',
          atomCommandName: 'coffeescript:compile-and-create-map',
          errorMatch: errorMatch,
          warningMatch: warningMatch
        }
      ];
    }
  };
}
