
// Get the button
let backToTopbtn = document.getElementById('btn-back-to-top')!;
const scrollFunction = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopbtn.style.display = 'block';
  } else {
    backToTopbtn.style.display = 'none';
  }
};
const backToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// When the user scrolls down 20px from the top of the document, show the button
document.addEventListener('scroll', scrollFunction)

// When the user clicks on the button, scroll to the top of the document
backToTopbtn?.addEventListener('click', backToTop);


// menu active
let menu = document?.querySelector(".menu");
let btnMenu = menu!.querySelectorAll(".nav-hover")

let activeMenu = () => {
  console.log("xxx");
  var current = document.querySelectorAll(".active-nav");
  current[0].classList.remove("active-nav")
  current[0].classList.add("active-nav")
}

for (var i = 0; i < btnMenu.length; i++) {
  btnMenu[i].addEventListener("click", activeMenu)
};


