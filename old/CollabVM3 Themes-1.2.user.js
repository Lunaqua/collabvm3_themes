// ==UserScript==
// @name         CollabVM3 Themes
// @namespace    yep
// @version      1.2
// @description  Themes for CollabVM3
// @author       Navi
// @match        https://computernewb.com/collab-vm/experimental-vm/
// @grant        unsafeWindow
// @grant        window.focus
// ==/UserScript==

// TODO:
// Custom layouts
// custom elements?
// Proper modal fading
// Custom chat sound?
// Custom glow?
// theme export and import
// Add preset themes
// custom font size
// custom padding
// background effects (scaling, blur, transparency)
// persistent font and background inputs
// border colours
// custom border-radius
// fix inconsistent border radius
// allow font/background reset

// void setColour(whatever e) -
// Gets the current colour from the colour input, and sets the selected attrib.
function setColour(e){
    let colour = e.currentTarget.value; //this.value (input box)
    let cssProp = e.currentTarget.getAttribute("cssprop")
    if (cssProp === "background-image"){
        colour = "url(" + colour + ")";
    }
    document.body.style.setProperty(cssProp, colour);
}

//function fixHeaderColour(){
//    let element = document.querySelector('.bg-body-tertiary');
//    element.style = "background-color: var(--bs-tertiary-bg) !important";
//    element = document.querySelector('th.bg-body-tertiary');
//    element.style = "background-color: var(--bs-tertiary-bg) !important";
//}

// void setUserColours() - Creates a style tag with new required css.
// This is most to "fix" certain elements that use set colours or rgb values.
// Also to layout and theme the "themesModal"
function setUserColours(){
    let userColours = document.createElement("style");
    userColours.innerHTML = "#user-list .turn-active {\
                                --bs-table-bg:var(--active-user-bg) !important;\
                             }\
                             #user-list .turn-waiting {\
                                --bs-table-bg:var(--waiting-user-bg) !important;\
                             }\
                             .navbar-brand:hover, .navbar-brand:focus {\
                                color: var(--bs-navbar-active-color) !important;\
                             }\
                             .navbar-brand {\
                                color: var(--bs-navbar-active-color) !important;\
                             }\
                             .navbar {\
                                --bs-navbar-active-color: var(--bs-navbar-new-color) !important;\
                             }\
.row {\
    --bs-gutter-y: 1.5rem;\
    margin-top: calc(-.5*var(--bs-gutter-y));\
}\
.card {\
    animation-duration: 1s;\
    animation-name: cardSlide;\
    animation-iteration-count: 1;\
    animation-direction: normal;\
    animation-timing-function: cubic-bezier(0.64, 0, 0.78, 0);\
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\
}\
.card:hover {\
    transform: scale(103%, 103%);\
}\
@keyframes cardSlide {\
    from {\
        opacity: 0%;\
        transform: translateX(-50px);\
    }\
    to {\
        opactity: 100%;\
        transform: none;\
    }\
}\
#chat-history tr {\
    animation-duration: 0.2s;\
    animation-name: chatFade;\
    animation-iteration-count: 1;\
    animation-direction: normal;\
    animation-timing-function: cubic-bezier(0.64, 0, 0.78, 0);\
}\
@keyframes chatFade {\
    from {\
        opacity: 0%;\
    }\
    to {\
        opactity: 100%;\
    }\
}\
                             .bg-body-tertiary {\
                                background-color: var(--bs-tertiary-bg) !important;\
                             }\
                             th.bg-body-tertiary {\
                                background-color: var(--bs-tertiary-bg) !important;\
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
                                --bs-btn-active-color: var(--bs-body-color) !important;\
                                --bs-btn-active-bg: var(--bs-primary) !important;\
                                --bs-btn-active-border-color: var(--bs-primary) !important;\
                             }\
                             .btn-secondary {\
                                --bs-btn-color: var(--bs-body-color) !important;\
                                --bs-btn-bg: var(--bs-gray-700) !important;\
                                --bs-btn-border-color: var(--bs-gray-700) !important;\
                                --bs-btn-hover-color: var(--bs-body-color) !important;\
                                --bs-btn-hover-bg: var(--bs-gray-800) !important;\
                                --bs-btn-hover-border-color: var(--bs-gray-800) !important;\
                                --bs-btn-active-color: var(--bs-body-color) !important;\
                                --bs-btn-active-bg: var(--bs-gray-800) !important;\
                                --bs-btn-active-border-color: var(--bs-gray-800) !important;\
                             }\
                             .form-control:focus {\
                                border-color: var(--bs-primary) !important;\
                                box-shadow: none !important;\
                             }\
                             .card:hover {\
                                border-color: var(--bs-primary) !important;\
                             }\
                             .dropdown-menu {\
                                --bs-dropdown-link-active-bg: var(--bs-primary) !important;\
                             }\
