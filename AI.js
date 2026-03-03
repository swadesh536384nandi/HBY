async function fetchGeminiWish(retries = 3, delay = 2000) {
			const outputElement = document.getElementById('ai-wish-output');
			
			const API_KEY = "AIzaSyAQUYHsXrByYqiWjaB3SnJsgIm3iMdP88M"; 
			const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

			try {
				const response = await fetch(URL, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						contents: [{ parts: [{ text: "Write a 5 to 8-sentence, sweet birthday wish for Ipsita Roy." }] }]
					})
				});

				// HANDLE 429 (Rate Limit) or 503 (Server Busy)
				if ((response.status === 429 || response.status === 503) && retries > 0) {
					console.warn(`Rate limited (Status ${response.status}). Retrying in ${delay}ms...`);
					
					// Wait for the specified delay
					await new Promise(res => setTimeout(res, delay));
					
					// Retry with fewer remaining retries and double the wait time (Exponential Backoff)
					return fetchGeminiWish(retries - 1, delay * 2);
				}

				if (!response.ok) throw new Error(`HTTP ${response.status}`);

				const data = await response.json();
				outputElement.innerText = data.candidates[0].content.parts[0].text;				

			} catch (error) {
				console.error("Fetch Error:", error);
				// Fallback wish so Ipsita doesn't see an error screen
				outputElement.innerText = "Happy Birthday, Ipsita! May your year be filled with success, joy, and laughter! 🎂";
			}
		}
		
		// Initial call
		window.addEventListener('DOMContentLoaded', () => fetchGeminiWish());