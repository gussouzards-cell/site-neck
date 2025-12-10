#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para atualizar o footer em todas as páginas HTML
"""

import os
import re

# Novo footer com todas as páginas organizadas
new_footer_links = """                    <div class="footer-links-column">
                        <h4>Institucional</h4>
                        <ul>
                            <li><a href="sobre-nos.html" class="footer-link">Sobre Nós</a></li>
                            <li><a href="historia.html" class="footer-link">Nossa História</a></li>
                            <li><a href="educacao.html" class="footer-link">Educação</a></li>
                            <li><a href="metodologia.html" class="footer-link">Metodologia</a></li>
                            <li><a href="galeria.html" class="footer-link">Galeria</a></li>
                            <li><a href="depoimentos.html" class="footer-link">Depoimentos</a></li>
                            <li><a href="premios.html" class="footer-link">Prêmios</a></li>
                            <li><a href="parceiros.html" class="footer-link">Parceiros</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-column">
                        <h4>Serviços</h4>
                        <ul>
                            <li><a href="area-aluno.html" class="footer-link">Área do Aluno</a></li>
                            <li><a href="portal-pais.html" class="footer-link">Portal dos Pais</a></li>
                            <li><a href="calculadora.html" class="footer-link">Calculadora</a></li>
                            <li><a href="horarios.html" class="footer-link">Horários</a></li>
                            <li><a href="cardapio.html" class="footer-link">Cardápio</a></li>
                            <li><a href="downloads.html" class="footer-link">Downloads</a></li>
                            <li><a href="agendamento.html" class="footer-link">Agendar Visita</a></li>
                            <li><a href="biblioteca-virtual.html" class="footer-link">Biblioteca Virtual</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-column">
                        <h4>Informações</h4>
                        <ul>
                            <li><a href="blog.html" class="footer-link">Blog</a></li>
                            <li><a href="eventos.html" class="footer-link">Eventos</a></li>
                            <li><a href="faq.html" class="footer-link">FAQ</a></li>
                            <li><a href="calendario.html" class="footer-link">Calendário</a></li>
                            <li><a href="quiz.html" class="footer-link">Quiz</a></li>
                            <li><a href="newsletter.html" class="footer-link">Newsletter</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links-column">
                        <h4>Contato</h4>
                        <ul>
                            <li><a href="chat.html" class="footer-link">Fale Conosco</a></li>
                            <li><a href="mapa.html" class="footer-link">Localização</a></li>
                            <li><a href="trabalhe-conosco.html" class="footer-link">Trabalhe Conosco</a></li>
                            <li><a href="index.html#formulario" class="footer-link">Matrículas</a></li>
                        </ul>
                    </div>"""

def update_footer(filename):
    """Atualiza o footer de um arquivo HTML"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Padrão para encontrar o bloco de links do footer
        pattern = r'(<div class="footer-links-grid">)(.*?)(</div>\s*</div>\s*<div class="footer-info">)'
        
        def replace_footer(match):
            return match.group(1) + '\n' + new_footer_links + '\n                ' + match.group(3)
        
        new_content = re.sub(pattern, replace_footer, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
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

print("Atualizando footer em todas as páginas...\n")

updated = 0
for filename in html_files:
    if os.path.exists(filename):
        if update_footer(filename):
            print(f"✓ {filename}")
            updated += 1
        else:
            print(f"- {filename} (sem alterações ou erro)")
    else:
        print(f"✗ {filename} (não encontrado)")

print(f"\n{updated} arquivo(s) atualizado(s)!")

