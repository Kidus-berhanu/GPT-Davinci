document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    var prompt = document.getElementById('prompt').value;

    fetch('/.netlify/functions/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = data.generated_text;
    });
});
