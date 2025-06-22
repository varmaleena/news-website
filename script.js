const API_KEY = "f834b0d41a61464bbf4002139d68d1d5";
const BACKEND_URL = "http://localhost:3000/news";

// Load news on page load
document.addEventListener("DOMContentLoaded", () => fetchNews("India"));

async function fetchNews(query) {
    try {
        const res = await fetch(`${BACKEND_URL}?q=${query}`);
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.querySelector(".cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    if (!newsCardTemplate) {
        console.error("Template element with ID 'template-news-card' not found.");
        return;
    }

    cardsContainer.innerHTML = ""; 

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-course");
    const newsDesc = cardClone.querySelector("#news-desc");

    if (!newsImg || !newsTitle || !newsSource || !newsDesc) {
        console.error("One or more elements are missing in the template.");
        return;
    }

    newsImg.src = article.urlToImage || "https://placehold.co/400x200"; 
    newsTitle.innerHTML = article.title || "No Title Available";
    newsDesc.innerHTML = article.description || "Description not provided.";

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source?.name || "Unknown Source"} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// Search functionality
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".news-input");

searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) return;
    fetchNews(query);
});

// Allow search with Enter key
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});