# Training Arc — Personal Edition

Painel pessoal de musculação em HTML5, CSS3 e JavaScript puro. O projeto foi feito para mobile-first, com layout responsivo, tema roxo neon, fotos de treino, rotina Upper/Lower, XP, níveis, missões, conquistas, cronômetro e histórico local.

## Arquivos

- `index.html` — estrutura semântica, telas, diálogos e navegação.
- `style.css` — identidade visual, cards, responsividade, animações e acessibilidade.
- `script.js` — rotinas, sessões, timer, sistema de XP, missões, histórico, Canvas e backups JSON.

## Como abrir no computador

1. Extraia os arquivos para uma pasta.
2. Abra `index.html` no Chrome, Edge ou outro navegador moderno.
3. Para editar, abra a pasta no VS Code. Não há etapa de build nem instalação de dependências.

## Como abrir no Android

1. Coloque os quatro arquivos em uma mesma pasta.
2. Para uma visualização rápida, tente abrir `index.html` pelo gerenciador de arquivos e selecione o navegador.
3. Alguns gerenciadores Android bloqueiam páginas locais ou limitam recursos do navegador. Se ocorrer, hospede os arquivos em um serviço estático confiável ou use um servidor local HTTP; mantenha os quatro arquivos juntos.

## Recursos implementados

- Rotinas Upper A, Lower A, Upper B e Lower B, com dados de carga, repetições e RIR por série.
- Descanso padrão de **90 segundos (1 minuto e 30 segundos)** para todos os exercícios, com pausa, +30 segundos e pular.
- Restauração da sessão em andamento ao reabrir o site.
- Pré-preenchimento de cargas, repetições e RIR a partir da sessão anterior da mesma rotina.
- XP concedido ao finalizar a sessão, com pontos por séries concluídas, bônus por sessão completa e bônus por novo recorde.
- Níveis progressivos e ranks: Novato, Recruta, Caçador, Elite, Hashira e Lenda.
- Missões semanais e recompensas de XP; conquistas por marcos de consistência.
- Histórico expansível, volume por sessão em gráfico Canvas, volume total e estatísticas semanais.
- Escolha de companheira temática (Miku, Yotsuba, Nino, Ichika, Itsuki ou Marin), com mensagens motivacionais originais.
- Exportação e importação de backup JSON, com validação básica, e reset com confirmação dupla.
- Preferência de movimento reduzido, foco visível e botões adaptados para toque.
- Orientações de segurança, incluindo lembrete para diabetes tipo 1 e a declaração de que o app não calcula nem recomenda doses de insulina.

## XP e progressão

O XP é aplicado quando a sessão é finalizada, para evitar ganhar pontos repetindo o clique de concluir/desconcluir uma série. Cada série concluída rende 18 XP, concluir uma sessão rende 80 XP, completar todos os exercícios rende bônus de 50 XP e registrar um novo recorde de carga rende 35 XP por exercício. Missões e conquistas também podem conceder XP uma única vez por semana ou por marco.

Nível 1 começa em 0 XP. Cada novo nível exige mais XP do que o anterior. Os títulos são cosméticos/motivacionais e não representam medidas de capacidade física.

## Fotos de treino e personagens

As imagens de academia são carregadas de URLs da CDN do Unsplash. A galeria de personagens também carrega as artes oficiais de **The Quintessential Quintuplets** (TBS) e **My Dress-Up Darling** (site oficial do anime). Todas essas imagens externas precisam de conexão com a internet.

A galeria do dashboard mostra Ichika, Nino, Miku, Yotsuba, Itsuki e Marin. Toque em uma personagem para selecioná-la; a escolha também aparece no avatar, no recado motivacional, em Configurações e no seletor de companheira. Se uma imagem falhar, o card mostra um fallback com iniciais e gradiente.

Fontes das imagens dos personagens:
- TQQ: https://www.tbs.co.jp/anime/5hanayome/character/
- MDUD: https://bisquedoll-anime.com/1st/character/

As imagens pertencem aos respectivos titulares. O projeto apenas as referencia externamente; a disponibilidade pode mudar. As fotos de exercícios são ilustrativas e não substituem orientação de execução por profissional.

## Armazenamento e privacidade

Os dados ficam no `localStorage` do navegador usado. Eles não são enviados para um servidor por este projeto, mas também não sincronizam automaticamente entre aparelhos ou navegadores. Exporte seu JSON periodicamente. Limpar os dados do navegador pode apagar o histórico local.

## Segurança e saúde

As séries e repetições são referências configuráveis, não prescrição individual. Ajuste o treino conforme orientação profissional. Não faça o terra romeno se houver dor lombar ou na parte posterior da coxa; interrompa um movimento diante de dor aguda. Pessoas com diabetes tipo 1 devem seguir o plano individual orientado pela equipe de saúde. **Este aplicativo não calcula nem sugere doses de insulina.**

## Limitações conhecidas

- O site ainda não é um PWA instalável: não possui manifesto nem service worker offline.
- Os dados de `localStorage` são específicos deste navegador e aparelho.
- O site registra o RIR informado pelo usuário; ele não mede esforço de forma automática.
- O cronômetro usa o próprio navegador e depende de a página permanecer ativa para avisos mais confiáveis.
