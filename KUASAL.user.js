// ==UserScript==
// @name         KUASAL
// @namespace    https://www.eolstudy.com/
// @version      2025.05.24
// @description  Kyoto University Authentication System Auto Login
// @author       Eol
// @match        https://authidp1.iimc.kyoto-u.ac.jp/idp/profile/SAML2*
// @include      /^https?://panda\.ecs\.kyoto-u\.ac\.jp/portal/?$/
// @match        https://panda.ecs.kyoto-u.ac.jp/cas/login*
// @match        https://panda.ecs.kyoto-u.ac.jp/cas/logout*
// @match        https://student.iimc.kyoto-u.ac.jp/*
// @match        https://www.k.kyoto-u.ac.jp/student/*
// @match        https://kyoto-u.idm.oclc.org/login?qurl=*
// @match        https://kyoto-u.idm.oclc.org/login?url=*
// @match        https://login.kyoto-u.idm.oclc.org/*
// @icon         https://authidp1.iimc.kyoto-u.ac.jp/idp/images/logo.png
// @grant        GM.registerMenuCommand
// @grant        GM.setValue
// @grant        GM.getValue
// ==/UserScript==

// Using GM global variables: id, password
(async function () {
  'use strict'

  async function register_menu () {
    const configBox = document.createElement('div')
    configBox.id = 'config-box'
    configBox.innerHTML = `<div>
      <div class="KUASAL-input-container">
        <label for="KUASAL-user-id" style="width: 10vw;">User ID</label>
        <input id="KUASAL-user-id" size="20" type="text" style="border-radius: 5px;" />
      </div>
      <div class="KUASAL-input-container">
        <label for="KUASAL-password">Password</label>
        <input id="KUASAL-password" size="20" type="password" style="border-radius: 5px;" />
      </div>
    </div>
    <div>
      <div class="KUASAL-button">Confirm</div>
    </div>`

    const inputID = configBox.querySelector('#KUASAL-user-id')
    if (!inputID) {
      console.error('KUASAL: config box #KUASAL-user-id not found.')
      return
    }
    inputID.value = await GM.getValue('id') || ''
    inputID.addEventListener('change', event => {
      GM.setValue('id', event.target.value)
    })

    const inputPassword = configBox.querySelector('#KUASAL-password')
    inputPassword.value = await GM.getValue('password') || ''
    inputPassword.addEventListener('change', event => {
      GM.setValue('password', event.target.value)
    })

    configBox.querySelector('.KUASAL-button')
      .addEventListener('click', _ => document.body.removeChild(configBox))

    const styleElement = document.createElement('style')
    styleElement.textContent = `
      #${configBox.id} {
        inset: 0;
        margin: auto;
        position: fixed;
        width: 30%;
        min-width: 350px;
        max-width: 450px;
        height: 15%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        background-color: rgba(25,25,25,0.94);
        border: solid;
        border-color: black;
        box-shadow: black 2px 2px 6px 1px;
        font-size: small;
      }
      #${configBox.id} label {
        color: lightgray;
      }
      .KUASAL-input-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1%;
      }
      .KUASAL-button {
        background: darkgray;
        color: black;
        padding-left: 1vw;
        padding-right: 1vw;
        box-shadow: black 0px 0px 5px 2px;
        border: solid;
        border-radius: 10px;
        border-width: 1px;
        border-color: darkgray;
      }
      .KUASAL-button:hover {
        background: lightgray;
      }
      .KUASAL-button:active {
        box-shadow: none;
        border-color: lightgray;
      }
    `
    document.head.appendChild(styleElement)

    GM.registerMenuCommand('Toggle Configuration', async function () {
      const menuShown = configBox.parentNode === document.body
      if (!menuShown) {
        document.body.appendChild(configBox)
      } else {
        document.body.removeChild(configBox)
      }
    })
  }

  async function panda_login () {
    // WTF the logout page has the same title
    // Why is the logout page called Login
    if (location.href.startsWith('https://panda.ecs.kyoto-u.ac.jp/cas/logout')) {
      location.href = 'https://panda.ecs.kyoto-u.ac.jp/cas/login?service=https%3A%2F%2Fpanda.ecs.kyoto-u.ac.jp%2Fsakai-login-tool%2Fcontainer'
      return
    }

    // Normal login page
    const errorElement = document.querySelector('.errors')
    if (errorElement) {
      errorElement.style.display = 'flex'
      return
    }

    const id = await GM.getValue('id')
    const password = await GM.getValue('password')
    if (id && password) {
      document.querySelector('#username').value = id
      document.querySelector('#password').value = password
      document.querySelector('.btn-submit').click()
    }
  }

  function KULASIS_better_looking () {
    const KULASISStyle = document.createElement('style')
    KULASISStyle.textContent = `
      #frame {
        margin: auto;
      }
    `
    document.head.appendChild(KULASISStyle)
    setTimeout(_ => window.stop(), 60000) // to disable the refresh meta // remove this line if buggy
  }

  await register_menu()

  switch (document.title) {
  case 'PandA : Gateway : Welcome':
    location.href += '/login'
    break

  case 'CyberLearningService Login':
    await panda_login()
    break

  case 'Kyoto University Authentication System':
    const errorElement = document.querySelector('.output--error')
    if (errorElement) {
      return
    }
    const id = await GM.getValue('id')
    const password = await GM.getValue('password')
    if (id && password) {
      document.querySelector('#username').value = id
      document.querySelector('#password').value = password
      document.querySelector('button').click()
    }
    break

  case '全学生共通ポータル/Common Portal for All Students':
    // TODO: use indexOf === 0
    if (/^https:\/\/student\.iimc\.kyoto-u\.ac\.jp\/?$/.test(location.href)) {
      document.querySelector('p a').click()
    }
    break
  case '京都大学教務情報システム':
    KULASIS_better_looking()
    // TODO: use indexOf === 0
    if (/^https:\/\/www\.k\.kyoto-u\.ac\.jp\/student\/logout_complete/.test(location.href)) {
      history.back()
    }
    break
  default:
    // cannot be identified by titles
    if(
      location.href.indexOf('https://kyoto-u.idm.oclc.org/login?') === 0 ||
      location.href.indexOf('https://login.kyoto-u.idm.oclc.org/login?') === 0
    ) {
      // 電子ジャーナル・データベース認証システム
      document.querySelector('input[type="submit"][value="ECS-ID / SPS-ID"]').click()
    }
    break
  }
})()
