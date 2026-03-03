function updateDateTime() {
			const now = new Date();
			const options = { 
				year: 'numeric', 
				month: 'long', //long
				day: 'numeric', 
				hour: '2-digit', 
				minute: '2-digit', 
				second: '2-digit',
				hour24:  true
			};
			document.getElementById('dateTime').innerText = now.toLocaleString('en-US', options);
		}

		// Update the date and time immediately
		updateDateTime();

		// Update the date and time every second
		setInterval(updateDateTime, 1000);