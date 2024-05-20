/* eslint-disable no-alert */
document.getElementById('genButton').addEventListener('click', async (event) => {
	event.preventDefault();

	const userText = document.getElementById('userText').value;
	const loading = document.getElementById('loading');
	const audioPlayer = document.getElementById('audioPlayer');

	if (userText === '') {
		alert('Please enter some text.');
		return;
	}
	if (!/^[a-zA-Z0-9\s]+$/.test(userText)) {
		alert('Please only use letters and numbers.');
		return;
	}

	audioPlayer.pause();
	audioPlayer.style.display = 'none';
	loading.style.display = 'block';

	const response = await fetch('/generate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ text: userText }),
	});

	loading.style.display = 'none';

	if (response.ok) {
		const data = await response.json();
		const audioPath = data.path;

		audioPlayer.src = audioPath;
		audioPlayer.style.display = 'block';
		audioPlayer.play();
	} else {
		console.error('Failed to generate music');
	}
});

document.getElementById('exButton').addEventListener('click', () => {
	const exampleText = 'A funky and catchy beat for gaming youtube video intro';
	document.getElementById('userText').value = exampleText;
});
