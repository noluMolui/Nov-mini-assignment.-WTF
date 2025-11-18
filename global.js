async function loadComponents(root = document) {
    const zones = root.querySelectorAll("[data-import]");

    for (const zone of zones) {
        const file = zone.getAttribute("data-import");

        const html = await fetch(file).then(r => r.text());
        zone.innerHTML = html;

        
        await loadComponents(zone);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponents();
});

