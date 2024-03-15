# Validador de Números de Telefone

Este é um validador de números de telefone implementado em JavaScript, que permite aos usuários selecionar um país e inserir um número de telefone válido para esse país.

## Funcionalidades

- Seleção dinâmica de país: Os usuários podem escolher o país desejado a partir de uma lista disponível.
- Formatação automática de números: O número de telefone inserido é automaticamente formatado de acordo com as regras do país selecionado.
- Integração com Bootstrap: Utiliza o framework Bootstrap para criar uma interface de usuário responsiva e moderna.
- Suporte a múltiplos idiomas: A interface do usuário é exibida no idioma padrão do navegador do usuário.

## Como Usar

Para utilizar este validador de números de telefone em seu projeto, siga estas etapas:

```
1. Inclua o arquivo `script-[plataforma].js` em seu projeto.
2. Certifique-se de que o script está conseguindo incluir as seguintes bibliotecas no seu HTML:
   ```html
   <link rel="stylesheet" href="https://davidmarques.github.io/phonevalidator/style-[plataforma].css">
   <script src="https://code.iconify.design/3/3.1.0/iconify.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/libphonenumber-js/bundle/libphonenumber-js.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
   ```
3. Adicione os elementos HTML necessários para a interface do usuário, conforme especificado no arquivo `script.js`.
4. Inicialize o script chamando a função `carregarScripts(listaDeArquivos, comando)`.
```

## Contribuição

Contribuições são bem-vindas! Se você tiver alguma sugestão de melhoria, correção de bugs ou novas funcionalidades, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Autor

Este script foi desenvolvido por David Marques. Você pode entrar em contato comigo através do meu [perfil no GitHub](https://github.com/davidmarques).

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para obter mais detalhes.
