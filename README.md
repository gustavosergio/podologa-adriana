# Adriana Amorim — Podologia e Estética

Site institucional em HTML, CSS e JavaScript, sem dependências ou etapa de build.

Site público: https://adrianapodologa.netlify.app/

## Desenvolvimento local

Na pasta do projeto, execute:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Abra http://127.0.0.1:4173/ no navegador. Recarregue a página após alterações.

## Arquivos

- `index.html`: conteúdo, serviços, localização e estrutura das seções.
- `styles.css`: layout responsivo, animações e modos claro/escuro.
- `script.js`: menu, links de contato, carrossel, conteúdo sensível e botão de tema.
- `theme.js`: restaura a preferência de aparência antes da renderização.
- `assets/`: fotos utilizadas, logo e fontes das avaliações.
- `netlify.toml`: publicação estática e cabeçalhos HTTP.

## Funcionalidades

- Agendamento pelo WhatsApp e links para Instagram.
- Carrossel com seis trechos de avaliações reais do Google Maps, cartões laterais clicáveis, setas, teclado, swipe e avanço a cada 6,5 segundos.
- Reprodução pausa ao passar o mouse, focar os controles, sair da seção ou ocultar a aba. Há controle manual de pausa e respeito à preferência por movimento reduzido.
- Comparativos e registros com aviso de conteúdo sensível. Imagens permanecem ocultas e sem `src` até o visitante escolher visualizá-las. É possível ocultá-las novamente.
- Modos claro/escuro com preferência salva localmente.
- Mapa incorporado e foto completa do espaço de atendimento.
- Crédito de Gustavo Lira com link para WhatsApp no rodapé.

## Conteúdo confirmado

Nome profissional: Adriana Amorim — Podologia e Estética.

Serviços: desencravamento de unhas, profilaxia e tratamento de rachaduras.

Endereço: Rua Bom Conselho, 468 — Água Fria, Recife – PE, CEP 52120-200.

Horário: segunda a sábado, das 9h às 20h, somente com agendamento.

WhatsApp: (81) 99889-3216. O número aparece em `script.js` e nos links de fallback e ligação em `index.html`; atualizar todos em caso de mudança.

## Fotografias e avaliações

As duas fotos de atendimento e a foto do espaço foram enviadas pela cliente via responsável pelo projeto. As imagens anteriores substituídas não fazem parte desta versão.

Logo obtido do perfil https://www.instagram.com/podologa_adrianarecife/ (150 × 150 pixels).

Registros originais do Instagram:

- Unha encravada: https://www.instagram.com/podologa_adrianarecife/p/CkJBP2gudPH/
- Profilaxia: https://www.instagram.com/podologa_adrianarecife/p/CkGuk6cuaRM/
- Cuidados com as unhas: https://www.instagram.com/podologa_adrianarecife/p/Cj8hcQIpzeX/

O par enviado em 31/10/2026 está identificado como “Antes” e “Após o procedimento”. A segunda imagem mostra o período anterior à cicatrização e não é apresentada como resultado recuperado. As fotografias originais são preservadas. Não há diagnóstico ou garantia de resultado.

As avaliações foram consultadas em 30/10/2026, com grafia original e autores, e não são sincronizadas automaticamente com o Google. Fontes em `assets/review-sources.json`.

## Publicação no Netlify

Painel: https://app.netlify.com/projects/adrianapodologa

Última publicação confirmada: deploy `6ae63e981e92fb851a99bc6e`, com as fotos atualizadas em 31/10/2026.

A publicação atual foi feita por upload manual e ainda não está conectada ao GitHub. Fazer push neste repositório não atualiza automaticamente o site.

Para habilitar publicação contínua no projeto existente do Netlify, conectar o repositório `gustavosergio/podologa-adriana`, selecionar a branch `main`, deixar o comando de build vazio e usar `.` como pasta de publicação. O arquivo `netlify.toml` já contém a configuração estática e os cabeçalhos, inclusive a permissão para o mapa incorporado.

Em publicação manual, enviar apenas os arquivos em uso e incluir `_headers` equivalente aos cabeçalhos de `netlify.toml`.

## Pendências de entrega

- Revisar os textos finais com a cliente e confirmar a formação completa a divulgar.
- Conferir o WhatsApp em celular real.
- Atualizar separadamente o horário do cadastro no Google Maps, que ainda mostrava 8h30–19h na consulta.
- Se desejado, conectar o GitHub ao Netlify e configurar URL canônica, imagem de compartilhamento e sitemap.
