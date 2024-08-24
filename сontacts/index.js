document.getElementById('forma_tg').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения полей формы
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const comment = document.querySelector('textarea[name="comment"]').value.trim();

    if (!name || !email || !comment) {
        alert('Пожалуйста, заполните все поля формы.');
        return;
    }

    // Формируем текст сообщения для отправки в Telegram
    const message = `Имя: ${name}\nEmail: ${email}\nСообщение: ${comment}`;

    // Замените <YOUR_BOT_TOKEN> на токен вашего бота
    const botToken = '6905026549:AAH-0fy_rTvYqsd7FjqB82VvuLRd0OYMoFI';
    // Замените <YOUR_CHAT_ID> на ваш chat_id или id канала
    const chatId = '@tomsk_24_7night';

    // URL для отправки сообщения в Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Отправляем данные на сервер Telegram
    fetch(telegramUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
        }),
    })
    .then(response => {
        console.log('Статус ответа:', response.status); // Выводим статус ответа
        return response.json();
    })
    .then(data => {
        console.log('Ответ от Telegram API:', data); // Выводим полный ответ
        if (data.ok) {
            alert('Сообщение успешно отправлено!');
        } else {
            alert('Ошибка при отправке сообщения. Попробуйте снова.');
        }
    })
    .catch(error => {
        console.error('Ошибка при отправке запроса:', error); // Выводим ошибку
        alert('Ошибка при отправке сообщения. Попробуйте снова.');
    });
});
