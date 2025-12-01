document.addEventListener("click", e => {
    const item = e.target.closest("[data-page]");
    if (!item) return;

    const page = item.dataset.page;

    const content = document.querySelector(".main-content");

    const file = `/templates/${page}/${page}.html`;

    content.setAttribute("data-import", file);
    loadComponents(content);
});
