# 🤝 Contribuindo para o WellWave

Obrigado pelo seu interesse em contribuir para o WellWave! Este guia fornece informações sobre como contribuir para o projeto.

## 📋 Código de Conduta

Este projeto adere aos padrões profissionais de desenvolvimento de software médico. Esperamos que todos os contribuidores:

- Mantenham um ambiente respeitoso e colaborativo
- Foquem na qualidade e segurança do código médico
- Respeitem as diretrizes de compliance (CFM/LGPD)
- Sigam as melhores práticas de desenvolvimento

## 🎯 Como Contribuir

### 1. Reportar Problemas

- Use as [Issues](https://github.com/Wesley-codeDr/wellwave-medical-assistant/issues) para reportar bugs
- Forneça informações detalhadas sobre o problema
- Inclua passos para reproduzir o erro
- Mencione versões do browser/sistema operacional

### 2. Sugerir Melhorias

- Abra uma Issue com o template de "Feature Request"
- Descreva a funcionalidade desejada
- Explique o benefício médico/clínico da sugestão
- Considere aspectos de compliance e segurança

### 3. Contribuir com Código

#### Configuração do Ambiente

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/SEU-USERNAME/wellwave-medical-assistant.git

# Entre no diretório
cd wellwave-medical-assistant

# Instale as dependências
npm install

# Execute os testes
npm run test

# Execute o servidor de desenvolvimento
npm run dev
```

#### Workflow de Desenvolvimento

1. **Crie uma branch** para sua feature:
   ```bash
   git checkout -b feature/nome-da-feature
   ```

2. **Desenvolva** seguindo os padrões do projeto:
   - Use TypeScript estrito
   - Siga convenções de nomenclatura
   - Adicione testes quando apropriado
   - Mantenha compliance CFM/LGPD

3. **Teste** sua implementação:
   ```bash
   npm run lint
   npm run type-check
   npm run test
   npm run build
   ```

4. **Commit** suas mudanças:
   ```bash
   # Use conventional commits
   git commit -m "feat: adicionar funcionalidade X"
   git commit -m "fix: corrigir problema Y"
   git commit -m "docs: atualizar documentação Z"
   ```

5. **Push** e abra um Pull Request:
   ```bash
   git push origin feature/nome-da-feature
   ```

## 📝 Padrões de Código

### TypeScript
- Use tipagem estrita (`strict: true`)
- Defina interfaces para todos os objetos médicos
- Evite `any` - use tipos específicos

### React/Next.js
- Use componentes funcionais com hooks
- Implemente error boundaries
- Otimize performance com React.memo quando necessário

### Estilização
- Use Tailwind CSS classes
- Siga o design system do shadcn/ui
- Mantenha responsividade mobile-first

### Nomenclatura
- **Componentes**: PascalCase (`MedicalForm.tsx`)
- **Arquivos**: kebab-case (`medical-form.utils.ts`)
- **Variáveis**: camelCase (`patientData`)
- **Constantes**: SCREAMING_SNAKE_CASE (`CFM_COMPLIANCE_RULES`)

## 🏥 Considerações Médicas

### Compliance CFM
- Mantenha conformidade com Resolução CFM 2.314/2022
- Valide todos os campos obrigatórios de anamnese
- Implemente rastreabilidade de dados médicos

### LGPD
- Proteja dados pessoais sensíveis
- Implemente consentimento explícito
- Mantenha logs de auditoria

### Segurança
- Nunca exponha dados médicos em logs
- Use HTTPS para todas as comunicações
- Implemente validação dupla (cliente + servidor)

## 🧪 Testes

### Tipos de Teste
- **Unit Tests**: Funções e utilitários
- **Integration Tests**: Componentes complexos
- **E2E Tests**: Fluxos críticos médicos

### Executar Testes
```bash
# Todos os testes
npm run test

# Testes específicos
npm run test -- --watch

# Cobertura
npm run test:coverage
```

## 📚 Documentação

### JSDoc
```typescript
/**
 * Gera anamnese formatada conforme CFM
 * @param patientData - Dados do paciente
 * @param clinicalData - Dados clínicos coletados
 * @returns Anamnese formatada para documentação médica
 */
```

### README
- Mantenha instruções atualizadas
- Documente novas funcionalidades
- Inclua exemplos de uso

## 🔄 Processo de Review

### Checklist do PR
- [ ] Código testado e funcionando
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Compliance CFM verificado
- [ ] LGPD compliance verificado
- [ ] Performance validada
- [ ] Responsividade testada

### Critérios de Aprovação
- Mínimo 1 aprovação de maintainer
- Todos os checks de CI passando
- Cobertura de testes mantida
- Compliance médico verificado

## 🆘 Precisa de Ajuda?

- **Documentação**: Consulte o [README](README.md)
- **Issues**: Abra uma [nova issue](https://github.com/Wesley-codeDr/wellwave-medical-assistant/issues/new)
- **Discussões**: Use [GitHub Discussions](https://github.com/Wesley-codeDr/wellwave-medical-assistant/discussions)

## 📜 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a [Licença MIT](LICENSE).

---

**Obrigado por contribuir para o WellWave!** 🏥❤️