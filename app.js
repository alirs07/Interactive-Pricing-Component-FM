const $ = document;
const priceValueElem = $.getElementById("priceValue");
const priceSliderElem = $.querySelector(".price-slider");
const pageviewElem = $.querySelector(".pageview-value");
const billingInputElem = $.querySelector(".billing-sec-input");

let pageviewStartingPoint = null;
let pageviewFinishingPoint = null;

const pricingData = [
  { pageviews: "10K", price: 8 },
  { pageviews: "50K", price: 12 },
  { pageviews: "100K", price: 16 },
  { pageviews: "500K", price: 24 },
  { pageviews: "1M", price: 36 },
];
updateRangeStyles(priceSliderElem);

priceSliderElem.addEventListener("input", () => {
  priceHandler();
  updateRangeStyles(priceSliderElem);
});

billingInputElem.addEventListener("input", () => {
  priceHandler();
});

const priceHandler = () => {
  let selectedPricingValue = priceSliderElem.value;
  let pageviewsResult = pricingData[selectedPricingValue].pageviews;
  let priceResult = pricingData[selectedPricingValue].price;

  if (billingInputElem.checked) {
    priceResult *= 0.75;
  }

  injectResultAnimated(priceResult);

  pageviewElem.innerHTML = pageviewsResult;
};

const injectResultAnimated = (priceResult) => {
  let startingPoint = +priceValueElem.innerHTML.slice(1);
  let finishingPoint = +priceResult;
  let counter = startingPoint;

  const addAnimation = () => {
    if (counter < finishingPoint) {
      counter++;
      priceValueElem.innerHTML = "$" + counter.toFixed(2);
      setTimeout(addAnimation, 35);
    } else if (counter > finishingPoint) {
      counter--;
      priceValueElem.innerHTML = "$" + counter.toFixed(2);
      setTimeout(addAnimation, 35);
    }
  };
  addAnimation();
};

function updateRangeStyles(input) {
  const percent = ((input.value - input.min) / (input.max - input.min)) * 100;
  const bgColor = `linear-gradient(to right, var(--clr-cyan-300) 0%, var(--clr-cyan-300) ${percent}%, var(--clr-gray-200) ${percent}%, var(--clr-gray-200) 100%)`;
  input.style.background = bgColor;
}
