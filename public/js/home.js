let btnBackToTop = document.querySelector('[class="btn-back-to-top'),
    scrollDuration = 700;

window.onscroll = () => {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)
        btnBackToTop.style.display = 'block';
    else
        btnBackToTop.style.display = 'none';
}

function backToTop() {
    (!window.requestAnimationFrame) ? window.scrollTo(0, 0): Util.scrollTo(0, scrollDuration);
}
