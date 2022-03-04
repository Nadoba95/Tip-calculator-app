"use strict";

const billEl = document.querySelector(".form__input--bill");
const peopleEl = document.querySelector(".form__input--people");
const customEl = document.querySelector(".form__input-custom");
const errorEl = document.querySelector(".error-label");
const tipAmountEl = document.querySelector(".result--tip-amount");
const totalEl = document.querySelector(".result--total");
const btns = document.querySelectorAll(".btn");
const btnReset = document.querySelector(".btn-reset");

function calculation(percent) {
  const bill = +billEl.value;
  const people = +peopleEl.value;

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
  billEl.value = "0";
  peopleEl.value = "0";
  customEl.value = "";
  tipAmountEl.innerHTML = "$0.00";
  totalEl.innerHTML = "$0.00";
}

[...btns].forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const percent = +btn.innerHTML.slice(0, -1);
    calculation(percent);
  })
);

customEl.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    calculation(this.value);
  }
});

btnReset.addEventListener("click", reset);