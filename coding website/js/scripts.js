// Add interactive JavaScript functionality here
console.log("Welcome to Code for Change Hackathon!");

// Quiz Questions
const quizQuestions = [
    { question: "What is the primary cause of climate change?", options: ["Deforestation", "Overpopulation", "Greenhouse gas emissions", "Natural disasters"], answer: "Greenhouse gas emissions" },
    { question: "Which gas is most responsible for global warming?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon dioxide" },
    { question: "What percentage of the Earth's surface is covered by oceans?", options: ["50%", "60%", "70%", "80%"], answer: "70%" },
    { question: "Which renewable energy source is the most widely used?", options: ["Solar power", "Wind power", "Hydropower", "Geothermal power"], answer: "Hydropower" },
    { question: "What is the goal of the Paris Agreement?", options: ["To end deforestation", "To reduce plastic waste", "To combat climate change and limit global warming", "To promote electric vehicles"], answer: "To combat climate change and limit global warming" },
    { question: "Which sector is the largest source of greenhouse gas emissions?", options: ["Transportation", "Industry", "Agriculture", "Energy"], answer: "Energy" },
    { question: "What is carbon footprint?", options: ["The amount of carbon dioxide emitted by human activities", "The number of trees planted in a year", "The amount of carbon stored in soil", "The amount of carbon in the atmosphere"], answer: "The amount of carbon dioxide emitted by human activities" },
    { question: "What is the greenhouse effect?", options: ["The warming of Earth's surface due to trapped heat", "The cooling of Earth's surface", "The reflection of sunlight by clouds", "The absorption of sunlight by water"], answer: "The warming of Earth's surface due to trapped heat" },
    { question: "Which country is the largest emitter of carbon dioxide?", options: ["USA", "India", "China", "Russia"], answer: "China" },
    { question: "What is the significance of the 1.5°C target?", options: ["It is the maximum temperature increase to avoid catastrophic climate impacts", "It is the average global temperature", "It is the minimum temperature increase to allow for more agriculture", "It is the temperature at which ice melts"], answer: "It is the maximum temperature increase to avoid catastrophic climate impacts" }
];

// Function to load quiz questions
function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    quizQuestions.forEach((q, index) => {
        const questionElem = document.createElement('div');
        questionElem.className = 'quiz-question';
        questionElem.innerHTML = `
            <h3>Question ${index + 1}: ${q.question}</h3>
            <ul>
                ${q.options.map(option => `<li><input type="radio" name="question${index}" value="${option}"> ${option}</li>`).join('')}
            </ul>
        `;
        quizContainer.appendChild(questionElem);
    });
}

// Call the function to load the quiz
loadQuiz();