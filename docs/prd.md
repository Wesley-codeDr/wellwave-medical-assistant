# PRD – Sistema de Anamnese Digital para Emergência

**Versão:** 1.0  
**Status:** Draft  
**Língua:** pt-BR  
**Gerado em:** 2025-09-14

## Meta

- **Documento:** PRD – Sistema de Anamnese Digital para Emergência
- **Contexto:** PC consultório (rede estável), Smartphones pessoais (BYOD)
- **Mix de uso:** não definido

## Visão do Produto

### Declaração
Desenvolver um sistema web de anamnese digital anônimo, otimizado para médicos de pronto-socorro, que padroniza a coleta de dados clínicos através de interfaces intuitivas baseadas em checkboxes, gerando documentação médica tecnicamente precisa e juridicamente segura, fundamentada em evidências.

### Proposta de Valor
- **Eficiência:** redução ~70% no tempo de documentação
- **Padronização:** anamneses completas seguindo protocolos
- **Segurança jurídica:** documentação defensável
- **Anonimato:** proteção de identidade do paciente (LGPD)

## Objetivos e KPIs

### Objetivos
- Reduzir tempo médio de anamnese de 15–20min para 5–7min
- Garantir 100% de completude dos campos obrigatórios
- Aumentar aderência a protocolos em 80%
- Zero vazamento de dados pessoais identificáveis

### KPIs
- Tempo médio por anamnese
- Taxa de completude
- NPS do médico
- Adoção semanal (usuários ativos)
- Nº de templates por síndrome
- % de anamneses com scores aplicáveis calculados

## Usuários

### Personas
- **Dr. Carlos** - Médico plantonista
  - Objetivos: agilidade, precisão, respaldo jurídico
- **Dra. Ana** - Coordenadora médica
  - Objetivos: qualidade, padronização, indicadores

### Papéis no Sistema
- Medico
- Coordenador
- Administrador

## Escopo

### MVP
- 5 síndromes core (Dor torácica, Cefaleia, Dispneia, Dor abdominal, Febre)
- Checklists inteligentes básicos
- Geração de texto estruturada (preview em tempo real)
- 3 scores principais (ex.: HEART, CURB-65, qSOFA)
- Web responsivo (PC e smartphone)

### Fase 2
- 20 síndromes
- Medicamentos ANVISA + interações
- Painel administrativo (templates e evidências)
- PWA avançado / App mobile

### Fase 3
- IA para sugestões contextuais
- Integração HL7 FHIR
- Analytics/dashboards e API pública
- Certificação SBIS/CFM

## Módulos Principais

### Dashboard Kanban
- **Colunas padrão:** Entrada, Em atendimento, Aguardando exame, Reavaliação programada, Alta/Transferência, Concluído
- **Recursos:** Drag & drop (PC) / toque prolongado (mobile), Criar tarefa sem PII, Prazos e alarmes, Filtros por síndrome/gravidade

### Anamnese
- **Contextos:** Pronto-Socorro, Ambulatório
- **Componentes modernos:** Checkbox tri-estado, Chips multi-select, Segmented controls, Toggles, Réguas (sliders), Steppers numéricos
- **Preview de texto:** Toggle maiúsculas, Edição inline, Cópia rápida por seções

### Artigos Médicos
- Upload de PDFs/links
- Classificação por síndrome/score
- Nível de evidência (Oxford CEBM)
- Busca por título/autor/DOI
- Citação automática nas recomendações

## Conteúdo Clínico

### Síndromes Iniciais
- **Dor torácica:** IAM/SCA, TEP, Dissecção aórtica, Pericardite, Costocondrite, Ansiedade
- **Cefaleia:** Enxaqueca, Tensional, HSA, Meningite, Sinusite
- **Dispneia:** Asma/DPOC, Pneumonia, ICC, TEP, Ansiedade
- **Dor abdominal:** Apendicite, Colecistite, Pancreatite, Úlcera, Cólica renal
- **Febre:** Infecção viral, Pneumonia, ITU, Meningite, Sepse

### Scores
- **Cardiovascular:** TIMI, GRACE, CHA2DS2-VASc, HEART
- **Neurológico:** NIHSS, Canadian Head CT, ABCD2
- **Respiratório:** CURB-65, Wells PE, PSI/PORT
- **Geral:** qSOFA, SOFA, NEWS2, SIRS

## Requisitos Funcionais

### RF-1: Navegação por Síndrome/Queixa Principal
- Exibe subitens e obrigatoriedade por síndrome

### RF-2: Checkboxes Inteligentes e Componentes Modernos
- Tri-estado padrão 'Não documentado'
- Réguas e chips acessíveis
- Validações cruzadas (gestante×fármaco)

### RF-3: Geração de Texto Médico (Preview em Tempo Real)
- Texto coeso com negações pertinentes
- Frases de salvaguarda quando dados faltam
- Toggle MAIÚSCULAS afeta preview e cópia

### RF-4: Exame Físico com validações
- Alertas para valores fora da faixa

### RF-5: Calculadoras e Scores
- Resultado com referência bibliográfica

### RF-6: Sistema de Medicamentos + Interações
- Classificação de severidade
- Alternativas seguras

### RF-7: Gestão de Templates
- Versionamento e aprovação

### RF-8: Gestão de Evidências
- Nível de evidência exibido no checklist

### RF-9: Exportação (PDF/Texto/HTML)
- PDF sem PII, com hash e metadados

### RF-10: Autenticação e Sessão
- MFA/SSO
- Reautenticação sem perda de anamnese

