#!/usr/bin/env python3
import re
import os

# Template do botão hambúrguer e menu mobile
MENU_TOGGLE = """                <button class="menu-toggle" id="menu-toggle" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>"""

MOBILE_MENU = """    <!-- Menu Mobile -->
    <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>
    <div class="mobile-menu" id="mobile-menu">
        <div class="mobile-menu-content">
            <a href="index.html">Home</a>
            <a href="sobre-nos.html">Sobre Nós</a>
            <a href="galeria.html">Galeria</a>
            <a href="educacao.html">Educação</a>
            <a href="area-aluno.html">Área do Aluno</a>
            <a href="blog.html">Blog</a>
            <a href="index.html#formulario" class="btn-cta-header">Matricule agora</a>
        </div>
    </div>"""

def update_page(filename):
    """Adiciona menu hambúrguer e menu mobile a uma página"""
    if not os.path.exists(filename):
        return False
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Verificar se já tem o menu toggle
    if 'menu-toggle' in content:
        return True  # Já atualizado
    
    # Adicionar botão hambúrguer após o nav
    nav_pattern = r'(</nav>\s*</div>\s*</div>\s*</header>)'
    replacement = f'</nav>\n{MENU_TOGGLE}\n            </div>\n        </div>\n    </header>'
    content = re.sub(nav_pattern, replacement, content, flags=re.DOTALL)
    
    # Adicionar menu mobile após o header
    header_pattern = r'(</header>)'
    replacement = f'</header>\n\n{MOBILE_MENU}'
    content = re.sub(header_pattern, replacement, content, flags=re.DOTALL)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

# Páginas para atualizar
pages = [
    'sobre-nos.html', 'galeria.html', 'historia.html', 'educacao.html',
    'area-aluno.html', 'faq.html', 'calendario.html', 'chat.html',
    'calculadora.html', 'downloads.html', 'mapa.html', 'agendamento.html',
    'quiz.html', 'newsletter.html'
]

for page in pages:
    if update_page(page):
        print(f"✓ {page}")
    else:
        print(f"✗ {page}")

print("\nConcluído!")

