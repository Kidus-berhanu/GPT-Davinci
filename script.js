// Function to generate text
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
      document.getElementById('word-count').textContent = "Word count: " + data.generated_text.split(' ').length;
    })
    .catch((error) => {
      console.error('Error:', error); // Log any errors
    });
}

// Event listener for the form submission
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    generateText();
});

// Function to switch theme
document.getElementById('theme-switch').addEventListener('click', function() {
    let root = document.documentElement;
    let bgColor = getComputedStyle(root).getPropertyValue('--bg-color');
    let textColor = getComputedStyle(root).getPropertyValue('--text-color');
    root.style.setProperty('--bg-color', textColor);
    root.style.setProperty('--text-color', bgColor);
});

// Function to change font size
document.getElementById('font-size').addEventListener('click', function() {
    let prompt = document.getElementById('prompt');
    let result = document.getElementById('result');
    let currentFontSize = parseFloat(window.getComputedStyle(prompt, null).getPropertyValue('font-size'));
    let newFontSize = currentFontSize + 1;
    if (newFontSize > 30) newFontSize = 16;
    prompt.style.fontSize = newFontSize + 'px';
    result.style.fontSize = newFontSize + 'px';
});
