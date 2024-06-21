document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('animatedText');
    const text = "Fundación México Sin Sordera";
    textElement.textContent = '';

    const words = text.split(' ');
    words.forEach((word, wordIndex) => {
        const spanWord = document.createElement('span');
        spanWord.classList.add('word-wrapper');  // Añadir clase para evitar corte de palabras

        word.split('').forEach((char, charIndex) => {
            const spanChar = document.createElement('span');
            spanChar.textContent = char;
            spanChar.classList.add('letter');

            // Asignar clases específicas basadas en la palabra
            if (word.toLowerCase() === 'fundación') {
                spanChar.classList.add('foundation');
            } else if (word.toLowerCase() === 'méxico') {
                spanChar.classList.add('mexico');
            } else if (word.toLowerCase() === 'sin') {
                spanChar.classList.add('sin');
            } else if (word.toLowerCase() === 'sordera') {
                spanChar.classList.add('sordera');
            }

            spanChar.style.animationDelay = `${(wordIndex * 6 + charIndex) * 0.1}s`;
            spanChar.addEventListener('animationend', () => {
                spanChar.classList.add('bounced');
            });

            spanWord.appendChild(spanChar);
        });

        textElement.appendChild(spanWord);

        // Agregar un espacio entre palabras
        if (wordIndex < words.length - 1) {
            const space = document.createElement('span');
            space.textContent = '\u00A0';
            textElement.appendChild(space);
        }
    });
});
