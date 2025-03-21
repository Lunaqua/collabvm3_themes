// ==UserScript==
// @name         CollabVM Disc Dock
// @namespace    https://github.com/Lunaqua/collabvm3_themes
// @version      1.0.0
// @description  Disc Dock for CollabVM
// @author       navi4205
// @match        https://computernewb.com/collab-vm/
// @match        https://computernewb.com/collab-vm/classic/
// @match        https://computernewb.com/collab-vm/experimental-vm/
// @resource cssInject  https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/discdock/discdock.css
// @resource htmlInject https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/mdiscdock/discdock.html
// @grant GM_getResourceText
// ==/UserScript==

// This is based (ripped off) from a similar concept in use at https://infinitemac.org/

function createDockTab(){
    const dockTab = document.createElement("div");
    dockTab.id="discImageTab";
    dockTab.classList.toggle("dock-tab");
    
    dockTab.innerHTML = "<p>Disc Images</p>"
}
