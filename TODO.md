<!-- TODO.md -->

## Próximos Passos Essenciais

### Autenticação (Prioridade Alta)

* [ ] **Integrar a API de Autenticação:**
    * [ ] Implementar chamadas à API Registo e Recuperação de Palavra-passe.
    * [ ] Lidar com respostas da API (sucesso, erros, validação do servidor).
    * [ ] Armazenar tokens de autenticação (com segurança).
* [ ] **Implementar a Lógica de Logout.**
* [ ] **Proteger Rotas (Navigation Guards):**
    * [ ] Usar `router.beforeEach` para verificar se o utilizador está autenticado antes de permitir o acesso a rotas protegidas.
    * [ ] Redirecionar para o Login se o utilizador não estiver autenticado.

### Melhorias de UI/UX (Prioridade Média)

* [ ] **Animações/Transições:**
        * [ ] Adicionar animações sutis para transições de página ou ao mostrar/esconder elementos.

### Dashboard (Prioridade Média/Baixa, Depende do Escopo)

* [ ] **Criar a Vista `DashboardView.vue`:**
    * [ ] Estrutura básica da dashboard.
    * [ ] Componentes iniciais (ex: saudação do utilizador, estatísticas básicas).
* [ ] **Buscar Dados para a Dashboard:**
    * [ ] Integrar com a API para obter os dados que serão exibidos na dashboard.

### Outros (Prioridade Variável)

* [ ] **Testes Unitários/E2E:**
    * [ ] Escrever testes para os componentes de autenticação e para a lógica principal.
* [ ] **Documentação:**
    * [ ] Documentar a API e os componentes principais.

## Escolha por Onde Seguir

A **autenticação** (o primeiro grupo) é *essencial* para o funcionamento da sua aplicação. Sem ela, o login, registo e recuperação de palavra-passe não fazem nada. A proteção de rotas também é fundamental para a segurança.

Se a autenticação já estiver bem encaminhada, as **melhorias de UI/UX** podem ser o próximo foco para tornar a experiência do utilizador mais agradável.

A **dashboard** pode ser desenvolvida em paralelo, mas a sua prioridade depende do quão importante é a funcionalidade para o seu projeto.

Lembre-se de ajustar as prioridades com base nas suas necessidades específicas.