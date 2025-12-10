#!/usr/bin/env python3
import re
import os

# Template do footer completo
FOOTER_TEMPLATE = """                <div class="footer-logo">
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

# Menu reduzido base
MENU_BASE = """                <nav style="display: flex; gap: var(--spacing-md); align-items: center; flex-wrap: wrap;">
                    <a href="index.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Home</a>
                    <a href="sobre-nos.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Sobre Nós</a>
                    <a href="galeria.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Galeria</a>
                    <a href="educacao.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Educação</a>
                    <a href="area-aluno.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Área do Aluno</a>
                    <a href="blog.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Blog</a>
                    <a href="index.html#formulario" class="btn-cta-header">Matricule agora</a>
                </nav>"""

def update_page(filename):
    """Atualiza menu e footer de uma página"""
    if not os.path.exists(filename):
        return False
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Atualizar menu - substituir menu completo pelo reduzido
    menu_pattern = r'<nav style="display: flex[^>]*>.*?</nav>'
    new_menu = MENU_BASE
    
    # Destacar página atual (se estiver no menu)
    page_map = {
        'educacao.html': 'educacao.html',
        'area-aluno.html': 'area-aluno.html',
    }
    
    if filename in page_map:
        highlight = page_map[filename]
        new_menu = new_menu.replace(
            f'href="{highlight}" style="color: var(--color-gray-800);',
            f'href="{highlight}" style="color: var(--color-primary-blue); font-weight: 600;'
        )
    
    content = re.sub(menu_pattern, new_menu, content, flags=re.DOTALL)
    
    # Atualizar footer se não tiver footer-links-grid
    if 'footer-links-grid' not in content:
        # Padrão mais específico para capturar o footer-content completo
        footer_pattern = r'(<div class="footer-content">\s*<div class="footer-logo">.*?</div>\s*)(<div class="footer-info">)'
        replacement = FOOTER_TEMPLATE
        content = re.sub(footer_pattern, replacement, content, flags=re.DOTALL)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

# Páginas para atualizar
pages = [
    'calendario.html', 'chat.html', 'calculadora.html', 'downloads.html',
    'mapa.html', 'agendamento.html', 'quiz.html', 'newsletter.html'
]

for page in pages:
    if update_page(page):
        print(f"✓ {page}")
    else:
        print(f"✗ {page}")

print("\nConcluído!")

