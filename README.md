# KUASAL - Kyoto University Authentication System Auto Login

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
**No warranty!**

## Introduction

An userscript example showing how to automatically login at some Kyoto University websites. This is for web development learning only.

Currently supporting:
- PandA
- IIMC websites

## Features

- Auto Login
- Auto redirecting to the login page (and then auto login) at
  - The PandA welcome page
  - The PandA logged out page
- Centering KULASIS

## Privacy Concerns

This userscript collects **nothing**. Your ID and password are locally stored only (using `GM.setValue`).

## Installation

1. Install a userscript manager like [**Tampermonkey**](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=zh-CN) for Chrome or [**Greasemonkey**](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) for Firefox.

2. Click [here](https://github.com/E011011101001/KUASAL/raw/main/KUASAL.user.js) to install. Or you can click 'Raw' button at the file page.

## Usage

1. Initialization. Visit any supported site, like PandA, and click your usercript manager extension icon. In the menu, click `Toggle Configuration`.
![](https://raw.githubusercontent.com/E011011101001/KUASAL/main/imgs/menu.png)

2. Fill in your user ID and password in the config window and click `Confirm` or `Toggle Configuration` to save and close the window.

3. The userscript will start to function from the next time you visit a supported site.
