document.addEventListener('DOMContentLoaded', () => {

    // ===========================================
    // 1. FAQ Accordion Logic
    // ===========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            // Toggle the 'aria-expanded' state
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', !isExpanded);

            // Use the CSS max-height transition to animate the answer
            if (!isExpanded) {
                // Open the answer: set max-height to its scrollHeight (actual content height)
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                // Close the answer: set max-height back to 0
                answer.style.maxHeight = '0';
            }
        });
    });


    // ===========================================
    // 2. Contact Form Validation (Client-Side)
    // ===========================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop the default submission (for now)

            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;

            // Simple Email Validation Check
            if (!emailInput.value.includes('@') || emailInput.value.length < 5) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                isValid = false;
            } 
            
            // Minimum message length check
            else if (messageInput.value.length < 10) {
                 alert('Your message should be at least 10 characters long.');
                 messageInput.focus();
                 isValid = false;
            }

            if (isValid) {
                // 🚀 This is where the back-end will take over later! 🚀
                // For now, give the user a success message and clear the form.
                alert('Thank you for your message! We have received your inquiry and will respond within 24 hours.');
                
                // Reset the form after successful "submission"
                contactForm.reset(); 
            }
        });
    }
});