document.addEventListener('DOMContentLoaded', () => {
   
    const elementsToCopy = document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6');

    elementsToCopy.forEach(element => {
        element.style.cursor = 'pointer'; 
        element.addEventListener('click', (event) => {
            const textToCopy = event.target.innerText;
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                   
                    const feedback = document.createElement('span');
                    feedback.textContent = 'Copiado!';
                    feedback.classList.add('copy-feedback');
                    element.appendChild(feedback);

                   
                    setTimeout(() => {
                        feedback.remove();
                    }, 1500);
                })
                .catch(err => {
                    console.error('Erro ao copiar texto: ', err);
                    const feedback = document.createElement('span');
                    feedback.textContent = 'Erro ao copiar.';
                    feedback.classList.add('copy-feedback', 'copy-error');
                    element.appendChild(feedback);
                    setTimeout(() => {
                        feedback.remove();
                    }, 1500);
                });
        });
    });

   
    const style = document.createElement('style');
    style.textContent = `
        .copy-feedback {
            position: absolute;
            background-color: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8em;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            opacity: 0;
            animation: fade-in-out 1.5s ease-in-out forwards;
        }

        .copy-error {
            background-color: rgba(255, 0, 0, 0.8);
        }

        @keyframes fade-in-out {
            0% { opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);

  
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    document.body.insertBefore(progressBar, document.body.firstChild);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

  
    const progressBarCSS = `
        #reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background-color: #ffeb3b; /* Amarelo para consistência */
            width: 0%;
            z-index: 100;
        }
    `;
    const progressBarStyles = document.createElement('style');
    progressBarStyles.textContent = progressBarCSS;
    document.head.appendChild(progressBarStyles);

  
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20, 
                    behavior: 'smooth'
                });
            }
        });
    });
});