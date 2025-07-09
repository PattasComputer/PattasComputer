const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const imgs = document.querySelectorAll('.slider img');
const dots = document.querySelectorAll('.dot');
var currentImg = 0;
const interval = 3000;

// Card slider 
document.addEventListener("DOMContentLoaded", function(){
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".projects-box i");
    const wrapper = document.querySelector(".projects-box");

    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false, 
    startX, 
    startScrollLeft,
    timeoutId;

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;

        //calculate new scroll position
        const newScrollLeft = startScrollLeft - (e.pageX - startX);

        //check if the new scroll position exceeds
        // the carousel boundaries
        if (newScrollLeft <= 0 || newScrollLeft >= carousel.scrollWidth - carousel.offsetWidth) {

            //if so, prevent further dragging
            isDragging = false;
            return
        }

        //Otherwise, update the scroll position of the carousel
        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    };

    const autoplay = () => {
        //return if window is smaller than 800 
        if (window.innerWidth < 800) return;

        //calculate the total width of all cards
        const totalCardWidth = carousel.scrollWidth;

        //calculate the maximum scroll position
        const maxScrollLeft = totalCardWidth - carousel.offsetWidth;

        //if the carousel is at the end, stop autoplay
        if (carousel.scrollLeft >= maxScrollLeft) return;

        //Autoplay the carousel after every 2500ms
        timeoutId = setTimeout(() =>
            carousel.scrollLeft += firstCardWidth, 2500);
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoplay);

    // Add event listeners for the arrow buttons to 
    // scroll the carousel. left and right

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
        });
    });
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle("is-active");
    menu.classList.toggle("menu-active");
});

window.addEventListener("scroll", () => {
    hamburger.classList.remove("is-active");
    menu.classList.remove("menu-active");
});


function changeSlide(n) {
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.opacity = 0;
        dots[i].className = dots[i].className.replace(' active', '');
    }

    currentImg = (currentImg + 1) % imgs.length; 

    if (n != undefined) {
        clearInterval(timer);
        timer = setInterval(changeSlide, interval);
        currentImg = n;
    }

    imgs[currentImg].style.opacity = 1;
    dots[currentImg].className += ' active';
};

var timer = setInterval(changeSlide, interval);
