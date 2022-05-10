"use strict";

const billEl = document.querySelector(".form__input--bill");
const peopleEl = document.querySelector(".form__input--people");
const customEl = document.querySelector(".form__input-custom");
const errorEl = document.querySelector(".error-label");
const tipAmountEl = document.querySelector(".result--tip-amount");
const totalEl = document.querySelector(".result--total");
const btns = document.querySelectorAll(".btn");
const btnReset = document.querySelector(".btn-reset");

function resetButtons() {
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("active");
  }
}

function calculation(percent) {
  let bill = billEl.value;
  let people = peopleEl.value;

  if (
    bill.match(/[^0-9.]/g) ||
    people.match(/[^0-9.]/g) ||
    percent.match(/[^0-9.]/g)
  ) {
    alert("Input's must be positive numbers!");
    return;
  }

  bill = +bill;
  people = +people;
  percent = +percent;

  if (people <= 0) {
    peopleEl.classList.add("border-active");
    errorEl.style.display = "inline";
    return;
  }

  peopleEl.classList.remove("border-active");
  errorEl.style.display = "none";

  const tip = (bill / 100) * percent;
  const totalAmount = tip + bill;

  tipAmountEl.innerHTML = `$${(tip / people).toFixed(2)}`;
  totalEl.innerHTML = `$${(totalAmount / people).toFixed(2)}`;
}

function reset(e) {
  e.preventDefault();
  billEl.value = "";
  peopleEl.value = "";
  customEl.value = "";
  tipAmountEl.innerHTML = "$0.00";
  totalEl.innerHTML = "$0.00";
  peopleEl.classList.remove("border-active");
  errorEl.style.display = "none";
  resetButtons();
}

btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const percent = btn.innerHTML.slice(0, -1);

    resetButtons();
    customEl.value = "";
    btn.classList.add("active");
    calculation(percent);
  })
);

[customEl, peopleEl, billEl].forEach((input) =>
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      if (customEl.value === "") {
        alert("Please enter your custom tip (positive numbers)");
        customEl.value = "";
        return;
      }
      calculation(customEl.value);
      resetButtons();
    }
  })
);

btnReset.addEventListener("click", reset);
