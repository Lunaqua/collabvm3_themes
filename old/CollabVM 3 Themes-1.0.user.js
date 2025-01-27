// ==UserScript==
// @name         CollabVM 3 Themes
// @namespace    yep
// @version      1.0
// @description  Themes for CollabVM 3
// @author       Navi
// @match        https://computernewb.com/collab-vm/experimental-vm/
// @grant        unsafeWindow
// @grant        window.focus
// ==/UserScript==

function setColour(e){
    let colour = e.currentTarget.value;
    document.body.style.setProperty(e.currentTarget.getAttribute("cssprop"), colour);
}

function fixHeaderColour(){
    let element = document.querySelector('.bg-body-tertiary');
    element.style = "background-color: var(--bs-tertiary-bg) !important";
    element = document.querySelector('th.bg-body-tertiary');
    element.style = "background-color: var(--bs-tertiary-bg) !important";
}

function setUserColours(){
    let userColours = document.createElement("style");
    userColours.innerHTML = "#user-list .turn-active {\
                                --bs-table-bg:var(--active-user-bg) !important;\
                             }\
                             #user-list .turn-waiting {\
                                --bs-table-bg:var(--waiting-user-bg) !important;\
                             }\
                             .username-administrator {\
                                color: var(--bs-danger-text-emphasis) !important;\
                             }\
                             .username-moderator {\
                                color: var(--bs-warning-text-emphasis) !important;\
                             }\
                             .btn-primary {\
                                --bs-btn-color: var(--bs-body-color) !important;\
                                --bs-btn-bg: var(--bs-primary-text-emphasis) !important;\
                                --bs-btn-border-color: var(--bs-primary-text-emphasis) !important;\
                                --bs-btn-hover-color:var(--bs-body-color) !important;\
                                --bs-btn-hover-bg: var(--bs-primary) !important;\
                                --bs-btn-hover-border-color: var(--bs-primary) !important;\
                             }\
                             .btn-secondary {\
                                --bs-btn-color: var(--bs-body-color) !important;\
                                --bs-btn-bg: var(--bs-gray-700) !important;\
                                --bs-btn-border-color: var(--bs-gray-700) !important;\
                                --bs-btn-hover-color: var(--bs-body-color) !important;\
                                --bs-btn-hover-bg: var(--bs-gray-700) !important;\
                                --bs-btn-hover-border-color: var(--bs-gray-700) !important;\
                             }\
                             .dropdown-menu {\
                                --bs-dropdown-link-active-bg: var(--bs-primary) !important;\
                             }\
                             .theme-body {\
                                display: grid;\
                                grid-template-columns: repeat(2, 1fr);\
                                gap: 10px;\
                                grid-auto-rows: minmax(100px, 100px, auto);\
                             }\
                             .theme-colour-selector {\
                                grid-row: 1 / 2;\
                                grid-column: 1 / 2;\
                             }\
                             .theme-element-selector {\
                                grid-row: 1 / 2;\
                                grid-column: 2 / 3;\
                                height: 310px;\
                                overflow: scroll;\
                                display: inline-block;\
                             }\
                             .theme-button-save {\
                                grid-row: 2;\
                                grid-column: 1;\
                             }\
                             .theme-button-clear {\
                                grid-row: 2;\
                                grid-column: 2;\
                             }\
                             body {\
                                --active-user-bg: #053d4d;\
                                --waiting-user-bg: #484800;\
                             ";

    document.getElementsByTagName('head')[0].appendChild(userColours);
}

function saveTheme(){
    let userStyle = document.getElementsByTagName("body")[0].style.cssText;
    console.log(userStyle);
    localStorage.setItem("userStyle", userStyle);
}

function clearTheme(){
    document.getElementsByTagName("body")[0].style = "";
}

function loadTheme(){
   if (localStorage.getItem("userStyle")) {
       let bodyTag = document.getElementsByTagName("body")[0];
       bodyTag.style.cssText = localStorage.getItem("userStyle");
   }
}

function showThemesModal(e){
    let themesModal = document.getElementById("themes-modal");
    themesModal.classList.toggle("show");
    themesModal.style = "display:block;";
}

function addThemesEntry(){
    let menu = document.querySelector('.dropdown-menu');
    let themeEntry = document.createElement("a");
    themeEntry.classList.toggle("dropdown-item");
    themeEntry.setAttribute("href","#");
    themeEntry.setAttribute("data-toggle","modal");
    themeEntry.setAttribute("data-target","#themes-modal");
    themeEntry.innerHTML = "Themes";

    menu.appendChild(themeEntry);
    themeEntry.addEventListener('click', function(e) { showThemesModal(e) });
}

