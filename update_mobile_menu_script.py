#!/usr/bin/env python3
import re
import os

# Script para adicionar mobile-menu.js antes de main.js em todas as páginas
MOBILE_MENU_SCRIPT = '    <script src="assets/js/mobile-menu.js"></script>'

def update_page(filename):
    """Adiciona mobile-menu.js antes de main.js"""
    if not os.path.exists(filename):
        return False
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Verificar se já tem mobile-menu.js
    if 'mobile-menu.js' in content:
        return True  # Já atualizado
    
    # Adicionar mobile-menu.js antes de main.js
    pattern = r'(<script src="assets/js/main\.js"></script>)'
    replacement = f'{MOBILE_MENU_SCRIPT}\n    <script src="assets/js/main.js"></script>'
    content = re.sub(pattern, replacement, content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

# Páginas para atualizar
pages = [
    'index.html', 'sobre-nos.html', 'galeria.html', 'historia.html',
    'educacao.html', 'area-aluno.html', 'blog.html', 'faq.html',
    'calendario.html', 'chat.html', 'calculadora.html', 'downloads.html',
    'mapa.html', 'agendamento.html', 'quiz.html', 'newsletter.html'
]

for page in pages:
    if update_page(page):
        print(f"✓ {page}")
    else:
        print(f"✗ {page}")

print("\nConcluído!")

