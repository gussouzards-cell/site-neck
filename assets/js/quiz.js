/**
 * ============================================
 * QUIZ INTERATIVO
 * ============================================
 */

const quizQuestions = [
    {
        question: 'Em que ano o Colégio Neck foi fundado?',
        options: ['1990', '1996', '2000', '2005'],
        correct: 1
    },
    {
        question: 'Quantas atividades extracurriculares são oferecidas?',
        options: ['3', '5', '7', '10'],
        correct: 1
    },
    {
        question: 'Qual o endereço do Colégio Neck?',
        options: [
            'R. Florianópolis, 516 - Poá',
            'Av. Principal, 100 - Poá',
            'R. São Paulo, 200 - Poá',
            'R. Central, 50 - Poá'
        ],
        correct: 0
    },
    {
        question: 'Qual turno NÃO é oferecido?',
        options: ['Manhã', 'Tarde', 'Integral', 'Noite'],
        correct: 3
    },
    {
        question: 'Quais atividades extracurriculares são oferecidas?',
        options: [
            'Balé, Judô, Libras, Inglês, Maker',
            'Futebol, Vôlei, Natação',
            'Música, Teatro, Dança',
            'Todas as anteriores'
        ],
        correct: 0
    },
    {
        question: 'Qual a série mais avançada oferecida?',
        options: ['3º Ano', '4º Ano', '5º Ano', '6º Ano'],
        correct: 2
    },
    {
        question: 'O que significa turmas reduzidas?',
        options: [
            'Menos alunos por sala para melhor atenção',
            'Menos matérias',
            'Menos horas de aula',
            'Menos professores'
        ],
        correct: 0
    },
    {
        question: 'Qual o telefone/WhatsApp do colégio?',
        options: [
            '(11) 46397-7768',
            '(11) 99999-9999',
            '(11) 11111-1111',
            '(11) 22222-2222'
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

function initQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    const content = document.getElementById('quiz-content');
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    
    document.getElementById('quiz-progress').style.width = progress + '%';
    
    let html = `
        <div class="quiz-question">
            <h3>Pergunta ${currentQuestion + 1} de ${quizQuestions.length}</h3>
            <p style="font-size: 1.2rem; color: var(--color-gray-700); margin-bottom: var(--spacing-lg);">${question.question}</p>
            <div class="quiz-options" id="quiz-options">
    `;
    
    question.options.forEach((option, index) => {
        html += `<div class="quiz-option" data-index="${index}">${option}</div>`;
    });
    
    html += `
            </div>
        </div>
        <div class="quiz-nav">
            ${currentQuestion > 0 ? '<button class="game-btn" onclick="previousQuestion()">← Anterior</button>' : '<div></div>'}
            <button class="game-btn" onclick="nextQuestion()" id="next-btn" ${selectedAnswer === null ? 'disabled style="opacity: 0.5;"' : ''}>Próxima →</button>
        </div>
    `;
    
    content.innerHTML = html;
    
    // Adicionar eventos aos options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            if (this.classList.contains('selected')) return;
            
            document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            selectedAnswer = parseInt(this.getAttribute('data-index'));
            document.getElementById('next-btn').disabled = false;
            document.getElementById('next-btn').style.opacity = '1';
        });
    });
}

function nextQuestion() {
    if (selectedAnswer === null) return;
    
    // Verificar resposta
    const question = quizQuestions[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((opt, index) => {
        opt.style.pointerEvents = 'none';
        if (index === question.correct) {
            opt.classList.add('correct');
        } else if (index === selectedAnswer && index !== question.correct) {
            opt.classList.add('wrong');
        }
    });
    
    if (selectedAnswer === question.correct) {
        score++;
    }
    
    setTimeout(() => {
        currentQuestion++;
        selectedAnswer = null;
        
        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        selectedAnswer = null;
        showQuestion();
    }
}

function showResult() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const content = document.getElementById('quiz-content');
    
    let message = '';
    let emoji = '🎉';
    
    if (percentage === 100) {
        message = 'Parabéns! Você conhece muito bem o Colégio Neck!';
        emoji = '🏆';
    } else if (percentage >= 70) {
        message = 'Muito bem! Você conhece bastante sobre nossa escola!';
        emoji = '⭐';
    } else if (percentage >= 50) {
        message = 'Bom trabalho! Continue explorando nosso site para saber mais!';
        emoji = '👍';
    } else {
        message = 'Que tal explorar mais nosso site para conhecer melhor o Colégio Neck?';
        emoji = '📚';
    }
    
    content.innerHTML = `
        <div class="quiz-result">
            <div style="font-size: 5rem; margin-bottom: var(--spacing-md);">${emoji}</div>
            <h2 style="color: var(--color-primary-blue); margin-bottom: var(--spacing-md);">Quiz Concluído!</h2>
            <div class="quiz-score">${score}/${quizQuestions.length}</div>
            <div class="quiz-message">${message}</div>
            <p style="color: var(--color-gray-600); margin-bottom: var(--spacing-lg);">Você acertou ${percentage}% das perguntas!</p>
            <button class="game-btn" onclick="initQuiz()" style="margin: var(--spacing-sm);">Fazer Novamente</button>
            <a href="index.html#formulario" class="game-btn" style="margin: var(--spacing-sm); text-decoration: none; display: inline-block;">Quero Matricular</a>
        </div>
    `;
    
    document.getElementById('quiz-progress').style.width = '100%';
}

// Inicializar quiz
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
});

