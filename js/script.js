const form = document.querySelector("form");
const nameField = document.getElementById("name");
const nameHint = document.getElementById("name-hint");
const email = document.getElementById("email");
const jobRole = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const options = document.querySelectorAll("#title option");
const design = document.getElementById("design");
const color = document.getElementById("color");
const colorOptions = document.querySelectorAll("#color option");
const activites = document.getElementById("activities");
const activityInputs = document.querySelectorAll("#activities input");
const activityCostP = document.getElementById("activities-cost");
const payment = document.getElementById("payment");
const paymentOptions = document.querySelectorAll("#payment option");
const creditCard = document.getElementById("credit-card");
const ccNum = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
/*totalCost variable to determine if 
an activity choice has been made */
let totalCost = 0;

/*focusActivity & removeFocusActivity which adds or 
removes the .focus class on the activity label */
const focusActivity = () => {
  for (let x = 0; x < activityInputs.length; x++) {
    activityInputs[x].addEventListener("focus", function () {
      activityInputs[x].parentElement.classList.add("focus");
    });
  }
};
const removeFocusActivity = () => {
  for (let x = 0; x < activityInputs.length; x++) {
    activityInputs[x].addEventListener("blur", function () {
      if (activityInputs[x].parentElement.classList.contains("focus")) {
        activityInputs[x].parentElement.classList.remove("focus");
      }
    });
  }
};

/* function to set the creidt card as the 
default selected on load or change event */
const creditCardSelect = () => {
  for (let x = 0; x < paymentOptions.length; x++) {
    if (paymentOptions[x].value === "credit-card") {
      creditCard.style.display = "block";
      paymentOptions[x].selected = true;
    } else {
      paypal.style.display = "none";
      bitcoin.style.display = "none";
    }
  }
};

const updateOtherJobRole = (e) => {
  let role = e.target.value;
  if (role === "other") {
    otherJobRole.style.display = "block";
  } else {
    otherJobRole.style.display = "none";
  }
};

const updateColorOptions = (e) => {
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
};

const updateConflicts = (e) => {
  let activityTime = e.target.dataset.dayAndTime;
  console.log(activityTime);
  if (e.target.checked) {
    for (let x = 0; x < activityInputs.length; x++) {
      if (
        e.target.dataset.dayAndTime === activityInputs[x].dataset.dayAndTime &&
        e.target !== activityInputs[x]
      ) {
        activityInputs[x].disabled = true;
        activityInputs[x].parentElement.classList.add("disabled");
      }
    }
  }
  if (!e.target.checked) {
    for (let x = 0; x < activityInputs.length; x++) {
      if (
        e.target.dataset.dayAndTime === activityInputs[x].dataset.dayAndTime &&
        e.target !== activityInputs[x]
      ) {
        activityInputs[x].disabled = false;
        activityInputs[x].parentElement.classList.remove("disabled");
      }
    }
  }
};

const updateTotal = (e) => {
  let activityCost = e.target.dataset.cost;
  activityCost = parseInt(activityCost);
  if (e.target.checked) {
    totalCost += activityCost;
    activityCostP.innerHTML = `
		  Total: $${totalCost}
	  `;
  } else {
    totalCost -= activityCost;
    activityCostP.innerHTML = `
		  Total: $${totalCost}
	  `;
  }
};

const updatePayment = (e) => {
  let paymentMethod = e.target.value;
  if (paymentMethod === "credit-card") {
    creditCardSelect();
  } else if (paymentMethod === "paypal") {
    paypal.style.display = "block";
    creditCard.style.display = "none";
    bitcoin.style.display = "none";
  } else if (paymentMethod === "bitcoin") {
    bitcoin.style.display = "block";
    paypal.style.display = "none";
    creditCard.style.display = "none";
  }
};

/*****
functions to check if the 
fields are valid or invalid
*****/
const validationPass = (element) => {
  element.parentElement.classList.add("valid");
  element.parentElement.classList.remove("not-valid");
  element.parentElement.lastElementChild.style.display = "none";
};
const validationFail = (element) => {
  element.parentElement.classList.add("not-valid");
  element.parentElement.classList.remove("valid");
  element.parentElement.lastElementChild.style.display = "block";
};

const validateName = () => {
  let nameValue = nameField.value;
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);

  if (nameIsValid) {
    validationPass(nameField);
  } else {
    /*if the name field is 
    blank run validationFail*/
    if (nameField.value === "") {
      console.log(true);
      validationFail(nameField);
    } else {
      /*if the name field contains a character that 
    is not a letter display a different message*/
      validationFail(nameField);
      nameHint.textContent =
        "Name must contain only letters and no numbers or special chracters";
    }
  }
  return nameIsValid;
};
const validateEmail = () => {
  let emailValue = email.value;
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);

  if (emailIsValid) {
    validationPass(email);
  } else {
    validationFail(email);
  }
  return emailIsValid;
};
// checks if totalCost is a truthy value
const validateActivity = () => {
  let activitySectionIsValid = totalCost > 0;

  if (activitySectionIsValid) {
    validationPass(activityCostP);
  } else {
    validationFail(activityCostP);
  }

  return activitySectionIsValid;
};

const validateCardNumber = () => {
  let ccNumValue = ccNum.value;
  const ccNumIsValid = /^[\d]{13,16}$/.test(ccNumValue);

  if (ccNumIsValid) {
    validationPass(ccNum);
  } else {
    validationFail(ccNum);
  }

  return ccNumIsValid;
};

const validateZip = () => {
  let zipValue = zip.value;
  const zipIsValid = /^[\d]{5}$/.test(zipValue);

  if (zipIsValid) {
    validationPass(zip);
  } else {
    validationFail(zip);
  }

  return zipIsValid;
};

const validateCvv = () => {
  const cvvValue = cvv.value;
  const cvvIsValid = /^[\d]{3}$/.test(cvvValue);

  if (cvvIsValid) {
    validationPass(cvv);
  } else {
    validationFail(cvv);
  }

  return cvvIsValid;
};

const validateCreditCard = () => {
  if (validateCardNumber() && validateZip() && validateCvv()) {
    return true;
  }
};

/*
apply default behavior once 
the entire page has loaded
*/
window.addEventListener("load", function () {
  nameField.focus();
  otherJobRole.style.display = "none";
  color.disabled = true;
  creditCardSelect();
});
//Accesibilty focus
focusActivity();
removeFocusActivity();

/*Event Listeners */
jobRole.addEventListener("click", updateOtherJobRole);
design.addEventListener("click", updateColorOptions);
activites.addEventListener("change", updateTotal, true);
activites.addEventListener("change", updateConflicts, true);
activites.addEventListener("change", validateActivity, true);
payment.addEventListener("click", updatePayment);
nameField.addEventListener("keyup", validateName);
email.addEventListener("keyup", validateEmail);
ccNum.addEventListener("keyup", validateCardNumber);
zip.addEventListener("keyup", validateZip);
cvv.addEventListener("keyup", validateCvv);

/* preventDefault method calls on form submission 
if any of the validations fail */
form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  if (!validateName()) {
    e.preventDefault();
  }
  if (!validateEmail()) {
    e.preventDefault();
  }
  if (!validateActivity()) {
    e.preventDefault();
  }
  for (let x = 0; x < paymentOptions.length; x++) {
    //validations only run if the credit card payment is selected
    if (
      paymentOptions[x].value === "credit-card" &&
      paymentOptions[x].selected === true
    )
      if (!validateCreditCard()) {
        validateCardNumber();
        validateZip();
        validateCvv();
        e.preventDefault();
      }
  }
});
