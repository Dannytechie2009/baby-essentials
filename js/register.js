document.addEventListener('DOMContentLoaded', () => {

    // ===========================================
    // 1. Tab Switching Logic (Login vs. Register)
    // ===========================================
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetFormId = button.getAttribute('data-form');
            
            // Remove 'active' class from all buttons and add 'active' to the clicked one
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Toggle form visibility
            if (targetFormId === 'login') {
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
            } else if (targetFormId === 'register') {
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
            }
        });
    });


    // ===========================================
    // 2. Form Submission Feedback (Placeholder)
    // ===========================================

    // --- Login Form Handler ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop default submission
            
            // In a full-stack site, this sends credentials to the server.
            alert('Login attempted! The server will validate these credentials soon.');
            // loginForm.reset(); // Don't usually reset on failed login, but useful for testing
        });
    }

    // --- Registration Form Handler ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop default submission
            
            // Client-side password match check (Simple example)
            const password = document.getElementById('reg-password').value;
            if (password.length < 6) {
                alert('Password must be at least 6 characters.');
                document.getElementById('reg-password').focus();
                return;
            }

            // In a full-stack site, this data is sent to the database.
            alert('Registration received! Thank you for your interest in wholesale. Your account status will be confirmed via email.');
            registerForm.reset();
            
            // Optionally switch back to login tab
            document.querySelector('.tab-button[data-form="login"]').click();
        });
    }
});