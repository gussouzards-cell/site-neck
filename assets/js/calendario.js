/**
 * ============================================
 * CALENDÁRIO ESCOLAR
 * ============================================
 */

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Eventos do calendário
const events = {
    '2024-12-15': { title: 'Festa de Natal', description: 'Celebração de fim de ano' },
    '2024-12-20': { title: 'Encerramento do Ano Letivo', description: 'Último dia de aula' },
    '2025-01-05': { title: 'Início das Aulas 2025', description: 'Bem-vindos de volta!' },
    '2025-01-15': { title: 'Reunião de Pais', description: 'Apresentação da proposta' },
    '2025-01-25': { title: 'Festa de Boas-Vindas', description: 'Integração' },
    '2025-02-15': { title: 'Carnaval', description: 'Feriado - Sem aulas' },
    '2025-03-15': { title: 'Dia da Escola', description: 'Celebração especial' },
    '2025-04-18': { title: 'Sexta-feira Santa', description: 'Feriado' },
    '2025-04-21': { title: 'Tiradentes', description: 'Feriado' },
    '2025-05-01': { title: 'Dia do Trabalho', description: 'Feriado' },
    '2025-06-12': { title: 'Festa Junina', description: 'Celebração tradicional' },
    '2025-09-07': { title: 'Independência', description: 'Feriado' },
    '2025-10-12': { title: 'Dia das Crianças', description: 'Atividades especiais' },
    '2025-11-15': { title: 'Proclamação da República', description: 'Feriado' },
    '2025-11-20': { title: 'Consciência Negra', description: 'Feriado' }
};

function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    document.getElementById('calendar-month').textContent = 
        `${monthNames[currentMonth]} ${currentYear}`;
    
    const grid = document.getElementById('calendar-grid');
    const dayHeaders = grid.querySelectorAll('.calendar-day-header');
    const existingDays = grid.querySelectorAll('.calendar-day');
    existingDays.forEach(day => day.remove());
    
    // Dias do mês anterior
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = createDayElement(prevMonthDays - i, true);
        grid.appendChild(day);
    }
    
    // Dias do mês atual
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = currentYear === today.getFullYear() && 
                       currentMonth === today.getMonth() && 
                       day === today.getDate();
        const hasEvent = events[dateStr];
        
        const dayEl = createDayElement(day, false, isToday, hasEvent);
        grid.appendChild(dayEl);
    }
    
    // Dias do próximo mês
    const totalCells = firstDay + daysInMonth;
    const remainingCells = 42 - totalCells; // 6 semanas * 7 dias
    for (let day = 1; day <= remainingCells && day <= 14; day++) {
        const dayEl = createDayElement(day, true);
        grid.appendChild(dayEl);
    }
}

function createDayElement(day, isOtherMonth, isToday = false, hasEvent = false) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';
    
    if (isOtherMonth) {
        dayEl.classList.add('other-month');
    }
    
    if (isToday) {
        dayEl.classList.add('today');
    }
    
    if (hasEvent) {
        dayEl.classList.add('has-event');
    }
    
    const number = document.createElement('div');
    number.className = 'calendar-day-number';
    number.textContent = day;
    dayEl.appendChild(number);
    
    if (hasEvent) {
        const dot = document.createElement('div');
        dot.className = 'calendar-event-dot';
        dayEl.appendChild(dot);
    }
    
    if (hasEvent) {
        dayEl.addEventListener('click', () => {
            showEventDetails(hasEvent);
        });
    }
    
    return dayEl;
}

function changeMonth(direction) {
    currentMonth += direction;
    
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    
    renderCalendar();
}

function goToToday() {
    const today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    renderCalendar();
}

function showEventDetails(event) {
    alert(`${event.title}\n\n${event.description}`);
}

// Inicializar calendário
document.addEventListener('DOMContentLoaded', function() {
    renderCalendar();
});

