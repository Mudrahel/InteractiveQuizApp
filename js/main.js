// main.js
import Quiz from './quiz.js';
import Question from './question.js';

// Function to fetch questions from the server
async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:3000/questions');

        // Check if the request was successful (status code 200)
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const questions = await response.json();

        const quiz = new Quiz();
        quiz.loadQuestions(questions);
        quiz.displayQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

export function nextQuestion() {
    quiz.nextQuestion();
}

fetchQuestions();