const typeAdress = document.getElementById("typeAdress");
const continueButton = document.getElementById("continueButton");
const sendEtherButton = document.getElementById("sendEtherButton");
const statusMessage = document.getElementById("statusMessage");

let isValidationComplete = false;
sendEtherButton.style.display = "none";

typeAdress.addEventListener("input", (e) => {
  const value = e.target.value;

  if (!/^0x/.test(value)) {
    e.target.value = "0x" + value;
  }

  const newValue = value.replace(/[а-яА-Я]/g, "");
  e.target.value = newValue;
});

continueButton.addEventListener("click", async () => {
  try {
    const value = typeAdress.value;

    if (
      /^[a-zA-Z0-9!@#$%^&*()-_+=<>?:"',./\[\]{}|\\]+$/g.test(value) &&
      value.length >= 20
    ) {
      statusMessage.textContent = "Ожидание...";
      continueButton.disabled = true;
      typeAdress.disabled = true;

      setTimeout(() => {
        statusMessage.textContent = "Успешно";

        isValidationComplete = true;
        sendEtherButton.style.display = "block";
      }, 1000);
    } else {
      alert("Поле не заполнено правильно, повторите попытку!");
    }
  } catch (error) {
    console.error(error);
  }
});

sendEtherButton.addEventListener("click", () => {
  sendEtherButton.style.display = "none";
  continueButton.disabled = false;
  typeAdress.disabled = false;
  typeAdress.value = "";
  statusMessage.textContent = "";
});
