// ==UserScript==
// @name         CollabVM Disc Dock
// @namespace    https://github.com/Lunaqua/collabvm3_themes
// @version      1.0.0
// @description  Disc Dock for CollabVM
// @author       navi4205
// @match        https://computernewb.com/collab-vm/
// @match        https://computernewb.com/collab-vm/classic/
// @match        https://computernewb.com/collab-vm/experimental-vm/
// @resource cssInject  https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/discdock/discdock/discdock.css
// @resource htmlInject https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/discdock/discdock/discdock.html
// @grant GM_getResourceText
// ==/UserScript==

// This is based (ripped off) from a similar concept in use at https://infinitemac.org/

function loadCss(){
    let dockCss = document.createElement("style");
    const cssResText = GM_getResourceText("cssInject");
    // Grab the CSS Resouce from github.
    dockCss.innerHTML = cssResText;

    document.getElementsByTagName('head')[0].appendChild(dockCss);
}
    
function createDockTab(){
    const dockTab = document.createElement("div");
    const bodyTag = document.getElementsByTagName("body")[0];
    dockTab.id="discImageTabContainer";
    dockTab.classList.toggle("dock-tab-container");

    dockTab.innerHTML = '<div id="discImageTab" class="dock-tab"><p>Disc Images</p></div>';
    bodyTag.appendChild(dockTab);
}

function main(){
    createDockTab();
    loadCss();
}

main();
