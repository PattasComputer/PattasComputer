const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const imgs = document.querySelectorAll('.slider img');
const dots = document.querySelectorAll('.dot');
var currentImg = 0;
const interval = 3000;

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
