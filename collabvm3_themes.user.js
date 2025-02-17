// ==UserScript==
// @name         CollabVM3 Themes
// @namespace    https://github.com/Lunaqua/collabvm3_themes
// @version      2025-02-17_3
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
// A proper flexible responsive themes dialogue.

// Fixes:
// fix text highlight
// fix scrollbar border radius
// fix chat button border
// persistent font and background inputs
// clear input validity (:valid)
// individual reset of colours
// Make CSS nicer using grid template stuff

// Now:
// custom padding
// theme export and import
// Add preset themes
// Add font upload
// Add image upload
// UI Revamp to handle this stuff

// -------------------------------------

function changePage(pageNum) {
        let cuPage = document.getElementsByClassName("themes-selected-tab")[0];
        cuPage.classList.toggle("themes-selected-tab");
        let cuPageDiv = document.getElementById("themesPage"+cuPage.getAttribute("page"));
        cuPageDiv.classList.toggle("themes-hide");
        cuPageDiv.classList.toggle("themes-page");
        
        let page = document.getElementById("themesPage"+pageNum);
        page.classList.toggle("themes-hide");
        page.classList.toggle("themes-page");
        
        let selTab = document.getElementById("page-"+pageNum);
        selTab.classList.toggle("themes-selected-tab");
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

// void setProperty(whatever e) -
// Gets the current value from an input property, and sets the selected attrib.
function setProperty(e){
    let colour = e.currentTarget.value; //this.value (input box)
    let cssProp = e.currentTarget.getAttribute("cssprop") 
    //Gets the css property to be set.
    
    switch (cssProp) {
        case "background-image":
            colour = "url(" + colour + ")";
            break;
        case "--bs-border-radius":
            colour = colour + "em";
            break;
        case "--glow-blur":
            colour = colour + "px";
            break;
        case "--glow-radius":
            colour = colour + "px";
            break;
        case "--bs-body-font-size":
            colour = colour + "rem";
            break;
        case "--backdrop-blur-radius":
            colour = colour + "px";
            break;
    }
    // Ensures the correct formatting of certain properties
    
    document.body.style.setProperty(cssProp, colour);
    // Applies it to the <body> tag to overwrite anything.
}

// void setUserColours() - Creates a style tag with new required css.
// This is mostly to "fix" certain elements that use set colours or rgb values.
// Also to layout and theme the "themesModal"
function setUserColours(){
    let userCss = document.createElement("style");
    const cssResText = GM_getResourceText("cssInject");
    // Grab the CSS Resouce from github.
    userCss.innerHTML = cssResText;

    document.getElementsByTagName('head')[0].appendChild(userCss);
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
function addThemesModal(){
    let colorisScript = document.createElement("script");
    colorisScript.src = "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js";
    let colorisStyle = document.createElement("link");
    colorisStyle.rel = "stylesheet";
    colorisStyle.href = "https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css";
    
    document.getElementsByTagName('head')[0].appendChild(colorisScript);
    document.getElementsByTagName('head')[0].appendChild(colorisStyle);
    // This imports the colour picker script and stylesheet
    // Does not work if imported via GreaseMonkey
    
    const htmlResText = GM_getResourceText("htmlInject");
    // Grab the HTML resource from github.
    console.log(htmlResText);
    
    let themesContainer = document.createElement("div");
    themesContainer.classList.toggle("fade");
    themesContainer.classList.toggle("modal");
    themesContainer.classList.toggle("themes-modal");
    themesContainer.id = "themes-modal";
    themesContainer.setAttribute("tabindex", "-1");
    // Creates the div modal to inject the HTML source.
    
    themesContainer.innerHTML = htmlResText;
    document.body.appendChild(themesContainer);
    // Injects the html and adds the modal to the <body> tag.
    
    let colorisContainer = document.getElementById("themesColourValInputCon");
    colorisContainer.classList.toggle("theme-body");
    
    let coloris = document.createElement("input");
    coloris.type = "text";
    coloris.setAttribute('data-coloris', "");
    coloris.classList.toggle("theme-colour-selector");
    coloris.id = "cPicker";
    coloris.setAttribute('cssprop', "--bs-body-bg");
    
    colorisContainer.appendChild(coloris);
    
    // Adds the coloris picker to the modal body.
    // Cannot be added via the injection above for whatever reason.
    
    const elements = ["themesBackImgInput", "themesBaseFontInput", "themesBorderRadiusInput",
    "themesGlowBlurInput", "themesGlowRadiusInput", "themesBaseFontSizeInput", "themesTitleFontInput",
        "themesGlowRadiusInput", "cPicker"
    ]
    
    elements.forEach( function(item, index) {
        document.getElementById(item).addEventListener('input', function(e) { setProperty(e) })}
    )
    
    for (let i=1; i<=4; i++){
        console.log("page-"+i);
        let pageTab = document.getElementById("page-"+i);
        pageTab.addEventListener("click", (e) => changePage(i));
    }
    
    // Adds EventListener's to each of the input fields.
    // Runs setProperty when the input is changed.
    
    let themeButtonClose = document.getElementById("themesButtonClose");
    themeButtonClose.addEventListener("click", function(e) { showThemesModal(e, "display:none;") });
    
    // Makes the close button work.
    
    let saveButton = document.getElementById("themesLocalSaveButton");
    saveButton.addEventListener("click", (e) => saveTheme());
    let clearButton = document.getElementById("themesLocalClearButton");
    clearButton.addEventListener("click", (e) => clearTheme());

}

// void clearColourPickter(String cssprop) -
// Sets the input box to the current value of the targeted element
function clearColourPicker(cssprop){
    let colourValue = getComputedStyle(document.body).getPropertyValue(cssprop)
    // Get the current value

    let coloris = document.getElementById("cPicker");
    coloris.value = colourValue;
    // Set it
}

// void addColourTable() - Adds the list of selectable elements.
function addColourTable(){
    let colourTable = document.getElementById("themesColourSelector");
    // Find the colour picker table.

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

          document.querySelector('table-selector').dispatchEvent(new Event('input', { bubbles: true }));
      }
       // Code stolen from https://jdan.github.io/98.css/ to make the table function as a selector
    })
}

// void main() - Initialises everything
function main(){
    addThemesModal(); // Add the HTML resource
    addThemesEntry(); // Adds the entry to the dropdown
    addColourTable(); // Add colour table functionality
    setUserColours(); // Add the CSS Resource
    loadTheme(); // Load stored user theme
    
}

main()
