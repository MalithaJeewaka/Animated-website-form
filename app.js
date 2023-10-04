const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");
const tl = gsap.timeline({ defaults: { duration: 1 } });

//line
const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";

const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

//elastic effect
containers.forEach((container) => {
  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  const placeHolder = container.querySelector(".placeholder");

  input.addEventListener("focus", () => {
    // check to see if there any text in the input
    if (!input.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
      );
      tl.to(
        line,
        { attr: { d: start }, ease: "elastic.out(2.5, 0.5)" },
        "<50%"
      );
      //placeholder shift
      tl.to(
        placeHolder,
        {
          top: -15,
          left: 0,
          scale: 0.7,
          duration: 0.5,
          ease: "Power2.easeOut",
        },
        "<%15"
      );
    }
  });
});

//revertback if its not focused
form.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeHolder = container.querySelector(".placeholder");

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeHolder, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeOut",
        });
      }
    }

    // we will do our validation
    //name validation
    input.addEventListener("input", (e) => {
      if (e.target.type === "text") {
        let inputText = e.target.value;
        if (inputText.length > 2) {
          //colorize
          colorize("#6391E8", line, placeHolder);
        } else {
          colorize("#FE8C99", line, placeHolder);
        }
      }
      //email validation
      if (e.target.type === "email") {
        let valid = validateEmail(e.target.value);
        if (valid) {
          //colorize
          colorize("#6391E8", line, placeHolder);
        } else {
          colorize("#FE8C99", line, placeHolder);
        }
      }

      //validate phone
      if (e.target.type === "tel") {
        let valid = validatePhone(e.target.value);
        if (valid) {
          //colorize
          colorize("#6391E8", line, placeHolder);
        } else {
          colorize("#FE8C99", line, placeHolder);
        }
      }
    });
  });
});

//checking email validation
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

//colorize function
function colorize(color, line, placeHolder) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(placeHolder, { color: color, duration: 0.75 });
}

// checkbox animation fill
const checkbox = document.querySelector(".checkbox");
const tl2 = gsap.timeline({
  defaults: { duration: 0.5, ease: "Power2.easeOut" },
});

const tickMarkPath = document.querySelector(".tick-mark path");
const pathLength = tickMarkPath.getTotalLength();

gsap.set(tickMarkPath, {
  strokeDashoffset: pathLength,
  strokeDasharray: pathLength,
});

checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    tl2.to(".checkbox-fill", { top: "0%" });
    tl2.fromTo(
      tickMarkPath,
      { strokeDashoffset: pathLength },
      { strokeDashoffset: 0 },
      "<50%"
    );
    tl.to(".checkbox-label", { color: "#6391e8" }, "<");
  } else {
    tl2.to(".checkbox-fill", { top: "100%" });
    tl2.fromTo(
      tickMarkPath,
      { strokeDashoffset: 0 },
      { strokeDashoffset: pathLength },
      "<50%"
    );
    tl2.to(".checkbox-label", { color: "#c5c5c5" }, "<");
  }
});

//animating character
gsap.set("#eye", { transformOrigin: "center" });
gsap.fromTo(
  "#eye",
  { scale: 1 },
  {
    scale: 0.3,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.5,
    ease: "Power2.easeOut",
  }
);
gsap.fromTo(
  "#eyebrow",
  { y: 0 },
  { y: -1, yoyo: true, repeat: -1, repeatDelay: 0.5, ease: "Power2.easeOut" }
);

//submit button
const button = document.querySelector("button");
const tl3 = gsap.timeline({
  defaults: {
    duration: 0.75,
    ease: "Power2.easeOut",
  },
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  tl3.to(".contact-left, .contact-right", {
    opacity: 0,
    y: 30,
    pointerEvents: "none",
  });
  tl3.to("form", { scale: 0.8 }, "<");
  tl3.fromTo(".submitted", { opacity: 0, y: 30 }, { opacity: 1, y: 0 });

  //hand wave
  gsap.set("#hand", { transformOrigin: "left" });
  gsap.fromTo(
    "#hand",
    { rotation: 0, y: 0 },
    { rotation: -10, y: 2, ease: "elastic(3,0.3", duration: 2, delay: 1 }
  );
});
