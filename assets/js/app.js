document.addEventListener('DOMContentLoaded', function () {
    const text = document.querySelector('.copy');
    const content = text.textContent;
    text.textContent = '';

    let i = 0;
    function type() {
        if (i < content.length) {
            text.textContent += content.charAt(i);
            i++;
            setTimeout(type, 80);
        }
    }
    
    type();
});
