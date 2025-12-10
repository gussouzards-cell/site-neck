/**
 * Chat Online Widget
 * Integração com chat em tempo real (Tawk.to, Crisp, ou similar)
 */

(function() {
    'use strict';
    
    // Configuração do chat
    const CHAT_ENABLED = true;
    const CHAT_PROVIDER = 'tawk'; // 'tawk', 'crisp', 'custom'
    
    // Tawk.to (gratuito)
    if (CHAT_ENABLED && CHAT_PROVIDER === 'tawk') {
        // Adicionar script do Tawk.to
        // Substitua 'YOUR_PROPERTY_ID' e 'YOUR_WIDGET_ID' pelos seus IDs do Tawk.to
        const tawkScript = document.createElement('script');
        tawkScript.type = 'text/javascript';
        tawkScript.async = true;
        tawkScript.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
        tawkScript.charset = 'UTF-8';
        tawkScript.setAttribute('crossorigin', '*');
        
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(tawkScript, firstScript);
    }
    
    // Crisp (alternativa)
    if (CHAT_ENABLED && CHAT_PROVIDER === 'crisp') {
        // Adicionar script do Crisp
        // Substitua 'YOUR_WEBSITE_ID' pelo seu ID do Crisp
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = 'YOUR_WEBSITE_ID';
        
        const crispScript = document.createElement('script');
        crispScript.src = 'https://client.crisp.chat/l.js';
        crispScript.async = true;
        document.getElementsByTagName('head')[0].appendChild(crispScript);
    }
    
    // Chat customizado (fallback)
    if (CHAT_ENABLED && CHAT_PROVIDER === 'custom') {
        createCustomChatWidget();
    }
    
    function createCustomChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.id = 'custom-chat-widget';
        chatWidget.innerHTML = `
            <div class="chat-widget-toggle" id="chat-toggle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="currentColor"/>
                </svg>
            </div>
            <div class="chat-widget-container" id="chat-container">
                <div class="chat-widget-header">
                    <h3>Fale Conosco</h3>
                    <button class="chat-close" id="chat-close">×</button>
                </div>
                <div class="chat-widget-messages" id="chat-messages">
                    <div class="chat-message bot">
                        <p>Olá! Como posso ajudar você hoje?</p>
                    </div>
                </div>
                <div class="chat-widget-input">
                    <input type="text" id="chat-input" placeholder="Digite sua mensagem...">
                    <button id="chat-send">Enviar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatWidget);
        
        const toggle = document.getElementById('chat-toggle');
        const container = document.getElementById('chat-container');
        const close = document.getElementById('chat-close');
        const input = document.getElementById('chat-input');
        const send = document.getElementById('chat-send');
        const messages = document.getElementById('chat-messages');
        
        toggle.addEventListener('click', () => {
            container.classList.toggle('active');
        });
        
        close.addEventListener('click', () => {
            container.classList.remove('active');
        });
        
        function sendMessage() {
            const text = input.value.trim();
            if (!text) return;
            
            // Adicionar mensagem do usuário
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user';
            userMsg.innerHTML = `<p>${text}</p>`;
            messages.appendChild(userMsg);
            
            input.value = '';
            messages.scrollTop = messages.scrollHeight;
            
            // Resposta automática (simulação)
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot';
                botMsg.innerHTML = '<p>Obrigado pela mensagem! Nossa equipe entrará em contato em breve pelo WhatsApp.</p>';
                messages.appendChild(botMsg);
                messages.scrollTop = messages.scrollHeight;
            }, 1000);
        }
        
        send.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
})();

