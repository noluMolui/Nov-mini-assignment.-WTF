const menuItems = document.querySelectorAll('.menu-item');
const mainContent = document.getElementById('main-content');

menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();

    // Highlight active link
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Load the page
    const pagePath = item.getAttribute('data-page');
    fetch(pagePath)
      .then(res => res.text())
      .then(html => {
        mainContent.innerHTML = html;
      })
      .catch(err => console.error('Error loading page:', err));
  });
});

// Load dashboard by default
window.addEventListener('DOMContentLoaded', () => {
  fetch('/templates/dashboard/dashboard.html')
    .then(res => res.text())
    .then(html => {
      mainContent.innerHTML = html;
    });
});
