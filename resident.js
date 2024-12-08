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
  
  stickyNav();
  