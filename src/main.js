import prompts from 'prompts';
import { generate } from './generator.js';

(async () => {
	const response = await prompts({
		type: 'text',
		name: 'query',
		message: 'Music Generation Prompt'
	});

	if (!response.query) {
		console.log('No query provided');
		return;
	}

	generate(response.query)
		.then(() => {
			return;
		})
		.catch((error) => {
			console.error('Error during query:', error);
		});
})();