function addThemesModal(){
    let themesModal = document.createElement("div");
    themesModal.classList.toggle("fade");
    themesModal.classList.toggle("modal");
    themesModal.setAttribute('tabindex', "-1");
    themesModal.id = "themes-modal";

    themesModal.innerHTML = '<div class="modal-dialog">\
                             <div class="modal-content">\
                             <div class="modal-header">\
                                 <h5 class="modal-title">Themes</h5>\
                                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\
                             </div>\
                             <div id="themes-body" class="modal-body">\
                             </div>\
                             </div>\
                             </div>'

    document.body.appendChild(themesModal);
}

function addColourPicker(){
    let colorisScript = document.createElement("script");
    colorisScript.src = "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js";
    let colorisStyle = document.createElement("link");
    colorisStyle.rel = "stylesheet";
    colorisStyle.href = "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css";

    document.getElementsByTagName('head')[0].appendChild(colorisScript);
    document.getElementsByTagName('head')[0].appendChild(colorisStyle);

    //let colorisContainer = document.getElementsByClassName("navbar-nav")[0];
    let colorisContainer = document.getElementById("themes-body");
    colorisContainer.classList.toggle("theme-body");
    let coloris = document.createElement("input");
    coloris.type = "text";
    coloris.setAttribute('data-coloris', "");
    coloris.classList.toggle("theme-colour-selector");
    coloris.id = "cPicker";
    coloris.setAttribute('cssprop', "--bs-body-bg");

    colorisContainer.appendChild(coloris);
    coloris.addEventListener('input', function(e) { setColour(e) });

    let saveButton = document.createElement("button");
    saveButton.id = "saveButton";
    saveButton.onclick = function(){saveTheme()};
    saveButton.innerHTML = "Save";
    saveButton.classList.toggle("theme-button-save");

    let clearButton = document.createElement("button");
    clearButton.id = "clearButton";
    clearButton.onclick = function(){clearTheme()};
    clearButton.innerHTML = "Clear";
    clearButton.classList.toggle("theme-button-clear");

    colorisContainer.appendChild(saveButton);
    colorisContainer.appendChild(clearButton);

}

function clearColourPicker(cssprop){
    let colourValue = getComputedStyle(document.body).getPropertyValue(cssprop)

    let coloris = document.getElementById("cPicker");
    coloris.value = colourValue;
}

function addColourTable(){
    let colourTable = document.createElement("table");
    colourTable.innerHTML = '<tbody>\
    <tr cssprop="--bs-body-bg"><td>Background Colour</td></tr>\
    <tr cssprop="--bs-tertiary-bg"><td>Header Background</td></tr>\
    <tr cssprop="--bs-primary-text-emphasis"><td>Primary Button</td></tr>\
    <tr cssprop="--bs-gray-700"><td>Secondary Button</td></tr>\
    <tr cssprop="--bs-primary"><td>Primary Button Hover</td></tr>\
    <tr cssprop="--bs-gray-800"><td>Secondary Button Hover</td></tr>\
    <tr cssprop="--bs-body-color"><td>Text Colour</td></tr>\
    <tr cssprop="--active-user-bg"><td>Active User Back</td></tr>\
    <tr cssprop="--waiting-user-bg"><td>Waiting User Back</td></tr>\
    <tr cssprop="--bs-danger-text-emphasis"><td>Admin Colour</td></tr>\
    <tr cssprop="--bs-warning-text-emphasis"><td>Mod Colour</td></tr>\
    </tbody>';
    colourTable.id = "colourTable";
    //colourTable.style = "overflow: scroll; width: 200px; height: 50px; display: inline-block";
    colourTable.classList.toggle("theme-element-selector");

    let colourTableContainer = document.getElementById("themes-body");
    colourTableContainer.appendChild(colourTable);

    colourTable.addEventListener("click", (e, coloris) => {
      const highlightedClass = "highlighted";
      const isRow = element => element.tagName === 'TR' && element.parentElement.tagName === 'TBODY';
      const newlySelectedRow = e.composedPath().find(isRow);
      const previouslySelectedRow = Array.from(newlySelectedRow.parentElement.children).filter(isRow).find(element => element.classList.contains(highlightedClass));
      if(previouslySelectedRow){
          previouslySelectedRow.classList.toggle(highlightedClass);
          previouslySelectedRow.style = "background-color: inherit";
      }

      if (newlySelectedRow) {
          newlySelectedRow.classList.toggle(highlightedClass);
          newlySelectedRow.style = "background-color: var(--bs-primary-text-emphasis)";

          clearColourPicker(newlySelectedRow.getAttribute("cssprop"));

          let coloris = document.getElementById("cPicker");
          coloris.setAttribute('cssprop', newlySelectedRow.getAttribute("cssprop"));

      }
    })
}

function main(){
    fixHeaderColour();
    setUserColours();
    addThemesModal();
    addThemesEntry();
    addColourPicker();
    addColourTable();
    loadTheme();

    //console.Coloris({parent: '#themes-body', inline: true, themeMode: 'dark',});
}

main()