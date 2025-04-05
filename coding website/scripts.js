// QUESTION BANK: 15 Questions
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

// Function: Randomly select 10 questions from the quiz bank
function selectRandomQuestions(numQuestions) {
    const selectedQuestions = [];
    const availableQuestions = [...questionBank];
    for (let i = 0; i < numQuestions && availableQuestions.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableQuestions.length);
        selectedQuestions.push(availableQuestions.splice(randomIndex, 1)[0]);
    }
    return selectedQuestions;
}
const quizQuestions = selectRandomQuestions(10);

// Function: Load quiz questions into the HTML container (#quiz-container)
function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) {
        console.error("Quiz container not found.");
        return;
    }
    quizContainer.innerHTML = ''; // Clear existing content
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

// FUNCTION: Carbon Footprint Calculator
function calculateCarbonFootprint() {
    const electricity = parseFloat(document.getElementById('electricity').value) || 0;
    const gas = parseFloat(document.getElementById('gas').value) || 0;
    const water = parseFloat(document.getElementById('water').value) || 0;
    const fuel = parseFloat(document.getElementById('fuel').value) || 0;
    const waste = parseFloat(document.getElementById('waste').value) || 0;
    const totalFootprint =
        electricity * 0.5 +
        gas * 2.1 +
        water * 0.001 +
        fuel * 2.3 +
        waste * 0.5;
    const resultContainer = document.getElementById('carbon-footprint-result');
    if (!resultContainer) {
        console.error("Carbon footprint result container not found.");
        return;
    }
    resultContainer.innerHTML = `
        <h3>Your Carbon Footprint</h3>
        <p><strong>Total:</strong> ${totalFootprint.toFixed(2)} kg CO2</p>
        <ul>
            <li><strong>Electricity:</strong> ${(electricity * 0.5).toFixed(2)} kg CO2</li>
            <li><strong>Gas:</strong> ${(gas * 2.1).toFixed(2)} kg CO2</li>
            <li><strong>Water:</strong> ${(water * 0.001).toFixed(2)} kg CO2</li>
            <li><strong>Fuel:</strong> ${(fuel * 2.3).toFixed(2)} kg CO2</li>
            <li><strong>Waste:</strong> ${(waste * 0.5).toFixed(2)} kg CO2</li>
        </ul>
    `;
    resultContainer.style.display = 'block';
}

// FUNCTION: Handle quiz submission, calculate score, and display results
function handleQuizSubmission() {
    console.log('handleQuizSubmission called');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('quiz-result');
    if (!quizContainer || !resultContainer) {
        console.error("Required containers not found.");
        return;
    }
    let score = 0;
    let results = '';
    
    // Calculate the score with detailed logging
    quizQuestions.forEach((q, index) => {
        const radios = document.getElementsByName(`question${index}`);
        const radiosArray = Array.from(radios);
        const selectedOption = radiosArray.find(radio => radio.checked);
        if (selectedOption) {
            console.log(`Question ${index+1}: Selected "${selectedOption.value.trim()}" vs Expected "${q.answer.trim()}"`);
            if (selectedOption.value.trim() === q.answer.trim()) {
                score++;
            }
        } else {
            console.log(`Question ${index+1}: No answer selected.`);
        }
    });
    
    // Build score section
    results += `
        <div style="margin-bottom: 30px;">
            <h2 style="color: #4CAF50; text-align: center; font-size: 24px;">
                Your Score: ${score} / ${quizQuestions.length}
            </h2>
        </div>
    `;
    
    // Build incorrect answers section
    results += '<div style="margin-bottom: 30px;"><h3 style="color: #ff4444;">Incorrect Answers:</h3>';
    quizQuestions.forEach((q, index) => {
        const radios = document.getElementsByName(`question${index}`);
        const radiosArray = Array.from(radios);
        const selectedOption = radiosArray.find(radio => radio.checked);
        const userAnswer = selectedOption ? selectedOption.value : "No answer selected";
        if (!selectedOption || selectedOption.value.trim() !== q.answer.trim()) {
            results += `
                <div style="margin: 15px 0; padding: 15px; border: 1px solid #ffcdd2; border-radius: 5px;">
                    <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                    <p style="color: #ff4444;"><strong>Your Answer:</strong> ${userAnswer}</p>
                    <p style="color: #4CAF50;"><strong>Correct Answer:</strong> ${q.answer}</p>
                    <p><strong>Explanation:</strong> ${q.explanation}</p>
                </div>
            `;
        }
    });
    results += '</div>';
    
    // Build correct answers section
    results += '<div><h3 style="color: #4CAF50;">Correct Answers:</h3>';
    quizQuestions.forEach((q, index) => {
        const radios = document.getElementsByName(`question${index}`);
        const radiosArray = Array.from(radios);
        const selectedOption = radiosArray.find(radio => radio.checked);
        if (selectedOption && selectedOption.value.trim() === q.answer.trim()) {
            results += `
                <div style="margin: 15px 0; padding: 15px; border: 1px solid #c8e6c9; border-radius: 5px;">
                    <p><strong>Question ${index + 1}:</strong> ${q.question}</p>
                    <p style="color: #4CAF50;"><strong>Your Answer:</strong> ${selectedOption.value}</p>
                    <p><strong>Explanation:</strong> ${q.explanation}</p>
                </div>
            `;
        }
    });
    results += '</div>';
    
    resultContainer.innerHTML = results;
    resultContainer.style.display = 'block';
    console.log('Quiz results updated.');
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// INITIALIZATION: Load quiz and attach event listener to the submit button
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('DOM loaded');
        loadQuiz();
        const submitButton = document.getElementById('submit-quiz');
        if (!submitButton) {
            throw new Error('Submit button not found in DOM');
        }
        submitButton.addEventListener('click', function(e) {
            try {
                console.log('Submit clicked');
                handleQuizSubmission();
            } catch (error) {
                console.error('Error in submit handler:', error);
            }
        });
        console.log('Quiz initialized');
    } catch (error) {
        console.error('Initialization error:', error);
    }
});