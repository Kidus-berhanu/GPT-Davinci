const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.handler = async function(event, context) {
  const data = JSON.parse(event.body);
  const prompt = data.prompt;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 500
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        generated_text: response.data.choices[0].text.trim()
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
