# Pulsar

## Descrição

O Pulsar é um projeto acadêmico de Front-End desenvolvido para a Global Solution FIAP 2026/1, no tema Space Connect.

A proposta do site é apresentar uma solução de comunicação emergencial resiliente para situações de desastre climático. A ideia é simular como um alerta oficial da Defesa Civil poderia chegar até moradores de áreas de risco e como esses moradores poderiam enviar uma resposta simples, como "estou seguro", "evacuei" ou "preciso de resgate".

O projeto foi inspirado no conceito de redes DTN (Delay/Disruption Tolerant Networking), usado em cenários onde a conexão pode falhar. No nosso MVP acadêmico, essa lógica aparece como uma simulação visual de guardar, carregar e encaminhar mensagens.

Importante: o site é apenas um protótipo acadêmico. Ele não envia alertas reais, não substitui a Defesa Civil e não implementa comunicação real sem internet.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- IBM Watson Assistant para o chatbot
- Git e GitHub para versionamento
- Vercel para deploy

## Estrutura de Pastas

pulsar-front-end/
├── assets/
│   ├── imagens do projeto
│   ├── ícones
│   └── fotos dos integrantes
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── chatbot.js
├── pages/
│   ├── contato.html
│   ├── emitir-alerta.html
│   ├── faq.html
│   ├── integrantes.html
│   ├── morador.html
│   ├── painel.html
│   ├── retornos.html
│   ├── simulador.html
│   └── sobre.html
├── index.html
└── README.md


## Páginas do Site

- `index.html`: página inicial com apresentação do Pulsar.
- `sobre.html`: explicação da solução, problema e funcionamento.
- `simulador.html`: simulação da rota resiliente da mensagem.
- `painel.html`: painel da Defesa Civil com mapa, áreas e indicadores.
- `emitir-alerta.html`: formulário simulado de emissão de alerta oficial.
- `morador.html`: tela do morador para responder ao alerta.
- `retornos.html`: visualização dos retornos recebidos da população.
- `faq.html`: perguntas frequentes sobre o projeto.
- `contato.html`: formulário de contato com validação em JavaScript.
- `integrantes.html`: apresentação dos integrantes do grupo.

## Funcionalidades

- Menu responsivo com versão mobile.
- Formulários com validação em JavaScript.
- Simulação de envio de alerta.
- Simulação da rota resiliente da mensagem.
- Tela do morador com envio simulado de status.
- Filtro de retornos por prioridade.
- FAQ interativo em formato de acordeon.
- Chatbot de apoio para explicar o projeto.

## Imagens e Ícones

As imagens e ícones utilizados no projeto estão na pasta `assets/`.

Foram usados elementos visuais para representar:

- alerta oficial;
- gateway comunitário;
- rota resiliente;
- canal de retorno;
- simulação da comunicação;
- mapa de risco e monitoramento;
- fotos dos integrantes.

Esses recursos foram criados para uso dentro do protótipo Pulsar.

## Autores e Créditos

| Nome | RM | Turma |
| --- | --- | --- |
| Carlos Eduardo Oliveira Silva | 569103 | 1TDSPV |
| Allyson Victor Santos De Souza | 571046 | 1TDSPV |

Projeto desenvolvido para a FIAP, no curso de Análise e Desenvolvimento de Sistemas, 1º semestre de 2026.

## Link do Repositório

Repositório GitHub:

https://github.com/calyra-gs/pulsar-front-end

## Contato

O contato pode ser feito pela página `contato.html` do próprio site ou pelos perfis dos integrantes:

- GitHub Carlos Eduardo: https://github.com/ceduardoos
- GitHub Allyson Victor: https://github.com/Ally7574
- E-mail: calyra.fiap@gmail.com
- Teams: rm569103@fiap.com.br