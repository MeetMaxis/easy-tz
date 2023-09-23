const typeAdress = document.getElementById("typeAdress");
const sendEtherButton = document.getElementById("sendEtherButton");
const continueButton = document.getElementById("continueButton");
const statusMessage = document.getElementById("statusMessage");

let validationComplete = false;

typeAdress.addEventListener("input", (e) => {
  const value = e.target.value;

  // Если нет, то добавляем "0x" в начало
  if (!/^0x/.test(value)) {
    e.target.value = "0x" + value;
  }

  // Удаляем кириллицу
  const newValue = value.replace(/[а-яА-Я]/g, "");
  e.target.value = newValue;

  // Проверка на наличие только латинских букв, цифр и специальных символов
  if (
    /^[a-zA-Z0-9!@#$%^&*()-_+=<>?:"',./\[\]{}|\\]+$/g.test(newValue) &&
    newValue.length >= 20
  ) {
    sendEtherButton.disabled = false;
  } else {
    sendEtherButton.disabled = true;
  }
});

sendEtherButton.addEventListener("click", async () => {
  try {
    const value = typeAdress.value;

    // Проверка на наличие только латинских букв, цифр и специальных символов и длину
    if (
      /^[a-zA-Z0-9!@#$%^&*()-_+=<>?:"',./\[\]{}|\\]+$/g.test(value) &&
      value.length >= 20
    ) {
      statusMessage.textContent = "Ожидание...";

      // Задержка в 10 секунд
      setTimeout(() => {
        statusMessage.textContent = "Успешно";
        typeAdress.disabled = true; // Блокировка поля ввода фразы
        sendEtherButton.disabled = true; // Отключаем кнопку "Подтвердить"
        continueButton.disabled = false; // Включение кнопки "Продолжить"
      }, 10000);
    } else {
      alert("Поле не заполнено правильно, повторите попытку!");
    }
  } catch (error) {
    console.error(error);
  }
});

continueButton.addEventListener("click", () => {
  sendEtherButton.click(); // Вызываем клик по кнопке "Подтвердить" после нажатия "Продолжить"
});
