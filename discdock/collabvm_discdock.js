// ==UserScript==
// @name         CollabVM Disc Dock
// @namespace    https://github.com/Lunaqua/collabvm3_themes
// @version      1.0.1
// @description  Disc Dock for CollabVM
// @author       navi4205
// @match        https://computernewb.com/collab-vm/
// @match        https://computernewb.com/collab-vm/classic/
// @match        https://computernewb.com/collab-vm/experimental-vm/
// @resource cssInject  https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/master/discdock/discdock.css
// @resource htmlInject https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/master/discdock/discdock.html
// @resource discImages https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/master/discdock/discimages.json
// @resource flpImages https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/master/discdock/flpimages.json
// @grant GM_getResourceText
// ==/UserScript==

// This is based (ripped off) from a similar concept in use at https://infinitemac.org/
// Script is provided under the MIT License. (see ../LICENSE)

/* void loadCss() - Load the userCSS from file, and insert it. 
 * This is achieved by simply adding it to the head tag 
 */
function loadCss(){
    let dockCss = document.createElement("style");
    const cssResText = GM_getResourceText("cssInject");
    // Grab the CSS Resouce from github.
    dockCss.innerHTML = cssResText;

    document.getElementsByTagName('head')[0].appendChild(dockCss);
}

/* void toggleDock(str id) - Sets css classes to display and hide the dock.
 * Firstly the dock is unhidden and moved up, then the tab is moved into place.
 * This is run from the tab function EventListener.
 */
function toggleDock(id){
    const dock = document.getElementById(id+"DockContainer");
    dock.classList.toggle("hidden");
    
    const tab = document.getElementById(id+"TabContainer");
    tab.classList.toggle("move-tab");
}

/* void createDockTab(str id, str text) - Creates a tab, and tab container.
 * This is inserted into the DOM at the end of the <BODY> tag.
 * An individual container must be created for each tab to allow correct
 * positioning.
 */
function createDockTab(id, text){
    const bodyTag = document.getElementsByTagName("body")[0];
    const dockTab = document.createElement("div");
    dockTab.id=id+"TabContainer";
    dockTab.classList.toggle("dock-container");
    dockTab.classList.toggle("dock-tab-container");
    dockTab.classList.toggle(id+"-tab-container");
    // Correctly positions each tab horizontally.
    dockTab.innerHTML = '<div id="'+id+'Tab" class="dock-tab"><p>\
                                                        '+text+'</p></div>';
    bodyTag.appendChild(dockTab);
    
    document.getElementById(id+"Tab").addEventListener('click', function(e) { 
        toggleDock(id); 
    });
    // Adds functionality to the tab.
}

/* void createDock(str idT, str m, array discImages) - Create dock tray.
 * This function creates the dock and its table for entries.
 * Does not actually populate said table, that action is performed by the next
 * function.
 */
function createDock(idT, m, discImages){
    const dockContents = GM_getResourceText("htmlInject").replace(/id="disc/g,
                                                                  'id="'+m);
    // Gets the html dock source, and patches it with the correct ids.
    let dockContainer = document.createElement("div");
    dockContainer.id=idT+"DockContainer";
    dockContainer.classList.toggle("dock-container");
    dockContainer.classList.toggle("hidden");
    
    dockContainer.innerHTML = dockContents;
    document.getElementById(idT+"TabContainer").appendChild(dockContainer);
    
    // Create the dock element, and add the html.
    
    const preTab = document.getElementById(m+"DockTable");
    preTab.addEventListener("click", (e) => {
        const highlightedClass = "highlighted";
        const isRow = element => element.firstChild.tagName === 'TD' && 
        element.tagName === 'TR' && element.parentElement.tagName === 'TBODY';
        const newlySelectedRow = e.composedPath().find(isRow);
        const previouslySelectedRow = Array.from(
            newlySelectedRow.parentElement.children).filter(isRow).find(
                element => element.classList.contains(highlightedClass));
        if (previouslySelectedRow){
            previouslySelectedRow.classList.toggle(highlightedClass);
            previouslySelectedRow.removeAttribute('id');
        }
        
        if (newlySelectedRow) {
            newlySelectedRow.classList.toggle(highlightedClass);
            newlySelectedRow.id = "selected"+m;
            
            populateDesc(newlySelectedRow, m, discImages);
            // Populate sidebar based on selected row.
        }
    })
    
    // Give the table functionality.
}

