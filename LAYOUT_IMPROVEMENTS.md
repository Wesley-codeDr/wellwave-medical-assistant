# Melhorias de Layout e Integração - Sistema de Anamnese

## 🎨 Melhorias Implementadas

### 1. **Sistema de Navegação Integrado**
- **Sidebar responsiva** com navegação entre páginas
- **Menu mobile** com Sheet component do shadcn-ui
- **Navegação contextual** baseada no estado da aplicação
- **Indicadores visuais** de página ativa e badges de contagem

### 2. **Layout Principal Unificado**
- **MainLayout** que integra sidebar, header e footer
- **Header dinâmico** que muda conforme a página ativa
- **Footer consistente** com informações do sistema
- **Responsividade completa** para desktop e mobile

### 3. **Sistema de Contexto Global**
- **AppContext** para gerenciar estado global da aplicação
- **Sincronização** entre dashboard e anamnese
- **Persistência** de dados da anamnese
- **Navegação programática** entre páginas

### 4. **Anamnese Aprimorada**
- **Enhanced Anamnese Form** com layout melhorado
- **Progress bar** de preenchimento em tempo real
- **Header informativo** com dados do paciente
- **Botões de ação** (Salvar, Exportar, Imprimir)
- **Sidebar com scroll** para preview e sugestões

### 5. **Sistema de Notificações Toast**
- **Toast notifications** para feedback do usuário
- **Diferentes tipos**: success, error, warning, info
- **Auto-dismiss** configurável
- **Posicionamento fixo** no canto superior direito
- **Integração** com sistema de cópia

### 6. **Componentes UI Melhorados**
- **Acessibilidade** aprimorada com aria-labels
- **Consistência visual** com design system
- **Responsividade** em todos os componentes
- **Estados visuais** claros (hover, focus, disabled)

## 🏗️ Arquitetura

### Estrutura de Componentes
```
src/
├── contexts/
│   └── app-context.tsx          # Contexto global da aplicação
├── components/
│   ├── layout/
│   │   └── main-layout.tsx      # Layout principal integrado
│   ├── navigation/
│   │   └── app-navigation.tsx   # Navegação sidebar
│   ├── routing/
│   │   └── app-router.tsx       # Roteamento de páginas
│   ├── anamnese/
│   │   └── enhanced-anamnese-form.tsx  # Formulário melhorado
│   └── ui/
│       └── toast.tsx            # Sistema de notificações
└── hooks/
    └── use-toast.ts             # Hook para notificações
```

### Fluxo de Dados
1. **AppProvider** gerencia estado global
2. **MainLayout** renderiza navegação e conteúdo
3. **AppRouter** decide qual página mostrar
4. **EnhancedAnamneseForm** sincroniza com contexto
5. **ToastProvider** gerencia notificações

## 🎯 Funcionalidades Principais

### Navegação Integrada
- ✅ **Sidebar responsiva** com collapse em mobile
- ✅ **Menu contextual** com badges de contagem
- ✅ **Navegação programática** entre páginas
- ✅ **Estado persistente** da página ativa

### Anamnese Melhorada
- ✅ **Layout em grid** com sidebar de preview
- ✅ **Progress bar** de preenchimento
- ✅ **Header informativo** com dados do paciente
- ✅ **Scroll area** para conteúdo longo
- ✅ **Botões de ação** integrados

### Sistema de Notificações
- ✅ **Toast notifications** com diferentes tipos
- ✅ **Auto-dismiss** configurável
- ✅ **Posicionamento fixo** e responsivo
- ✅ **Integração** com ações do usuário

### Acessibilidade
- ✅ **Aria-labels** em todos os componentes
- ✅ **Navegação por teclado** funcional
- ✅ **Contraste adequado** em todos os elementos
- ✅ **Screen reader** friendly

## 🚀 Como Usar

### Navegação
1. **Sidebar**: Clique nos itens do menu para navegar
2. **Mobile**: Use o botão de menu para abrir sidebar
3. **Programática**: Use `setCurrentPage()` no contexto

### Anamnese
1. **Preenchimento**: Use as tabs para navegar entre seções
2. **Preview**: Visualize em tempo real na sidebar direita
3. **Cópia**: Use atalhos Ctrl+1-6 ou botões de cópia
4. **Notificações**: Receba feedback visual das ações

### Notificações
```typescript
const { addToast } = useToast()

addToast({
  type: "success",
  title: "Sucesso!",
  description: "Operação realizada com sucesso.",
  duration: 3000
})
```

## 🎨 Design System

### Cores
- **Primary**: Azul para elementos principais
- **Success**: Verde para ações bem-sucedidas
- **Error**: Vermelho para erros e alertas
- **Warning**: Amarelo para avisos
- **Info**: Azul claro para informações

### Tipografia
- **Font**: Geist Sans (Google Fonts)
- **Mono**: Geist Mono para código
- **Sizes**: text-xs, text-sm, text-base, text-lg, text-xl

### Espaçamento
- **Padding**: p-2, p-4, p-6 (8px, 16px, 24px)
- **Margin**: m-2, m-4, m-6
- **Gap**: gap-2, gap-4, gap-6

### Componentes
- **Cards**: Bordas arredondadas, sombras sutis
- **Buttons**: Estados visuais claros
- **Forms**: Labels e validações visuais
- **Navigation**: Indicadores de estado ativo

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px (sidebar como sheet)
- **Tablet**: 768px - 1024px (layout adaptado)
- **Desktop**: > 1024px (sidebar fixa)

### Adaptações
- **Sidebar**: Collapse em mobile, fixa em desktop
- **Grid**: 1 coluna em mobile, 2-3 em desktop
- **Typography**: Tamanhos adaptativos
- **Spacing**: Padding/margin responsivos

## 🔧 Tecnologias Utilizadas

- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização utilitária
- **Radix UI**: Componentes acessíveis
- **Lucide React**: Ícones modernos
- **Context API**: Gerenciamento de estado

## 🎯 Próximos Passos

- [ ] **Temas**: Dark/light mode
- [ ] **Animações**: Transições suaves
- [ ] **PWA**: Funcionalidade offline
- [ ] **Testes**: Unit e integration tests
- [ ] **Performance**: Lazy loading e otimizações
- [ ] **Internacionalização**: Suporte a múltiplos idiomas

---

**Sistema de Anamnese Digital v1.0 - Layout Integrado**
**Desenvolvido com foco em usabilidade e acessibilidade**
