
const typeAdress = document.getElementById('typeAdress');
const sendEtherButton = document.getElementById('sendEtherButton');
const statusMessage = document.getElementById('statusMessage');

let validationComplete = false;

sendEtherButton.addEventListener('click', async () => {
  try {
    const value = typeAdress.value;

    if (!value) {
      alert('Поле не заполнено, повторите попытку!');
      return;
    }

    if (validationComplete) {
      typeAdress.value = ''; // Очищаем поле ввода
      sendEtherButton.textContent = 'Подтвердить'; // Меняем текст кнопки
      validationComplete = false; // Помечаем, что проверка не выполнена
      statusMessage.textContent = ''; // Очищаем статусное сообщение
    } else {
      // Проверка на наличие только латинских букв, цифр и специальных символов и длину
      if (/^[a-zA-Z0-9!@#$%^&*()-_+=<>?:"',./\[\]{}|\\]+$/g.test(value) && value.length >= 20) {
        statusMessage.textContent = 'Ожидание...';
        typeAdress.disabled = true; // Блокировка поля ввода фразы
        sendEtherButton.disabled = true; // Отключаем кнопку

        // Задержка в 10 секунд
        setTimeout(() => {
          validationComplete = true; // Помечаем, что проверка выполнена успешно
          statusMessage.textContent = '';
          typeAdress.disabled = false; // Разблокировка поля ввода фразы
          sendEtherButton.textContent = 'Продолжить'; // Меняем текст кнопки
          sendEtherButton.disabled = false; // Включаем кнопку
        }, 10000);
      } else {
        alert('Поле не заполнено правильно, повторите попытку!');
      }
    }
  } catch (error) {
    console.error(error);
  }
});

sendEtherButton.addEventListener('click', () => {
  if (validationComplete) {
    typeAdress.value = ''; // Очищаем поле ввода
  }
});