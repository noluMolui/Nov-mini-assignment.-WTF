document.addEventListener("click", (e) => {
    const item = e.target.closest("[data-page]");
    if (!item) return;

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


