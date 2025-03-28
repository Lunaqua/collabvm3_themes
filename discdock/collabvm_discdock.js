// ==UserScript==
// @name         CollabVM Disc Dock
// @namespace    https://github.com/Lunaqua/collabvm3_themes
// @version      2025-03-28_4
// @description  Disc Dock for CollabVM
// @author       navi4205
// @match        https://computernewb.com/collab-vm/
// @match        https://computernewb.com/collab-vm/classic/
// @match        https://computernewb.com/collab-vm/experimental-vm/
// @resource cssInject  https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/discdock/discdock/discdock.css
// @resource htmlInject https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/discdock/discdock/discdock.html
// @resource discImages https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/discdock/discdock/discimages.json
// @resource flpImages https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/discdock/discdock/flpimages.json
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

function toggleDock(){
    const dock = document.getElementById("discImageDockContainer");
    dock.classList.toggle("hidden");
    
    const tab = document.getElementById("dockTabContainer");
    tab.classList.toggle("move-tab");
}

function createDockTab(id, text){
    const bodyTag = document.getElementsByTagName("body")[0];
    const dockTab = document.createElement("div");
    dockTab.id=id+"TabContainer";
    dockTab.classList.toggle("dock-container");
    dockTab.classList.toggle("dock-tab-container");
    dockTab.classList.toggle(id+"-tab-container");
    dockTab.innerHTML = '<div id="'+id+'Tab" class="dock-tab"<p>'+text+'</p></div>';
    dockTab.appendChild(dockTab);
    
    document.getElementById(id+"Tab").addEventListener('click', function(e) { toggleDock(); });
}

function createDock(idT, discImages){
    const dockContents = GM_getResourceText("htmlInject");
    let dockContainer = document.createElement("div");
    dockContainer.id=idT+"DockContainer";
    dockContainer.classList.toggle("dock-container");
    dockContainer.classList.toggle("hidden");
    
    dockContainer.innerHTML = dockContents;
    document.getElementById("dockTabContainer").appendChild(dockContainer);
    
    const preTab = document.getElementById("discDockTable");
    preTab.addEventListener("click", (e) => {
        const highlightedClass = "highlighted";
        const isRow = element => element.firstChild.tagName === 'TD' && element.tagName === 'TR' && element.parentElement.tagName === 'TBODY';
        const newlySelectedRow = e.composedPath().find(isRow);
        const previouslySelectedRow = Array.from(newlySelectedRow.parentElement.children).filter(isRow).find(element => element.classList.contains(highlightedClass));
        if (previouslySelectedRow){
            previouslySelectedRow.classList.toggle(highlightedClass);
            previouslySelectedRow.removeAttribute('id');
        }
        
        if (newlySelectedRow) {
            newlySelectedRow.classList.toggle(highlightedClass);
            newlySelectedRow.id = "selectedDisc";
            
            populateDesc(newlySelectedRow, discImages);
        }
    })
}

function populateDock(discImages){
    const tBody = document.getElementById("discDockTableBody");
    let cats = new Set();
    discImages.forEach( (item, index) => cats.add(item.cat));
    cats = Array.from(cats).sort();

    cats.forEach( (item, index) => tBody.appendChild(Object.assign(document.createElement("tr"), {innerHTML: '<th>'+item+'</th>'})));
    const headings = tBody.getElementsByTagName("th");
    
    discImages.forEach( function(item, index){
        const i = cats.findIndex(element => element === item.cat);
        this[i].parentElement.insertAdjacentElement("afterend", Object.assign(document.createElement("tr"),{innerHTML: '<td imageid="'+index+'">'+item.name+'</td><span class="disc-dock-year">'+item.year+'</span>'}));
    }, headings)
}

function populateDesc(row, discImages){
    const imageid = row.firstChild.getAttribute("imageid");
    const image = discImages[imageid];
    
    document.getElementById("discDockImg").setAttribute("src", image.img);
    document.getElementById("discTitle").innerHTML = image.name;
    document.getElementById("discDesc").innerHTML = image.desc;
}

function sendChatStr(str){
    const chatInput = document.getElementById("chat-input");
    chatInput.value = str;
    document.getElementById("sendChatBtn").click();
}

function enableButtons(discImages){
    const ejectButton = document.getElementById("discDockEject");
    const insertButton = document.getElementById("discDockInsert");
    
    ejectButton.addEventListener("click", (e) => sendChatStr("!eject cd"));
    insertButton.addEventListener("click", (e) => {
        const selected = document.getElementById("selectedDisc");
        const imgId = selected.firstChild.getAttribute("imageid");
        const disc = discImages[imgId];
        
        switch (disc.repo){
            case "isos":
                sendChatStr("!cd "+disc.link);
                break;
                
            case "lily":
                sendChatStr("!lilycd"+disc.link);
                break;
                
            case "flp":
                sendChatStr("!flp"+disc.link);
                break;
            
            default:
                console.log("no way!")
                break;
        }
        
    })
}

function main(){
    const discImages = JSON.parse(GM_getResourceText("discImages"));
    discImages.sort((a, b) => (a.name < b.name ? 1 : -1));
    const flpImages = JSON.parse(GM_getResourceText("flpImages"));
    flpImages.sort((a, b) => (a.name < b.name ? 1 : -1));
    loadCss();
    createDockTab("discImage", "Disc Images");
    createDockTab("flpImage", "Floppy Images");
    createDock("discImage", discImages);
    createDock("discImage", flpImages);
    populateDock(discImages);
    enableButtons(discImages);
}

main();
