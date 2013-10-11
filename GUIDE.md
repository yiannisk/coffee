# Meteor Quick Start Guide

## Installation

A vanilla project needs node, meteor and meteorite.

### Installing the latest version of Node.js

This installation includes `npm`.

```
git clone https://github.com/joyent/node
cd node
./configure
make
sudo make install
```

### Installing the latest version of meteor

`curl https://install.meteor.com | /bin/sh`

### Installing meteorite

`sudo -H npm install -g meteorite`

## Very useful packages

### Meteor packages

Installed using `meteor add <package name>`.

* `accounts-ui`: The front end for general accounts management.
* `accounts-google`: OAuth account management package for Google.

### Meteorite packages

Installed using `mrt add <package name>`.

* `bootstrap-3`: The twitter bootstrap version 3 framework.

## Useful links

* https://atmosphere.meteor.com
  A list of various packages installable using meteorite.