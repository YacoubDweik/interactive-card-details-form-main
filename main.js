let errorList = {
  number: false,
  month: false,
  year: false,
  cvc: false,
};
let done = false;
let formPage = document.querySelector(".container__info");
let donePage = document.querySelector(".container__done");
formPage.classList.remove("hidden");
donePage.classList.add("hidden");

let nameShow = document.querySelector(".card-name");
let nameInput = document.forms[0].name;

nameInput.addEventListener("input", (e) => {
  nameInput.value.length > 30
    ? (nameInput.value = nameInput.value.slice(0, 30))
    : (nameShow.innerHTML = nameInput.value);
});

let numberShow = document.querySelector(".card-number");
let numberInput = document.forms[0].number;
let wrongFormatError = document.querySelector(".wrong");
let emptyErrorNumber = document.querySelector(
  "#number + .blank"
);

numberInput.addEventListener("input", (e) => {
  errorList["number"] = false;
  numberInput.classList.remove("error");
  wrongFormatError.classList.remove("active");
  emptyErrorNumber.classList.remove("active");
  numberInput.value = numberInput.value.replace(
    /(\w{4})(?=\w)/g,
    "$1 "
  );
  numberShow.innerHTML = numberInput.value;
});

let isWrongFormat = false;

numberInput.addEventListener("blur", () => {
  let check = numberInput.value.split(" ");
  if (
    /[^\d\s]/gi.test(numberInput.value) ||
    numberInput.value.length < 19 ||
    check.length != 4
  ) {
    numberInput.classList.add("error");
    wrongFormatError.classList.add("active");
    errorList["number"] = true;
    isWrongFormat = true;
  } else {
    isWrongFormat = false;
  }
});

let monthInput = document.forms[0].month;
let monthShow = document.querySelector(".month");
let yearInput = document.forms[0].year;
let yearShow = document.querySelector(".year");
let emptyErrorYear = document.querySelector(
  "#year + .blank"
);

monthInput.addEventListener("input", (e) => {
  monthInput.classList.remove("error");
  if (
    monthInput.value < 0 ||
    monthInput.value > 12 ||
    monthInput.value.length > 2
  ) {
    monthInput.value = "";
  }
});

monthInput.addEventListener("blur", () => {
  if (
    monthInput.value >= 1 &&
    monthInput.value < 10 &&
    !monthInput.value.includes("0")
  ) {
    monthInput.value = "0" + monthInput.value;
    monthShow.innerHTML = monthInput.value;
  }
});

monthInput.addEventListener("input", () => {
  monthShow.innerHTML = monthInput.value;
  if (monthInput.value != "" && yearInput.value != "") {
    emptyErrorYear.classList.remove("active");
  }
});

yearInput.addEventListener("input", (e) => {
  if (
    (yearInput.value < 25 && yearInput.value.length >= 2) ||
    (yearInput.value > 35 && yearInput.value.length >= 2)
  ) {
    yearInput.value = "";
  }
});

yearInput.addEventListener("blur", () => {
  if (yearInput.value.length < 2) {
    yearInput.value = "";
  }
});

yearInput.addEventListener("input", () => {
  yearShow.innerHTML = yearInput.value;
  if (monthInput.value != "" && yearInput.value != "") {
    emptyErrorYear.classList.remove("active");
  }
  if (yearInput != "") {
    yearInput.classList.remove("error");
  }
});

let cvcInput = document.forms[0].cvc;
let cvcShow = document.querySelector(".cvc");
let emptyErrorCvc = document.querySelector("#cvc + .blank");

cvcInput.addEventListener("input", () => {
  cvcInput.value < 0 ? (cvcInput.value = "") : true;
  cvcInput.value > 999 ? (cvcInput.value = 999) : true;
  cvcInput.value.length > 3 ? (cvcInput.value = 0) : true;
  cvcInput.classList.remove("error");
  emptyErrorCvc.classList.remove("active");
  cvcShow.innerHTML = cvcInput.value;
});

let submitButton = document.querySelector(
  ".container__info button"
);
let emptyErrors = document.querySelectorAll(".blank");

submitButton.addEventListener("click", () => {
  //reset errors
  errorList = {
    number: false,
    month: false,
    year: false,
    cvc: false,
  };

  emptyErrors.forEach((error) =>
    error.classList.remove("active")
  );

  numberInput.value == ""
    ? (errorList["number"] = true)
    : 0;
  +monthInput.value == 0 ? (errorList["month"] = true) : 0;
  yearInput.value == "" ? (errorList["year"] = true) : 0;
  cvcInput.value == "" || cvcInput.value < 100
    ? (errorList["cvc"] = true)
    : 0;

  done = Object.values(errorList).every(
    (value) => value == false
  );

  done = done && isWrongFormat != true ? true : false;

  if (done) {
    // send the data
    Object.keys(errorList).forEach(
      (input) =>
        (document.querySelector(`#${input}`).value = "")
    );
    nameInput.value = "";
    formPage.classList.add("hidden");
    donePage.classList.remove("hidden");
  } else {
    Object.entries(errorList).forEach((entry) => {
      if (entry[1] == true) {
        document
          .querySelector(`#${entry[0]}`)
          .classList.add("error");
        document
          .querySelector(`#${entry[0]} + .blank`)
          .classList.add("active");
        entry[0] == "number"
          ? wrongFormatError.classList.remove("active")
          : 0;
        entry[0] == "month"
          ? emptyErrorYear.classList.add("active")
          : 0;
      }
    });
  }
});

let continueButton = document.querySelector(
  ".container__done button"
);

continueButton.addEventListener("click", () => {
  nameShow.innerHTML = "Jane Appleseed";
  numberShow.innerHTML = "0000 0000 0000 0000";
  monthShow.innerHTML = "00";
  yearShow.innerHTML = "00";
  cvcShow.innerHTML = "000";
  formPage.classList.remove("hidden");
  donePage.classList.add("hidden");
});
