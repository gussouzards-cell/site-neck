/**
 * ============================================
 * COMPONENTE MENU MOBILE / HAMBÚRGUER
 * Componente reutilizável para todas as páginas
 * ============================================
 */

(function() {
    'use strict';

    /**
     * Classe para gerenciar o menu mobile
     */
    class MobileMenu {
        constructor() {
            this.menuToggle = null;
            this.mobileMenu = null;
            this.mobileMenuOverlay = null;
            this.mobileMenuLinks = null;
            this.isOpen = false;
            
            this.init();
        }

        /**
         * Inicializa o componente
         */
        init() {
            // Aguarda o DOM estar pronto
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        }

        /**
         * Configura os elementos e event listeners
         */
        setup() {
            // Buscar elementos
            this.menuToggle = document.getElementById('menu-toggle');
            this.mobileMenu = document.getElementById('mobile-menu');
            this.mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            this.mobileMenuLinks = document.querySelectorAll('.mobile-menu-content a');

            // Verificar se os elementos existem
            if (!this.menuToggle || !this.mobileMenu || !this.mobileMenuOverlay) {
                console.warn('MobileMenu: Elementos do menu não encontrados');
                return;
            }

            // Configurar event listeners
            this.setupEventListeners();
            
            // Destacar página atual
            this.highlightCurrentPage();
        }

        /**
         * Configura todos os event listeners
         */
        setupEventListeners() {
            // Toggle menu ao clicar no botão hambúrguer
            this.menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });

            // Fechar menu ao clicar no overlay
            this.mobileMenuOverlay.addEventListener('click', () => {
                this.close();
            });

            // Fechar menu ao clicar em um link
            this.mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.close();
                });
            });

            // Fechar menu ao pressionar ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });

            // Fechar menu ao redimensionar para desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768 && this.isOpen) {
                    this.close();
                }
            });
        }

        /**
         * Abre ou fecha o menu
         */
        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }

        /**
         * Abre o menu
         */
        open() {
            if (this.isOpen) return;

            this.menuToggle.classList.add('active');
            this.mobileMenu.classList.add('active');
            this.mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.isOpen = true;

            // Disparar evento customizado
            window.dispatchEvent(new CustomEvent('mobileMenuOpen'));
        }

        /**
         * Fecha o menu
         */
        close() {
            if (!this.isOpen) return;

            this.menuToggle.classList.remove('active');
            this.mobileMenu.classList.remove('active');
            this.mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            this.isOpen = false;

            // Disparar evento customizado
            window.dispatchEvent(new CustomEvent('mobileMenuClose'));
        }

        /**
         * Destaca a página atual no menu
         */
        highlightCurrentPage() {
            if (!this.mobileMenuLinks) return;

            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            
            this.mobileMenuLinks.forEach(link => {
                const href = link.getAttribute('href');
                
                // Remover classe active de todos
                link.classList.remove('active');
                
                // Adicionar classe active se for a página atual
                if (href === currentPage || 
                    (currentPage === '' && href === 'index.html') ||
                    (currentPage === 'index.html' && href === 'index.html') ||
                    (href.includes('#') && href.split('#')[0] === currentPage)) {
                    link.classList.add('active');
                }
            });
        }

        /**
         * Verifica se o menu está aberto
         */
        getIsOpen() {
            return this.isOpen;
        }
    }

    // Inicializar o menu mobile automaticamente
    const mobileMenu = new MobileMenu();

    // Exportar para uso global (opcional)
    window.MobileMenu = MobileMenu;
    window.mobileMenuInstance = mobileMenu;

})();

