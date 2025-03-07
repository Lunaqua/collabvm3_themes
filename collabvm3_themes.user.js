// ==UserScript==
// @name         CollabVM3 Themes
// @namespace    https://github.com/Lunaqua/collabvm3_themes
// @version      2025-03-07_2
// @description  Themes for CollabVM 3
// @author       navi4205
// @match        https://computernewb.com/collab-vm/experimental-vm/
// @resource cssInject  https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/master/resource.css
// @resource htmlInject https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/master/resource.html
// @resource defPresets https://raw.githubusercontent.com/Lunaqua/collabvm3_themes/refs/heads/master/default.json
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
// Mobile UI Scaling (media < 500px or whatever)

// Fixes:
// fix text highlight
// fix scrollbar border radius
// fix chat button border
// persistent font and background inputs
// clear input validity (:valid)
// individual reset of colours

// UI Fixes:
// Fix modal centreing
// Fix Tab underlining, and colours
// Fix inconsistent spacing on colours tab
// Make Colour Picker actually be part of the modal
// Proper border padding
// Fully scalable with different fonts borders etc.
// Prevent changing from unsaved theme.

// Now:
// custom padding
// Code cleanup x2
// Ensure preset themes can be update independently.
// Add preset themes
// Add font upload
// Add image upload
// Add "modified"/"unsaved" marker
// theme export and import
// proper preset saving

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
    
function resetPreTable(isUnsaved) {
    const preTableCon = document.getElementById("themesPresetSelector");
    // Get the preset table in the modal.
    let preTable = document.createElement("tbody");
    
    themePresets.presets.forEach( function(item, index) {
        if (item.type === 0 && !isUnsaved) {
            return
        }
        let newRow = document.createElement("tr");
        newRow.classList.toggle("themes-preset-"+themePresets.types[item.type]);
        newRow.innerHTML = "<td>"+item.theme.theme.name+"</td>";
        preTable.appendChild(newRow);
    })
    
    preTableCon.replaceChildren(preTable);
}

// void saveTheme() - Saves css values to localstorage
// Very simple, but it works for now
function saveTheme(){
    console.log("No way!")
}

// void clearTheme() - Clears any set css.
function clearTheme(){
    if (confirm("Are you sure?")) {
        document.getElementsByTagName("body")[0].style = "";
        
        document.getElementById("themesNameInput").value = "";
        document.getElementById("themesAuthorInput").value = "";
        document.getElementById("themesDescInput").value = "";
        
        togglePresetLocks(false);
        toggleUnsaved(false);
    }
}

// void loadTheme() - Loads theme from localstorage
function loadTheme(){
    // Default theme
    if (localStorage.getItem("userStyle")) {
        let bodyTag = document.getElementsByTagName("body")[0];
        bodyTag.style.cssText = localStorage.getItem("userStyle");
        //Quickly sets the style tag on body
    }
    
    if (!localStorage.getItem("themePresets")) {
        // If empty, load defaults
        const defPresets = GM_getResourceText("defPresets");
        localStorage.setItem("themePresets", defPresets);
        
    }
    
    //Load presets into table
    resetPreTable(false);
}

function applySelectedTheme(){
    let i = document.getElementsByClassName("themes-preset-unsaved").length === 0 ? 1 : 0;
    const selThem = document.getElementById("themes-selected-preset").rowIndex + i;
    const themeCss = themePresets.presets[selThem].theme.css;
    const bodyTag = document.getElementsByTagName("body")[0];
    bodyTag.style.cssText = themeCss;
    
    if (document.getElementById("themesDefaultButton").value){
        localStorage.setItem("userStyle", themeCss);
    }
    
    localStorage.setItem("currentTheme", themePresets.presets[selThem].theme.theme.name);
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
        "themesGlowRadiusInput", "cPicker", "themesBackBlurInput"
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
    
    let applyButton = document.getElementById("themesPresetApplyButton");
    applyButton.addEventListener("click", function(e) { applySelectedTheme(); })

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
    }

    if (newlySelectedRow) {
        newlySelectedRow.classList.toggle(highlightedClass);
        clearColourPicker(newlySelectedRow.getAttribute("cssprop"));

        let coloris = document.getElementById("cPicker");
        coloris.setAttribute('cssprop', newlySelectedRow.getAttribute("cssprop"));

        togglePresetLocks(false);
        const currentName = document.getElementById("themesNameInput").value;
        /*if (currentName === localStorage.getItem("currentTheme")) {
            document.getElementById("themesNameInput").value += " (modified)";
        } else {
            toggleUnsaved(true);
        }*/
        // Implement properly later.
        //document.querySelector('themesPresetSelector').dispatchEvent(new Event('input', { bubbles: true }));
    }
    // Code stolen from https://jdan.github.io/98.css/ to make the table function as a selector
    })
}

function toggleUnsaved(isUnsaved) {
    if (isUnsaved) {
        resetPreTable(true);
        document.getElementById("themesPresetSelector").firstChild.firstChild.classList.toggle("highlighted");
        document.getElementById("themes-selected-preset").classList.toggle("highlighted");
    } else {
        resetPreTable(false);
        document.getElementById("themes-selected-preset").classList.toggle("highlighted");
    }
}

function togglePresetLocks(doLock) {
    if (doLock) {
        document.getElementById("themesNameInput").disabled = "yes";
        document.getElementById("themesAuthorInput").disabled = "yes";
        document.getElementById("themesDescInput").disabled = "yes";
    } else {
        document.getElementById("themesNameInput").removeAttribute("disabled");
        document.getElementById("themesAuthorInput").removeAttribute("disabled");
        document.getElementById("themesDescInput").removeAttribute("disabled");
    }
}

function populatePreset(presetRow, rowNum){
    const selectedPreset = themePresets.presets[rowNum];
    
    document.getElementById("themesNameInput").value = selectedPreset.theme.theme.name;
    document.getElementById("themesAuthorInput").value = selectedPreset.theme.theme.author;
    document.getElementById("themesDescInput").value = selectedPreset.theme.theme.description;
    
    togglePresetLocks(true);
}

function addPresetsTable(){
    const preTab = document.getElementById("themesPresetSelector");
    preTab.addEventListener("click", (e) => {
        const highlightedClass = "highlighted";
        const isRow = element => element.tagName === 'TR' && element.parentElement.tagName === 'TBODY';
        const newlySelectedRow = e.composedPath().find(isRow);
        const previouslySelectedRow = Array.from(newlySelectedRow.parentElement.children).filter(isRow).find(element => element.classList.contains(highlightedClass));
        if (previouslySelectedRow){
            previouslySelectedRow.classList.toggle(highlightedClass);
            previouslySelectedRow.removeAttribute('id');
        }
        
        if (newlySelectedRow) {
            newlySelectedRow.classList.toggle(highlightedClass);
            let i = document.getElementsByClassName("themes-preset-unsaved").length === 0 ? 1 : 0;
            populatePreset(newlySelectedRow, newlySelectedRow.rowIndex + i );
            newlySelectedRow.id = "themes-selected-preset";
        }
    })
}

// void main() - Initialises everything
function main(){
    addThemesModal(); // Add the HTML resource
    addThemesEntry(); // Adds the entry to the dropdown
    addColourTable(); // Add colour table functionality
    addPresetsTable();
    setUserColours(); // Add the CSS Resource
    loadTheme(); // Load stored user theme
    
}

let themePresets = JSON.parse(localStorage.getItem("themePresets"));
main()
