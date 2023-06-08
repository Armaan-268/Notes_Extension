let myNotes = []
let myBms = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const notesUl = document.getElementById("notes-ul")
const bmUl = document.getElementById("bm-ul")
const deleteBtn = document.getElementById("delete-btn")
const notesFromLocalStorage = JSON.parse( localStorage.getItem("myNotes") )
const bmFromLocalStorage = JSON.parse( localStorage.getItem("myBms") )
const tabBtn = document.getElementById("tab-btn")

if (notesFromLocalStorage) {
    myNotes = notesFromLocalStorage
    renderText(myNotes)
}
if (bmFromLocalStorage) {
    myBms = bmFromLocalStorage
    render(myBms)
}
// Save Tab Button
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myBms.push(tabs[0].url)
        localStorage.setItem("myBms", JSON.stringify(myBms) )
        render(myBms)
    })
})
// Save Input Button
inputBtn.addEventListener("click", function() {
    if (inputEl.value){
    myNotes.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myNotes", JSON.stringify(myNotes) )
    renderText(myNotes)}
})
// Delete Button
deleteBtn.addEventListener("click", function() {
    localStorage.removeItem('myNotes')
    myNotes = []
    renderText(myNotes)
})
deleteBtn.addEventListener("dblclick", function() {
    localStorage.removeItem('myBms')
    myBms = []
    render(myBms)
})


function render(leads) {
    let listItems = ""
    for (const element of leads) {
        listItems += `
            <li>
                <a target='_blank' href='${element}'>
                    ${element}
                </a>
            </li>
        `
    }
    bmUl.innerHTML = listItems
}
function renderText(leads) {
    let listItems = ""
    for (const element of leads) {
        listItems += `
            <li>
                    ${element}
            </li>
        `
    }
    notesUl.innerHTML = listItems
}


document.getElementById("nts").addEventListener("click", function(event) {
    openCity(event, 'notes');
});
document.getElementById("bms").addEventListener("click", function(event) {
    openCity(event, 'bookmark');
});
document.getElementById("nts").click();
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }