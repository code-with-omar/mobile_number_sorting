function processFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (!file) {
      alert("Please upload a file.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const fileContent = event.target.result;
      const cleanedNumbers = cleanNumbers(fileContent);
      displayCleanedNumbers(cleanedNumbers);
      downloadCleanList(cleanedNumbers);
    };
    
    if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    } else {
      // Add support for XLS/XLSX file reading if needed
      alert("Currently, only CSV is supported.");
    }
  }
  
  function cleanNumbers(data) {
    const unsubscribeList = ['+46712345678']; // Example unsubscribe numbers
    const mobileNumberRegex = /(\+467|07|7|467)(\d{8})/g;
    
    let matches = [...data.matchAll(mobileNumberRegex)].map(match => `+467${match[2]}`);
    
    // Remove duplicates
    matches = [...new Set(matches)];
    
    // Filter out numbers from the unsubscribe list
    matches = matches.filter(number => !unsubscribeList.includes(number));
    
    return matches;
  }
  
  function displayCleanedNumbers(numbers) {
    const output = document.getElementById('output');
    output.innerHTML = "<h2>Cleaned Mobile Numbers:</h2><ul>" + numbers.map(number => `<li>${number}</li>`).join('') + "</ul>";
  }
  
  function downloadCleanList(numbers) {
    const downloadLink = document.getElementById('downloadLink');
    const blob = new Blob([numbers.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    
    downloadLink.href = url;
    downloadLink.download = "cleaned_numbers.csv";
    downloadLink.style.display = 'block';
  }
  