//This contains the core CRUD Operations (Create, Read, Update, Delete)

//Create a New Document
const addItem = async () => {
  const item = document.getElementById("itemInput").value;
  const list = {
    message: `${item}`,
    checked: false,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(list),
  };
  try {
    const req = await fetch("/newItem", options);
    console.log("Item Successfully Uploaded to Datatabase");
    fetchList();
    const item = (document.getElementById("itemInput").innerHTML = "");
  } catch {
    alert("Item not able to be uploaded to Database");
  }
};

//Read Data from Database Collection
const fetchList = async () => {
  try {
    const getData = await fetch("/get-list");
    const data = await getData.json();
    const list = document.getElementById("list");
    //Remove all current list items so duplications don't happen
    list.innerHTML = "";
    //For each database item found a new list item is created
    data.forEach((el) => {
      newItem(el);
    });
  } catch {
    alert("Unable to fetch database data");
  }
};

//Update document, changes the checked value between true and false
const updateItem = async (div) => {
  console.log(div);
  const input = div.getElementsByTagName("input")[0];
  const listItem = div.getElementsByTagName("li")[0];
  const uid = div.id;
  let checked = input.hasAttribute("checked");
  //If element has checked, we remove it, if element does not have checked, we add it
  if (!input.hasAttribute("checked")) {
    //Add checked to element
    checked = true;
    try {
      const req = await fetch("/updateItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, checked }),
      });
      //Add checked status and cross out message
      input.setAttribute("checked", true);
      listItem.setAttribute("class", "crossItem");
    } catch {
      alert("Unable to update database values");
    }
  } else {
    //Remove checked from element
    checked = false;
    try {
      const req = await fetch("/updateItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid, checked }),
      });
      //Remove checked status and crossed out line through message
      input.removeAttribute("checked");
      listItem.removeAttribute("class", "crossItem");
    } catch {
      alert("Unable to update database values");
    }
  }
};

//Delete document from database
const delItem = async (el) => {
  const parent = el.parentElement;
  const uid = parent.id;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid }),
  };
  try {
    const req = await fetch("/delItem", options);
    console.log("Item Successfuly Deleted From Database");
    fetchList();
  } catch {
    alert("Item Could not be Deleted from Database");
  }
};
