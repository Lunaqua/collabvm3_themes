// ==UserScript==
// @name         CollabVM3 Themes
// @namespace    https://github.com/Lunaqua/collabvm3_themes
// @version      2025-01-28
// @description  Themes for CollabVM 3
// @author       navi4205
// @match        https://computernewb.com/collab-vm/experimental-vm/
// @resource cssInject  https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/master/resource.css
// @resource htmlInject https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/master/resource.html
// @grant GM_getResourceText
// ==/UserScript==

// -------------------------------------

// Wants:
// custom elements
// Custom chat sound
// dakrk style chat pinging
// background effects (scaling, blur, positioning, blend-mode)
// Custom layouts
// theme (n)ovi store

// Fixes:
// fix text highlight
// fix scrollbar border radius
// fix chat button border
// persistent font and background inputs
// clear input validity (:valid)
// individual reset of colours

// Next Steps:
// custom padding
// theme export and import
// Add preset themes
// Add font upload
// Add image upload
// UI Revamp to handle this stuff

// Now:
// Code Cleanup

// -------------------------------------

// void setColour(whatever e) -
// Gets the current colour from the colour input, and sets the selected attrib.
function setColour(e){
    let colour = e.currentTarget.value; //this.value (input box)
    let cssProp = e.currentTarget.getAttribute("cssprop")
    if (cssProp === "background-image"){
        colour = "url(" + colour + ")";
    }
    if (cssProp === "--bs-border-radius"){
        colour = colour + "em";
    }
    if (cssProp === "--glow-blur"){
        colour = colour + "px";
    }
    if (cssProp === "--glow-radius"){
        colour = colour + "px";
    }
    if (cssProp === "--bs-body-font-size"){
        colour = colour + "rem";
    }
    if (cssProp === "--backdrop-blur-radius"){
        colour = colour + "px";
    }
    document.body.style.setProperty(cssProp, colour);
}

// void setUserColours() - Creates a style tag with new required css.
// This is most to "fix" certain elements that use set colours or rgb values.
// Also to layout and theme the "themesModal"
function setUserColours(){
    let userCss = document.createElement("style");
    const cssResText = GM_getResourceText("cssInject");
    userCss.innerHTML = cssResText;

    document.getElementsByTagName('head')[0].appendChild(userCss);
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
    let colorisScript = document.createElement("script");
    colorisScript.src = "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js";
    let colorisStyle = document.createElement("link");
    colorisStyle.rel = "stylesheet";
    colorisStyle.href = "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css";
    
    document.getElementsByTagName('head')[0].appendChild(colorisScript);
    document.getElementsByTagName('head')[0].appendChild(colorisStyle);
    // This imports the colour picker script and stylesheet
    const htmlResText = GM_getResourceText("htmlInject");
    console.log(htmlResText);
    
    let themesContainer = document.createElement("div");
    themesContainer.classList.toggle("fade");
    themesContainer.classList.toggle("modal");
    themesContainer.id = "themes-modal"
    themesContainer.setAttribute("tabindex", "-1");
    themesContainer.innerHTML = htmlResText;
    document.body.appendChild(themesContainer);
    
    let colorisContainer = document.getElementById("themes-body");
    colorisContainer.classList.toggle("theme-body");
    let coloris = document.createElement("input");
    coloris.type = "text";
    coloris.setAttribute('data-coloris', "");
    coloris.classList.toggle("theme-colour-selector");
    coloris.id = "cPicker";
    coloris.setAttribute('cssprop', "--bs-body-bg");
    
    colorisContainer.appendChild(coloris);

    // Makes the close button work
    
    const elements = ["backInput", "fontInput", "borderInput",
    "glowBlurInput", "glowRadiusInput", "fontSizeInput", "headerFontInput",
        "blurRadiusInput", "cPicker"
    ]
    
    elements.forEach( function(item, index) {
        document.getElementById(item).addEventListener('input', function(e) { setColour(e) })}
    )
    
    // Create the input box, and add the correct class/attribs
    // Runs setColour when the colour input is changed.
    
    let themeButtonClose = document.getElementById("themeButtonClose");
    themeButtonClose.addEventListener("click", function(e) { showThemesModal(e, "display:none;") });
    
    // Creates the save and clear button, and places them in the layout.

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
    <tr cssprop="--bs-border-color"><td>Border Colour</td></tr>\
    <tr cssprop="--glow-colour"><td>Glow Colour</td></tr>\
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
    addThemesModal();
    addThemesEntry();
    addColourTable();
    setUserColours();
    loadTheme();
    
}

main()
