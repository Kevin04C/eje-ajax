import stripeKeys from "./stripe-keys.js";
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
const moneyFormat = (num) => `S/ ${num.slice(0, -2)},${num.slice(-2)}`;
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
      template.querySelector("figcaption").innerHTML = `
      ${productData.name}
      <br>
      ${moneyFormat(price.unit_amount_decimal)}
      `;
      const clone = document.importNode(template, true);
      fragment.appendChild(clone);
    });
    tacos.appendChild(fragment);
  })
  .catch((err) => {
    console.log(err);
  });
document.addEventListener("click", (e) => {
  if (e.target.matches(".taco *")) {
    let dataPrice = e.target.parentElement.getAttribute("data-price");
    Stripe(stripeKeys.public)
      .redirectToCheckout({
        lineItems: [{ price: dataPrice, quantity: 1 }],
        mode: "subscription",
        successUrl: "http://127.0.0.1:5500/assets/stripe-success.html",
        cancelUrl: "http://127.0.0.1:5500/assets/cancel.html",
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          tacos.insertAdjacentHTML("afterend", res.error.message);
        }
      });
  }
});
