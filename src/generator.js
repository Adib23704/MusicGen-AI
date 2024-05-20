import dotenvFlow from 'dotenv-flow';
import fetch from 'node-fetch';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

dotenvFlow.config();

async function generate(text) {
	const data = {
		inputs: text,
		options: {
			wait_for_model: true,
			use_cache: true,
		},
	};
	const response = await fetch(
		'https://api-inference.huggingface.co/models/facebook/musicgen-small',
		{
			headers: {
				Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
			},
			method: 'POST',
			body: JSON.stringify(data),
		},
	);

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Error: ${response.status} - ${error}`);
	}

	const timestamp = Date.now();

	const buffer = await response.arrayBuffer();
	const outputPath = `./public/exported/${timestamp}.flac`;
	fs.writeFileSync(outputPath, Buffer.from(buffer));

	const wavPath = `./public/exported/${timestamp}.wav`;
	await new Promise((resolve, reject) => {
		ffmpeg(outputPath)
			.toFormat('wav')
			.on('end', () => {
				console.log(`Music file saved to ${wavPath}`);
				fs.rmSync(outputPath);
				resolve(timestamp);
			})
			.on('error', (err) => {
				console.error('Error during conversion:', err);
				reject(err);
			})
			.save(wavPath);
	});

	return timestamp;
}

export default generate;
