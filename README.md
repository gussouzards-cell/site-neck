# 🎓 Landing Page - Colégio Neck | Matrículas Abertas

Landing page responsiva e otimizada para conversão de leads de matrículas do Colégio Neck.

## 📋 Características

- ✅ **Design Responsivo** - Mobile-first, funciona perfeitamente em todos os dispositivos
- ✅ **Otimizado para Conversão** - Layout focado em captação de leads
- ✅ **Integração com Webhook** - Envia dados para Zapier, Make.com, ou backend próprio
- ✅ **Google Analytics / GA4** - Tracking completo de eventos (lead_view, lead_submitted)
- ✅ **Facebook Pixel** - Suporte opcional para Facebook Ads
- ✅ **UTM Tracking** - Captura automática de parâmetros UTM
- ✅ **LGPD Compliant** - Checkbox de consentimento para tratamento de dados
- ✅ **Performance Otimizada** - Carregamento rápido (< 2s)
- ✅ **Acessibilidade** - Contraste adequado e navegação por teclado

## 🚀 Estrutura de Arquivos

```
pagina-matadora/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos principais
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   └── images/
│       ├── logo-colegio-neck.png      # Logo do colégio (você precisa adicionar)
│       └── flyer-matriculas-abertas.jpg  # Flyer criativo (você precisa adicionar)
├── email-template.html     # Template de e-mail para leads
└── README.md              # Este arquivo
```

## 📸 Imagens Necessárias

Você precisa adicionar duas imagens na pasta `assets/images/`:

1. **`logo-colegio-neck.png`** - Logo do Colégio Neck (azul com detalhes dourados)
   - Recomendado: PNG com fundo transparente
   - Tamanho: Altura mínima de 100px

2. **`flyer-matriculas-abertas.jpg`** - Flyer criativo "Matrículas Abertas"
   - Recomendado: JPG otimizado
   - Tamanho: 1200x800px ou proporção similar
   - Peso: Máximo 500KB para melhor performance

## ⚙️ Configuração

### 1. Configurar Webhook

Abra o arquivo `assets/js/main.js` e configure a URL do webhook:

```javascript
const WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/xxxxx/xxxxx';
```

**Opções de Webhook:**
- **Zapier**: Crie um Zap com trigger "Webhook by Zapier" → copie a URL
- **Make.com**: Crie um cenário com módulo "Webhook" → copie a URL
- **Webhook.site**: Use temporariamente para testes: https://webhook.site
- **Backend próprio**: Configure seu endpoint para receber POST JSON

### 2. Configurar Google Analytics (Opcional)

No arquivo `index.html`, descomente e configure:

```html
<!-- Google Analytics / GA4 -->
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX'); // Substitua pelo seu ID
</script>
```

E no `assets/js/main.js`:

```javascript
const GOOGLE_ANALYTICS_ID = 'G-XXXXXXXXXX';
```

### 3. Configurar Facebook Pixel (Opcional)

No arquivo `index.html`, descomente o código do Facebook Pixel e substitua:

```html
fbq('init', 'SEU_PIXEL_ID_AQUI');
```

E no `assets/js/main.js`:

```javascript
const FACEBOOK_PIXEL_ID = '123456789012345';
```

### 4. Atualizar Informações de Contato

No arquivo `index.html`, atualize o footer com os dados corretos:

```html
<a href="tel:+5511999999999">Telefone: (11) 99999-9999</a>
<a href="https://wa.me/5511999999999">WhatsApp: (11) 99999-9999</a>
```

## 🚢 Deploy

### Opção 1: Netlify (Recomendado)

