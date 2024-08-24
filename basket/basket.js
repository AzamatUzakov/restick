const cartItemsElement = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');
const orderForm = document.getElementById('orderForm');
let design = document.querySelector('.design');
let tg_forms = document.querySelector('.tg_forms');
let back = document.querySelector('.back');

design.onclick = () => {
    tg_forms.style.display = "flex";
};
back.onclick = () => {
    tg_forms.style.display = "none";
};

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        let main_cartBox = document.createElement('div');
        const itemElement = document.createElement('div');
        const posterImgBox = document.createElement('div');
        let descriotion_goods = document.createElement('div');
        const posterImg = document.createElement('img');
        const titleElement = document.createElement('p');
        const quantityContainer = document.createElement('div');
        const minusBtn = document.createElement('button');
        const quantityElement = document.createElement('span');
        const plusBtn = document.createElement('button');
        const removeBtn = document.createElement('button');
        let hr = document.createElement('hr');

        posterImg.alt = '';
        posterImg.src = item.imgSrc;
        posterImg.style.width = '150px';
        quantityElement.innerHTML = item.quantity;
        titleElement.innerHTML = `${item.title} - ${item.price} руб.`;
        minusBtn.innerHTML = '-';
        plusBtn.innerHTML = '+';
        removeBtn.innerHTML = '+';

        main_cartBox.classList.add('main_cartBox');
        quantityContainer.classList.add('quantityContainer');
        descriotion_goods.classList.add('descriotion_goods');
        itemElement.classList.add('cart-item');
        minusBtn.classList.add("min");
        quantityElement.classList.add("num");
        plusBtn.classList.add("plus");
        removeBtn.classList.add("danger");
        hr.classList.add('hr');
        titleElement.classList.add('titleElement');

        posterImgBox.append(posterImg);
        quantityContainer.append(minusBtn, quantityElement, plusBtn, removeBtn);
        main_cartBox.append(itemElement);
        descriotion_goods.append(titleElement, quantityContainer);
        itemElement.append(posterImgBox, descriotion_goods);
        cartItemsElement.append(main_cartBox, hr);

        total += item.price * item.quantity;

        minusBtn.onclick = () => {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                cart.splice(cart.indexOf(item), 1); // Удаление товара, если количество 0
            }
            updateCart(cart);
        };

        plusBtn.onclick = () => {
            item.quantity += 1;
            updateCart(cart);
        };

        removeBtn.onclick = () => {
            cart.splice(cart.indexOf(item), 1); // Удаление товара из корзины
            updateCart(cart);
        };
    });

    totalPriceElement.innerHTML = `<b>Итого:</b> ${total} руб.`;
}

function updateCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

orderForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const phone = event.target.phone.value;
    const email = event.target.email.value;
    const peopleCount = event.target.peopleCount.value;
    const deliveryAddress = event.target.deliveryAddress.value;
    const apartment = event.target.apartment.value;
    const entrance = event.target.entrance.value;
    const floor = event.target.floor.value;
    const paymentMethod = event.target.paymentMethod.value;
    const comment = event.target.comment.value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calculate total price

    sendOrderToTelegram(firstName, lastName, phone, email, peopleCount, deliveryAddress, apartment, entrance, floor, paymentMethod, comment, cart, total);
});

function sendOrderToTelegram(firstName, lastName, phone, email, peopleCount, deliveryAddress, apartment, entrance, floor, paymentMethod, comment, cart, total) {
    const token = '6905026549:AAH-0fy_rTvYqsd7FjqB82VvuLRd0OYMoFI';
    const chatId = '@tomsk_24_7night'; // Отправка в канал через @имя_канала
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const cartItems = cart.map(item => `${item.title} - ${item.quantity} шт. - ${item.price} руб.`).join('\n');
    const text = `
Имя: ${firstName}
Фамилия: ${lastName}
Телефон: ${phone}
Email: ${email}
Кол-во персон: ${peopleCount}
Адрес доставки: ${deliveryAddress}
Квартира: ${apartment}
Подъезд: ${entrance}
Этаж: ${floor}
Оплата: ${paymentMethod}
Комментарий: ${comment}

Содержимое корзины:
${cartItems}

Итоговая цена: ${total} руб.`; // Append total price

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                tg_forms.style.display = "none";
            } else {
                alert('Ошибка отправки сообщения.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ошибка отправки сообщения.');
        });
}

// Вызов renderCart для отображения корзины при загрузке страницы
renderCart();
