/* main.js
   Shared cart + header logic for all pages.
   Cart stored in localStorage as 'km_cart' : {items: [{id,title,price,qty}], updatedAt}
*/

const WA_NUMBER = '2348077774929'; // WhatsApp number used for checkout
const CART_KEY = 'km_cart_v1';

// Utility to load/save cart
function loadCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  }catch(e){ return { items: [] }; }
}
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCounters(); }

// Update cart counters in header (works across the header copies)
function updateCartCounters(){
  const cart = loadCart();
  const count = cart.items.reduce((s,i)=>s+i.qty,0);
  const els = document.querySelectorAll('#cart-count, #cart-count-2, #cart-count-3, #cart-count-4');
  els.forEach(e => { if(e) e.textContent = count; });
}

// Add a product by id (the shop page defines PRODUCTS)
function addProductToCart(productId){
  // If product data exists in global PRODUCTS (on shop page) use that, otherwise push a minimal entry
  let cart = loadCart();
  let item = cart.items.find(i=>i.id===productId);
  if(item){
    item.qty += 1;
  } else {
    // try to find product metadata
    const sourceList = typeof PRODUCTS !== 'undefined' ? PRODUCTS : (typeof window.PRODUCTS !== 'undefined' ? window.PRODUCTS : []);
    const prod = sourceList.find(p => p.id === productId);
    const entry = prod ? { id: prod.id, title: prod.title, price: Number(prod.price)||0, qty: 1 } : { id: productId, title: productId, price: 0, qty: 1 };
    cart.items.push(entry);
  }
  saveCart(cart);
  alert('Added to cart');
}

// Clear cart
function clearCart(){
  localStorage.removeItem(CART_KEY);
  updateCartCounters();
  alert('Cart cleared');
}

// Build WhatsApp checkout message and open chat
function whatsappCheckout(){
  const cart = loadCart();
  if(!cart.items.length){
    alert('Your cart is empty — add some items first.');
    return;
  }
  // Build message
  let lines = [];
  lines.push('Hello Kids & Momma Essentials, I would like to place an order:');
  let total = 0;
  cart.items.forEach(it => {
    const line = `• ${it.title} x ${it.qty} — ₦${(it.price * it.qty).toLocaleString()}`;
    lines.push(line);
    total += (it.price * it.qty);
  });
  lines.push('');
  lines.push(`Total: ₦${total.toLocaleString()}`);
  lines.push('');
  lines.push('Name: ');
  lines.push('Phone: ');
  lines.push('Pickup / Delivery (Lagos / Nationwide): ');
  const message = encodeURIComponent(lines.join('\n'));
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${message}`;
  window.open(waUrl, '_blank');
}
// === Mobile nav toggle ===
document.addEventListener('DOMContentLoaded', () => {
    
    // Get the elements
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const siteHeader = document.querySelector('.site-header');

    // 1. Mobile Navigation Toggle & Icon Change
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            // NOTE: We are using 'active' class, which matches the CSS provided earlier
            mainNav.classList.toggle('active'); 
            
            // Update the icon (☰ / ✕)
            const isExpanded = mainNav.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            navToggle.textContent = isExpanded ? '✕' : '☰'; 
        });
    }

    // 2. Sticky Header Logic (Adds 'scrolled' class)
    if (siteHeader) {
        const handleScroll = () => {
            // Check if the user has scrolled more than 100 pixels
            if (window.scrollY > 100) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run once on load
    }
    
    // 3. Cart Button Placeholder
    const cartButton = document.querySelector('.cart-btn');

    if (cartButton) {
        cartButton.addEventListener('click', () => {
            // Placeholder for future cart sidebar/modal functionality
            alert('Your cart functionality will be built here later!');
        });
    }
});

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCounters();

  // wire header cart button to show minimal cart summary
  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = loadCart();
      if(!cart.items.length){ alert('Cart is empty'); return; }
      const summaryLines = cart.items.map(i => `${i.title} x ${i.qty} — ₦${(i.price*i.qty).toLocaleString()}`);
      summaryLines.push('');
      const total = cart.items.reduce((s,i)=>s+i.price*i.qty,0);
      summaryLines.push(`Total: ₦${total.toLocaleString()}`);
      summaryLines.push('');
      summaryLines.push('OK to open WhatsApp for checkout? Click OK');
      if(confirm(summaryLines.join('\n'))){
        whatsappCheckout();
      }
    });
  });
});
