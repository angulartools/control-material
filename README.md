# Control Material

Uma biblioteca Angular elegante e simples para criar campos de formulário com Angular Material, reduzindo código repetitivo e acelerando o desenvolvimento.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Características](#características)
- [Instalação](#instalação)
- [Componentes Disponíveis](#componentes-disponíveis)
- [Uso](#uso)
- [API](#api)
- [Desenvolvimento](#desenvolvimento)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Suporte](#suporte)

## 🎯 Sobre o Projeto

O **Control Material** é uma biblioteca completa de componentes wrapper para Angular Material que oferece mais de 15 tipos diferentes de campos de formulário especializados. Elimina código repetitivo e acelera o desenvolvimento de formulários reativos no Angular, mantendo toda a funcionalidade e estética do Material Design.

### Características

✨ **Biblioteca Completa**: Mais de 15 componentes especializados  
🎨 **Totalmente Integrado**: Funciona perfeitamente com Angular Material  
📱 **Componentes Avançados**: Autocomplete, color picker, date-time, file upload e mais  
⚡ **Validação Automática**: Exibe mensagens de erro automaticamente  
🔧 **Reactive Forms**: Integração nativa com FormControl  
🎭 **Flexível**: Configurável através de propriedades simples

## 📦 Instalação

### Usando npm

```bash
npm install @angulartoolsdr/control-material
```

### Usando yarn

```bash
yarn add @angulartoolsdr/control-material
```

### Usando pnpm

```bash
pnpm add @angulartoolsdr/control-material
```

### Dependências

Certifique-se de ter as seguintes dependências peer instaladas:

```bash
npm install @angular/material @angular/cdk @angular/animations
```

### Angular Material Setup

Se ainda não configurou o Angular Material:

```bash
ng add @angular/material
```

## 🧩 Componentes Disponíveis

A biblioteca oferece uma ampla gama de componentes especializados:

### Componentes Básicos

- control-material - Input básico (text, email, password, number)
- control-material-textarea - Área de texto multilinha
- control-material-select - Dropdown/Select

### Componentes Avançados

- control-material-autocomplete - Campo com autocomplete
- control-material-color-picker - Seletor de cores
- control-material-date-time - Seletor de data e hora
- control-material-file - Upload de arquivos
- control-material-filter - Campo de filtro/busca
- control-material-fontawesome-icon - Seletor de ícones FontAwesome
- control-material-masked - Input com máscara
- control-material-minute-second - Seletor de minutos e segundos
- control-material-number - Input numérico especializado
- control-material-password - Campo de senha com opções avançadas
- control-material-password-strength - Campo de senha com indicador de força
- control-material-phone - Input de telefone com formatação
- control-material-radio - Botões de rádio
- control-material-search - Campo de busca otimizado
- control-material-time - Seletor de horário

### Utilitários

- ngx-flag-picker - Seletor de bandeiras/países
- validators - Validadores customizados

## 🚀 Uso

### Importação

```typescript
import { ControlMaterialModule } from '@angulartoolsdr/control-material';

@NgModule({
  imports: [
    // outros imports...
    ControlMaterialModule
  ]
})
export class AppModule { }
```

### Uso Básico

Antes (Angular Material tradicional)

```html
<mat-form-field>
  <mat-label>Nome</mat-label>
  <input matInput [formControl]="nameControl" placeholder="Digite seu nome">
  <mat-error *ngIf="nameControl.hasError('required')">
    Este campo é obrigatório.
  </mat-error>
  <mat-error *ngIf="nameControl.hasError('minlength')">
    O tamanho mínimo não foi atingido.
  </mat-error>
</mat-form-field>
```

Depois (Control Material):

```html
<lib-control-material
  label="Nome"
  placeholder="Digite seu nome"
  [control]="nameControl">
</lib-control-material>
```

## 📖 API

### Propriedades Comuns

Todos os componentes compartilham propriedades básicas:

| Propriedade | Tipo | Padrão | Obrigatório | Descrição |
|-------------|------|--------|------------|-----------|
| `control` | `FormControl` | `-` | Sim | Instância do FormControl para vincular ao campo |
| `label` | `string` | `''` | Não | Texto do label flutuante |
| `placeholder` | `string` | `''` | Não | Texto do placeholder do input |
| `hint` | `string` | `''` | Não | Texto de ajuda abaixo do input |

### Propriedades Específicas

Cada componente possui propriedades adicionais específicas para sua funcionalidade:

- Autocomplete: options, displayWith
- Color Picker: format, presetColors
- Date Time: minDate, maxDate, dateFormat
- File: accept, multiple, maxSize
- Masked: mask, patterns
- Phone: country, format
- Password Strength: strengthLevels, requirements

## 🛠️ Desenvolvimento

### Pré-requisitos

- Node.js 18+
- Angular CLI 18+
- npm, yarn ou pnpm

### Configuração do Ambiente

```bash
# Clone o repositório
git clone https://github.com/angulartools/control-material.git

# Entre no diretório
cd control-material

# Instale as dependências
npm install
```

### Scripts Disponíveis

```bash
# Build da biblioteca
ng build control-material

# Executar testes
ng test control-material

# Gerar componente
ng generate component component-name --project control-material

# Publicar (após build)
cd dist/control-material && npm publish
```

## 🤝 Contribuição

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição

- Siga os padrões de código Angular
- Adicione testes para novas funcionalidades
- Atualize a documentação quando necessário
- Use mensagens de commit descritivas
- Certifique-se de que todos os testes passam

### Reportar Bugs

Para reportar bugs, abra uma [issue](https://github.com/angulartools/control-material/issues) incluindo:

- Descrição detalhada do problema
- Passos para reproduzir
- Versão do Angular e do componente
- Código de exemplo (se aplicável)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- **Documentação**: [GitHub Repository](https://github.com/angulartools/control-material)
- **Issues**: [GitHub Issues](https://github.com/angulartools/control-material/issues)
- **NPM**: [@angulartoolsdr/control-material](https://www.npmjs.com/package/@angulartoolsdr/control-material)

---

<div align="center">

**Feito com ❤️ pela equipe [Angular Tools](https://github.com/angulartools)**

[⬆ Voltar ao topo](#control-material)

</div>