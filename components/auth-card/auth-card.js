// auth-card.js
// This script handles switching between Login and Sign Up forms

// Wait until the HTML content is fully loadeddocu
document.addEventListener("DOMContentLoaded", () => {

    // Step 1: Listen for any click on the page
    document.addEventListener("click", async (event) => {

        // Step 2: Find if the clicked element is a tab button
        // 'closest' ensures that even if you click a child element inside the button, it still works
        const tab = event.target.closest(".tab");

        // If the click wasn't on a tab, do nothing
        if (!tab) return;

        // Step 3: Determine which tab was clicked
        // 'data-tab' is either "login" or "signup"
        const tabType = tab.dataset.tab;

        // Step 4: Update the active tab UI
        // Remove "active" class from all tabs
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

        // Add "active" class to the clicked tab
        tab.classList.add("active");

        // Step 5: Find the area where the form should appear
        const formArea = document.querySelector(".form-area");

        // Step 6: Decide which HTML file to load
        const filePath = tabType === "login"
            ? "/templates/login-form/login.html"
            : "/templates/signup-form/signup.html";

        try {
            // Step 7: Fetch the HTML content of the selected form
            const response = await fetch(filePath);

            // If the file doesn't exist or there is an error, throw an error
            if (!response.ok) throw new Error("HTTP error " + response.status);

            // Step 8: Get the HTML as text
            const formHTML = await response.text();

            // Step 9: Insert the HTML into the form area
            formArea.innerHTML = formHTML;

        } catch (error) {
            // Step 10: If something goes wrong, show an error message in the form area
            console.error("Failed to load form:", error);
            formArea.innerHTML = "<p>Sorry, the form could not be loaded. Please try again.</p>";
        }

        // Step 11: Load any nested components inside the form (if you use data-import)
        if (typeof loadComponents === "function") {
            loadComponents(formArea);
        }
    });

});


