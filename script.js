document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', () => {
            // Check if current item is active
            const isActive = item.classList.contains('active');
            
            // Close all other items (optional: remove this loop if you want multiple items open at once)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-icon').textContent = '+';
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.faq-icon').textContent = '-';
            }
        });
    });


    // Smart Auto-Hide Header
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY || document.documentElement.scrollTop;

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY || document.documentElement.scrollTop;
            
            // Prevent showing/hiding when bouncing at the very top
            if (currentScrollY <= 0) {
                header.classList.remove('header-hidden');
                lastScrollY = currentScrollY;
                return;
            }

            // Add a small threshold to prevent jitter from tiny scrolls
            if (Math.abs(currentScrollY - lastScrollY) < 5) {
                return;
            }
            
            // Determine scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > header.offsetHeight) {
                // Scrolling down & past header height
                header.classList.add('header-hidden');
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                header.classList.remove('header-hidden');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }
});
