// ==UserScript==
// @name         KUASAL
// @namespace    https://www.eolstudy.com/
// @version      2024-08-26
// @description  Kyoto University Authentication System Auto Login
// @author       Eol
// @match        https://authidp1.iimc.kyoto-u.ac.jp/idp/profile/SAML2/Redirect/SSO?execution=e2s2
// @icon         https://authidp1.iimc.kyoto-u.ac.jp/idp/images/logo.png
// @grant        GM_registerMenuCommand
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
        <label for="KUASAL-user-id" style="min-width: 6vw;">User ID</label>
        <input id="KUASAL-user-id" size="20" type="text" style="border-radius: 5px;" />
      </div>
      <div class="KUASAL-input-container">
        <label for="KUASAL-password">Password</label>
        <input id="KUASAL-password" size="20" type="password" style="border-radius: 5px;" />
      </div>
    </div>`

    const inputID = configBox.querySelector('#KUASAL-user-id')
    inputID.value = await GM.getValue('id') || ''
    inputID.addEventListener('change', event => {
      GM.setValue('id', event.target.value)
    })

    const inputPassword = configBox.querySelector('#KUASAL-password')
    inputPassword.value = await GM.getValue('password') || ''
    inputPassword.addEventListener('change', event => {
      GM.setValue('password', event.target.value)
    })

    const configBoxStyle = document.createElement('style')
    configBoxStyle.textContent = `#${configBox.id} {
      inset: 0;
      margin: auto;
      position: fixed;
      width: 30%;
      min-width: 350px;
      max-width: 450px;
      height: 15%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(25,25,25,0.94);
      border: solid;
      border-color: black;
      box-shadow: black 2px 2px 6px 1px;
      color: white;
      font-size: small;
    }
    #${configBox.id} label {
      color: white;
    }
    .KUASAL-input-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1%;
    }`

    document.head.appendChild(configBoxStyle)

    let menuShown = false
    GM.registerMenuCommand('Toggle Configuration', async function () {
      if (!menuShown) {
        document.body.appendChild(configBox)
        menuShown = true
      } else {
        document.body.removeChild(configBox)
        menuShown = false
      }
    })
  }

  await register_menu()
  if (document.title === 'PandA : Gateway : Welcome') {
    location.href += '/login'
  } else if (document.title === 'CyberLearningService Login') {
    const id = await GM.getValue('id')
    const password = await GM.getValue('password')
    if (id && password) {
      document.querySelector('#username').value = id
      document.querySelector('#password').value = password
      document.querySelector('.btn-submit').click()
    }
  }
})()
