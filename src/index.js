import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBfpUscMyvHn-KDln5J55SbGo-WEz5llw8",
  authDomain: "portfolio-contact-351216.firebaseapp.com",
  projectId: "portfolio-contact-351216",
  storageBucket: "portfolio-contact-351216.appspot.com",
  messagingSenderId: "1025733795924",
  appId: "1:1025733795924:web:73f39fc16506eca7e00dc1",
  measurementId: "G-N3V53S9YL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


//checks for intersectio of spiderman div with "trigger" div.  Spiderman retracts web.
var scroll = true;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const spiderman = document.querySelector('.spiderman');
    const web = document.querySelector('.web');

    if (entry.isIntersecting && scroll) {
      spiderman.classList.add('spiderman-up');
      spiderman.classList.remove('spiderman-animation');
      web.classList.remove('web-animation');
      web.classList.add('web-up');

      scroll = false;
      return; // if we added the class, exit the function
    }

    // We're not intersecting, so remove the class!
    spiderman.classList.remove('spiderman-up');
    web.classList.remove('web-up');
  });
});

//calls observer
observer.observe(document.querySelector('.trigger'));
observer.observe(document.querySelector('#contact-wrapper'));

//scrolls to top on page reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

window.onscroll = function () { scrollFunction() };

//if scrolled to top, navbar background becomes transparent
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

    document.querySelector('.page-header').style.background = "black";
  } else {

    document.querySelector('.page-header').style.background = "none";
  }

}

//nav menu shows when hamburger icon clicked
function showHamburger() {
  const hamburger = document.querySelector('.hamburger-nav');
  hamburger.style.display === "none" || !hamburger.style.display ? hamburger.style.display = "flex" : hamburger.style.display = "none";
}

document.querySelector('.menu-btn').addEventListener('click', showHamburger);

window.addEventListener("resize", limitFunc);

//if window is resized checks to see if width is greater than 710px and if it is, hides hamburger nav menu
function limitFunc() {
  var width = window.innerWidth;
  if (width > 710) {
    document.querySelector('.hamburger-nav').style.display = "none";
  }
}

document.getElementById('submit').addEventListener('click', submitForm);

function submitForm(e) {
  e.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;
  console.log(name);

  saveMessage(name, email, message);
}

// Save messages to firebase
async function saveMessage(name, email, message) {
  // Add a new document with a generated id.
  await addDoc(collection(db, "messages"), {
    name: name,
    email: email,
    message: message
  });
}
