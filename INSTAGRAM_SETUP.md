# 📷 Como Configurar o Feed do Instagram na Galeria

## Opções Disponíveis

### Opção 1: SnapWidget (Recomendado - Gratuito)

**Passos:**
1. Acesse [https://snapwidget.com](https://snapwidget.com)
2. Crie uma conta gratuita
3. Clique em "Create Widget"
4. Selecione "Instagram Feed"
5. Conecte seu perfil @colegioneck
6. Personalize o widget (número de colunas, estilo, etc.)
7. Clique em "Get Embed Code"
8. Copie o código do iframe
9. Substitua o iframe na linha 273 do arquivo `galeria.html`

**Vantagens:**
- ✅ Gratuito
- ✅ Fácil de configurar
- ✅ Atualização automática
- ✅ Responsivo

### Opção 2: Instagram Embed Oficial (Posts Individuais)

**Passos:**
1. Acesse um post do Instagram [@colegioneck](https://www.instagram.com/colegioneck/)
2. Clique nos 3 pontos (...) no canto superior direito
3. Selecione "Embed"
4. Copie o código fornecido
5. Cole o código na seção comentada do arquivo `galeria.html` (linha ~280)
6. Repita para cada post que deseja exibir

**Vantagens:**
- ✅ Oficial do Instagram
- ✅ Sem necessidade de conta externa
- ✅ Controle total sobre quais posts exibir

**Desvantagens:**
- ❌ Precisa adicionar cada post manualmente
- ❌ Não atualiza automaticamente

### Opção 3: Elfsight (Widget Premium)

**Passos:**
1. Acesse [https://elfsight.com/pt/instagram-feed-instashow/](https://elfsight.com/pt/instagram-feed-instashow/)
2. Crie uma conta
3. Configure o widget com seu perfil
4. Copie o código de embed
5. Substitua na página

**Vantagens:**
- ✅ Muitas opções de personalização
- ✅ Atualização automática
- ✅ Suporte premium

**Desvantagens:**
- ❌ Versão gratuita com limitações
- ❌ Pode ter marca d'água

## Configuração Atual

Atualmente, a página está configurada para usar o SnapWidget. Para ativar:

1. Acesse https://snapwidget.com
2. Crie o widget com o perfil @colegioneck
3. Substitua o `src` do iframe na linha 273 de `galeria.html` pelo código fornecido pelo SnapWidget

## Estrutura do Código

O código está localizado em `galeria.html`:
- **Linha ~257**: Seção do Instagram
- **Linha ~273**: Iframe do widget (substituir pelo seu código)
- **Linha ~280**: Comentário com exemplo de Instagram Embed oficial

## Notas Importantes

- O perfil do Instagram precisa ser **público** para funcionar
- Alguns widgets podem ter limitações na versão gratuita
- O feed atualiza automaticamente quando você posta no Instagram (com SnapWidget)
- Teste em diferentes dispositivos para garantir responsividade

