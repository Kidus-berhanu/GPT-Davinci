const openai = require('openai');

openai.apiKey = process.env.OPENAI_API_KEY;

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body);
    const prompt = data.prompt;

    const response = await openai.createCompletion({
        engine: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 100
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            generated_text: response.choices[0].text.strip()
        })
    };
};
