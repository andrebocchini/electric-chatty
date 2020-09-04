A simple cross-platform, limited functionality desktop client (runs on Mac, Windows and Linux) for [Shacknews Chatty](https://shacknews.com/chatty).

# Why?

This was a fun weekend project to experiment with building an application using [Electron](https://www.electronjs.org/).

The application is built with [React](https://reactjs.org) and [Typescript](https://www.typescriptlang.org/) and is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate).

![screenshot](/internals/img/screenshot.png)

# How do I install it?

Visit the [releases page](https://github.com/andrebocchini/electric-chatty/releases) and download
a binary suitable for your platform.

# How do I build it?

1. Make sure you have [node](https://nodejs.org) installed
2. Install `yarn` via `npm install -g yarn`
3. Clone this repository
4. Change into the cloned repository directory
5. Run `yarn && yarn dev` and it should build and launch

_Note: This project uses [keytar](https://github.com/atom/node-keytar) for managing credentials in a cross-platform way. When you first run `yarn`, it will likely need to build some platform-specific things. This could take an extra minute or two, and depending on the state of your computer, it might need some additional dependencies (like command line tools for Xcode on a Mac)_
