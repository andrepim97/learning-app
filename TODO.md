## Próximos Passos Essenciais

### Autenticação e Navegação
* **Configurar Vue Router:** Integrar o Vue Router para gerir a navegação entre as diferentes vistas da aplicação.
* **Criar `RegisterView`:** Desenvolver a interface e a lógica para a página de registo de novos utilizadores.
* **Criar `ForgotPasswordView`:** Desenvolver a interface e a lógica para a página de recuperação de palavra-passe.
* **Definir Rotas:** Adicionar as rotas `/register` e `/forgot-password` no Vue Router, apontando para as respetivas vistas.

---

### Melhorias de UI/UX
* **Gerir Estado de Carregamento:** Implementar um estado de *loading* nos botões de `submit` para fornecer feedback visual ao utilizador durante o processamento (ex.: chamadas à API).
    * **Ideia:** Considerar transformar o botão num **componente reutilizável** para encapsular esta lógica de *loading* e outras propriedades comuns.