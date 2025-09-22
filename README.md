## 🧑‍💻 Integrantes

- Lucas Moreno Matheus - RM97158
- Gabriel ferla - RM550695
- Henri de Oliveira Lopes - RM98347
- Lorenzo Gomes Andreata - RM551117
- Victor Flávio Demarchi Viana - RM99389

---

## 🧭 Navegação de Telas

O aplicativo conta com as seguintes telas principais:

- **Cadastro:** Tela para registrar novos usuários no sistema.
- **Login:** Tela de autenticação de usuários.
- **MFA Screen:** Autenticação multifator para maior segurança.
- **Welcome Screen:** Tela de boas-vindas com introdução ao app.
- **Home Screen:** Painel principal com overview financeiro.
- **AI Finance Form:** Formulário inteligente para recomendações de investimentos.
- **Transaction History:** Histórico de transações e movimentações.
- **Settings:** Configurações do aplicativo.

---

## ⚙️ Funcionalidades

### 🔐 Autenticação
- **Cadastro:** Registro padronizado e verificado de usuários no sistema.
- **Login:** Acesso ao aplicativo com credenciais.
- **MFA (Multifator):** Confirmação adicional para garantir a identidade do usuário. (Funcionalidade ainda em desenvolvimento)

### 🤖 Formulário (futuramente com IA) para Recomendação Financeira
O formulário inteligente faz uma análise do perfil do usuário com base em perguntas estratégicas:

1. **Experiência com investimento:**
   - Iniciante ou Experiente.

2. **Nível de risco desejado:**
   - Super conservador
   - Conservador tolerante
   - Levemente agressivo
   - Super agressivo

3. **Liquidez desejada:**
   - Alta liquidez (acesso rápido ao dinheiro)
   - Baixa liquidez (prioriza lucros maiores)

4. **Horizonte de investimento:**
   - Mensalmente
   - Anualmente
   - Colocar e esquecer

5. **Critérios eliminatórios para investimento:** (Campo ainda em desenvolvimento)
   - Campo dissertativo onde o usuário pode descrever preferências ou restrições (ex: não investir em combustíveis fósseis, empresas de armas, etc).

6. **Detalhes adicionais (Opcional):** (Campo ainda em desenvolvimento)
   - Campo dissertativo aberto para quaisquer outras observações.

### 📊 Histórico e Configurações
- **Transaction History:** Visualização das movimentações financeiras anteriores. (Funcionalidade ainda em desenvolvimento)
- **Settings:** Gerenciamento de preferências do usuário, notificações e segurança. (Funcionalidade ainda em desenvolvimento)

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

- **React Native** – Framework principal para desenvolvimento mobile.
- **Async Storage** – Armazenamento local de dados sensíveis e preferências do usuário, junto com criptografia via expo-secure-store.
- **React Navigation (Tab Navigation)** – Navegação por abas entre as principais telas.
- **ESLint** – Análise estática de código para manter boas práticas.
- **Prettier** – Formatação automática e consistente do código.
- **Reactotron** – Ferramenta de debug para React Native.

---

## 🚀 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/LM2124/fiap-mobile-development-sprint1.git
   cd fiap-mobile-development-sprint1
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Inicie o app:

   ```bash
   npx run start # Padrão
   # ou
   npx run web # Para execução em navegadores WEB
   # ou
   npx run android # Para execução em Android
   ```

   ### Credenciais de acesso (para testes):
   - **Login:** john@example.com
   - **Senha:** password123
