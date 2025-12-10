/**
 * Ferramentas de Conversão
 * - Contador de vagas limitadas
 * - Pop-up de exit intent
 */

(function() {
    'use strict';
    
    // Contador de vagas (configurável)
    const VAGAS_TOTAIS = 50;
    const VAGAS_DISPONIVEIS = 15; // Ajuste conforme necessário
    
    // Criar contador de vagas
    function createVagasCounter() {
        const counter = document.createElement('div');
        counter.className = 'vagas-counter';
        counter.innerHTML = `
            <div class="vagas-counter-content">
                <span class="vagas-counter-icon">⚡</span>
                <div class="vagas-counter-text">
                    <strong>${VAGAS_DISPONIVEIS} vagas restantes!</strong>
                    <span>Matrículas abertas - Não perca sua vaga</span>
                </div>
                <a href="#formulario" class="vagas-counter-btn">Garantir Vaga</a>
            </div>
        `;
        
        // Adicionar após o hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.insertAdjacentElement('afterend', counter);
        }
    }
    
    // Pop-up de exit intent
    function createExitIntentPopup() {
        // Verificar se já mostrou hoje
        const lastShown = localStorage.getItem('exitIntentShown');
        const today = new Date().toDateString();
        
        if (lastShown === today) {
            return; // Já mostrou hoje
        }
        
        // Detectar movimento do mouse para fora da página
        let exitIntentTriggered = false;
        
        document.addEventListener('mouseout', function(e) {
            if (exitIntentTriggered) return;
            
            // Se o mouse saiu pela parte superior da página
            if (!e.toElement && !e.relatedTarget && e.clientY < 10) {
                exitIntentTriggered = true;
                showExitIntentPopup();
            }
        }, false);
    }
    
    function showExitIntentPopup() {
        const popup = document.createElement('div');
        popup.className = 'exit-intent-popup';
        popup.innerHTML = `
            <div class="exit-intent-overlay"></div>
            <div class="exit-intent-content">
                <button class="exit-intent-close" aria-label="Fechar">×</button>
                <h2>⏰ Espera! Não vá embora ainda!</h2>
                <p>Garanta a vaga do seu filho com <strong>10% de desconto</strong> nas primeiras 3 mensalidades!</p>
                <p class="exit-intent-subtitle">Oferta válida apenas hoje</p>
                <a href="#formulario" class="exit-intent-btn">Quero o Desconto</a>
                <button class="exit-intent-dismiss">Agora não</button>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        // Animar entrada
        setTimeout(() => {
            popup.classList.add('show');
        }, 100);
        
        // Fechar ao clicar no overlay ou botões
        popup.querySelector('.exit-intent-overlay').addEventListener('click', closePopup);
        popup.querySelector('.exit-intent-close').addEventListener('click', closePopup);
        popup.querySelector('.exit-intent-dismiss').addEventListener('click', closePopup);
        
        function closePopup() {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.remove();
            }, 300);
            localStorage.setItem('exitIntentShown', new Date().toDateString());
        }
    }
    
    // Inicializar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createVagasCounter();
            createExitIntentPopup();
        });
    } else {
        createVagasCounter();
        createExitIntentPopup();
    }
})();

