#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para atualizar todas as páginas HTML com os componentes de header e footer
"""

import os
import re

def update_page_with_components(filename):
    """Atualiza uma página HTML para usar os componentes"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 1. Remover header existente e adicionar script do componente
        header_pattern = r'<!-- Header Fixo -->.*?<!-- Menu Mobile -->.*?</div>\s*</div>\s*</header>'
        header_match = re.search(header_pattern, content, re.DOTALL)
        
        if header_pattern in content or header_match:
            # Remover header e menu mobile existentes
            content = re.sub(header_pattern, '', content, flags=re.DOTALL)
            content = re.sub(r'<div class="mobile-menu-overlay".*?</div>\s*</div>', '', content, flags=re.DOTALL)
            
            # Adicionar script do header component antes dos outros scripts
            header_script = '    <script src="assets/js/components/header-component.js"></script>\n'
            
            # Encontrar onde inserir (antes do primeiro script ou antes do fechamento do body)
            script_pattern = r'(<script src="assets/js/)'
            if re.search(script_pattern, content):
                content = re.sub(script_pattern, header_script + r'    \1', content, count=1)
            else:
                # Inserir antes do fechamento do body
                content = re.sub(r'(</body>)', header_script + r'\1', content)
        
        # 2. Remover footer existente e adicionar script do componente
        footer_pattern = r'<!-- Footer -->.*?</footer>'
        footer_match = re.search(footer_pattern, content, re.DOTALL)
        
        if footer_pattern in content or footer_match:
            # Remover footer existente
            content = re.sub(footer_pattern, '', content, flags=re.DOTALL)
            
            # Adicionar script do footer component
            footer_script = '    <script src="assets/js/components/footer-component.js"></script>\n'
            
            # Encontrar onde inserir (antes do fechamento do body ou após outros scripts)
            if '</body>' in content:
                content = re.sub(r'(</body>)', footer_script + r'\1', content)
            elif '</html>' in content:
                content = re.sub(r'(</html>)', footer_script + r'\1', content)
        
        # 3. Garantir que os scripts necessários estejam presentes
        required_scripts = [
            'assets/js/dropdown-menu.js',
            'assets/js/mobile-menu.js'
        ]
        
        for script in required_scripts:
            script_tag = f'<script src="{script}"></script>'
            if script_tag not in content:
                # Adicionar antes do fechamento do body
                content = re.sub(r'(</body>)', f'    {script_tag}\n\\1', content)
        
        if content != original_content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Erro ao processar {filename}: {e}")
        return False

# Lista de arquivos HTML (exceto email-template.html)
html_files = [
    'index.html',
    'sobre-nos.html',
    'historia.html',
    'educacao.html',
    'metodologia.html',
    'galeria.html',
    'depoimentos.html',
    'premios.html',
    'parceiros.html',
    'area-aluno.html',
    'portal-pais.html',
    'calculadora.html',
    'horarios.html',
    'cardapio.html',
    'downloads.html',
    'agendamento.html',
    'biblioteca-virtual.html',
    'blog.html',
    'eventos.html',
    'faq.html',
    'calendario.html',
    'quiz.html',
    'newsletter.html',
    'chat.html',
    'mapa.html',
    'trabalhe-conosco.html',
    'termos-de-uso.html'
]

print("Atualizando páginas com componentes...\n")

updated = 0
for filename in html_files:
    if os.path.exists(filename):
        if update_page_with_components(filename):
            print(f"✓ {filename}")
            updated += 1
        else:
            print(f"- {filename} (sem alterações ou erro)")
    else:
        print(f"✗ {filename} (não encontrado)")

print(f"\n{updated} arquivo(s) atualizado(s)!")

