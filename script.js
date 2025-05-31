function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Initialize the first tab to be open
document.addEventListener('DOMContentLoaded', (event) => {
    // Click the first tab to open it.
    const firstTab = document.querySelector('.tab-link');
    if (firstTab) {
        firstTab.click();
    }
    initializeQuizzes();
    initializeShowAnswerButtons();
});

function initializeQuizzes() {
    const quizContainers = document.querySelectorAll('.quiz-container');
    quizContainers.forEach((container) => {
        const submitButton = container.querySelector('.submit-quiz-btn');
        const questionsInContainer = container.querySelectorAll('.question');
        
        if (submitButton) {
            submitButton.addEventListener('click', () => {
                questionsInContainer.forEach(question => {
                    // Check if this question has radio button options
                    const radioOptionsExist = question.querySelector('input[type="radio"]');
                    
                    if (radioOptionsExist) { // Only process if it's a radio button question
                        const selectedOption = question.querySelector('input[name^="q"]:checked');
                        const feedbackElement = question.querySelector('.feedback');

                        if (feedbackElement) { // Ensure feedback element exists for this question
                            if (selectedOption) {
                                if (selectedOption.value === 'correct') {
                                    feedbackElement.textContent = 'Correct! | 正確！';
                                    feedbackElement.className = 'feedback correct';
                                } else {
                                    feedbackElement.textContent = 'Incorrect. Try again! | 不正確，再試一次！';
                                    feedbackElement.className = 'feedback incorrect';
                                }
                                feedbackElement.style.display = 'block';
                            } else {
                                feedbackElement.textContent = 'Please select an answer. | 請選擇一個答案。';
                                feedbackElement.className = 'feedback incorrect';
                                feedbackElement.style.display = 'block';
                            }
                        }
                    }
                });
            });
        }
    });
}

function initializeShowAnswerButtons() {
    const showAnswerButtons = document.querySelectorAll('.show-answer-btn');
    showAnswerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answerDiv = this.nextElementSibling;
            if (answerDiv && answerDiv.classList.contains('answer')) {
                const isHidden = answerDiv.style.display === 'none' || answerDiv.style.display === '';
                answerDiv.style.display = isHidden ? 'block' : 'none';
                this.textContent = isHidden ? (this.textContent.includes('顯示答案') ? 'Hide Answer | 隱藏答案' : 'Hide Answer') 
                                            : (this.textContent.includes('隱藏答案') ? 'Show Answer | 顯示答案' : 'Show Answer');
            }
        });
    });
} 