/* void populateDock(str m, array discImages) - populate dock table with 
 *      entries.
 * This is done by first creating the categories required, then adding
 * the actual entries into the table.
 */
function populateDock(m, discImages){
    const tBody = document.getElementById(m+"DockTableBody");
    let cats = new Set();
    // A set will only allow uniq items.
    discImages.forEach( (item, index) => cats.add(item.cat));
    // For each entry in the json, add each category to the set.
    cats = Array.from(cats).sort();
    // convert the set to an array in order to sort it.

    cats.forEach( (item, index) => tBody.appendChild(
        Object.assign(document.createElement("tr"), {
            innerHTML: '<th>'+item+'</th>'})));
    // For each category, create a new heading element.
    const headings = tBody.getElementsByTagName("th");
    // Get the headings elements. Could be created as it goes?
    
    discImages.forEach( function(item, index){
        const i = cats.findIndex(element => element === item.cat);
        this[i].parentElement.insertAdjacentElement(
            "afterend", Object.assign(document.createElement("tr"),{
                innerHTML: '<td imageid="'+index+'">'+item.name+'\
                </td><span class="'+m+'-dock-year">'+item.year+'</span>'}));
    }, headings);
    
    /* This mess goes through each of the entries in the json, finds the index
     * of the heading in the category array in order to index the array of
     * heading elements. This element is then selected, and the table row
     * is inserted at the correct point.
     */
}

/* void populateDesc(elem row, str m, array discImages) - Adds info to the desc
 *      based on selected row.
 * This uses the "imageid" index inserted by the previous function.
 */
function populateDesc(row, m, discImages){
    const imageid = row.firstChild.getAttribute("imageid");
    const image = discImages[imageid];
    
    document.getElementById(m+"DockImg").setAttribute("src", image.img);
    document.getElementById(m+"Title").innerHTML = image.name;
    document.getElementById(m+"Desc").innerHTML = image.desc;
}

/* void sendChatStr(str str) - Simple function to auto send a chat msg. */
function sendChatStr(str){
    const chatInput = document.getElementById("chat-input");
    chatInput.value = str;
    document.getElementById("sendChatBtn").click();
}

/* void enableButtons(str m, str eM, array discImages) - Enable dock buttons.
 * This allows the eject and load buttons to function by adding
 * their EventListeners.
 */
function enableButtons(m, eM, discImages){
    const ejectButton = document.getElementById(m+"DockEject");
    const insertButton = document.getElementById(m+"DockInsert");
    
    ejectButton.addEventListener("click", (e) => sendChatStr("!eject "+eM));
    insertButton.addEventListener("click", (e) => {
        const selected = document.getElementById("selected"+m);
        const imgId = selected.firstChild.getAttribute("imageid");
        const disc = discImages[imgId];
        
        switch (disc.repo){
            case "isos":
                sendChatStr("!cd "+disc.link);
                break;
                
            case "lily":
                sendChatStr("!lilycd "+disc.link);
                break;
                
            case "flp":
                sendChatStr("!flp "+disc.link);
                break;
            
            default:
                console.log("no way!")
                break;
        }
        // Each corresponds to the correct IAOS Bot command.
    })
}

/* void main() - Main function, run all the things. */
function main(){
    const discImages = JSON.parse(GM_getResourceText("discImages"));
    discImages.sort((a, b) => (a.name < b.name ? 1 : -1));
    // Parses the json containing disc information, and then sorts based on
    // name.
    const flpImages = JSON.parse(GM_getResourceText("flpImages"));
    flpImages.sort((a, b) => (a.name < b.name ? 1 : -1));
    loadCss();
    createDockTab("discImage", "Disc Images");
    createDockTab("flpImage", "Floppy Images");
    createDock("discImage", "disc", discImages);
    createDock("flpImage", "flp", flpImages);
    populateDock("disc", discImages);
    populateDock("flp", flpImages);
    enableButtons("disc", "cd", discImages);
    enableButtons("flp", "flp", flpImages);
}

main();
