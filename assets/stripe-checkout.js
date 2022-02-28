import STRIPE_KEYS from "./stripe-keys.js";
// console.log(STRIPE_KEYS);

const tacos = document.getElementById("tacos");
const template = document.getElementById("taco-template").content;
const fragment = document.createDocumentFragment();
const fetchOptions = {
  headers: {
    Authorization: `Bearer ${STRIPE_KEYS.secret}`,
  },
};
let products;
let prices;
Promise.all([
  fetch("https://api.stripe.com/v1/products", fetchOptions),
  fetch("https://api.stripe.com/v1/prices", fetchOptions),
])
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then((json) => {
    products = json[0].data;
    prices = json[1].data;

    prices.forEach((price) => {
      const productData = products.find(
        (product) => price.product === product.id
      );
      //   console.log(productData);
      template.querySelector(".taco").dataset.price = price.id;
      template.querySelector("img").src = productData.images[0];
      template.querySelector("img").alt = productData.name;
      template.querySelector("figcaption").innerHTML = `<p>Producto: ${
        productData.name
      }</p> <p> Precio: S/ 
      ${price.unit_amount_decimal.slice(
        0,
        -2
      )},00 ${price.currency.toUpperCase()}</p>`;
      const clone = document.importNode(template, true);
      fragment.appendChild(clone);
    });
    tacos.appendChild(fragment);
  })
  .catch((err) => {
    console.log(err);
  });