.input-group {\
    margin-top: 1rem;\
    margin-bottom: 1.5rem;\
}\
                             .simple-keyboard.cvmDisabled .hg-button {\
                                background-color: var(--bs-gray-300) !important;\
                                color: var(--bs-body-color) !important;\
                             }\
                             .simple-keyboard.cvmDark .hg-button:active {\
                                background-color: var(--bs-primary) !important;\
                                color: var(--bs-body-color) !important;\
                             }\
                             .hg-theme-default .hg-button.hg-activebutton {\
                                background-color: var(--bs-primary) !important;\
                             }\
                             .simple-keyboard.cvmDark .hg-button{\
                                background-color: var(--bs-primary-text-emphasis) !important;\
                             }\
                             .form-range::-webkit-slider-runnable-track {\
                                background-color: var(--bs-tertiary-bg) !important;\
                             }\
                             .form-range::-moz-range-track {\
                                background-color: var(--bs-tertiary-bg) !important;\
                             }\
                             .form-range::-webkit-slider-thumb {\
                                background-color: var(--bs-primary-text-emphasis) !important;\
                              }\
                             .form-range::-moz-range-thumb {\
                                background-color: var(--bs-primary-text-emphasis) !important;\
                              }\
                             .form-range::-webkit-slider-thumb:active {\
                                background-color: var(--bs-primary) !important;\
                              }\
                             .form-range::-moz-range-thumb:active {\
                                background-color: var(--bs-primary) !important;\
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
                                background-color: var(--bs-tertiary-bg);\
                             }\
                             .theme-element-selector {\
                                grid-row: 1 / 2;\
                                grid-column: 2 / 3;\
                                height: 310px;\
                                overflow: scroll;\
                                display: inline-block;\
                             }\
                             .theme-button-save {\
                                grid-row: 4;\
                                grid-column: 1;\
                             }\
                             .theme-button-clear {\
                                grid-row: 4;\
                                grid-column: 2;\
                             }\
.fontInput {\
    grid-row: 2;\
    grid-column: 2;\
    background-color: var(--bs-tertiary-bg);\
}\
.fontInput:active {\
    border-color: var(--bs-primary) !important;\
}\
.fontLabel {\
    grid-row: 2;\
    grid-column: 1;\
}\
.backInput {\
    grid-row: 3;\
    grid-column: 2;\
    background-color: var(--bs-tertiary-bg);\
}\
.backInput:active {\
    border-color: var(--bs-primary) !important;\
}\
.backLabel {\
    grid-row: 3;\
    grid-column: 1;\
}\
                             .modal {\
                                --bs-modal-zindex: 200;\
                             }\
                             body {\
                                --active-user-bg: #053d4d;\
                                --waiting-user-bg: #484800;\
                                --bs-navbar-new-color: #fff;\
                             }\
                             :selection {\
                                background: var(--bs-info-text-emphasis);\
                             }";

    document.getElementsByTagName('head')[0].appendChild(userColours);
}

// void saveTheme() - Saves css values to localstorage
// Very simple, but it works for now
function saveTheme(){
    let userStyle = document.getElementsByTagName("body")[0].style.cssText;
    console.log(userStyle);
    localStorage.setItem("userStyle", userStyle);
}

// void clearTheme() - Clears any set css.
function clearTheme(){
    document.getElementsByTagName("body")[0].style = "";
}

// void loadTheme() - Loads theme from localstorage
function loadTheme(){
   if (localStorage.getItem("userStyle")) {
       let bodyTag = document.getElementsByTagName("body")[0];
       bodyTag.style.cssText = localStorage.getItem("userStyle");
       //Quickly sets the style tag on body
   }
}

// void showThemesModal(whatever e, String display) - Show/hide the themes modal
// display is just the full css tag.
function showThemesModal(e, display){
    let themesModal = document.getElementById("themes-modal");
    themesModal.classList.toggle("show");
    themesModal.style = display;
}

// void addThemesEntry() - adds a new themes option to the dropdown menu
function addThemesEntry(){
    let menu = document.querySelector('.dropdown-menu');
    let themeEntry = document.createElement("a");
    themeEntry.classList.toggle("dropdown-item");
    themeEntry.setAttribute("data-toggle","modal");
    themeEntry.setAttribute("data-target","#themes-modal");
    themeEntry.innerHTML = "Themes";

    menu.appendChild(themeEntry);
    themeEntry.addEventListener('click', function(e) { showThemesModal(e, "display:block;") });
    // Makes the entry actually work.
}

