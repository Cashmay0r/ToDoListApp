document.addEventListener("DOMContentLoaded", (event) => {
  fetchList();
  if (document.getElementById("itemInput") != null) {
    const input = document.getElementById("itemInput");
    //Event Listener for a key pressed
    input.addEventListener("keyup", (e) => {
      //If key pressed is equal to the 'Enter' key
      if (e.keyCode === 13) {
        e.preventDefault();
        //Trigger new Item function
        addItem();
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
});

//Add New List item
function newItem(data) {
  console.log(data);
  const list = document.getElementById("list");
  if (data != undefined) {
    //Create list-item Div
    const div = document.createElement("div");
    div.setAttribute("class", "list-item");
    div.setAttribute("id", data.id);
    list.appendChild(div);
    //Create input element inside of Div
    const input = document.createElement("input");
    input.setAttribute("class", "checkInput");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "checkbox");
    if (data.checked) {
      input.setAttribute("checked", true);
    }
    div.appendChild(input);
    //Create label element inside of Div
    const label = document.createElement("label");
    label.setAttribute("for", "checkInput");
    label.addEventListener("click", () => {
      updateItem(div);
    });
    div.appendChild(label);
    //Create li element inside of Div
    const listItem = document.createElement("li");
    if (data.checked) {
      listItem.setAttribute("class", "crossItem");
    }

    listItem.addEventListener("click", () => {
      updateItem(div);
    });
    const textNode = document.createTextNode(data.message);
    listItem.appendChild(textNode);

    div.appendChild(listItem);
    //Create img element inside of Div
    const img = document.createElement("img");
    img.setAttribute("src", "./icon-cross.svg");
    img.setAttribute("id", "delItem");
    //Add event listener to cross img
    img.addEventListener("click", () => {
      delItem(img);
    });
    div.appendChild(img);
    //Add the list item to the div
    list.appendChild(div);
    //Clear input after item has been added
    document.getElementById("itemInput").value = "";
    listCount();
  } else {
    alert("Not a valid input");
  }
}

//Add list item counter, eg.,5 items left.
function listCount() {
  //Returns amount of children in parent element
  const count = document.getElementById("list").childElementCount;
  const txtCount = document.getElementById("listCount");
  txtCount.innerHTML = `${count} Items Left`;
}

//Clear Completed List items Button
function clearComplete() {
  const list = document.getElementById("list");
  const input = list.getElementsByTagName("input");
  //Converting the HTMLCollection into a simple array so I can use forEach
  const arr = [...input];
  arr.forEach((element) => {
    //If input has attribute checked
    if (element.hasAttribute("checked")) {
      delItem(element);
    }
  });
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

//Add Auth System

//Add multiple todolist accounts with seperate list items.

//Drag and Drop List Item/s
