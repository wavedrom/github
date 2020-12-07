Browser extension that shows WaveDrom diagrams on **GitHub** and **GitLab** page

## Install

* [x] [Chrome extension](https://chrome.google.com/webstore/detail/wavedrom/ckplfgniaofnlpelgjkmbeeilfbbnboi)
* [x] [Firefox extension](https://addons.mozilla.org/en-US/firefox/addon/wavedrom)

## Features

* replace `wavedrom` marked text sections with diagrams
* on Github
  - [x] [markdown](https://github.com/wavedrom/wavedrom/blob/master/test/test.md)
  - [x] [adoc](https://github.com/wavedrom/wavedrom/blob/master/test/test.adoc)
  - [x] [issues](https://github.com/wavedrom/wavedrom/issues/286)
  - [x] [gist](https://gist.github.com/drom/f43021140c969771ca0fcc28fea1acf0)
  - [ ] Preview Tab
* on Gitlab https://gitlab.com/drom/wavedrom-test

## Developing

1. Clone the repository
2. Run `npm i` to install dependencies
3. Run `npm run build` to build an Add-on
4. Load the `dist` folder as an [unpacked extension](https://developer.chrome.com/extensions/getstarted#unpacked) in Chrome
