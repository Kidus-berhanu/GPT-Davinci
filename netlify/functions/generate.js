const openai = require('openai');



const api = new openai.OpenAi(process.env.OPENAI_API_KEY);

exports.handler = async function(event, context) {
    const data = JSON.parse(event.body);
    const prompt = data.prompt;

    const response = await api.Completion.create({
        engine: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 3000
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            generated_text: response.choices[0].text.strip()
        })
    };
};