//void addThemesModal() - Adds the theme modal to the dom for display later
//The actual content is created in another function
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
                                 <button type="button" id="themeButtonClose" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\
                             </div>\
                             <div id="themes-body" class="modal-body">\
                             </div>\
                             </div>\
                             </div>'

    document.body.appendChild(themesModal);

    let themeButtonClose = document.getElementById("themeButtonClose");
    themeButtonClose.addEventListener("click", function(e) { showThemesModal(e, "display:none;") });
    // Makes the close button work
}

// void addColourPicker() - Imports the coloris script, add a new coloris input box, and buttons
function addColourPicker(){
    let colorisScript = document.createElement("script");
    colorisScript.src = "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js";
    let colorisStyle = document.createElement("link");
    colorisStyle.rel = "stylesheet";
    colorisStyle.href = "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css";

    // This imports the script and stylesheet

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

    // Create the input box, and add the correct class/attribs

    colorisContainer.appendChild(coloris);
    coloris.addEventListener('input', function(e) { setColour(e) });
    // Runs setColour when the colour input is changed.

    let saveButton = document.createElement("button");
    saveButton.id = "saveButton";
    saveButton.onclick = function(){saveTheme()};
    saveButton.innerHTML = "Save";
    saveButton.classList.toggle("theme-button-save");
    saveButton.classList.toggle("btn");
    saveButton.classList.toggle("btn-primary");

    let clearButton = document.createElement("button");
    clearButton.id = "clearButton";
    clearButton.onclick = function(){clearTheme()};
    clearButton.innerHTML = "Clear";
    clearButton.classList.toggle("theme-button-clear");
    clearButton.classList.toggle("btn");
    clearButton.classList.toggle("btn-secondary");

    // Creates the save and clear button, and places them in the layout.

    colorisContainer.appendChild(saveButton);
    colorisContainer.appendChild(clearButton);

    let fontInput = document.createElement("input");
    fontInput.id = "fontInput";
    fontInput.classList.toggle("fontInput");
    fontInput.setAttribute("type", "text");
    fontInput.setAttribute("name", "fontInput");
    fontInput.setAttribute("placeholder", "Enter a valid font name");
    fontInput.setAttribute('cssprop', "--bs-body-font-family");

    let fontLabel = document.createElement("label");
    fontLabel.classList.toggle("fontLabel");
    fontLabel.setAttribute("for", "fontInput");
    fontLabel.innerHTML = "Custom Font";

    colorisContainer.appendChild(fontInput);
    colorisContainer.appendChild(fontLabel);

    fontInput.addEventListener('input', function(e) { setColour(e) });

    let backInput = document.createElement("input");
    backInput.id = "backInput";
    backInput.classList.toggle("backInput");
    backInput.setAttribute("type", "url");
    backInput.setAttribute("name", "backInput");
    backInput.setAttribute("placeholder", "Enter a valid image url");
    backInput.setAttribute('cssprop', "background-image");

    let backLabel = document.createElement("label");
    backLabel.classList.toggle("backLabel");
    backLabel.setAttribute("for", "backInput");
    backLabel.innerHTML = "Background Image";

    colorisContainer.appendChild(backInput);
    colorisContainer.appendChild(backLabel);

    backInput.addEventListener('input', function(e) { setColour(e) });

}

// void clearColourPickter(String cssprop) -
//Sets the input box to the current value of the targeted element
function clearColourPicker(cssprop){
    let colourValue = getComputedStyle(document.body).getPropertyValue(cssprop)
    // Get the current value

    let coloris = document.getElementById("cPicker");
    coloris.value = colourValue;
    // Set it
}

// void addColourTable() - Adds the list of selectable elements.
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
    <tr cssprop="--bs-navbar-new-color"><td>Header Text Colour</td></tr>\
    <tr cssprop="--bs-gray-300"><td>Disabled Keyboard Colour</td></tr>\
    <tr cssprop="--bs-info-text-emphasis"><td>Text Highlight Colour</td></tr>\
    </tbody>';
    // Adds table entries with corresponding css properties
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
          newlySelectedRow.style = "background-color: var(--bs-primary)";

          clearColourPicker(newlySelectedRow.getAttribute("cssprop"));

          let coloris = document.getElementById("cPicker");
          coloris.setAttribute('cssprop', newlySelectedRow.getAttribute("cssprop"));

          document.querySelector('.theme-colour-selector').dispatchEvent(new Event('input', { bubbles: true }));
      }
       // Code stolen from https://jdan.github.io/98.css/ to make the table function as a selector
    })
}

// void main() - Initialises everything
function main(){
//    fixHeaderColour();
    setUserColours();
    addThemesModal();
    addThemesEntry();
    addColourPicker();
    addColourTable();
    loadTheme();

    //console.Coloris({parent: '#themes-body', inline: true, themeMode: 'dark',});
}

main()