import express from 'express';
import dotenvFlow from 'dotenv-flow';
import bodyParser from 'body-parser';
import generate from './generator.js';

dotenvFlow.config();

const app = express();
const port = process.env.PORT;
const jsonParser = bodyParser.json({
	limit: 1024 * 1024 * 1024,
	type: 'application/json',
});

app.use(express.static('./public'));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(jsonParser);
app.get('/', (_req, res) => {
	res.render('index');
});

app.post('/generate', async (req, res) => {
	try {
		const { text } = req.body;
		if (!text) {
			throw new Error('No text provided');
		}
		console.log(`Generating music: ${text}\n`);

		try {
			const timestamp = await generate(text);
			res.status(200).json({
				success: true,
				path: `/exported/${timestamp}.wav`,
			});
		} catch (error) {
			throw new Error(error);
		}
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}

	return true;
});

async function main() {
	app.listen(port, () => {
		console.log(`Server Running on port http://localhost:${port}`);
	});
}

main();
