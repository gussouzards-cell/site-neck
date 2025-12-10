/**
 * ============================================
 * CONFIGURAÇÕES - AJUSTE AQUI
 * ============================================
 */

// CONFIGURE: URL do webhook para onde os dados serão enviados
// Exemplos:
// - Zapier: 'https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx'
// - Make.com: 'https://hook.us1.make.com/xxxxx'
// - Webhook.site: 'https://webhook.site/xxxxx'
// - Backend próprio: 'https://seu-dominio.com/api/leads'
const WEBHOOK_URL = 'https://webhook.site/seu-webhook-url-aqui';

// CONFIGURE: ID do Facebook Pixel (opcional)
// Se não usar, deixe como null
const FACEBOOK_PIXEL_ID = null; // Exemplo: '123456789012345'

// CONFIGURE: ID do Google Analytics (opcional)
// Se não usar, deixe como null
const GOOGLE_ANALYTICS_ID = null; // Exemplo: 'G-XXXXXXXXXX'

// CONFIGURE: Número do WhatsApp para envio de mensagens
// Formato: 551146397768 (código do país + DDD + número, sem espaços ou caracteres especiais)
const WHATSAPP_NUMBER = '551146397768';

/**
 * ============================================
 * INICIALIZAÇÃO
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeUTMTracking();
    initializePhoneMask();
    initializeForm();
    initializeScrollEffects();
    initializeMobileMenu();
});

/**
 * ============================================
 * UTM TRACKING
 * ============================================
 */
function initializeUTMTracking() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Capturar UTM parameters
    const utmSource = urlParams.get('utm_source') || '';
    const utmMedium = urlParams.get('utm_medium') || '';
    const utmCampaign = urlParams.get('utm_campaign') || '';
    const utmTerm = urlParams.get('utm_term') || '';
    const utmContent = urlParams.get('utm_content') || '';
    
    // Preencher campos hidden do formulário
    document.getElementById('utm_source').value = utmSource;
    document.getElementById('utm_medium').value = utmMedium;
    document.getElementById('utm_campaign').value = utmCampaign;
    document.getElementById('utm_term').value = utmTerm;
    document.getElementById('utm_content').value = utmContent;
    document.getElementById('referrer').value = document.referrer || '';
    document.getElementById('landing_page').value = window.location.href;
    
    // Salvar no localStorage para persistência
    if (utmSource || utmMedium || utmCampaign) {
        localStorage.setItem('utm_source', utmSource);
        localStorage.setItem('utm_medium', utmMedium);
        localStorage.setItem('utm_campaign', utmCampaign);
        localStorage.setItem('utm_term', utmTerm);
        localStorage.setItem('utm_content', utmContent);
    } else {
        // Se não houver UTM na URL, tentar recuperar do localStorage
        document.getElementById('utm_source').value = localStorage.getItem('utm_source') || '';
        document.getElementById('utm_medium').value = localStorage.getItem('utm_medium') || '';
        document.getElementById('utm_campaign').value = localStorage.getItem('utm_campaign') || '';
        document.getElementById('utm_term').value = localStorage.getItem('utm_term') || '';
        document.getElementById('utm_content').value = localStorage.getItem('utm_content') || '';
    }
}

/**
 * ============================================
 * MÁSCARA DE TELEFONE
 * ============================================
 */
function initializePhoneMask() {
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 10) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else {
            value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        }
        
        e.target.value = value;
    });
}

/**
 * ============================================
 * INICIALIZAÇÃO DO FORMULÁRIO
 * ============================================
 */
