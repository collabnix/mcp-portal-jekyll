document.addEventListener('DOMContentLoaded', function() {
  // Toggle search form
  const searchToggle = document.querySelector('.search-toggle');
  const searchFormContainer = document.querySelector('.search-form-container');
  
  if (searchToggle && searchFormContainer) {
    searchToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      searchFormContainer.style.display = expanded ? 'none' : 'block';
    });
  }
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryMenuContainer = document.querySelector('.primary-menu-container');
  
  if (menuToggle && primaryMenuContainer) {
    menuToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      primaryMenuContainer.style.display = expanded ? 'none' : 'block';
    });
  }
  
  // Submenu toggle for mobile
  const menuItemsWithChildren = document.querySelectorAll('.menu-item-has-children > a');
  
  if (window.innerWidth <= 768) {
    menuItemsWithChildren.forEach(function(item) {
      item.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = this.parentNode;
          const expanded = parent.getAttribute('aria-expanded') === 'true' || false;
          parent.setAttribute('aria-expanded', !expanded);
          const subMenu = parent.querySelector('.sub-menu');
          if (subMenu) {
            subMenu.style.display = expanded ? 'none' : 'block';
          }
        }
      });
    });
  }
  
  // Add smooth scrolling to anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add active class to current page link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.primary-menu a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath.includes('/posts/') && link.getAttribute('href').includes('/posts/'))) {
      link.classList.add('active');
      
      // If in submenu, also mark parent as active
      const parent = link.closest('.menu-item-has-children');
      if (parent) {
        const parentLink = parent.querySelector('> a');
        if (parentLink) {
          parentLink.classList.add('active');
        }
      }
    }
  });
  
  // Responsive tables
  const tables = document.querySelectorAll('.post-content table');
  tables.forEach(table => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-responsive';
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
  
  // Image lightbox
  const contentImages = document.querySelectorAll('.post-content img:not(.no-lightbox)');
  contentImages.forEach(img => {
    if (!img.closest('a')) {
      const figure = document.createElement('figure');
      figure.className = 'post-image';
      
      const link = document.createElement('a');
      link.href = img.src;
      link.className = 'image-lightbox';
      link.setAttribute('data-lightbox', 'content-images');
      link.setAttribute('data-title', img.alt || '');
      
      img.parentNode.insertBefore(figure, img);
      figure.appendChild(link);
      link.appendChild(img.cloneNode(true));
      img.remove();
    }
  });
});