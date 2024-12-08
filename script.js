const durationSlow = 1;
const easeBase = "power4.inOut";

// Load Animation

function pageLoader() {
  const heading = document.querySelector('[load-el="split"]');
  const fade = document.querySelectorAll('[load-el="fade-in"]');

  const headlineSplit = new SplitType(heading, {
    types: "lines, words",
    tagName: "span",
  });

  const splitText = heading.querySelectorAll(".word");

  const loadAnim = gsap.timeline({
    defaults: {
      duration: durationSlow,
      ease: easeBase,
    },
  });

  loadAnim
    .from(splitText, {
      y: "100%",
      stagger: 0.1,
    })
    .to(
      fade,
      {
        opacity: 1,
        stagger: 0.1,
      },
      "<0.1"
    );
}

// Split Text Animation

function splitText() {
  const headings = document.querySelectorAll('[scroll-anim="split"]');

  headings.forEach((heading) => {
    const headlineSplit = new SplitType(heading, {
      types: "lines, words",
      tagName: "span",
    });

    const splitText = heading.querySelectorAll(".word");

    let splitAnim = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top 100%",
        toggleActions: "play none none none",
      },
      defaults: {
        duration: 1,
        ease: easeBase,
      },
    });

    splitAnim.from(splitText, {
      y: "100%",
      stagger: 0.05,
    });
  });
}

// Image Reveal (Scroll)

function imageReveal() {
  const wrapper = document.querySelectorAll(".split_image");

  wrapper.forEach((wrap) => {
    const block = wrap.querySelector(".overlay-block");
    const img = wrap.querySelector(".u-cover-absolute");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      defaults: {
        duration: 0.8,
        ease: "power3.out",
      },
    });

    tl.from(block, {
      height: "100%",
    }).from(
      img,
      {
        scale: 1.3,
      },
      "<0.2"
    );
  });
}

// Fade Up Animation

function fadeUp() {
  const fadeEls = document.querySelectorAll('[scroll-anim="fade-up"]');

  fadeEls.forEach((el) => {
    let fadeUp = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      defaults: {
        duration: durationSlow,
        ease: "power4.out",
      },
    });

    fadeUp.from(el, {
      opacity: 0,
      y: "6rem",
    });
  });
}

// Append Copyright Date

function copyrightDate() {
  const copyrightDate = document.querySelector('[js-el="copyright-date"]');

  if (copyrightDate) {
    const currentYear = new Date().getFullYear();
    copyrightDate.textContent = currentYear;
  }
}

// Accordion Open and Close

function accordion() {
  const accordionItems = gsap.utils.toArray(".accordion_component");
  const durationBase = 0.6;
  const easeBase = "power4.inOut";

  accordionItems.forEach((item) => {
    const content = item.querySelector(".accordion_content");
    const icon = item.querySelector(".accordion_icon");

    gsap.set(content, { height: 0, display: "none" });
    item.classList.remove("is-open");
    gsap.set(icon, { rotate: 0 });
  });

  const firstItem = accordionItems[0];
  const firstContent = firstItem.querySelector(".accordion_content");
  const firstIcon = firstItem.querySelector(".accordion_icon");

  gsap.set(firstContent, { height: "auto", display: "block" });
  firstItem.classList.add("is-open");
  gsap.set(firstIcon, { rotation: 135 });

  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion_title-row");
    const content = item.querySelector(".accordion_content");
    const icon = item.querySelector(".accordion_icon");

    header.addEventListener("click", () => {
      accordionItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherContent = otherItem.querySelector(".accordion_content");
          const otherIcon = otherItem.querySelector(".accordion_icon");

          if (otherItem.classList.contains("is-open")) {
            gsap.to(otherContent, {
              height: 0,
              duration: durationBase,
              ease: easeBase,
              onComplete: () => {
                otherItem.classList.remove("is-open");
                gsap.set(otherContent, { display: "none" });
              },
            });

            gsap.to(otherIcon, {
              rotate: 0,
              duration: durationBase,
              ease: easeBase,
            });
          }
        }
      });

      if (!item.classList.contains("is-open")) {
        gsap.set(content, { display: "block" });
        gsap.to(content, {
          height: "auto",
          duration: durationBase,
          ease: easeBase,
          onComplete: () => item.classList.add("is-open"),
        });

        gsap.to(icon, {
          rotate: 135,
          duration: durationBase,
          ease: easeBase,
        });
      } else {
        gsap.to(content, {
          height: 0,
          duration: durationBase,
          ease: easeBase,
          onComplete: () => {
            item.classList.remove("is-open");
            gsap.set(content, { display: "none" });
          },
        });

        gsap.to(icon, {
          rotate: 0,
          duration: durationBase,
          ease: easeBase,
        });
      }
    });
  });
}

pageLoader();
splitText();
imageReveal();
fadeUp();
copyrightDate();
accordion();
