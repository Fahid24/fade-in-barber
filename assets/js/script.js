'use strict';


const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

// ##################view############

/// Function to handle intersection changes
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the 'visible' class to trigger animation when element is in view
      entry.target.classList.add('visible');
      // Stop observing the target once it's in view (optional)
      observer.unobserve(entry.target);
    }
  });
}

// Create a new Intersection Observer
var observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

// Get all elements with the shared class to be triggered
var animatedElements = document.querySelectorAll('.trigger-element');

// Start observing each element
animatedElements.forEach(animatedElement => {
  observer.observe(animatedElement);
});




// ############ loader ################//

window.addEventListener('load', function () {
  var loadingOverlay = document.getElementById("loadingOverlay");
  var content = document.getElementById("content");

  // Delay for 2 seconds (2000 milliseconds)
  setTimeout(function() {
      // Hide loading overlay
      loadingOverlay.style.opacity = "0";
      // Show content
      content.classList.remove("hidden");
      // Reset opacity after transition completes
      setTimeout(function() {
          loadingOverlay.style.display = "none";
      }, 500); // Same as transition duration
  }, 2000); // 2000 milliseconds = 2 seconds
});




// *******************slider*******************//
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" act", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " act";
}

window.onload= function () {
  setInterval(function(){ 
     plusSlides(1);
  }, 5000);
 }


// ______________
//   counetr  
// _______________
window.addEventListener('load', function () {
  var loadingOverlay = document.getElementById("loadingOverlay");
  var content = document.getElementById("content");

  // Function to start the count animation when the element comes into view
  function startCountAnimation(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const obj = entry.target;
        const endValue = parseInt(obj.getAttribute("data-end-value")); // Get the end value from the data-end-value attribute
        animateValue(obj, 0, endValue, 5000); // Start the counting effect from 0 to the end value over 5000 milliseconds
        obj.classList.add("counting"); // Add a class to indicate that counting animation is active
        observer.unobserve(obj); // Stop observing once the counting has started
      }
    });
  }

  // Intersection Observer configuration
  const observer = new IntersectionObserver(startCountAnimation, { threshold: 0 });

  // Observe all elements with the "count-element" class
  const countElements = document.querySelectorAll('.count-element');
  countElements.forEach(element => {
    observer.observe(element);
  });

  // Delay for 2 seconds (2000 milliseconds) before hiding the loading overlay
  setTimeout(function () {
    // Hide loading overlay
    loadingOverlay.style.opacity = "0";
    // Show content
    content.classList.remove("hidden");

    // Start count animations after loading overlay is hidden
    setTimeout(function () {
      // Hide loading overlay completely after transition completes
      loadingOverlay.style.display = "none";
    }, 500); // Same as transition duration
  }, 2000); // 2000 milliseconds = 2 seconds
});

// Function to animate the value (taken from previous examples)
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = Math.floor(progress * (end - start) + start); // Use textContent instead of innerHTML
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}


const links = document.querySelectorAll('.navbar-link');

// Function to handle link click
function handleLinkClick(event) {
  // Remove active class from all links
  links.forEach(link => {
    link.classList.remove('active-l');
  });

  // Add active class to the clicked link
  event.target.classList.add('active-l');
}

// Add click event listener to each link
links.forEach(link => {
  link.addEventListener('click', handleLinkClick);
});

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = () => navbar.classList.toggle("active");

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = () => navbar.classList.remove("active");

addEventOnElem(navLinks, "click", closeNavbar);




const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);




const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedFilterBtn = filterBtns[0];

const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (this.dataset.filterBtn === filterItems[i].dataset.filter ||
      this.dataset.filterBtn === "all") {

      filterItems[i].style.display = "block";
      filterItems[i].classList.add("active");

    } else {

      filterItems[i].style.display = "none";
      filterItems[i].classList.remove("active");

    }
  }
}

addEventOnElem(filterBtns, "click", filter);