const typeAdress = document.getElementById("typeAdress");
const sendEtherButton = document.getElementById("sendEtherButton");
const statusMessage = document.getElementById("statusMessage");
const continueButton = document.getElementById("continueButton");

let isValidationComplete = false;
continueButton.style.display = "none";

typeAdress.addEventListener("input", (e) => {
  const value = e.target.value;

  if (!/^0x/.test(value)) {
    e.target.value = "0x" + value;
  }

  const newValue = value.replace(/[а-яА-Я]/g, "");
  e.target.value = newValue;
});

sendEtherButton.addEventListener("click", async () => {
  try {
    const value = typeAdress.value;

    if (
      /^[a-zA-Z0-9!@#$%^&*()-_+=<>?:"',./\[\]{}|\\]+$/g.test(value) &&
      value.length >= 20
    ) {
      statusMessage.textContent = "Ожидание...";
      sendEtherButton.disabled = true; // Делаем кнопку sendEtherButton неактивной
      typeAdress.disabled = true;

      setTimeout(() => {
        statusMessage.textContent = "Успешно";
        
        isValidationComplete = true;
        continueButton.style.display = "block"; // Отображаем кнопку continueButton
      }, 10000);
    } else {
      alert("Поле не заполнено правильно, повторите попытку!");
    }
  } catch (error) {
    console.error(error);
  }
});

continueButton.addEventListener("click", () => {
  continueButton.style.display = "none"; // Скрываем кнопку continueButton
  sendEtherButton.disabled = false;
  typeAdress.disabled = false;
  typeAdress.value = ""; // Очищаем поле ввода
  statusMessage.textContent = "";
});
