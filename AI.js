async function fetchGeminiWish(retries = 4, delay = 3500) {
    const outputElement = document.getElementById('ai-wish-output');
    
    // API Credentials and Endpoint Setup
    const API_KEY = "AIzaSyAQUYHsXrByYqiWjaB3SnJsgIm3iMdP88M"; 
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Write a 5 to 8-sentence, sweet birthday wish for Shreya Kundu." }] }]
            })
        });

        // HANDLE 429 (Rate Limit) or 503 (Server Busy)
        if ((response.status === 429 || response.status === 503) && retries > 0) {
            console.warn(`Rate limited (Status ${response.status}). Retrying in ${delay}ms... Remaining retries: ${retries}`);
            
            // Wait for the specified delay duration
            await new Promise(res => setTimeout(res, delay));
            
            // Return the recursive call so it correctly waits for the retry to finish
            return await fetchGeminiWish(retries - 1, delay * 2);
        }

        // If it throws any other error status (like 400 or 403), head straight to fallback
        if (!response.ok) throw new Error(`HTTP status ${response.status}`);

        const data = await response.json();
        
        // Ensure the API returned a valid data structure before updating DOM
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            outputElement.innerText = data.candidates[0].content.parts[0].text;				
        } else {
            throw new Error("Invalid API Data Structure");
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        
        // Curated list of 5 sweet birthday wishes for Shreya Kundu if the server fails
        const fallbackWishes = [
            "Happy Birthday, Shreya Kundu! May your day be as bright and beautiful as your smile, and may this year bring you closer to all your biggest dreams. Wishing you endless laughter, peace, and unforgettable memories today! 🎂✨",
            
            "Wishing a truly magnificent birthday to the wonderful Shreya Kundu! May your path ahead be illuminated with joy, success, and good health. Drink in every moment of your special day, because you deserve the world! 💐🎉",
            
            "Happy Birthday, Shreya Kundu! You bring so much light and warmth into the lives of everyone around you. May this milestone year be packed with incredible adventures, deep happiness, and pure love. Cheers to celebrating beautiful you! 🎈🌸",
            
            "Sending the warmest birthday blessings to Shreya Kundu today! May all your heart's desires blossom into reality, and may your days remain full of love and laughter. Have an absolutely magical celebration surrounded by those who cherish you! 🌟🎂",
            
            "Happy Birthday, Shreya Kundu! Here’s to celebrating the wonderful person you are and the bright future ahead of you. May your year be painted with vibrant colors of success, peace, and endless joy! 🌸🎉"
        ];

        // Randomly selects one of the 5 items from the list so it feels fresh every time
        const randomIndex = Math.floor(Math.random() * fallbackWishes.length);
        outputElement.innerText = fallbackWishes[randomIndex];
    }
}

// Initial call triggered safely once the Document Object Model finishes parsing
window.addEventListener('DOMContentLoaded', () => fetchGeminiWish());
