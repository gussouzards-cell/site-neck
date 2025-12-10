#!/usr/bin/env python3
import re
import os

# Template do menu reduzido (será ajustado para destacar a página atual)
MENU_TEMPLATE = """                <nav style="display: flex; gap: var(--spacing-md); align-items: center; flex-wrap: wrap;">
                    <a href="index.html" style="color: {home_color}; text-decoration: none; font-weight: {home_weight};">Home</a>
                    <a href="sobre-nos.html" style="color: {sobre_color}; text-decoration: none; font-weight: {sobre_weight};">Sobre Nós</a>
                    <a href="galeria.html" style="color: {galeria_color}; text-decoration: none; font-weight: {galeria_weight};">Galeria</a>
                    <a href="educacao.html" style="color: {educacao_color}; text-decoration: none; font-weight: {educacao_weight};">Educação</a>
                    <a href="area-aluno.html" style="color: {area_color}; text-decoration: none; font-weight: {area_weight};">Área do Aluno</a>
                    <a href="blog.html" style="color: {blog_color}; text-decoration: none; font-weight: {blog_weight};">Blog</a>
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

def get_menu_for_page(page_name):
    """Gera menu personalizado destacando a página atual"""
    colors = {
        'home': 'var(--color-gray-800)',
        'sobre': 'var(--color-gray-800)',
        'galeria': 'var(--color-gray-800)',
        'educacao': 'var(--color-gray-800)',
        'area': 'var(--color-gray-800)',
        'blog': 'var(--color-gray-800)'
    }
    weights = {
        'home': '500',
        'sobre': '500',
        'galeria': '500',
        'educacao': '500',
        'area': '500',
        'blog': '500'
    }
    
    # Destacar página atual
    if 'historia' in page_name:
        colors['sobre'] = 'var(--color-primary-blue)'
        weights['sobre'] = '600'
    elif 'educacao' in page_name:
        colors['educacao'] = 'var(--color-primary-blue)'
        weights['educacao'] = '600'
    elif 'area-aluno' in page_name:
        colors['area'] = 'var(--color-primary-blue)'
        weights['area'] = '600'
    elif 'faq' in page_name:
        colors['blog'] = 'var(--color-primary-blue)'
        weights['blog'] = '600'
    elif 'calendario' in page_name:
        colors['blog'] = 'var(--color-primary-blue)'
        weights['blog'] = '600'
    elif 'chat' in page_name:
        colors['blog'] = 'var(--color-primary-blue)'
        weights['blog'] = '600'
    elif 'calculadora' in page_name:
        colors['blog'] = 'var(--color-primary-blue)'
        weights['blog'] = '600'
    elif 'downloads' in page_name:
        colors['blog'] = 'var(--color-primary-blue)'
        weights['blog'] = '600'
    elif 'mapa' in page_name:
        colors['blog'] = 'var(--color-primary-blue)'
        weights['blog'] = '600'
    elif 'agendamento' in page_name:
        colors['blog'] = 'var(--color-primary-blue)'
        weights['blog'] = '600'
    elif 'quiz' in page_name:
        colors['blog'] = 'var(--color-primary-blue)'
        weights['blog'] = '600'
    elif 'newsletter' in page_name:
        colors['blog'] = 'var(--color-primary-blue)'
        weights['blog'] = '600'
    
    return MENU_TEMPLATE.format(
        home_color=colors['home'], home_weight=weights['home'],
        sobre_color=colors['sobre'], sobre_weight=weights['sobre'],
        galeria_color=colors['galeria'], galeria_weight=weights['galeria'],
        educacao_color=colors['educacao'], educacao_weight=weights['educacao'],
        area_color=colors['area'], area_weight=weights['area'],
        blog_color=colors['blog'], blog_weight=weights['blog']
    )

def update_file(filename):
    """Atualiza menu e footer de um arquivo"""
    if not os.path.exists(filename):
        print(f"Arquivo {filename} não encontrado")
        return False
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Atualizar menu
    menu_pattern = r'(<nav style="display: flex[^>]*>.*?</nav>)'
    new_menu = get_menu_for_page(filename)
    content = re.sub(menu_pattern, new_menu, content, flags=re.DOTALL)
    
    # Atualizar footer se não tiver footer-links-grid
    if 'footer-links-grid' not in content:
        footer_pattern = r'(<div class="footer-content">.*?)(<div class="footer-info">)'
        replacement = FOOTER_LINKS
        content = re.sub(footer_pattern, replacement, content, flags=re.DOTALL)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

# Lista de arquivos para atualizar
files = [
    'historia.html', 'educacao.html', 'area-aluno.html', 'faq.html',
    'calendario.html', 'chat.html', 'calculadora.html', 'downloads.html',
    'mapa.html', 'agendamento.html', 'quiz.html', 'newsletter.html'
]

for file in files:
    if update_file(file):
        print(f"✓ {file} atualizado")
    else:
        print(f"✗ Erro ao atualizar {file}")

print("\nConcluído!")

