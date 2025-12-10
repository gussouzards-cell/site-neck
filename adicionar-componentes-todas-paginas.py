#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para adicionar os componentes de header e footer em todas as páginas HTML
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
        
        # Procurar por scripts existentes antes do </body>
        # Inserir os componentes ANTES de qualquer outro script
        if '</body>' in content:
            # Procurar pelo primeiro script antes do </body>
            # Se não houver scripts, inserir antes do </body>
            # Se houver scripts, inserir antes do primeiro
            
            # Padrão: qualquer script antes do </body>
            script_before_body = r'(<script[^>]*>.*?</script>\s*)(</body>)'
            
            if re.search(script_before_body, content, re.DOTALL):
                # Tem scripts, inserir antes do primeiro
                content = re.sub(
                    r'(<script[^>]*>.*?</script>\s*)(</body>)',
                    components_scripts + r'\1\2',
                    content,
                    count=1,
                    flags=re.DOTALL
                )
            else:
                # Não tem scripts, inserir antes do </body>
                content = re.sub(
                    r'(</body>)',
                    components_scripts + r'\1',
                    content
                )
        elif '</html>' in content:
            # Se não tem </body>, inserir antes do </html>
            content = re.sub(
                r'(</html>)',
                components_scripts + r'\1',
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

# Lista de arquivos HTML (exceto email-template.html e exemplo-pagina-componentes.html)
html_files = [
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

print("Adicionando componentes em todas as páginas...\n")

updated = 0
for filename in html_files:
    if os.path.exists(filename):
        if add_components_to_page(filename):
            print(f"✓ {filename}")
            updated += 1
        else:
            print(f"- {filename} (já tem componentes ou sem alterações)")
    else:
        print(f"✗ {filename} (não encontrado)")

print(f"\n{updated} arquivo(s) atualizado(s)!")

