const { OpenAI } = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

exports.handler = async function(event, context) {
    try {
        const data = JSON.parse(event.body);
        const prompt = data.prompt;

        const response = await openai.Completions.create({
            engine: 'text-davinci-003',
            prompt: prompt,
            temperature: 0.9,
            max_tokens: 100
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                generated_text: response.data.choices[0].text.strip()
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            })
        };
    }
};
