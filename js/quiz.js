import { saveScoreAndDisplay } from './scoreStorage.js';

class Quiz {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;

        this.quizContainer = document.getElementById('quiz-container');

    }

    loadQuestions(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    displayQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        document.getElementById('question').textContent = currentQuestion.text;

        const optionsList = document.getElementById('options');
        optionsList.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const li = document.createElement('li');
            li.className = 'option';
            console.log("index:" + index);
            li.textContent = String.fromCharCode(65 + index) + ') ' + option;
            li.onclick = () => this.checkAnswerAndShowNext(index);
            optionsList.appendChild(li);
        });

    }

    checkAnswerAndShowNext(selectedIndex) {
        this.checkAnswer(selectedIndex);
        this.nextQuestion();
    }

    checkAnswer(selectedIndex) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const feedbackElement = document.getElementById('feedback');

        if (selectedIndex === currentQuestion.correctAnswerIndex) {
            this.score++;
            feedbackElement.textContent = 'Correct!';
            feedbackElement.style.color = 'green';
        } else {
            feedbackElement.textContent = 'Incorrect!';
            feedbackElement.style.color = 'red';
        }

        this.setScore(this.score);
    }

    setScore(score) {
        document.getElementById('score-value').textContent = score;
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            // Add fade-out class to trigger the animation
            document.getElementById('quiz-container').classList.add('fade-out');

            // Wait for the animation to complete (0.3 seconds) before displaying the next question
            setTimeout(() => {
                // Remove the fade-out class
                document.getElementById('quiz-container').classList.remove('fade-out');
                this.displayQuestion();

            }, 300);
        } else {
            this.completeQuiz(this.score);
        }
    }

    completeQuiz(score) {
        document.getElementById('question').textContent = 'Quiz Completed!';
        document.getElementById('options').innerHTML = '';

        const tryAgainContainer = document.getElementById('try-again-container');
        tryAgainContainer.style.display = 'block';

        const tryAgainButton = document.getElementById('try-again-button');
        tryAgainButton.addEventListener('click', () => this.restartQuiz());


        saveScoreAndDisplay(score);
    }

    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.setScore(0);
        document.getElementById('feedback').textContent = '';
        const tryAgainContainer = document.getElementById('try-again-container');
        tryAgainContainer.style.display = 'none';
        this.displayQuestion();
    }

    hideTryAgainButton() {

    }

}

// Export the Quiz class
export default Quiz;