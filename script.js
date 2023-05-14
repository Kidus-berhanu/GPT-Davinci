function generateText() {
  const promptInput = document.getElementById('prompt').value;
  fetch('/.netlify/functions/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: promptInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('API Response:', data); // Log the API response
      document.getElementById('result').textContent = data.generated_text;
    })
    .catch((error) => {
      console.error('Error:', error); // Log any errors
    });
}

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    generateText();
});
