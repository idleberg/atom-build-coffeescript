[![apm](https://img.shields.io/apm/l/build-coffeescript.svg?style=flat-square)](https://atom.io/packages/build-coffeescript)
[![apm](https://img.shields.io/apm/v/build-coffeescript.svg?style=flat-square)](https://atom.io/packages/build-coffeescript)
[![apm](https://img.shields.io/apm/dm/build-coffeescript.svg?style=flat-square)](https://atom.io/packages/build-coffeescript)
[![Travis](https://img.shields.io/travis/idleberg/atom-build-coffeescript.svg?style=flat-square)](https://travis-ci.org/idleberg/atom-build-coffeescript)
[![David](https://img.shields.io/david/dev/idleberg/atom-build-coffeescript.svg?style=flat-square)](https://david-dm.org/idleberg/atom-build-coffeescript#info=dependencies)

# build-coffeescript

[Atom Build](https://atombuild.github.io/) provider for CoffeeScript, compiles CoffeeScript into JavaScript

## Installation

### apm

Install `build-coffeescript` from Atom's [Package Manager](http://flight-manual.atom.io/using-atom/sections/atom-packages/) or the command-line equivalent:

`$ apm install build-coffeescript`

### GitHub

Change to your Atom packages directory:

```bash
# Windows
$ cd %USERPROFILE%\.atom\packages

# Mac OS X & Linux
$ cd ~/.atom/packages/
```

Clone repository as `build-coffeescript`:

`$ git clone https://github.com/idleberg/atom-build-coffeescript build-coffeescript`

## Usage

### Build

Before you can build, select an active target with your preferred build option.

Available targets:

* `CoffeeScript` — compile script (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd>)
* `CoffeeScript --map` — compile script and create a map (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Cmd</kbd>+<kbd>B</kbd>)
* `CoffeeScript --bare` — compile script without the top-level function safety wrapper (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>)

### Shortcuts

Here's a reminder of the default shortcuts you can use with this package:

**Select active target**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> or <kbd>F7</kbd>

**Build script**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or <kbd>F9</kbd>

**Jump to error**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>G</kbd> or <kbd>F4</kbd>

**Toggle build panel**

<kbd>Cmd</kbd>+<kbd>Alt</kbd>+<kbd>V</kbd> or <kbd>F8</kbd>

## License

This work is licensed under the [The MIT License](LICENSE.md).

## Donate

You are welcome support this project using [Flattr](https://flattr.com/submit/auto?user_id=idleberg&url=https://github.com/idleberg/atom-build-coffeescript) or Bitcoin `17CXJuPsmhuTzFV2k4RKYwpEHVjskJktRd`
