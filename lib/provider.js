'use babel';

import { install } from 'atom-package-deps'
import { exec } from 'child_process';

// Package settings
import meta from '../package.json';
const notEligible = `**${meta.name}**: \`coffee\` is not in your PATH`;

// This package depends on build, make sure it's installed
export function activate() {
  if (!atom.inSpecMode()) {
    install(meta.name)
  }
}

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
          // No CoffeeScript installed
        if (error !== null) {
          if (atom.inDevMode()) atom.notifications.addError(notEligible, { detail: error, dismissable: true });
          return false;
        }
        if (atom.inDevMode()) atom.notifications.addInfo(`**${meta.name}**`, { detail: stdout, dismissable: false });
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
