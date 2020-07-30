//Select elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST, id;

//get item from localstorage
let data = localStorage.getItem("TODO");
//check if data not empty
if(data) {
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST);
}else {
    LIST = [];
    id = 0;
}

//load items to the UI
function loadList(array) {
    array.forEach(item => {
        AddToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear local storage
clear.addEventListener("click", ()=>{
    localStorage.clear();
    location.reload();
})

//Show todays date
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-EN", options);

//Add to Do function
function AddToDo(toDo, id, done, trash) {
    if(trash) {return};
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

//Add an item to the list user the enter key
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13) {
        const toDo = input.value;
        //if the input isn't empty
        if(toDo) {
            AddToDo(toDo, id, false, false);
            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );

            //add item to localstorage (everywhere where LIST arr updating)
            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }

});


//complete to do
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove todo
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside container
    const elementJob = element.attributes.job.value; //get job atr value

    if(elementJob == "complete") {
        completeToDo(element);
    }
    else if (elementJob == "delete") {
        removeToDo(element);
    }
    //add item to localstorage (everywhere where LIST arr updating)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});