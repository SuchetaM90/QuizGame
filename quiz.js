document.addEventListener('DOMContentLoaded', () => {
const quizData=
{
    "quiz_title": "General Knowledge Questions",
    "Questions": [
        {
            "id":1,
            "question": "Where was the Annual Conference of Zone II of the Commonwealth Parliamentary Association (CPA) held?",
            "options":{
               "A": "Varanasi, Uttar Pradesh",
               "B": "Dehradun, Uttarakhand",
               "C": "Dharmshala, Himachal Pradesh",
               "D": "Indore, Madhya Pradesh"
            },
            "answer":"C"
        },
        {
            "id":2,
            "question":"Where was the fourth International Conference on Financing for Development held?",
            "options":{
               "A": "France",
               "B": "Spain",
               "C":"New Zealand",
               "D": "India"
            },
            "answer":"B"
        },
        {
            "id":3,
            "question":"What is the name of the operation under which Narcotics Control Bureau (NCB) busted the darknet drug racket?",
            "options":{
              "A" : "Operation APPLE",
              "B": "Operation MELON",
              "C": "Operation TIGER",
              "D": "Operation STORM"
            },
            "answer":"B"
        },
        {
            "id":4,
            "question":"To be appointed as a judge of Supreme Court a person should have been an advocate of a High Court for at least _________Yrs",
            "options":{
               "A": "5",
               "B": "10",
               "C":"15",
               "D":"20"
            },
            "answer":"B"
        },
        {
            "id":5,
            "question":"The part IX of the constitution which deals with Panchayats is not applicable to which of the following states?",
            "options":{
               "A": "Nagaland , Meghalaya & Mizoram",
               "B": "Nagaland , Meghalaya, Mizoram & Tribal Areas of Assam",
               "C": "Nagaland , Meghalaya , Mizoram , Tribal Areas of Assam and Tripura",
               "D": "Nagaland , Meghalaya , Mizoram , Tribal Areas of Assam , Tripura & Hill areas of Manipur"
            },
            "answer":"D"
        },
        {
            "id":6,
            "question":"The term Rose Revolution refers to the change of power  in which among the following countries?",
            "options":{
                "A": "Croatia",
                "B":"Syria",
                "C":"Georgia",
                "D":"Kyrgyzstan"
            },
            "answer":"C"
        },
        {
            "id":7,
            "question":"In which five year plan the Khadi and Village Industries Commission was launched?",
            "options":{
               "A": "1st",
               "B": "2nd",
               "C": "3rd",
               "D": "4th"
            },
            "answer":"B"
        },
        {
            "id":8,
            "question":"Countervailing duty is imposed on which of the following?",
            "options":{
               "A": "imported goods",
               "B":  "exported goods",
               "C":  "imported good on which import subsidy is applicable",
               "D":  "exported goods on which export subsidy is applicable"
            },
            "answer":"A"
        },
        {
            "id":9,
            "question":"Which among the following is the most reasonable idea behind issuing the 'sweat equity' by the companies now a days?",
            "options":{
               "A": "To provide more profits to the retail investors",
               "B": "To provide more profits to the corporate investors",
               "C": "To retain the best employees",
               "D": "To save tax"
            },
            "answer":"C"
        },
        {
            "id":10,
            "question":"Recently, which Indian became the youngest para swimmer in the world to cross the English Channel?",
            "options":{
               "A": "Niranjan Mukundan",
               "B": "Rimo Saha",
               "C": "Satyendra Singh",
               "D":  " Jiya Rai"
            },
            "answer":" D"
        }
    ]
};

  let currentQuestionIndex = 0;
  let score = 0;
  let hasAnswered = false;

  const questionDiv = document.getElementById('question');
  const optionsDiv = document.getElementById('options');
  const scoreDiv = document.getElementById('score');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');

  function updateScore() {
    scoreDiv.innerHTML = `<p><strong>Score:</strong> ${score.toFixed(2)}</p>`;
  }

  function displayQuestion(index) {
    const q = quizData.Questions[index];
    if (!q) return;

    hasAnswered = false;
    nextBtn.disabled = true;
    questionDiv.innerHTML = `<h2>Q${index + 1}: ${q.question}</h2>`;
    optionsDiv.innerHTML = '';

    for (let key in q.options) {
      const btn = document.createElement('button');
      btn.textContent = `${key}: ${q.options[key]}`;
      btn.classList.add('option-btn');
      btn.dataset.option = key;
      btn.addEventListener('click', () => handleAnswer(key, btn));
      optionsDiv.appendChild(btn);
    }

    updateScore();

    // Toggle buttons
    if (index === quizData.Questions.length - 1) {
      nextBtn.style.display = 'none';
      submitBtn.style.display = 'inline-block';
    } else {
      nextBtn.style.display = 'inline-block';
      submitBtn.style.display = 'none';
    }
  }

  function handleAnswer(selectedOption, clickedBtn) {
    if (hasAnswered) return;
    hasAnswered = true;

    const currentQuestion = quizData.Questions[currentQuestionIndex];
    const correct = currentQuestion.answer.trim();

    if (selectedOption === correct) {
      score += 1;
      clickedBtn.style.backgroundColor = 'lightgreen';
    } else {
      score -= 0.25;
      clickedBtn.style.backgroundColor = 'salmon';
    }

    // Disable all options
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.option === correct) {
        btn.style.border = '2px solid green';
      }
    });

    updateScore();
    nextBtn.disabled = false;
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.Questions.length) {
      displayQuestion(currentQuestionIndex);
    }
  }

  function showFinalScore() {
    questionDiv.innerHTML = `<h2>Quiz Completed!</h2>`;
    optionsDiv.remove();
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    scoreDiv.innerHTML = `<p><strong>Final Score:</strong> ${score.toFixed(2)} out of ${quizData.Questions.length}</p>`;
  }

  // Event listeners
  nextBtn.addEventListener('click', nextQuestion);
  submitBtn.addEventListener('click', showFinalScore);

  // Start quiz
  displayQuestion(currentQuestionIndex);
});