/**
 * ============================================
 * JOGOS EDUCativos - ÁREA DO ALUNO
 * ============================================
 */

// ============================================
// JOGO DA MEMÓRIA
// ============================================
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryScore = 0;
let memoryLocked = false;

const memorySymbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🥝', '🍉', '🍑'];

function initMemoryGame() {
    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;
    memoryScore = 0;
    memoryLocked = false;
    
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    
    // Criar pares de símbolos
    const pairs = [...memorySymbols, ...memorySymbols];
    // Embaralhar
    for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    
    pairs.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.textContent = '?';
        card.onclick = () => flipCard(card);
        grid.appendChild(card);
        memoryCards.push(card);
    });
    
    document.getElementById('memory-score').textContent = '0';
}

function flipCard(card) {
    if (memoryLocked || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        memoryLocked = true;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        memoryScore += 10;
        document.getElementById('memory-score').textContent = memoryScore;
        
        if (matchedPairs === memorySymbols.length) {
            setTimeout(() => {
                alert('Parabéns! Você completou o jogo! 🎉');
                initMemoryGame();
            }, 500);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '?';
        card2.textContent = '?';
    }
    
    flippedCards = [];
    memoryLocked = false;
}

// ============================================
// JOGO DE MATEMÁTICA
// ============================================
let mathScore = 0;
let currentAnswer = 0;

function nextMathQuestion() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operations = ['+', '-', '×'];
    const op = operations[Math.floor(Math.random() * operations.length)];
    
    let question = '';
    if (op === '+') {
        currentAnswer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
    } else if (op === '-') {
        const max = Math.max(num1, num2);
        const min = Math.min(num1, num2);
        currentAnswer = max - min;
        question = `${max} - ${min} = ?`;
    } else {
        const small1 = Math.floor(Math.random() * 10) + 1;
        const small2 = Math.floor(Math.random() * 10) + 1;
        currentAnswer = small1 * small2;
        question = `${small1} × ${small2} = ?`;
    }
    
    document.getElementById('math-question').textContent = question;
    
    // Gerar opções
    const options = [currentAnswer];
    while (options.length < 4) {
        const wrong = currentAnswer + Math.floor(Math.random() * 20) - 10;
        if (wrong > 0 && !options.includes(wrong)) {
            options.push(wrong);
        }
    }
    
    // Embaralhar
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    
    const optionsDiv = document.getElementById('math-options');
    optionsDiv.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'math-option';
        btn.textContent = option;
        btn.onclick = () => selectMathAnswer(option, btn);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('next-math-btn').style.display = 'none';
}

function selectMathAnswer(answer, button) {
    const options = document.querySelectorAll('.math-option');
    options.forEach(opt => {
        opt.onclick = null;
        if (parseInt(opt.textContent) === currentAnswer) {
            opt.classList.add('correct');
        } else if (opt === button && answer !== currentAnswer) {
            opt.classList.add('wrong');
        }
    });
    
    if (answer === currentAnswer) {
        mathScore += 10;
        document.getElementById('math-score').textContent = mathScore;
        setTimeout(() => {
            nextMathQuestion();
        }, 1500);
    } else {
        document.getElementById('next-math-btn').style.display = 'block';
    }
}

// ============================================
// JOGO DE PALAVRAS
// ============================================
let wordScore = 0;
const words = [
    { hint: 'Fruta vermelha e doce', word: 'MORANGO' },
    { hint: 'Animal que late', word: 'CACHORRO' },
    { hint: 'Cor do céu', word: 'AZUL' },
    { hint: 'Transporte com rodas', word: 'BICICLETA' },
    { hint: 'Lugar onde estudamos', word: 'ESCOLA' },
    { hint: 'Estrela do nosso sistema solar', word: 'SOL' },
    { hint: 'Animal que mia', word: 'GATO' },
    { hint: 'Bebida branca', word: 'LEITE' }
];
let currentWordIndex = 0;

function nextWord() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    const wordData = words[currentWordIndex];
    document.getElementById('word-hint').textContent = wordData.hint;
    document.getElementById('word-input').value = '';
    document.getElementById('word-input').style.borderColor = '';
    document.getElementById('next-word-btn').style.display = 'none';
}

