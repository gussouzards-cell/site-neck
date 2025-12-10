#!/usr/bin/env python3
import re

# Páginas para atualizar com seus respectivos destaques
pages = {
    'educacao.html': ('educacao.html', 'Educação'),
    'area-aluno.html': ('area-aluno.html', 'Área do Aluno'),
    'faq.html': ('blog.html', 'Blog'),  # FAQ não está no menu principal, destaca Blog
    'calendario.html': ('blog.html', 'Blog'),
    'chat.html': ('blog.html', 'Blog'),
    'calculadora.html': ('blog.html', 'Blog'),
    'downloads.html': ('blog.html', 'Blog'),
    'mapa.html': ('blog.html', 'Blog'),
    'agendamento.html': ('blog.html', 'Blog'),
    'quiz.html': ('blog.html', 'Blog'),
    'newsletter.html': ('blog.html', 'Blog'),
}

# Menu reduzido base
menu_base = """                <nav style="display: flex; gap: var(--spacing-md); align-items: center; flex-wrap: wrap;">
                    <a href="index.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Home</a>
                    <a href="sobre-nos.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Sobre Nós</a>
                    <a href="galeria.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Galeria</a>
                    <a href="educacao.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Educação</a>
                    <a href="area-aluno.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Área do Aluno</a>
                    <a href="blog.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Blog</a>
                    <a href="index.html#formulario" class="btn-cta-header">Matricule agora</a>
                </nav>"""

# Footer completo
footer_template = """                <div class="footer-logo">
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
                
                <div class="footer-info">"""

def update_page(filename, highlight_page):
    """Atualiza uma página"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Atualizar menu
        menu_pattern = r'<nav style="display: flex[^>]*>.*?</nav>'
        new_menu = menu_base
        
        # Destacar página atual no menu
        if highlight_page in new_menu:
            new_menu = new_menu.replace(
                f'href="{highlight_page}" style="color: var(--color-gray-800);',
                f'href="{highlight_page}" style="color: var(--color-primary-blue); font-weight: 600;'
            )
        
        content = re.sub(menu_pattern, new_menu, content, flags=re.DOTALL)
        
        # Atualizar footer
        if 'footer-links-grid' not in content:
            footer_pattern = r'(<div class="footer-content">.*?)(<div class="footer-info">)'
            replacement = footer_template
            content = re.sub(footer_pattern, replacement, content, flags=re.DOTALL)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ {filename}")
        return True
    except Exception as e:
        print(f"✗ {filename}: {e}")
        return False

# Atualizar todas as páginas
for page, (highlight, _) in pages.items():
    update_page(page, highlight)

print("\nTodas as páginas foram atualizadas!")

