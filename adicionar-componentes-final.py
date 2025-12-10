#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para adicionar os componentes de header e footer em TODAS as páginas HTML
"""

import os
import re

def add_components_to_page(filename):
    """Adiciona os scripts dos componentes em uma página HTML"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Verificar se já tem os componentes
        if 'header-component.js' in content and 'footer-component.js' in content:
            return False  # Já tem os componentes
        
        # Scripts dos componentes
        components_scripts = '''    <!-- Componentes Header e Footer -->
    <script src="assets/js/components/header-component.js"></script>
    <script src="assets/js/components/footer-component.js"></script>
    <script src="assets/js/dropdown-menu.js"></script>
    <script src="assets/js/mobile-menu.js"></script>
'''
        
        # Procurar por </body> e inserir antes dele
        if '</body>' in content:
            # Inserir antes do </body>, mas ANTES de qualquer script existente
            # Procurar pelo padrão: qualquer coisa antes de </body>
            
            # Se houver scripts antes do </body>, inserir antes do primeiro script
            # Caso contrário, inserir logo antes do </body>
            
            # Padrão mais específico: procurar por scripts antes do </body>
            pattern = r'(\s*)(<script[^>]*>.*?</script>\s*)(</body>)'
            
            if re.search(pattern, content, re.DOTALL):
                # Tem scripts, inserir antes do primeiro
                content = re.sub(
                    pattern,
                    r'\1' + components_scripts + r'\2\3',
                    content,
                    count=1,
                    flags=re.DOTALL
                )
            else:
                # Não tem scripts, inserir antes do </body>
                content = re.sub(
                    r'(\s*)(</body>)',
                    r'\1' + components_scripts + r'\1\2',
                    content
                )
        elif '</html>' in content:
            # Se não tem </body>, inserir antes do </html>
            content = re.sub(
                r'(\s*)(</html>)',
                r'\1' + components_scripts + r'\1\2',
                content
            )
        else:
            # Adicionar no final do arquivo
            content += '\n' + components_scripts
        
        if content != original_content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Erro ao processar {filename}: {e}")
        return False

# Lista de TODOS os arquivos HTML (exceto templates e exemplos)
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

print("=" * 60)
print("Adicionando componentes em TODAS as páginas HTML...")
print("=" * 60)
print()

updated = 0
skipped = 0
not_found = 0

for filename in html_files:
    if os.path.exists(filename):
        if add_components_to_page(filename):
            print(f"✓ {filename} - Componentes adicionados")
            updated += 1
        else:
            print(f"- {filename} - Já tem componentes")
            skipped += 1
    else:
        print(f"✗ {filename} - Arquivo não encontrado")
        not_found += 1

print()
print("=" * 60)
print(f"RESUMO:")
print(f"  ✓ {updated} arquivo(s) atualizado(s)")
print(f"  - {skipped} arquivo(s) já tinha componentes")
print(f"  ✗ {not_found} arquivo(s) não encontrado(s)")
print("=" * 60)