function checkWord() {
    const input = document.getElementById('word-input');
    const userWord = input.value.toUpperCase().trim();
    const correctWord = words[currentWordIndex].word;
    
    if (userWord === correctWord) {
        input.style.borderColor = '#10b981';
        wordScore += 10;
        document.getElementById('word-score').textContent = wordScore;
        document.getElementById('next-word-btn').style.display = 'block';
    } else {
        input.style.borderColor = '#ef4444';
        setTimeout(() => {
            input.style.borderColor = '';
        }, 1000);
    }
}

// ============================================
// JOGO DE CORES
// ============================================
let colorScore = 0;
const colors = [
    { name: 'AZUL', color: '#3b82f6' },
    { name: 'VERMELHO', color: '#ef4444' },
    { name: 'VERDE', color: '#10b981' },
    { name: 'AMARELO', color: '#fbbf24' },
    { name: 'ROXO', color: '#a855f7' },
    { name: 'LARANJA', color: '#f97316' },
    { name: 'ROSA', color: '#ec4899' },
    { name: 'PRETO', color: '#000000' }
];
let currentColorIndex = 0;
let correctColorBox = null;

function nextColor() {
    currentColorIndex = Math.floor(Math.random() * colors.length);
    const colorData = colors[currentColorIndex];
    document.getElementById('color-name').textContent = colorData.name;
    
    const palette = document.getElementById('color-palette');
    palette.innerHTML = '';
    
    // Criar opções de cores
    const colorOptions = [colorData];
    while (colorOptions.length < 4) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        if (!colorOptions.find(c => c.color === randomColor.color)) {
            colorOptions.push(randomColor);
        }
    }
    
    // Embaralhar
    for (let i = colorOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colorOptions[i], colorOptions[j]] = [colorOptions[j], colorOptions[i]];
    }
    
    colorOptions.forEach((colorOption, index) => {
        const box = document.createElement('div');
        box.className = 'color-box';
        box.style.backgroundColor = colorOption.color;
        box.onclick = () => selectColor(box, colorOption.color === colorData.color);
        if (colorOption.color === colorData.color) {
            correctColorBox = box;
        }
        palette.appendChild(box);
    });
    
    document.getElementById('next-color-btn').style.display = 'none';
}

function selectColor(box, isCorrect) {
    const boxes = document.querySelectorAll('.color-box');
    boxes.forEach(b => {
        b.onclick = null;
        if (b === correctColorBox) {
            b.classList.add('selected');
        }
    });
    
    if (isCorrect) {
        colorScore += 10;
        document.getElementById('color-score').textContent = colorScore;
        setTimeout(() => {
            nextColor();
        }, 1500);
    } else {
        document.getElementById('next-color-btn').style.display = 'block';
    }
}

// ============================================
// CONTADOR
// ============================================
let counter = 0;
const counterObjects = ['🍎', '⭐', '🎈', '🎨', '🚗', '🐱', '🐶', '🌺'];

function addCounter() {
    counter++;
    document.getElementById('counter-display').textContent = counter;
    const objectsDiv = document.getElementById('counter-objects');
    const randomObj = counterObjects[Math.floor(Math.random() * counterObjects.length)];
    objectsDiv.textContent += randomObj;
}

function resetCounter() {
    counter = 0;
    document.getElementById('counter-display').textContent = '0';
    document.getElementById('counter-objects').textContent = '';
}

// ============================================
// DESENHO LIVRE
// ============================================
let canvas, ctx;
let isDrawing = false;

function initCanvas() {
    canvas = document.getElementById('draw-canvas');
    ctx = canvas.getContext('2d');
    
    // Ajustar tamanho do canvas
    const container = document.getElementById('draw-game');
    canvas.width = Math.min(container.offsetWidth - 40, 500);
    canvas.height = 300;
    
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    
    // Eventos de mouse
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Eventos de touch (mobile)
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    // Atualizar cor quando mudar
    document.getElementById('draw-color').addEventListener('change', (e) => {
        ctx.strokeStyle = e.target.value;
    });
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    if (e.type === 'touchstart') {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if (e.type === 'touchmove' && isDrawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initMemoryGame();
    nextMathQuestion();
    nextWord();
    nextColor();
    initCanvas();
});

