document.addEventListener("DOMContentLoaded", () => {
    const eventsList = document.getElementById("events-list");
    const categoryFilter = document.getElementById("category");

    function fetchEvents() {
        fetch("http://127.0.0.1:8000/events")
            .then(response => response.json())
            .then(events => {
                displayEvents(events);
            })
            .catch(error => console.error("Error fetching events:", error));
    }

    function displayEvents(events) {
        eventsList.innerHTML = "";
        events.forEach(event => {
            const li = document.createElement("li");
            
            // Display year prominently
            li.innerHTML = `<span class="year">${event.year}</span> - ${event.event} <span class="category">[${event.category}]</span>`;
    
            // Create tooltip for sources
            const sourceDiv = document.createElement("div");
            sourceDiv.classList.add("source-tooltip");
            //sourceDiv.textContent = event.source || "No Source not available"; // Handle missing sources
            if (event.sources && event.sources.length > 0) {
                sourceDiv.innerHTML = event.sources
                    .map(source => `<a href="${source.url}" target="_blank">${source.text}</a>`)
                    .join("<br>"); // Line break between links
            } else {
                sourceDiv.textContent = "Source not available"; // Handle missing sources
            }
            li.appendChild(sourceDiv);
            eventsList.appendChild(li);
        });
    }    

    categoryFilter.addEventListener("change", () => {
        fetch("http://127.0.0.1:8000/events")
            .then(response => response.json())
            .then(events => {
                const selectedCategory = categoryFilter.value;
                const filteredEvents = selectedCategory === "all"
                    ? events
                    : events.filter(event => event.category === selectedCategory);
                displayEvents(filteredEvents);
            })
            .catch(error => console.error("Error filtering events:", error));
    });

    fetchEvents();
});
