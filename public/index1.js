document.addEventListener("DOMContentLoaded", function() {
        const aboutParagraphs = document.querySelectorAll('.info-box:first-of-type p');
        aboutParagraphs.forEach((paragraph, index) => {
            setTimeout(() => {
                paragraph.style.opacity = 1;
                paragraph.style.transform = 'translateY(0)';
            }, index * 1000);
        });

        const cookies = document.querySelectorAll('.cookie');
        cookies.forEach((cookie, index) => {
            cookie.style.left = `${Math.random() * window.innerWidth}px`;
            console.log('Cookie position set:', cookie.style.left);
        });
    });