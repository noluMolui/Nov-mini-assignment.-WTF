const menuItems = document.querySelectorAll('.menu-item');
const mainContent = document.getElementById('main-content');

menuItems.forEach(item => {
  item.addEventListener('click', async (e) => {
    e.preventDefault();

    // Highlight active link
    menuItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Build correct file path
    const pageName = item.getAttribute('data-page'); // e.g. "community"
    const pagePath = `/templates/${pageName}/${pageName}.html`;

    try {
      const res = await fetch(pagePath);
      if (!res.ok) throw new Error(`Failed to load ${pagePath}`);
      const html = await res.text();
      mainContent.innerHTML = html;
    } catch (err) {
      console.error('Error loading page:', err);
      mainContent.innerHTML = `<p>Error loading ${pageName} page.</p>`;
    }
  });
});

// Load dashboard by default
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/templates/dashboard/dashboard.html');
    const html = await res.text();
    mainContent.innerHTML = html;
  } catch (err) {
    console.error('Error loading dashboard:', err);
    mainContent.innerHTML = "<p>Error loading dashboard...</p>";
  }
});
