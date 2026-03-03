 document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        document.addEventListener('keydown', function(e) {
            // Disable Ctrl+C and Ctrl+U
            if ((e.ctrlKey && (e.key === 'c' || e.key === 'u'))||(e.Key ==='Prt sc') || e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") ||(e.ctrlKey && e.key === "U")){
                e.preventDefault();
            }
        });
		const express = require('express');
		const app = express();

		app.get('/set-cookie', (req, res) => {
		res.cookie('sessionId', 'your-session-id', {
        httpOnly: true, // Prevents JavaScript access
        secure: true,   // Ensures the cookie is sent only over HTTPS
        sameSite: 'Strict' // Controls cross-origin requests
		});
		res.send('Secure cookie set!');
		});

		app.listen(3000, () => {
		console.log('Server is running on https://localhost:3000');
		});