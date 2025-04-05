// Question Bank
const questionBank = [
    { question: "What is the primary cause of climate change?", options: ["Deforestation", "Overpopulation", "Greenhouse gas emissions", "Natural disasters"], answer: "Greenhouse gas emissions", explanation: "Greenhouse gas emissions trap heat in the atmosphere." },
    { question: "Which gas is most responsible for global warming?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon dioxide", explanation: "Carbon dioxide is a major greenhouse gas." },
    { question: "What percentage of the Earth's surface is covered by oceans?", options: ["50%", "60%", "70%", "80%"], answer: "70%", explanation: "Oceans cover approximately 70% of the Earth." },
    { question: "Which renewable energy source is the most widely used?", options: ["Solar power", "Wind power", "Hydropower", "Geothermal power"], answer: "Hydropower", explanation: "Hydropower is a well-established renewable energy source." },
    { question: "What is the goal of the Paris Agreement?", options: ["To end deforestation", "To reduce plastic waste", "To combat climate change and limit global warming", "To promote electric vehicles"], answer: "To combat climate change and limit global warming", explanation: "The Paris Agreement aims to limit global warming." },
    { question: "What is the main consequence of global warming?", options: ["Rising sea levels", "Decreased biodiversity", "Melting glaciers", "All of the above"], answer: "All of the above", explanation: "Global warming has multiple consequences." },
    { question: "What is carbon sequestration?", options: ["The process of capturing carbon dioxide from the atmosphere and storing it", "A method to increase fuel efficiency", "The process of producing carbon dioxide", "None of the above"], answer: "The process of capturing carbon dioxide from the atmosphere and storing it", explanation: "Carbon sequestration removes CO2 from the atmosphere." },
    { question: "Which of the following countries has pledged to achieve net-zero carbon emissions by 2050?", options: ["India", "USA", "China", "United Kingdom"], answer: "United Kingdom", explanation: "The UK has pledged net-zero emissions by 2050." },
    { question: "Which industry is the largest emitter of greenhouse gases?", options: ["Agriculture", "Transportation", "Energy production", "Manufacturing"], answer: "Energy production", explanation: "Energy production relies heavily on fossil fuels." },
    { question: "Which of the following is an effect of deforestation?", options: ["Increased rainfall", "Reduced biodiversity", "Cleaner air", "Lower carbon emissions"], answer: "Reduced biodiversity", explanation: "Deforestation leads to habitat loss." },
    { question: "What is the impact of melting glaciers?", options: ["Rising sea levels", "Decreased sea levels", "Increased biodiversity", "Decreased rainfall"], answer: "Rising sea levels", explanation: "Melting glaciers contribute to rising sea levels." },
    { question: "What is a carbon footprint?", options: ["The amount of carbon dioxide released into the atmosphere as a result of the activities of a particular individual, organization, or community", "A type of shoe", "A measurement of tree height", "The amount of carbon stored in a forest"], answer: "The amount of carbon dioxide released into the atmosphere as a result of the activities of a particular individual, organization, or community", explanation: "A carbon footprint measures greenhouse gas emissions." },
    { question: "What is the greenhouse effect?", options: ["The warming of Earth's surface as a result of trapping of heat by gases in the atmosphere", "A type of garden", "A method of growing plants", "The cooling of Earth's surface"], answer: "The warming of Earth's surface as a result of trapping of heat by gases in the atmosphere", explanation: "The greenhouse effect is essential for maintaining Earth's temperature." },
    { question: "Which of the following is a way to reduce your carbon footprint?", options: ["Driving a car more often", "Eating more meat", "Using public transportation", "Leaving lights on when you leave a room"], answer: "Using public transportation", explanation: "Using public transportation reduces individual emissions." },
    { question: "What is the role of forests in climate change?", options: ["Absorbing carbon dioxide from the atmosphere", "Releasing carbon dioxide into the atmosphere", "Having no impact on climate change", "Increasing rainfall"], answer: "Absorbing carbon dioxide from the atmosphere", explanation: "Forests act as carbon sinks." }
];

