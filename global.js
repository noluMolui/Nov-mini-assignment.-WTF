document.addEventListener("click", (e) => {
    const item = e.target.closest("[data-page]");
    if (!item) return;
// ------------------------------
// LOAD HTML COMPONENTS
// ------------------------------
async function loadComponents(root = document) {
    const zones = root.querySelectorAll("[data-import]");

    const page = item.dataset.page;

    // Build file path: /templates/{page}/{page}.html
    const filePath = `/templates/${page}/${page}.html`;

    // Find main content area
    const mainContent = document.querySelector(".main-content");

    // Update the data-import attribute
    mainContent.setAttribute("data-import", filePath);

    // Reload the component
    loadComponents(mainContent);

    // Optional: highlight active sidebar item
    document
        .querySelectorAll(".sidebar-menu li")
        .forEach(li => li.classList.remove("active"));

    item.classList.add("active");
});


        // Load nested components
        await loadComponents(zone);
    }
}

// ------------------------------
// PAGE SWITCHING (Sidebar Navigation)
// ------------------------------
document.addEventListener("click", async (e) => {
    const link = e.target.closest("[data-page]");
    if (!link) return;

    e.preventDefault();

    const pageFile = link.getAttribute("data-page");
    const main = document.querySelector("#main-content");

    if (!main) {
        console.warn("No #main-content found on this page.");
        return;
    }

    try {
        const html = await fetch(pageFile).then(r => r.text());
        main.innerHTML = html;

        // Load nested HTML inside the new page
        loadComponents(main);
    } 
    catch (err) {
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