1. Acesse [netlify.com](https://www.netlify.com)
2. Faça login e clique em "Add new site" → "Deploy manually"
3. Arraste a pasta do projeto ou faça upload via Git
4. Pronto! Sua página estará no ar

**Vantagens:**
- HTTPS automático
- CDN global
- Deploy contínuo via Git
- Formulários nativos (alternativa ao webhook)

### Opção 2: Vercel

1. Acesse [vercel.com](https://www.vercel.com)
2. Importe o projeto via Git ou arraste a pasta
3. Deploy automático

### Opção 3: GitHub Pages

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings → Pages
4. Selecione a branch main e pasta `/root`
5. Acesse via `seu-usuario.github.io/nome-repositorio`

### Opção 4: Hospedagem Tradicional

1. Faça upload de todos os arquivos via FTP
2. Certifique-se de manter a estrutura de pastas
3. Acesse via `seu-dominio.com`

## 📧 Configurar E-mail Automático

O arquivo `email-template.html` é um template que você pode usar em:

- **Zapier**: Adicione um módulo "Email by Zapier" após o webhook
- **Make.com**: Use o módulo "Email" com template HTML
- **Backend próprio**: Envie e-mail via SMTP usando o template

**Variáveis do template:**
- `{{parentName}}` - Nome do responsável
- `{{phone}}` - Telefone formatado
- `{{phoneClean}}` - Telefone apenas números (para links)
- `{{email}}` - E-mail
- `{{childName}}` - Nome da criança
- `{{childAge}}` - Idade/Série
- `{{turno}}` - Turno preferido
- `{{extracurricular}}` - Interesse em extracurriculares
- `{{utm_source}}`, `{{utm_medium}}`, `{{utm_campaign}}` - UTM parameters
- `{{landing_page}}` - URL da página
- `{{timestamp}}` - Data/hora do envio

## 🎯 Uso de UTM Parameters

Para rastrear a origem dos leads, use URLs com parâmetros UTM:

```
https://seu-site.com/?utm_source=facebook&utm_medium=ads&utm_campaign=matriculas_2024
```

Os parâmetros serão capturados automaticamente e enviados com o formulário.

## 📊 Métricas e Analytics

A página dispara os seguintes eventos:

1. **`lead_view`** - Quando a página é carregada
2. **`lead_submitted`** - Quando o formulário é enviado com sucesso

Você pode visualizar esses eventos no Google Analytics ou no console do navegador (F12).

## 🧪 Testes

### Testar Webhook Localmente

1. Use [webhook.site](https://webhook.site) para gerar uma URL temporária
2. Configure no `main.js`
3. Preencha o formulário
4. Verifique os dados recebidos no webhook.site

### Testar em Dispositivos Móveis

- Use o DevTools do Chrome (F12) → Toggle device toolbar
- Ou teste em dispositivos reais

## 🔧 Personalização

### Cores

As cores principais estão definidas em `assets/css/styles.css` nas variáveis CSS:

```css
:root {
    --color-primary-blue: #1e3a8a;
    --color-gold: #fbbf24;
    /* ... */
}
```

### Textos

Todos os textos estão em `index.html` e podem ser editados diretamente.

### Formulário

Para adicionar/remover campos, edite:
- `index.html` - Estrutura do formulário
- `assets/js/main.js` - Função `collectFormData()`

## 🐛 Troubleshooting

### Imagens não aparecem
- Verifique se os arquivos estão na pasta `assets/images/`
- Verifique os nomes dos arquivos (case-sensitive)
- Abra o console (F12) para ver erros

### Webhook não recebe dados
- Verifique a URL no `main.js`
- Teste a URL no Postman ou webhook.site
- Verifique o console do navegador (F12) para erros

### Analytics não funciona
- Verifique se o ID está correto
- Use o Google Tag Assistant para debug
- Verifique o console do navegador

## 📱 Responsividade

A página é totalmente responsiva e testada em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1440px+)

## ⚡ Performance

- **Lazy loading** de imagens
- **Fontes otimizadas** via Google Fonts
- **CSS minificado** (recomendado para produção)
- **JavaScript otimizado** com event listeners eficientes

## 📄 Licença

Este projeto foi criado especificamente para o Colégio Neck.

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Consulte o console do navegador (F12)
3. Teste o webhook em webhook.site primeiro

---

**Desenvolvido com ❤️ para o Colégio Neck**


