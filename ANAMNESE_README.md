# Sistema de Anamnese PS

Sistema auxiliar para documentação médica no Pronto-Socorro, desenvolvido conforme especificações do documento PS Anamnese v1.0.0.

## 🎯 Objetivo

Auxiliar médicos na emergência com documentação juridicamente protegida, seguindo protocolos médicos padronizados e terminologia específica.

## ✨ Funcionalidades Principais

### 📝 Formulário Estruturado
- **Seções organizadas**: Início, Caracterização, Negativas, Antecedentes, Alergias, Medicamentos, Exame Físico, Hipóteses, Detalhamento, Condutas e Observações
- **Componentes modernos**: Chips, Sliders, Steppers, Toggle, Autocomplete, Duration Picker
- **Zero digitação obrigatória**: Interface baseada em seleção para agilizar o preenchimento

### 🔍 Validações Inteligentes
- **Validação de campos obrigatórios**: Idade, queixa principal, tempo de evolução
- **Validação de sinais vitais**: Ranges esperados para PA, FC, FR, TAX, SpO2
- **Alertas de interação medicamentosa**: Verificação automática de interações entre medicamentos
- **Validação de alergias**: Alertas quando medicamentos prescritos podem causar alergia

### 🎯 Templates por Síndrome
- **Sugestões automáticas** baseadas na queixa principal:
  - CEFALEIA: Scores (Canadian Head CT), exames (TC Crânio), medicamentos (Dipirona, Ondansetrona)
  - DOR TORÁCICA: Scores (HEART, TIMI, WELLS PE), exames (ECG, Troponina), medicamentos (AAS)
  - DISPNEIA: Scores (WELLS PE, PSI/PORT), exames (Gasometria, RX Tórax)
  - DOR ABDOMINAL: Exames (Hemograma, Amilase/Lipase, USG), medicamentos (Dipirona, Metoclopramida)
  - FEBRE: Scores (qSOFA), exames (Hemoculturas, RX Tórax), medicamentos (Paracetamol)

### 📋 Preview em Tempo Real
- **Geração automática** do texto da anamnese conforme preenchimento
- **Toggle maiúsculas/minúsculas** para leitura rápida no PS
- **Cópia por seções** com atalhos de teclado (Ctrl+1 a Ctrl+6)
- **Cópia completa** (Ctrl+0)

### ⌨️ Atalhos de Teclado
- `Ctrl+1`: Copiar HDA (História da Doença Atual)
- `Ctrl+2`: Copiar EF (Exame Físico)
- `Ctrl+3`: Copiar HD (Hipóteses Diagnósticas)
- `Ctrl+4`: Copiar Conduta
- `Ctrl+5`: Copiar Exames
- `Ctrl+6`: Copiar Prescrição
- `Ctrl+0`: Copiar anamnese completa

## 🏗️ Arquitetura

### Componentes UI Modernos
- `TriCheck`: Sim/Não/Não documentado
- `Chips`: Seleção múltipla com chips visuais
- `Segmented`: Seleção única com botões segmentados
- `Slider`: Controle deslizante para valores numéricos
- `Stepper`: Controle +/- para números
- `DurationPicker`: Seletor de tempo com presets
- `Autocomplete`: Busca com sugestões
- `Toggle`: Interruptor on/off

### Estrutura de Dados
```typescript
interface AnamneseData {
  // Informações básicas
  idade: number
  sexo: "MASCULINO" | "FEMININO"
  queixa_principal: string[]
  tempo_evolucao: string
  classificacao_temporal: string

  // Caracterização
  intensidade_dor?: number
  carater_dor?: string
  fatores_melhoria: string[]
  fatores_piora: string[]
  sintomas_associados: string[]

  // Sinais vitais
  sinais_vitais: {
    pa: number
    fc: number
    fr: number
    tax: number
    spo2: number
    dxt?: number
  }

  // E muito mais...
}
```

## 🛡️ Proteções Legais

### Fallbacks Automáticos
- **"INFORMAÇÃO NÃO DOCUMENTADA NESTA AVALIAÇÃO"** para campos não preenchidos
- **"SEM SINAIS DE ALARME DOCUMENTADOS ATÉ O MOMENTO"** para negativas não documentadas
- **"DADOS PENDENTES DE CONFIRMAÇÃO/EXAMES COMPLEMENTARES"** para informações faltantes

### Disclaimer
**"SISTEMA AUXILIAR – NÃO SUBSTITUI JULGAMENTO CLÍNICO MÉDICO."**

## 🎨 Interface

### Design Responsivo
- Layout adaptável para desktop e mobile
- Sidebar com preview em tempo real
- Tabs organizadas por seções lógicas
- Cores e ícones intuitivos

### Usabilidade
- **Zero digitação obrigatória**: Tudo baseado em seleção
- **Preview em tempo real**: Visualização imediata do resultado
- **Atalhos de teclado**: Agilidade para médicos experientes
- **Validações visuais**: Alertas coloridos por severidade

## 🚀 Como Usar

1. **Preencha as informações iniciais**: Idade, sexo, queixa principal, tempo de evolução
2. **Caracterize a queixa**: Intensidade, caráter, fatores de melhora/piora, sintomas associados
3. **Documente negativas importantes**: Especialmente sinais de alarme
4. **Registre antecedentes**: Comorbidades relevantes
5. **Verifique alergias**: Crítico para segurança medicamentosa
6. **Preencha exame físico**: Sinais vitais e achados pertinentes
7. **Defina hipóteses**: Máximo 3, em ordem de probabilidade
8. **Detalhe com CID-10**: Códigos específicos e justificativas
9. **Estabeleça condutas**: Medicamentos, orientações, critérios de alta
10. **Finalize observações**: Pendências e atestado

## 🔧 Tecnologias

- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização utilitária
- **Radix UI**: Componentes acessíveis
- **Lucide React**: Ícones modernos

## 📋 Conformidade

- ✅ **Terminologia médica padronizada** (HAS, DM, DPOC, etc.)
- ✅ **Siglas obrigatórias** conforme protocolo
- ✅ **Estrutura de documento** juridicamente protegida
- ✅ **Fallbacks automáticos** para informações não documentadas
- ✅ **Validações de segurança** medicamentosa
- ✅ **Templates por síndrome** baseados em evidências

## 🎯 Próximos Passos

- [ ] Integração com sistemas hospitalares
- [ ] Exportação para PDF
- [ ] Histórico de anamneses
- [ ] Templates personalizáveis
- [ ] Integração com bases de dados de medicamentos
- [ ] Sistema de auditoria completo

---

**Desenvolvido seguindo as especificações do documento PS Anamnese v1.0.0**
**Sistema auxiliar – não substitui julgamento clínico médico**
