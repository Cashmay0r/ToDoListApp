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
  if (document.getElementById("clearComplete") != null) {
    const clear = document.getElementById("clearComplete");
    clear.addEventListener("click", () => {
      clearComplete();
    });
  }
  if (document.getElementById("toggleMode") != null) {
    const btn = document.getElementById("toggleMode");
    btn.addEventListener("click", () => {
      toggleTheme();
    });
  }
  listCount();
  //request();
  sendItem();
});
const request = async () => {
  const res = await fetch("/api");
  const obj = await res.json();
  console.log(obj);
};
const sendItem = async () => {
  const list = {
    itemNo: 4,
    message: "Testing MongoDB 4",
    checked: false,
  };
  const test = JSON.stringify(list);
  console.log(test);
  const req = await fetch("./add-list", { method: "post", body: test });
};
// Add New List item
function newItem() {
  const item = document.getElementById("itemInput").value;
  const list = document.getElementById("list");
  if (item.trim() != "") {
    //Add a div with 3 elements inside to the list
    const div = document.createElement("div");
    div.setAttribute("class", "list-item");

    list.appendChild(div);
    const input = document.createElement("input");
    input.setAttribute("class", "checkInput");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "checkbox");
    div.appendChild(input);
    const label = document.createElement("label");
    label.setAttribute("for", "checkInput");
    label.addEventListener("click", () => {
      crossList(div);
    });
    div.appendChild(label);
    const listItem = document.createElement("li");
    listItem.addEventListener("click", () => {
      crossList(div);
    });
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
}

//Clear Completed List items Button
function clearComplete() {
  const list = document.getElementById("list");
  const el = list.getElementsByTagName("input");
  console.log(el.length);
  for (let i = 0; i < el.length; i++) {
    console.log("I = ", i, "ElLength = ", el.length);
    if (el[i].checked) {
      delItem(el[i]);
      i--;
    }
  }
}
//Toggle Dark/Light Mode
function toggleTheme() {
  const html = document.getElementById("html").classList;
  if (html.contains("theme-dark")) {
    html.remove("theme-dark");
    html.add("theme-light");
  } else if (html.contains("theme-light")) {
    html.remove("theme-light");
    html.add("theme-dark");
  }
}
//Sort by Active, Complete, or All

//Upload all list items to Database

//Fetch all list items from database

//Delete list item/s from database

//Add Auth System

//Add multiple todolist accounts with seperate list items.

//Drag and Drop List Item/s
