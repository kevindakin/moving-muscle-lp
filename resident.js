function stickyNav() {
  const trigger = document.getElementById("benefits");
  const nav = document.querySelector(".lp_nav");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: "top top",
      toggleActions: "play none none reverse",
    },
  });

  tl.to(nav, {
    y: "0%",
    duration: 1.2,
    ease: easeBase,
  });
}

function rangeSlider() {
  const slider = document.getElementById("range-slider");

  slider.addEventListener("input", () => {
    const value = slider.value;
    const min = slider.min;
    const max = slider.max;
    const percent = ((value - min) / (max - min)) * 100;

    slider.style.setProperty("--percent", `${percent}%`);
  });
}

function priceCalculator() {
  const radioButtons = document.querySelectorAll(".form_radio-wrap");
  const slider = document.getElementById("range-slider");
  const sliderValue = document.querySelector('[data-pricing="range-number"]');
  const result = document.querySelector('[data-pricing="result"]');

  let sliderNumber = parseInt(slider.value, 10);
  let radioNumber = parseInt(
    document.querySelector("input:checked")?.value || 0,
    10
  );

  sliderValue.textContent = sliderNumber;

  function calculateResult() {
    const formulaResult = 50 * radioNumber * sliderNumber - 1;
    result.textContent = formulaResult;
  }

  slider.addEventListener("input", () => {
    sliderNumber = parseInt(slider.value, 10);
    sliderValue.textContent = sliderNumber;
    calculateResult();
  });

  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      radioNumber = parseInt(
        document.querySelector("input:checked")?.value || 0,
        10
      );
      calculateResult();
    });
  });

  calculateResult();
}

stickyNav();
rangeSlider();
priceCalculator();