function initializeForm() {
    const form = document.getElementById('leadForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validação do checkbox LGPD
        const lgpdConsent = document.getElementById('lgpdConsent');
        if (!lgpdConsent.checked) {
            alert('Por favor, aceite o tratamento dos dados pessoais para continuar.');
            lgpdConsent.focus();
            return;
        }
        
        // Desabilitar botão e mostrar loading
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        // Coletar dados do formulário
        const formData = collectFormData();
        
        try {
            // Enviar para webhook (não bloqueia se falhar)
            sendToWebhook(formData).catch(error => {
                console.warn('Webhook não enviado (opcional):', error);
            });
            
            // Disparar eventos de analytics
            trackLeadSubmission(formData);
            
            // Criar e abrir mensagem no WhatsApp
            openWhatsAppMessage(formData);
            
            // Mostrar mensagem de sucesso
            showSuccessMessage();
            
            // Resetar formulário
            form.reset();
            
            // Limpar localStorage de UTM após envio bem-sucedido
            clearUTMStorage();
            
        } catch (error) {
            console.error('Erro ao processar formulário:', error);
            alert('Ocorreu um erro ao processar o formulário. Por favor, tente novamente.');
        } finally {
            // Reabilitar botão
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
    
    // Validação em tempo real
    const requiredInputs = form.querySelectorAll('input[required], select[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

/**
 * ============================================
 * COLETAR DADOS DO FORMULÁRIO
 * ============================================
 */
function collectFormData() {
    return {
        parentName: document.getElementById('parentName').value.trim(),
        childName: document.getElementById('childName').value.trim(),
        childAge: document.getElementById('childAge').value,
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        turno: document.getElementById('turno').value,
        extracurricular: document.getElementById('extracurricular').checked ? 'sim' : 'não',
        lgpdConsent: document.getElementById('lgpdConsent').checked,
        utm_source: document.getElementById('utm_source').value,
        utm_medium: document.getElementById('utm_medium').value,
        utm_campaign: document.getElementById('utm_campaign').value,
        utm_term: document.getElementById('utm_term').value,
        utm_content: document.getElementById('utm_content').value,
        referrer: document.getElementById('referrer').value,
        landing_page: document.getElementById('landing_page').value,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`
    };
}

/**
 * ============================================
 * CRIAR MENSAGEM PARA WHATSAPP
 * ============================================
 */
function createWhatsAppMessage(data) {
    // Mapear valores de turno para texto legível
    const turnoMap = {
        'manha': 'Manhã',
        'tarde': 'Tarde',
        'integral': 'Integral',
        'indiferente': 'Indiferente'
    };
    
    // Mapear valores de série/idade para texto legível
    const serieMap = {
        'bercario': 'Berçário',
        'maternal': 'Maternal',
        'pre1': 'Pré I',
        'pre2': 'Pré II',
        '1ano': '1º Ano',
        '2ano': '2º Ano',
        '3ano': '3º Ano',
        '4ano': '4º Ano',
        '5ano': '5º Ano'
    };
    
    const turnoTexto = turnoMap[data.turno] || data.turno;
    const serieTexto = serieMap[data.childAge] || data.childAge;
    
    // Mensagem como se fosse o pai entrando em contato
    let message = `Olá! Meu nome é *${data.parentName}* e gostaria de informações sobre matrícula no Colégio Neck.\n\n`;
    message += `Tenho interesse em matricular meu filho(a) *${data.childName}* no(a) *${serieTexto}*.\n\n`;
    message += `*Turno de interesse:* ${turnoTexto}\n`;
    
    if (data.extracurricular === 'sim') {
        message += `*Atividades extracurriculares:* Tenho interesse em atividades como Balé, Judô, Libras, Inglês, Maker, etc.\n\n`;
    } else {
        message += `\n`;
    }
    
    message += `*Meus dados para contato:*\n`;
    message += `📱 Telefone: ${data.phone}\n`;
    message += `📧 E-mail: ${data.email}\n\n`;
    message += `Aguardo retorno para mais informações. Obrigado! 😊`;
    
    return message;
}

/**
 * ============================================
 * ABRIR WHATSAPP COM MENSAGEM
 * ============================================
 */
function openWhatsAppMessage(data) {
    const message = createWhatsAppMessage(data);
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Pequeno delay para melhorar UX (mostrar mensagem de sucesso primeiro)
    setTimeout(() => {
        // Abrir WhatsApp em nova aba/janela
        window.open(whatsappURL, '_blank');
    }, 500);
}

/**
 * ============================================
 * ENVIAR PARA WEBHOOK
 * ============================================
 */
async function sendToWebhook(data) {
    if (!WEBHOOK_URL || WEBHOOK_URL.includes('seu-webhook-url-aqui')) {
        console.warn('⚠️ WEBHOOK_URL não configurado. Configure a constante WEBHOOK_URL no início do arquivo.');
        // Simular sucesso para desenvolvimento
        return Promise.resolve();
    }
    
    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar para webhook:', error);
        throw error;
    }
}

/**
 * ============================================
 * TRACKING DE ANALYTICS
 * ============================================
 */
function trackLeadSubmission(data) {
    // Google Analytics / GA4 via dataLayer
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': 'lead_submitted',
            'lead_type': 'matricula',
            'parent_name': data.parentName,
            'child_age': data.childAge,
            'turno': data.turno,
            'extracurricular': data.extracurricular,
            'utm_source': data.utm_source,
            'utm_medium': data.utm_medium,
            'utm_campaign': data.utm_campaign
        });
    }
    
    // Facebook Pixel
    if (window.fbq && FACEBOOK_PIXEL_ID) {
        window.fbq('track', 'Lead', {
            content_name: 'Matrícula - Colégio Neck',
            content_category: 'Educação Infantil',
            value: 1,
            currency: 'BRL'
        });
    }
    
    // Google Analytics gtag (se configurado)
    if (window.gtag && GOOGLE_ANALYTICS_ID) {
        window.gtag('event', 'lead_submitted', {
            'event_category': 'Formulário',
            'event_label': 'Matrícula',
            'value': 1
        });
    }
}

/**
 * ============================================
 * VALIDAÇÃO DE CAMPOS
 * ============================================
 */
function validateField(field) {
    if (field.hasAttribute('required') && !field.value.trim()) {
        field.style.borderColor = '#ef4444';
        return false;
    }
    
    // Validação de email
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            field.style.borderColor = '#ef4444';
            return false;
        }
    }
    
    field.style.borderColor = '#e5e7eb';
    return true;
}

/**
 * ============================================
 * MENSAGEM DE SUCESSO
 * ============================================
 */
function showSuccessMessage() {
    const form = document.getElementById('leadForm');
    const successMessage = document.getElementById('successMessage');
    
    form.style.display = 'none';
    successMessage.classList.remove('hidden');
    
    // Scroll suave para a mensagem
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * ============================================
 * EFEITOS DE SCROLL
 * ============================================
 */
function initializeScrollEffects() {
    // Header fixo com sombra ao rolar
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animação de entrada para cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.beneficio-card, .depoimento-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

/**
 * ============================================
 * LIMPAR STORAGE DE UTM
 * ============================================
 */
function clearUTMStorage() {
    localStorage.removeItem('utm_source');
    localStorage.removeItem('utm_medium');
    localStorage.removeItem('utm_campaign');
    localStorage.removeItem('utm_term');
    localStorage.removeItem('utm_content');
}

/**
 * ============================================
 * TRATAMENTO DE ERROS DE IMAGENS
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // Placeholder para imagens que não carregarem
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Imagem não encontrada: ${this.src}`);
            // Você pode adicionar uma imagem placeholder aqui se desejar
        });
    });
});

/**
 * ============================================
 * MENU MOBILE / HAMBÚRGUER
 * ============================================
 */
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-content a');
    
    if (!menuToggle || !mobileMenu || !mobileMenuOverlay) {
        return; // Elementos não existem, não inicializar
    }
    
    // Toggle menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Fechar menu ao clicar no overlay
    mobileMenuOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // Fechar menu ao clicar em um link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Detectar página atual e destacar no menu mobile
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    mobileMenuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

