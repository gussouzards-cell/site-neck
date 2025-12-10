// Script para atualizar navegação em todas as páginas
// Este arquivo é apenas para referência - as atualizações serão feitas manualmente

const menuReduzido = `
                <nav style="display: flex; gap: var(--spacing-md); align-items: center; flex-wrap: wrap;">
                    <a href="index.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Home</a>
                    <a href="sobre-nos.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Sobre Nós</a>
                    <a href="galeria.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Galeria</a>
                    <a href="educacao.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Educação</a>
                    <a href="area-aluno.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Área do Aluno</a>
                    <a href="blog.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Blog</a>
                    <a href="index.html#formulario" class="btn-cta-header">Matricule agora</a>
                </nav>
`;

const footerCompleto = `
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
                            <li><a href="galeria.html" class="footer-link">Galeria</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-column">
                        <h4>Serviços</h4>
                        <ul>
                            <li><a href="area-aluno.html" class="footer-link">Área do Aluno</a></li>
                            <li><a href="calculadora.html" class="footer-link">Calculadora</a></li>
                            <li><a href="downloads.html" class="footer-link">Downloads</a></li>
                            <li><a href="agendamento.html" class="footer-link">Agendar Visita</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-column">
                        <h4>Informações</h4>
                        <ul>
                            <li><a href="blog.html" class="footer-link">Blog</a></li>
                            <li><a href="faq.html" class="footer-link">FAQ</a></li>
                            <li><a href="calendario.html" class="footer-link">Calendário</a></li>
                            <li><a href="quiz.html" class="footer-link">Quiz</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-column">
                        <h4>Contato</h4>
                        <ul>
                            <li><a href="chat.html" class="footer-link">Fale Conosco</a></li>
                            <li><a href="mapa.html" class="footer-link">Localização</a></li>
                            <li><a href="newsletter.html" class="footer-link">Newsletter</a></li>
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
`;

