#!/usr/bin/env python3
"""
Script para atualizar menu e footer em todas as páginas HTML
"""
import os
import re

# Menu reduzido padrão (será ajustado para cada página)
MENU_REDUZIDO = """                <nav style="display: flex; gap: var(--spacing-md); align-items: center; flex-wrap: wrap;">
                    <a href="index.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Home</a>
                    <a href="sobre-nos.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Sobre Nós</a>
                    <a href="galeria.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Galeria</a>
                    <a href="educacao.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Educação</a>
                    <a href="area-aluno.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Área do Aluno</a>
                    <a href="blog.html" style="color: var(--color-gray-800); text-decoration: none; font-weight: 500;">Blog</a>
                    <a href="index.html#formulario" class="btn-cta-header">Matricule agora</a>
                </nav>"""

FOOTER_LINKS = """                <div class="footer-logo">
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

# Mapeamento de páginas para destacar no menu
PAGE_HIGHLIGHTS = {
    'index.html': 'index.html',
    'sobre-nos.html': 'sobre-nos.html',
    'galeria.html': 'galeria.html',
    'historia.html': 'historia.html',
    'educacao.html': 'educacao.html',
    'area-aluno.html': 'area-aluno.html',
    'blog.html': 'blog.html',
    'faq.html': 'faq.html',
    'calendario.html': 'calendario.html',
    'chat.html': 'chat.html',
    'calculadora.html': 'calculadora.html',
    'downloads.html': 'downloads.html',
    'mapa.html': 'mapa.html',
    'agendamento.html': 'agendamento.html',
    'quiz.html': 'quiz.html',
    'newsletter.html': 'newsletter.html',
}

def get_menu_for_page(filename):
    """Retorna o menu personalizado para cada página"""
    menu = MENU_REDUZIDO
    page_name = filename
    
    # Destacar a página atual
    if page_name in PAGE_HIGHLIGHTS:
        highlight = PAGE_HIGHLIGHTS[page_name]
        menu = menu.replace(
            f'href="{highlight}" style="color: var(--color-gray-800);',
            f'href="{highlight}" style="color: var(--color-primary-blue); font-weight: 600;'
        )
    
    return menu

def update_menu(content, filename):
    """Atualiza o menu na página"""
    # Padrão para encontrar o menu completo
    pattern = r'(<nav style="display: flex[^>]*>.*?</nav>)'
    
    new_menu = get_menu_for_page(filename)
    
    # Substitui o menu antigo pelo novo
    content = re.sub(pattern, new_menu, content, flags=re.DOTALL)
    
    return content

def update_footer(content):
    """Atualiza o footer na página"""
    # Padrão para encontrar o footer-content antigo
    pattern = r'(<div class="footer-content">.*?<div class="footer-info">)'
    
    replacement = FOOTER_LINKS
    
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    return content

def main():
    """Função principal"""
    html_files = [
        'galeria.html', 'historia.html', 'educacao.html', 'area-aluno.html',
        'faq.html', 'calendario.html', 'chat.html', 'calculadora.html',
        'downloads.html', 'mapa.html', 'agendamento.html', 'quiz.html',
        'newsletter.html'
    ]
    
    for filename in html_files:
        if not os.path.exists(filename):
            print(f"Arquivo {filename} não encontrado, pulando...")
            continue
        
        print(f"Atualizando {filename}...")
        
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Atualiza menu
        content = update_menu(content, filename)
        
        # Atualiza footer se não tiver footer-links-grid
        if 'footer-links-grid' not in content:
            content = update_footer(content)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ {filename} atualizado!")
    
    print("\nTodas as páginas foram atualizadas!")

if __name__ == '__main__':
    main()

