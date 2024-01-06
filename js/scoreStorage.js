// scores.js

// Function to save the user's score in local storage
function saveScore(score) {
  // Check if local storage is supported by the browser
  if (typeof Storage !== 'undefined') {
    // Retrieve previous scores from local storage
    const previousScores = JSON.parse(localStorage.getItem('quizScores')) || [];

    // Add the current score to the array
    previousScores.push(score);

    // Save the updated scores array in local storage
    localStorage.setItem('quizScores', JSON.stringify(previousScores));
  } else {
    console.error('Local storage is not supported in this browser.');
  }
}

// Function to retrieve and display previous scores on the UI
function displayScores() {
  // Check if local storage is supported by the browser
  if (typeof Storage !== 'undefined') {
    // Retrieve previous scores from local storage
    const previousScores = JSON.parse(localStorage.getItem('quizScores')) || [];

    // Display scores on the UI (you can customize this part based on your UI structure)
    const scoresContainer = document.getElementById('scores-container');
    scoresContainer.innerHTML = '';

    if (previousScores.length === 0) {
      scoresContainer.innerHTML = 'No previous scores available.';
    } else {
      previousScores.forEach((score, index) => {
        const scoreElement = document.createElement('div');
        scoreElement.textContent = `Score ${index + 1}: ${score}`;
        scoresContainer.appendChild(scoreElement);
      });
    }
  } else {
    console.error('Local storage is not supported in this browser.');
  }
}

export function saveScoreAndDisplay(score){
  saveScore(score);
  displayScores();
}

function clearLocalStorage() {
  // Check if local storage is supported by the browser
  if (typeof Storage !== 'undefined') {
    // Clear all key-value pairs from local storage
    localStorage.clear();
    console.log('Local storage cleared.');
  } else {
    console.error('Local storage is not supported in this browser.');
  }
}

function clearAndDisplay(){
  clearLocalStorage();
  displayScores();
}

document.getElementById('clear-attempts').addEventListener('click', clearAndDisplay);

// Display initial scores when the script is loaded
displayScores();

