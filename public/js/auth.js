document.addEventListener("DOMContentLoaded", (event) => {
  attachEventListeners();
});
//Attach Event Listeners
function attachEventListeners() {
  if (document.getElementById("toggleMode") != null) {
    const btn = document.getElementById("toggleMode");
    btn.addEventListener("click", () => {
      toggleTheme();
    });
  }
  if (document.getElementById("loginBtn") != null) {
    const btn = document.getElementById("loginBtn");
    btn.addEventListener("click", () => {
      //Execute function when login btn is clicked
      loginUser();
    });
  }
  if (document.getElementById("registerLink") != null) {
    const btn = document.getElementById("registerLink");
    btn.addEventListener("click", () => {
      makeRegister();
    });
  }
  if (document.getElementById("registerBtn") != null) {
    const btn = document.getElementById("registerBtn");
    btn.addEventListener("click", () => {
      //Execute function when register btn clicked
      registerUser();
    });
  }
  if (document.getElementById("cancelBtn") != null) {
    const btn = document.getElementById("cancelBtn");
    btn.addEventListener("click", () => {
      //Execute function when cancel btn clicked
      makeLogin();
    });
  }
}

//Send Login POST
const loginUser = async () => {};
const email = document.getElementById("loginEmail").value;
const pass = document.getElementById("loginPass").value;

//Send Register POST
const registerUser = async () => {
  const email = document.getElementById("regEmail").value;
  const pass1 = document.getElementById("pass1").value;
  const pass2 = document.getElementById("pass2").value;

  if (pass1 === pass2) {
    //Send a POST to backend with email and 1 password
  } else {
    alert("Passwords do not match, try again");
    pass1.innerHTML = "";
    pass2.innerHTML = "";
  }
};

//Generate Register Elements
function makeRegister() {
  const container = document.getElementsByClassName("loginItems")[0];
  //Delete elements inside container element
  container.innerHTML = "";
  //Create email input field
  const registerUser = document.createElement("div");
  registerUser.setAttribute("class", "registerUser");
  const emailInput = document.createElement("input");
  emailInput.setAttribute("placeholder", "Enter email...");
  emailInput.setAttribute("id", "regEmail");
  registerUser.appendChild(emailInput);
  container.appendChild(registerUser);

  //Create password field 1
  const passwordDiv = document.createElement("div");
  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("id", "pass1");
  passwordInput.setAttribute("placeholder", "Enter password...");
  passwordDiv.appendChild(passwordInput);
  container.appendChild(passwordDiv);

  //Create password field 2
  const password2Div = document.createElement("div");
  const password2Input = document.createElement("input");
  password2Input.setAttribute("id", "pass2");
  password2Input.setAttribute("placeholder", "Enter password again...");
  password2Div.appendChild(password2Input);
  container.appendChild(password2Div);

  //Create Register and Cancel Buttons
  const regBtnDiv = document.createElement("div");
  const regBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  regBtnDiv.setAttribute("class", "loginButtons");
  regBtn.setAttribute("type", "button");
  regBtn.setAttribute("id", "registerBtn");
  regBtn.innerHTML = "Register";
  cancelBtn.setAttribute("type", "button");
  cancelBtn.setAttribute("id", "cancelBtn");
  cancelBtn.innerHTML = "Cancel";
  regBtnDiv.appendChild(regBtn);
  regBtnDiv.appendChild(cancelBtn);
  container.appendChild(regBtnDiv);

  //Reattach any event listeners
  attachEventListeners();
}
//Regenerate Login Elements
function makeLogin() {
  const container = document.getElementsByClassName("loginItems")[0];
  //Delete elements inside container element
  container.innerHTML = "";
  //Create email input field
  const emailDiv = document.createElement("div");
  emailDiv.setAttribute("class", "loginUser");
  const emailInput = document.createElement("input");
  emailInput.setAttribute("placeholder", "Enter email...");
  emailDiv.appendChild(emailInput);
  container.appendChild(emailDiv);
  //Create password Input Field
  const passwordDiv = document.createElement("div");
  passwordDiv.setAttribute("class", "loginPass");
  const passwordInput = document.createElement("input");
  passwordInput.setAttribute("id", "loginPass");
  passwordInput.setAttribute("placeholder", "Enter password...");
  passwordDiv.appendChild(passwordInput);
  container.appendChild(passwordDiv);
  //Create Login Button
  const loginBtnDiv = document.createElement("div");
  const loginBtn = document.createElement("button");

  loginBtnDiv.setAttribute("class", "loginButtons");
  loginBtn.setAttribute("type", "button");
  loginBtn.setAttribute("id", "loginBtn");
  loginBtn.innerHTML = "Login";
  loginBtnDiv.appendChild(loginBtn);
  container.appendChild(loginBtnDiv);

  const regLabel = document.createElement("div");
  regLabel.setAttribute("class", "regLabel");
  const label = document.createElement("label");
  const link = document.createElement("a");
  link.setAttribute("id", "registerLink");
  link.innerHTML = "Here";
  label.innerHTML = `Don't have an account? Register ${link}`;
  label.appendChild(link);
  regLabel.appendChild(label);

  container.appendChild(regLabel);
  //Reattach any event listeners
  attachEventListeners();
}

//Toggle Colour Theme
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