### RF-11: Anonimização, Identificação e Retenção
- Zero PII
- Campo celular opcional com modos seguros
- Expiração 24h

### RF-12: Acessibilidade e Dark Mode
- WCAG 2.1 AA
- Navegação por teclado

### RF-13: Atalhos e Produtividade
- Atalhos PC
- Gestos mobile

### RF-14: Alertas de Segurança Clínica (Vermelho)
- Interações, scores altos, contraindicações

### RF-15: Dashboard & Kanban do Plantão
- Drag & drop sem PII
- Alarmes de reavaliação

### RF-16: Sessão de Artigos Médicos
- Vincular evidência ao checklist

### RF-17: Contextos de Anamnese: PS e Ambulatório
- Tom e campos adaptados ao contexto

### RF-18: Evolução de Enfermaria (SOAP)
- Exporta com horário/autor/ID sessão/hash

### RF-19: Prescrição Orientativa
- Aviso legal automático
- Sem PII

### RF-20: Solicitação de Exames
- Justificativa clínica e prioridade

### RF-21: Preview – Estilo Médico Exemplar
- Texto fluido e preciso juridicamente

### RF-22: Salvaguardas Jurídicas Automáticas
- Fallbacks quando dados faltam

### RF-23: Conformidade de Não Identificação
- Bloqueio de PII em campos livres

### RF-24: Réguas e Componentes Sem Digitação (Detalhes)
- Acessíveis por teclado e touch

### RF-25: Edição do Preview e Cópia por Seções
- Auditoria de edições
- Cópia 1-clique por seção

### RF-26: Estrutura de Anamnese – Pronto-Socorro
- Ordem e conteúdo conforme regras PS
- 3 hipóteses + CID-10 + scores no final

### RF-27: Protocolos de Emergência (Templates)
- Cálculo de dose por peso
- Alertas em vermelho

## Requisitos Não Funcionais

### Desempenho
- LCP: 2.5s
- FID: 100ms
- Operações cliente: 300ms

### Confiabilidade
- SLO uptime mensal: 99.9%
- RPO: 15min
- RTO: 60min

### Segurança
- TLS 1.3
- AES-256 em repouso
- CSP, HSTS, rate limiting

### Privacidade
- LGPD/HIPAA-ready
- DPIA
- Logs sem PII

### Compatibilidade
- Chrome/Edge (2 últimas)
- Safari iOS (2 últimas)
- Android WebView compatível

### Usabilidade
- ≤3 cliques para iniciar anamnese
- 1-mão no mobile
- Teclado no desktop
- Zero digitação obrigatória

## Arquitetura Técnica

### Frontend
- Next.js 14
- TypeScript
- React 18 RSC
- Tailwind + shadcn/ui
- Zustand
- React Hook Form + Zod
- Vitest + RTL

### Backend
- Node.js + TypeScript
- NestJS
- PostgreSQL + Prisma
- Redis
- Bull (filas)
- Jest

### Infraestrutura
- Docker + Kubernetes
- AWS EKS/GCP GKE
- CloudFront
- S3
- RDS PostgreSQL
- ElastiCache Redis

## Segurança e Compliance

### Anonimização
- Zero PII
- IDs temporários
- Expiração 24h
- Logs sem dados sensíveis

### Celular do Paciente (Opcional)
- **Modos:** local_only, servidor_24h, desabilitado
- **Padrão:** local_only
- Máscara visual
- Exportações não incluem
- Acesso auditado

### LGPD/HIPAA
- Criptografia
- TLS 1.3
- Audit trail
- Políticas de retenção

### BYOD
- Proibir cache de PII
- Minimizar cache PWA
- Bloqueios de screenshot apenas em app nativo (futuro)

## UX

### Princípios
- Mobile-first
- Dark mode
- WCAG 2.1 AA
- Performance

### Layout PC
- **Colunas:** Navegação, Checklist, Preview/Scores
- **Atalhos:** N (nova anamnese), Ctrl+C (copiar texto)

### Layout Mobile
- Etapas
- Barra de progresso
- Botão preview flutuante

### Componentes Sem Digitação
- Chips, toggles, segmented controls
- Sliders, steppers, pickers duração

### Preview
- Toggle maiúsculas
- Edição inline
- Copiar por seção

## Roadmap

### MVP (3 meses)
- 5 síndromes
- Checklists básicos
- Texto
- 3 scores
- Responsivo

### Fase 2 (6 meses)
- 20 síndromes
- ANVISA+interações
- Admin
- PWA/app

### Fase 3 (9 meses)
- IA contextual
- FHIR
- Dashboards
- API pública
- Certificações

## Modelo de Negócio

### Monetização
- **Freemium:** 5 anamneses/dia
- **Pro:** R$99/mês
- **Enterprise:** custom

### Projeções
- **Ano 1:** Pro: 1000
- **Ano 2:** Pro: 5000, Enterprise: 10
- **Ano 3:** Pro: 15000, Enterprise: 50

## Riscos
- Resistência à adoção
- Responsabilidade legal
- Atualização de evidências
- Concorrência
- BYOD (segurança)
- Licenciamento de bases clínicas

## Questões em Aberto
- Percentual PC vs smartphone no plantão
- Política BYOD (MDM/MFA, clipboard, screenshot)
- Offline parcial no smartphone (schemas vs dados)
- Autenticação MVP (Email+MFA vs SSO)
- Fornecedor de interações medicamentosas
- Idiomas e i18n
- Exportações exigidas (PDF, CDA, FHIR)

## Defaults
- Toggle maiúsculas padrão: desligado
- Edição preview padrão: desligado
- Celular paciente modo: local_only
