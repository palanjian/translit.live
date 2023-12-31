let onPhone = false;

generateResponsiveHeadings();
getCheckedIndex()
generateRadioButtons();

function generateResponsiveHeadings(){
    if(window.screen.width <= 768){
        onPhone = true
        document.getElementById('radio-wrapper-2').remove()
        document.getElementById('l1').remove()
        document.getElementById('l2').innerText = 'English'
    }
    else{
        onPhone = false
        document.getElementById('l2').remove()
    }
}
function getCheckedIndex(){
    radioData.forEach((data) => {
        let cookie = getCookie(data.name)
        if(checkCookie(data.name)){
            if(data.name != "dialect" && cookie === "1"){
                data.func(data.value);
            }
            data.checkedIndex = cookie
        }
        else data.checkedIndex = 0
    });
}

function generateRadioButtons(){
    const radioWrapper = document.getElementById('radio-wrapper');
    const radioWrapper2 = document.getElementById('radio-wrapper-2');

    radioData.forEach(data => {
        const container = document.createElement("div");
        container.classList.add("radio-container");
        data.labels.forEach((label, index) => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = data.name;
            input.id = `toggle${label}`;
            if (index == data.checkedIndex) {
                input.checked = true;
            }
            input.addEventListener("click", () => {
                if (!input.disabled && index !== lastSelectedIndex[data.name]) {
                    lastSelectedIndex[data.name] = index; // update the last selected index
                    setCookie(data.name, index);
                    data.func(data.value);
                    setDisabledButtons();
                }
            });
            const labelElement = document.createElement("label");
            labelElement.htmlFor = `toggle${label}`;
            labelElement.innerText = label;
            container.appendChild(input);
            container.appendChild(labelElement);
        });
        if(data.leftOrRight === "right" && onPhone == false) radioWrapper2.appendChild(container);
        else radioWrapper.appendChild(container);
    });
}

function openSettings(){
    document.getElementById('translator-container').style.display = 'none'
    document.getElementById('settings-container').style.display = 'block'
    setDisabledButtons()
}

function openTranslate(){
    document.getElementById('translator-container').style.display = 'block'
    document.getElementById('settings-container').style.display = 'none'
    transliterate()
}

/* general code */
function copyToClipboard(){
    var text = document.getElementById('output');

    text.select();
    text.setSelectionRange(0, 99999); // for mobile devices
     // copy the text inside the text field
    navigator.clipboard.writeText(text.value);

    document.getElementById('copy-icon').setAttribute("name","checkbox-outline");
    setTimeout(function(){document.getElementById('copy-icon').setAttribute("name","copy-outline")},1000);
}

function isCaps(str){
    if(str.toUpperCase() === str) return true
    else return false
}

function setDisabledButtons() {
    const elementNames = ["TsorC", "GhorX", "XorKh"];
    const disableState = dialect === "1"; // if dialect is "1", elements should be disabled

    for (const name of elementNames) {
        const elements = document.getElementsByName(name);
        for (const element of elements) {
            element.disabled = disableState;
        }
    }
}
