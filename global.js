// ------------------------------
// LOAD HTML COMPONENTS
// ------------------------------
async function loadComponents(root = document) {
  const zones = root.querySelectorAll("[data-import]");

  for (const zone of zones) {
    const filePath = zone.getAttribute("data-import");
    if (!filePath) continue;

    try {
      const html = await fetch(filePath).then(r => r.text());
      zone.innerHTML = html;

      // Recursively load nested components
      await loadComponents(zone);
    } catch (err) {
      zone.innerHTML = "<p>Error loading component...</p>";
      console.error(err);
    }
  }
}

// ------------------------------
// PAGE SWITCHING (Sidebar Navigation)
// ------------------------------
document.addEventListener("click", async (e) => {
  const link = e.target.closest("[data-page]");
  if (!link) return;

  e.preventDefault();

  const page = link.dataset.page;
  const filePath = `/templates/${page}/${page}.html`;
  const main = document.querySelector("#main-content");

  if (!main) {
    console.warn("No #main-content found on this page.");
    return;
  }

  try {
    const html = await fetch(filePath).then(r => r.text());
    main.innerHTML = html;

    // Load nested components inside the new page
    await loadComponents(main);

    // Highlight active sidebar item
    document.querySelectorAll(".sidebar-menu li").forEach(li =>
      li.classList.remove("active")
    );
    link.classList.add("active");
  } catch (err) {
    main.innerHTML = "<p>Error loading page...</p>";
    console.error(err);
  }
});

// ------------------------------
// INIT
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
});
