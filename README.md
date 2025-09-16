# 🏥 WellWave - Sistema Médico Avançado

Sistema médico avançado para geração automática de anamneses em ambientes de pronto-socorro. Transforma checkboxes simples em documentação clínica completa, juridicamente robusta e 100% compatível com CFM/LGPD.

## ✨ Funcionalidades

### 📋 Formulário de Anamnese Completo
- **História da Doença Atual (HDA)** com campos estruturados
- **Exame Físico** com sinais vitais e achados
- **Hipóteses Diagnósticas** com busca CID-10
- **Conduta Médica** e orientações
- **Sistema de Síndromes** com sugestões automáticas

### 🎨 Interface Moderna
- **Design System** completo com shadcn/ui
- **Tema Claro/Escuro** com toggle automático
- **Layout Responsivo** otimizado para mobile
- **Animações Suaves** e efeitos visuais modernos
- **Glassmorphism** e gradientes personalizados

### 🔍 Funcionalidades Avançadas
- **Busca Global** com atalho ⌘K
- **Navegação por Breadcrumbs** automática
- **Sistema de Notificações** com Sonner
- **Preview em Tempo Real** da anamnese
- **Cópia por Seções** com feedback visual
- **Validação de Dados** em tempo real

### 📊 Dashboard Interativo
- **Estatísticas** de pacientes e anamneses
- **Kanban Board** para gestão de tarefas
- **Sistema de Navegação** entre módulos
- **Gerenciamento de Pacientes** completo

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **shadcn/ui** - Componentes de interface
- **Lucide React** - Ícones modernos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Sonner** - Sistema de notificações
- **next-themes** - Gerenciamento de temas

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Wesley-codeDr/wellwave-medical-assistant.git

# Entre no diretório
cd wellwave-medical-assistant

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

## 🎯 Como Usar

1. **Acesse o Dashboard** - Visualize estatísticas e navegue entre módulos
2. **Crie uma Anamnese** - Use o formulário estruturado para documentar casos
3. **Busque CID-10** - Utilize a busca integrada para códigos diagnósticos
4. **Preview em Tempo Real** - Visualize a anamnese formatada enquanto digita
5. **Copie por Seções** - Use os botões de cópia para seções específicas

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
├── components/             # Componentes React
│   ├── anamnese/          # Componentes do formulário
│   ├── dashboard/         # Componentes do dashboard
│   ├── ui/                # Componentes shadcn/ui
│   └── navigation/        # Componentes de navegação
├── contexts/              # Contextos React
├── hooks/                 # Hooks customizados
├── lib/                   # Utilitários e configurações
└── types/                 # Definições TypeScript
```

## 🎨 Design System

O projeto utiliza um design system completo com:
- **Cores** personalizadas para temas claro/escuro
- **Tipografia** com fontes Geist Sans e Mono
- **Espaçamentos** consistentes
- **Animações** suaves e modernas
- **Componentes** reutilizáveis

## 📱 Responsividade

- **Mobile First** - Otimizado para dispositivos móveis
- **Breakpoints** - Adaptação para tablet e desktop
- **Touch Friendly** - Interface otimizada para toque
- **Performance** - Carregamento rápido em todos os dispositivos

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run type-check   # Verificação de tipos
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

## 📞 Suporte

Para suporte ou dúvidas, entre em contato através das issues do GitHub.

---

**WellWave** - Desenvolvido com ❤️ para revolucionar a documentação médica em ambientes de emergência.

![GitHub](https://img.shields.io/badge/GitHub-Wesley--codeDr%2Fwellwave--medical--assistant-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![CFM Compliant](https://img.shields.io/badge/CFM-Compliant-green)
![LGPD Ready](https://img.shields.io/badge/LGPD-Ready-green)
