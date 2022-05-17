var scroll = true;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const spiderman = document.querySelector('.spiderman');
    const web = document.querySelector('.web');

    if (entry.isIntersecting && scroll) {
      spiderman.classList.add('spiderman-up');
      spiderman.classList.remove('spiderman-animation');
      web.classList.add('web-up');

      scroll = false;
      return; // if we added the class, exit the function
    }

    // We're not intersecting, so remove the class!
    spiderman.classList.remove('spiderman-up');
    spiderman.classList.remove('web-up');
  });
});


observer.observe(document.querySelector('.trigger'));


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

    document.querySelector('.page-header').style.background = "black";
  } else {

    document.querySelector('.page-header').style.background = "none";
  }
}

function showHamburger() {
  const hamburger = document.querySelector('.hamburger-nav');
  hamburger.style.display === "none" ? hamburger.style.display = "flex" : hamburger.style.display = "none";
}

window.addEventListener("resize", limitFunc);

function limitFunc() {
  var width = window.innerWidth;
  if (width > 710) {
    document.querySelector('.hamburger-nav').style.display = "none";
  }
}