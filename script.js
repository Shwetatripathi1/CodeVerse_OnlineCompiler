(function testAPI() {
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });
  xhr.open('GET', 'https://judge0-ce.p.rapidapi.com/about');
  xhr.setRequestHeader('x-rapidapi-key', '4dd85c05a7msh2a72bfa71cf7eb9p183befjsn04053011af3e');
  xhr.setRequestHeader('x-rapidapi-host', 'judge0-ce.p.rapidapi.com');
  xhr.send(data);
})();

async function runCode() {
  const code       = document.getElementById("code").value;
  const languageId = parseInt(document.getElementById("language").value, 10);
  const outputArea = document.getElementById("output");

  outputArea.textContent = "⏳ Running... please wait.";

  try {
    const res = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type":        "application/json",
          "x-rapidapi-host":     "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":      "4dd85c05a7msh2a72bfa71cf7eb9p183befjsn04053011af3e"
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId
        })
      }
    );

    const result = await res.json();

    if (result.stdout) {
      outputArea.textContent = result.stdout;
    } else if (result.stderr) {
      outputArea.textContent = "❌ Runtime Error:\n" + result.stderr;
    } else if (result.compile_output) {
      outputArea.textContent = "⚠ Compilation Error:\n" + result.compile_output;
    } else {
      outputArea.textContent = "⚠ Unexpected response:\n" + JSON.stringify(result, null, 2);
    }
  } catch (err) {
    outputArea.textContent = "⚠ Network or parsing error:\n" + err;
  }
}
document.getElementById("run-btn").addEventListener("click", runCode);
