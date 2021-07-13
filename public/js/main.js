document.addEventListener("DOMContentLoaded", (event) => {
  if (document.getElementById("itemInput") != null) {
    const input = document.getElementById("itemInput");
    //Event Listener for a key pressed
    input.addEventListener("keyup", (e) => {
      //If key pressed is equal to the 'Enter' key
      if (e.keyCode === 13) {
        e.preventDefault();
        //Trigger new Item function
        newItem();
      }
    });
  }
  if (document.getElementById("delItem") != null) {
    const del = document.getElementById("delItem");
    const pNode = del.parentNode.nodeName;
    del.addEventListener("click", () => {
      delItem(del);
    });
  }
  listCount();
});

//Add New List item
function newItem() {
  const item = document.getElementById("itemInput").value;
  const list = document.getElementById("list");
  if (item.trim() != "") {
    //Add a div with 3 elements inside to the list
    const div = document.createElement("div");
    div.setAttribute("class", "list-item");
    //Add event listener for div click
    div.addEventListener("click", () => {
      crossList(div);
    });
    list.appendChild(div);
    const input = document.createElement("input");
    input.setAttribute("class", "checkInput");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "checkbox");
    div.appendChild(input);
    const label = document.createElement("label");
    label.setAttribute("for", "checkInput");
    div.appendChild(label);
    const listItem = document.createElement("li");
    const textNode = document.createTextNode(item);
    listItem.appendChild(textNode);
    div.appendChild(listItem);
    const img = document.createElement("img");
    img.setAttribute("src", "./images/icon-cross.svg");
    img.setAttribute("id", "delItem");
    //Add event listener to cross
    img.addEventListener("click", () => {
      delItem(img);
    });
    div.appendChild(img);
    //Add list item before last element in list
    const lastEl = document.getElementById("lastEl");
    list.insertBefore(div, lastEl);
    //Clear input after item has been added
    document.getElementById("itemInput").value = "";
    listCount();
  } else {
    alert("Not a valid input");
  }
}
//Cross off list item
function crossList(div) {
  const txt = div.getElementsByTagName("li")[0];
  const checkBox = div.getElementsByTagName("input")[0];
  console.log(txt);

  if (txt.classList.contains("crossItem")) {
    txt.classList.remove("crossItem");
    checkBox.removeAttribute("checked");
  } else {
    txt.setAttribute("class", "crossItem");
    checkBox.setAttribute("checked", "");
  }
}
//Delete item
function delItem(el) {
  const parent = el.parentElement;
  console.log(parent);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  parent.remove();
  listCount();
}
//Add list item counter, eg.,5 items left.
function listCount() {
  const count = document.getElementById("list").childElementCount;
  const txtCount = document.getElementById("listCount");
  txtCount.innerHTML = `${count - 1} Items Left`;
  console.log(count);
}

//Clear Completed List items Button

//Sort by Active, Complete, or All

//Upload all list items to Database

//Fetch all list items from database

//Delete list item/s from database

//Add Auth System

//Add multiple todolist accounts with seperate list items.

//Drag and Drop List Item/s
