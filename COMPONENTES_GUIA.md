# 📦 Guia de Componentes - Header e Footer

## 🎯 Objetivo

Criar componentes reutilizáveis para o **Header (Menu)** e **Footer** garantindo que todas as páginas tenham exatamente o mesmo conteúdo, sem diferenças.

## 📁 Arquivos Criados

### Componentes JavaScript
- `assets/js/components/header-component.js` - Componente do menu principal
- `assets/js/components/footer-component.js` - Componente do footer

### Scripts de Suporte
- `assets/js/dropdown-menu.js` - Controla os dropdowns do menu
- `assets/js/mobile-menu.js` - Controla o menu mobile

## 🔧 Como Funciona

### 1. **Header Component**
O componente `header-component.js`:
- Remove qualquer header existente na página
- Insere o header padrão com menu e dropdowns
- Destaca automaticamente a página atual no menu
- Inclui o menu mobile completo

### 2. **Footer Component**
O componente `footer-component.js`:
- Remove qualquer footer existente na página
- Insere o footer padrão com todos os links organizados
- Mantém informações de contato consistentes

## 📝 Como Usar nas Páginas

### Estrutura Básica de uma Página

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Meta tags, CSS, etc. -->
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <!-- O header será inserido automaticamente aqui -->
    
    <!-- Conteúdo da página -->
    <section>
        <!-- Seu conteúdo aqui -->
    </section>
    
    <!-- O footer será inserido automaticamente aqui -->
    
    <!-- Scripts -->
    <script src="assets/js/components/header-component.js"></script>
    <script src="assets/js/components/footer-component.js"></script>
    <script src="assets/js/dropdown-menu.js"></script>
    <script src="assets/js/mobile-menu.js"></script>
    <!-- Outros scripts da página -->
</body>
</html>
```

## ✅ Vantagens

1. **Consistência**: Todas as páginas terão exatamente o mesmo menu e footer
2. **Manutenção Fácil**: Alterar em um único arquivo atualiza todas as páginas
3. **Sem Duplicação**: Não precisa copiar/colar HTML em cada página
4. **Atualização Automática**: Ao adicionar uma nova página, só precisa atualizar os componentes

## 🔄 Atualizando os Componentes

### Para adicionar uma nova página ao menu:

1. Edite `assets/js/components/header-component.js`
2. Adicione o link no dropdown apropriado
3. Adicione também no menu mobile
4. Todas as páginas serão atualizadas automaticamente!

### Para atualizar informações do footer:

1. Edite `assets/js/components/footer-component.js`
2. Modifique o HTML do footer
3. Todas as páginas serão atualizadas automaticamente!

## 📋 Ordem dos Scripts

Importante manter esta ordem:

```html
<!-- 1. Componentes (inserem o HTML) -->
<script src="assets/js/components/header-component.js"></script>
<script src="assets/js/components/footer-component.js"></script>

<!-- 2. Funcionalidades (controlam os componentes) -->
<script src="assets/js/dropdown-menu.js"></script>
<script src="assets/js/mobile-menu.js"></script>

<!-- 3. Outros scripts da página -->
<script src="assets/js/main.js"></script>
```

## 🚀 Migração de Páginas Existentes

Para migrar uma página existente:

1. Remova o HTML do `<header>` e `<footer>` existentes
2. Adicione os scripts dos componentes antes do `</body>`
3. Mantenha apenas o conteúdo específico da página

## ⚠️ Notas Importantes

- Os componentes funcionam melhor se não houver header/footer HTML estático na página
- Se houver, os componentes irão substituí-los automaticamente
- O destaque da página atual é feito automaticamente pelo componente
- Os dropdowns funcionam apenas em desktop (menu mobile não usa dropdowns)