// Function to select a subset of questions randomly
function selectRandomQuestions(numQuestions) {
    const selectedQuestions = [];
    const availableQuestions = [...questionBank]; // Create a copy of the question bank

    for (let i = 0; i < numQuestions && availableQuestions.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        selectedQuestions.push(availableQuestions.splice(randomIndex, 1)[0]);
    }

    return selectedQuestions;
}

// Select 10 random questions for the quiz
const quizQuestions = selectRandomQuestions(10);

// Function to load quiz questions
function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) {
        console.error("Quiz container not found.");
        return;
    }
    quizContainer.innerHTML = ''; // Clear any existing content
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

    // Add a submit button
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Quiz';
    submitButton.onclick = calculateScore;
    submitButton.style.marginTop = '20px';
    quizContainer.appendChild(submitButton);
}

// Function to calculate and display the quiz score
function calculateScore() {
    let score = 0;
    const feedbackContainer = document.getElementById('quiz-feedback');
    if (!feedbackContainer) {
        console.error("Feedback container not found.");
        return;
    }
    feedbackContainer.innerHTML = ''; // Clear previous feedback

    const resultContainer = document.getElementById('quiz-result');
    if (!resultContainer) {
        console.error("Result container not found.");
        return;
    }

    // Calculate the score
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });

    // Display the score prominently before the answers
    resultContainer.innerHTML = `
        <h3 style="color: #4CAF50; font-size: 1.8rem; text-align: center; margin-bottom: 20px;">
            Your Score: ${score} / ${quizQuestions.length}
        </h3>
    `;
    resultContainer.style.display = 'block';

    // Display feedback for each question
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const feedbackElem = document.createElement('div');
        feedbackElem.className = 'quiz-question';

        if (selectedOption && selectedOption.value === q.answer) {
            feedbackElem.innerHTML = `
                <p><strong>Question ${index + 1}:</strong> Correct!</p>
                <p><strong>Explanation:</strong> ${q.explanation}</p>
            `;
        } else {
            feedbackElem.innerHTML = `
                <p><strong>Question ${index + 1}:</strong> Incorrect.</p>
                <ul>
                    <li><strong>Correct Answer:</strong> ${q.answer}</li>
                    <li><strong>Explanation:</strong> ${q.explanation}</li>
                </ul>
            `;
        }

        feedbackContainer.appendChild(feedbackElem);
    });

    feedbackContainer.style.display = 'block';
}

// Function to calculate the carbon footprint
function calculateCarbonFootprint() {
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const gas = parseFloat(document.getElementById('gas').value) || 0;
    const water = parseFloat(document.getElementById('water').value) || 0;
    const fuel = parseFloat(document.getElementById('fuel').value) || 0;
    const waste = parseFloat(document.getElementById('waste').value) || 0;

    const electricityFootprint = electricity * 0.5; // 0.5 kg CO2 per kWh
    const gasFootprint = gas * 2.1; // 2.1 kg CO2 per kWh
    const waterFootprint = water * 0.001; // 0.001 kg CO2 per litre
    const fuelFootprint = fuel * 2.3; // 2.3 kg CO2 per litre
    const wasteFootprint = waste * 0.5; // 0.5 kg CO2 per kg of waste

    const totalFootprint = electricityFootprint + gasFootprint + waterFootprint + fuelFootprint + wasteFootprint;

    const resultContainer = document.getElementById('carbon-footprint-result');
    if (!resultContainer) {
        console.error("Carbon footprint result container not found.");
        return;
    }
    resultContainer.innerHTML = `
        <h3>Your Carbon Footprint</h3>
        <p><strong>Total:</strong> ${totalFootprint.toFixed(2)} kg CO2</p>
        <ul>
            <li><strong>Electricity:</strong> ${electricityFootprint.toFixed(2)} kg CO2</li>
            <li><strong>Gas:</strong> ${gasFootprint.toFixed(2)} kg CO2</li>
            <li><strong>Water:</strong> ${waterFootprint.toFixed(2)} kg CO2</li>
            <li><strong>Fuel:</strong> ${fuelFootprint.toFixed(2)} kg CO2</li>
            <li><strong>Waste:</strong> ${wasteFootprint.toFixed(2)} kg CO2</li>
        </ul>
    `;
    resultContainer.style.display = 'block';
}

// Ensure the quiz is loaded when the DOM is ready
document.addEventListener('DOMContentLoaded', loadQuiz);