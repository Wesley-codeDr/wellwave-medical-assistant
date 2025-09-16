# Documentação do Projeto

Este diretório contém a documentação do **Sistema de Anamnese Digital para Emergência**.

## Arquivos

- **`prd.json`** - Product Requirements Document em formato JSON
- **`prd.md`** - Product Requirements Document em formato Markdown (versão legível)

## Sobre o PRD

O PRD define um sistema web de anamnese digital anônimo, otimizado para médicos de pronto-socorro, que padroniza a coleta de dados clínicos através de interfaces intuitivas baseadas em checkboxes.

### Principais Características

- **Eficiência:** Redução ~70% no tempo de documentação
- **Padronização:** Anamneses completas seguindo protocolos
- **Segurança jurídica:** Documentação defensável
- **Anonimato:** Proteção de identidade do paciente (LGPD)

### Tecnologias

- **Frontend:** Next.js 14, TypeScript, React 18 RSC, Tailwind + shadcn/ui
- **Backend:** Node.js + TypeScript, NestJS, PostgreSQL + Prisma
- **Infraestrutura:** Docker + Kubernetes, AWS EKS/GCP GKE

### Roadmap

- **MVP (3 meses):** 5 síndromes, checklists básicos, texto, 3 scores, responsivo
- **Fase 2 (6 meses):** 20 síndromes, ANVISA+interações, admin, PWA/app
- **Fase 3 (9 meses):** IA contextual, FHIR, dashboards, API pública, certificações
