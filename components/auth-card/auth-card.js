
document.addEventListener("DOMContentLoaded", () => {

     document.addEventListener("click", async (event) => {

        const tab = event.target.closest(".tab");

        if (!tab) return;
 
        const tabType = tab.dataset.tab;
        document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));

       
        tab.classList.add("active");

      
        const formArea = document.querySelector(".form-area");

        
        const filePath = tabType === "login"
            ? "/templates/login-form/login.html"
            : "/templates/signup-form/signup.html";

        try {
           
            const response = await fetch(filePath);

       
            if (!response.ok) throw new Error("HTTP error " + response.status);

            
            const formHTML = await response.text();

            
            formArea.innerHTML = formHTML;

        } catch (error) {
          
            console.error("Failed to load form:", error);
            formArea.innerHTML = "<p>Sorry, the form could not be loaded. Please try again.</p>";
        }

        if (typeof loadComponents === "function") {
            loadComponents(formArea);
        }
    });

});


