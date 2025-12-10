/**
 * Footer Component
 * Componente reutilizável para o footer
 */

(function() {
    'use strict';
    
    const footerHTML = `
    <!-- Footer -->
    <footer class="footer" id="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <h3 class="footer-logo-text">Colégio Neck</h3>
                    <p class="footer-tagline">Educação de qualidade desde 1996</p>
                </div>
                
                <div class="footer-links-grid">
                    <div class="footer-links-column">
                        <h4>Institucional</h4>
                        <ul>
                            <li><a href="sobre-nos.html" class="footer-link">Sobre Nós</a></li>
                            <li><a href="historia.html" class="footer-link">Nossa História</a></li>
                            <li><a href="educacao.html" class="footer-link">Educação</a></li>
                            <li><a href="metodologia.html" class="footer-link">Metodologia</a></li>
                            <li><a href="galeria.html" class="footer-link">Galeria</a></li>
                            <li><a href="depoimentos.html" class="footer-link">Depoimentos</a></li>
                            <li><a href="premios.html" class="footer-link">Prêmios</a></li>
                            <li><a href="parceiros.html" class="footer-link">Parceiros</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-column">
                        <h4>Serviços</h4>
                        <ul>
                            <li><a href="area-aluno.html" class="footer-link">Área do Aluno</a></li>
                            <li><a href="portal-pais.html" class="footer-link">Portal dos Pais</a></li>
                            <li><a href="calculadora.html" class="footer-link">Calculadora</a></li>
                            <li><a href="horarios.html" class="footer-link">Horários</a></li>
                            <li><a href="cardapio.html" class="footer-link">Cardápio</a></li>
                            <li><a href="downloads.html" class="footer-link">Downloads</a></li>
                            <li><a href="agendamento.html" class="footer-link">Agendar Visita</a></li>
                            <li><a href="biblioteca-virtual.html" class="footer-link">Biblioteca Virtual</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-column">
                        <h4>Informações</h4>
                        <ul>
                            <li><a href="blog.html" class="footer-link">Blog</a></li>
                            <li><a href="eventos.html" class="footer-link">Eventos</a></li>
                            <li><a href="faq.html" class="footer-link">FAQ</a></li>
                            <li><a href="calendario.html" class="footer-link">Calendário</a></li>
                            <li><a href="quiz.html" class="footer-link">Quiz</a></li>
                            <li><a href="newsletter.html" class="footer-link">Newsletter</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-column">
                        <h4>Contato</h4>
                        <ul>
                            <li><a href="chat.html" class="footer-link">Fale Conosco</a></li>
                            <li><a href="mapa.html" class="footer-link">Localização</a></li>
                            <li><a href="trabalhe-conosco.html" class="footer-link">Trabalhe Conosco</a></li>
                            <li><a href="index.html#formulario" class="footer-link">Matrículas</a></li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-info">
                    <div class="footer-address">
                        <h3>Endereço</h3>
                        <p>R. Florianópolis, 516 - Cidade Kemel<br>Poá - SP, CEP 08554-110</p>
                    </div>
                    <div class="footer-contact">
                        <h3>Contato</h3>
                        <p>
                            <a href="tel:+551146397768" class="footer-link">Telefone: (11) 46397-7768</a><br>
                            <a href="https://wa.me/551146397768" target="_blank" class="footer-link" rel="noopener">WhatsApp: (11) 46397-7768</a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 Colégio Neck. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
    `;
    
    function initFooter() {
        // Encontrar onde inserir o footer (antes do fechamento do body ou substituir footer existente)
        const existingFooter = document.querySelector('.footer');
        
        // Remover footer existente se houver
        if (existingFooter) {
            existingFooter.remove();
        }
        
        // Inserir novo footer no final do body, antes dos scripts
        const body = document.body;
        
        // Procurar pelo script do footer-component para inserir antes dele
        const footerScript = document.querySelector('script[src*="footer-component"]');
        
        if (footerScript) {
            // Inserir antes do script do componente
            footerScript.insertAdjacentHTML('beforebegin', footerHTML);
        } else {
            // Se não encontrar o script, procurar por qualquer script antes do </body>
            const scripts = body.querySelectorAll('script');
            if (scripts.length > 0) {
                // Inserir antes do primeiro script
                scripts[0].insertAdjacentHTML('beforebegin', footerHTML);
            } else {
                // Inserir no final do body
                body.insertAdjacentHTML('beforeend', footerHTML);
            }
        }
    }
    
    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooter);
    } else {
        initFooter();
    }
})();

