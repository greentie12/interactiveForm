const nameField = document.getElementById("name");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const options = document.querySelectorAll("#title option");
const design = document.getElementById("design");
const color = document.getElementById("color");
const colorOptions = document.querySelectorAll("#color option");

window.onload = function () {
  nameField.focus();
  otherJobRole.style.display = "none";
  color.disabled = true;
};

jobRole.addEventListener("click", (e) => {
  let role = e.target.value;
  if (role === "other") {
    otherJobRole.style.display = "block";
  }
});

design.addEventListener("click", (e) => {
  color.disabled = false;
  colorOptions[0].selected = true;
  let theme = e.target.value;
  if (theme === "js puns") {
    console.log(theme);
    for (let i = 1; i < colorOptions.length; i++) {
      colorOptions[i].hidden = false;
      if (colorOptions[i].dataset.theme === "js puns") {
        colorOptions[i].hidden = false;
        colorOptions[i].selected = true;
      } else {
        colorOptions[i].hidden = true;
      }
    }
  } else if (theme === "heart js") {
    console.log(theme);
    for (let i = 1; i < colorOptions.length; i++) {
      colorOptions[i].hidden = false;
      if (colorOptions[i].dataset.theme === "heart js") {
        colorOptions[i].hidden = false;
        colorOptions[i].selected = true;
      } else {
        colorOptions[i].hidden = true;
      }
    }
  }
});
