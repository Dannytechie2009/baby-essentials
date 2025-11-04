document.addEventListener('DOMContentLoaded', () => {
    
    // ===========================================
    // 1. Mobile Filter Toggle Logic (Sidebar)
    // ===========================================

    const filterToggleBtn = document.querySelector('.filter-toggle');
    const filterSidebar = document.getElementById('filter-sidebar');
    
    if (filterToggleBtn && filterSidebar) {
        // Initially, the sidebar is visible on desktop and hidden by CSS on mobile.
        // The mobile-only toggle button makes it visible/hidden on mobile.
        
        filterToggleBtn.addEventListener('click', () => {
            filterSidebar.classList.toggle('active');
            
            // Update button text
            if (filterSidebar.classList.contains('active')) {
                filterToggleBtn.textContent = 'Hide Filters';
            } else {
                filterToggleBtn.textContent = 'Show Filters';
            }
        });
    }


    // ===========================================
    // 2. Client-Side Product Filtering (Core Logic)
    // ===========================================
    
    const productsGrid = document.getElementById('products-grid');
    const filterGroups = document.querySelectorAll('.filter-group input[type="checkbox"], .sort-dropdown');
    
    // Function to handle filtering and sorting
    const updateProducts = () => {
        const productCards = Array.from(productsGrid.querySelectorAll('.product-card'));
        const activeFilters = {
            category: [],
            material: []
        };
        
        // 1. Collect Active Filters
        document.querySelectorAll('.filter-group input[type="checkbox"]:checked').forEach(checkbox => {
            const filterType = checkbox.name; // 'category' or 'material'
            const filterValue = checkbox.value;
            activeFilters[filterType].push(filterValue);
        });

        // 2. Filter Products
        productCards.forEach(card => {
            let isVisible = true;
            
            // Check Category Filter
            const cardCategory = card.getAttribute('data-category');
            if (activeFilters.category.length > 0 && !activeFilters.category.includes(cardCategory)) {
                isVisible = false;
            }

            // Check Material Filter
            const cardMaterial = card.getAttribute('data-material');
            if (isVisible && activeFilters.material.length > 0 && !activeFilters.material.includes(cardMaterial)) {
                isVisible = false;
            }

            // Apply visibility
            card.style.display = isVisible ? 'block' : 'none';
        });

        // 3. Sorting (Simple Front-End Sort)
        const sortValue = document.querySelector('.sort-dropdown').value;
        if (sortValue !== 'default') {
            
            productCards.sort((a, b) => {
                // Get Price (Assuming price text is like '₦5,500')
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('₦', '').replace(',', ''));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('₦', '').replace(',', ''));
                
                if (sortValue === 'price-asc') {
                    return priceA - priceB;
                } else if (sortValue === 'price-desc') {
                    return priceB - priceA;
                }
                // 'newest' sort would require a 'data-date' attribute on the card
                return 0; 
            });

            // Re-append sorted elements to the DOM
            productCards.forEach(card => productsGrid.appendChild(card));
        }
        
        // Note: For a real e-commerce site, filtering/sorting would be handled 
        // by the server (back-end) to manage large datasets efficiently.
    };

    // Attach event listeners to all filter and sort controls
    filterGroups.forEach(control => {
        control.addEventListener('change', updateProducts);
    });

    // Run the filter once on load to ensure proper setup
    // updateProducts(); 


    // ===========================================
    // 3. Quick View Button Handler
    // ===========================================
    
    // We only attach listeners to quick view buttons that exist in the DOM initially
    const quickViewButtons = productsGrid.querySelectorAll('.quick-view-btn');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            const productName = card.querySelector('.product-name').textContent;

            // In a full implementation, you'd show a modal here and populate it
            alert(`Quick View activated for: ${productName}. Modal functionality goes here!`);
        });
    });
});