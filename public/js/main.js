document.addEventListener("DOMContentLoaded", (event) => {
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
  //request();
  //sendItem();
  fetchList();
});

//Fetch all list items from database
const fetchList = async () => {
  const getData = await fetch("/get-list");
  const data = await getData.json();
  const list = document.getElementById("list");
  //Remove all current list items so duplications don't happen

  list.innerHTML = "";
  //For each database item found a new list item is created
  data.forEach((el) => {
    newItem(el);
  });
};

//
const addItem = async () => {
  const item = document.getElementById("itemInput").value;
  const list = {
    itemNo: 1,
    message: `${item}`,
    checked: false,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(list),
  };
  try {
    const req = await fetch("/add-list", options);
    console.log("Item Successfully Uploaded to Datatabase");

    fetchList();
    const item = (document.getElementById("itemInput").innerHTML = "");
  } catch {
    alert("Item not able to be uploaded to Database");
  }
};

// Add New List item
function newItem(data) {
  console.log(data);
  const list = document.getElementById("list");
  if (data != undefined) {
    //Add a div with 3 elements inside to the list

    const div = document.createElement("div");
    div.setAttribute("class", "list-item");
    div.setAttribute("id", data.id);
    list.appendChild(div);
    const input = document.createElement("input");
    input.setAttribute("class", "checkInput");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "checkbox");
    if (data.checked) {
      input.setAttribute("checked", true);
    }
    div.appendChild(input);
    const label = document.createElement("label");
    label.setAttribute("for", "checkInput");
    label.addEventListener("click", () => {
      crossList(div);
    });
    div.appendChild(label);
    const listItem = document.createElement("li");
    if (data.checked) {
      listItem.setAttribute("class", "crossItem");
    }

    listItem.addEventListener("click", () => {
      crossList(div);
    });
    const textNode = document.createTextNode(data.message);
    listItem.appendChild(textNode);

    div.appendChild(listItem);
    const img = document.createElement("img");
    img.setAttribute("src", "./icon-cross.svg");
    img.setAttribute("id", "delItem");
    //Add event listener to cross
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
//Cross off list item
const crossList = async (div) => {
  console.log(div);
  const txt = div.getElementsByTagName("input")[0];
  const listItem = div.getElementsByTagName("li")[0];
  const uid = div.id;
  let checked = txt.hasAttribute("checked");
  //If element has checked, we remove it, if element does not have checked, we add it
  if (!txt.hasAttribute("checked")) {
    //Add checked to element
    checked = true;
    try {
      const req = await fetch("/update-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, checked }),
      });
      //Add checked status and cross out message
      txt.setAttribute("checked", true);
      listItem.setAttribute("class", "crossItem");
    } catch {
      
    }
  } else {
    //Remove checked from element
    checked = false;
    const req = await fetch("/update-list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid, checked }),
    });
    //Remove checked status and crossed out line through message
    txt.removeAttribute("checked");
    listItem.removeAttribute("class", "crossItem");
  }

  //Call the API to update the list item
};

//Delete item
const delItem = async (el) => {
  const parent = el.parentElement;
  const uid = parent.id;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid }),
  };
  try {
    const req = await fetch("/del-list", options);
    console.log("Item Successfuly Deleted From Database");
    fetchList();
  } catch {
    alert("Item Could not be Deleted from Database");
  }
};

//Add list item counter, eg.,5 items left.
function listCount() {
  const count = document.getElementById("list").childElementCount;
  const txtCount = document.getElementById("listCount");
  txtCount.innerHTML = `${count} Items Left`;
}

//Clear Completed List items Button
function clearComplete() {
  const list = document.getElementById("list");
  const el = list.getElementsByTagName("input");

  //Need to check that the element is checked before selecting each element
  //Need to get parent div with UID linked to the id attribute then loop all eligible elements to delete them all
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

//Delete list item/s from database

//Add Auth System

//Add multiple todolist accounts with seperate list items.

//Drag and Drop List Item/s
