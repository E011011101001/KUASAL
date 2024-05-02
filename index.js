// ==UserScript==
// @name         KUASAL
// @namespace    https://www.eolstudy.com/
// @version      2024-05-02.1
// @description  Kyoto University Authentication System Auto Login
// @author       Eol
// @match        https://authidp1.iimc.kyoto-u.ac.jp/idp/profile/SAML2/Redirect/SSO?execution=e2s2
// @icon         https://authidp1.iimc.kyoto-u.ac.jp/idp/images/logo.png
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';
    const menu_command_id_1 = GM_registerMenuCommand("Show Alert", function(event) {
      alert("Menu item selected");
    }, {
      accessKey: "a",
      autoClose: true
    });

    const menu_command_id_2 = GM_registerMenuCommand("Log", function(event) {
      console.log("Menu item selected");
    }, "l");
    // Your code here...
})();
