document.getElementById("search-btn").addEventListener("click", () => {
    const destination = document.getElementById("destination").value.trim();
    const apiKey = "238e65faf4bc4c5abe24fcb5bb41b266"; // Replace with your real OpenCage API key
  
    if (destination === "") {
        alert("Please enter a destination name!");
        return;
    }

    // Use the OpenCage API for geocoding
    const url = https://api.opencagedata.com/geocode/v1/json?q=${destination}&key=${apiKey};

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Destination not found");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Check the data in the console

            // Check if there are results
            if (data.results && data.results.length > 0) {
                const place = data.results[0]; // Get the first result

                // Displaying the data on the page
                document.getElementById("tourism-info").innerHTML = `
                    <h2>${place.formatted}</h2>
                    <p>Latitude: ${place.geometry.lat}</p>
                    <p>Longitude: ${place.geometry.lng}</p>
                `;
            } else {
                document.getElementById("tourism-info").innerHTML = "<p>No results found for this destination.</p>";
            }
        })
        .catch(error => {
            document.getElementById("tourism-info").innerHTML = <p>${error.message}</p>;
        });

    // Call fetchFamousPlacesPhotos after fetching the destination data
    if (destination !== "") {
        fetchFamousPlacesPhotos(destination);
    }
});

// Function to fetch photos from Pexels API
function fetchFamousPlacesPhotos(destination) {
    const pexelsApiKey = "Jj2XP53uayK1FEmD1M6m5Rgl4cMdDCMDmMwdxhFzRv0s3KgHIeGHR0E5"; // Your Pexels API key
    const pexelsUrl = https://api.pexels.com/v1/search?query=${destination}&per_page=5;

    fetch(pexelsUrl, {
        headers: {
            "Authorization": pexelsApiKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch photos");
        }
        return response.json();
    })
    .then(data => {
        let photosContainer = document.getElementById("photos-container");
        if (!photosContainer) {
            photosContainer = document.createElement("div");
            photosContainer.id = "photos-container";
            document.body.appendChild(photosContainer);
        }

        // 🛑 Clear previous photos before adding new ones
        photosContainer.innerHTML = "";

        if (data.photos && data.photos.length > 0) {
            data.photos.forEach(photo => {
                const img = document.createElement("img");
                img.src = photo.src.medium;
                img.alt = photo.alt || "Famous place photo";
                img.style.margin = "10px";
                img.style.width = "200px";
                img.style.height = "auto";
                photosContainer.appendChild(img);
            });
        } else {
            photosContainer.innerHTML = "<p>No photos found for this destination.</p>";
        }
    })
    .catch(error => {
        document.getElementById("photos-container").innerHTML = <p>${error.message}</p>;
    });
}
