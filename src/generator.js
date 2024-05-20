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

	const buffer = await response.arrayBuffer();
	const outputPath = './exported/output.flac';
	fs.writeFileSync(outputPath, Buffer.from(buffer));

	const wavPath = './exported/output.wav';
	ffmpeg(outputPath)
		.toFormat('wav')
		.on('end', () => {
			console.log(`Music file saved to ${wavPath}`);
			fs.rmSync(outputPath);
		})
		.on('error', (err) => {
			console.error('Error during conversion:', err);
		})
		.save(wavPath);
}

export default generate;
