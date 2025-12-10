/**
 * Dropdown Menu Controller
 * Controla a abertura e fechamento dos dropdowns do menu
 */

(function() {
    'use strict';
    
    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        const overlay = document.createElement('div');
        overlay.className = 'dropdown-overlay';
        document.body.appendChild(overlay);
        
        dropdowns.forEach(dropdown => {
            const trigger = dropdown.querySelector('a');
            
            // Abrir/fechar dropdown
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = dropdown.classList.contains('active');
                
                // Fechar todos os outros dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle do dropdown atual
                if (isActive) {
                    dropdown.classList.remove('active');
                    overlay.classList.remove('active');
                } else {
                    dropdown.classList.add('active');
                    overlay.classList.add('active');
                }
            });
        });
        
        // Fechar ao clicar no overlay
        overlay.addEventListener('click', function() {
            dropdowns.forEach(d => d.classList.remove('active'));
            overlay.classList.remove('active');
        });
        
        // Fechar ao clicar fora ou pressionar ESC
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-dropdown')) {
                dropdowns.forEach(d => d.classList.remove('active'));
                overlay.classList.remove('active');
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdowns.forEach(d => d.classList.remove('active'));
                overlay.classList.remove('active');
            }
        });
        
        // Fechar ao rolar a página
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                dropdowns.forEach(d => d.classList.remove('active'));
                overlay.classList.remove('active');
            }, 100);
        });
    }
    
    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDropdowns);
    } else {
        initDropdowns();
    }
})();

