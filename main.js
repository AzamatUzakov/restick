let all_goods_box = document.querySelector('.goods_flex_box');

let menu_mobi = document.querySelector('.menu_mobi');
let burger_icon = document.querySelector('.br_icon');
let X_icon = document.querySelector('.X_icon');

burger_icon.onclick = () => {
  menu_mobi.style.height = '100%';
  burger_icon.style.display = 'none';
  X_icon.style.display = 'block';
};

X_icon.onclick = () => {
  menu_mobi.style.height = '30px';
  burger_icon.style.display = 'block';
  X_icon.style.display = 'none';
};

const products = [
  {
    title: 'Напиток Fanta',
    price: 2000,
    imgSrc: 'https://i.ibb.co/Kjk7jH8/fanta.jpg',
  },
  {
    title: 'Алкаголь JACK',
    price: 1500,
    imgSrc: 'https://i.ibb.co/3CZr4ZC/Jack-Daniels-0-5-L.webp',
  },
  {
    title: 'Колбаса докторский',
    price: 50,
    imgSrc: 'https://i.ibb.co/2tJmV3g/kolbasa.jpg',
  },
];

function goods() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  for (let item of products) {
    let goodsMainBox = document.createElement('div');
    let posterBox = document.createElement('div');
    let posterImgBox = document.createElement('div');
    let posterImg = document.createElement('img');
    let title = document.createElement('div');
    let titleText = document.createElement('p');
    let priceFlexCont = document.createElement('div');
    let priceText = document.createElement('p');

    let addBasketBtn = document.createElement('button');

    posterImg.src = item.imgSrc;
    posterImg.alt = '';
    titleText.innerHTML = item.title;
    priceText.innerHTML = `${item.price} руб`;
    addBasketBtn.innerHTML = 'Добавить в корзину';

    goodsMainBox.classList.add('goods_main_box');
    posterBox.classList.add('poster_box');
    posterImgBox.classList.add('poster_img_box');
    posterImg.classList.add('poster_img');
    title.classList.add('title');
    priceFlexCont.classList.add('price_flex_cont');
    addBasketBtn.classList.add('add_basket');

    posterImgBox.append(posterImg);
    posterBox.append(posterImgBox);
    title.append(titleText);
    priceFlexCont.append(priceText);
    goodsMainBox.append(posterBox, title, priceFlexCont, addBasketBtn);
    all_goods_box.append(goodsMainBox);

    addBasketBtn.onclick = () => {
      addToCart(item);
      addBasketBtn.innerHTML = "Добавленно"
    };
  }
}

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(cartItem => cartItem.title === item.title);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

goods();
