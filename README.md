# ELEVUS — Construção e Acabamentos

Site estático (HTML, CSS e JS puros, sem dependências). Abra `index.html` ou publique a pasta no Netlify.

## Estrutura
- `index.html` — conteúdo e SEO (title, meta, Open Graph, JSON-LD)
- `style.css` — variáveis em `:root`, organizado por seções numeradas
- `script.js` — módulos: WhatsApp, header, animações, projetos, formulário. Config no topo
- `assets/logo/logo.svg` — logo e favicon
- `assets/images/` — coloque suas fotos aqui (hoje não há imagens: projetos e hero usam composições em CSS)

## O que substituir
1. **WhatsApp:** `CONFIG.whatsapp` no topo do `script.js` (só dígitos, com 55 + DDD).
2. **Telefone, Instagram, endereço, horário:** seção `#contato` e `<script type="application/ld+json">` no `index.html`. Troque `SEU_INSTAGRAM` e `seudominio.com.br`.
3. **Logo:** substitua `assets/logo/logo.svg` (mantém o favicon).
4. **Fotos do hero:** troque o bloco `.hero__art` por `<img src="assets/images/hero.jpg" alt="..." width="..." height="...">`.
5. **Projetos:** em cada `.proj`, edite `data-t` e `data-d` e use `background:url(...)` em `.t1` a `.t5` no CSS. Adicione imagens com `loading="lazy"`.
6. **Números:** atributo `data-n` em `.stats` (hoje 0 = placeholder). Use `data-s="%"` para porcentagem.
7. **Depoimentos, FAQ, textos:** marcados como "placeholder" no HTML. Só publique depoimentos reais e autorizados.
8. **Imagem de compartilhamento:** `assets/images/og.jpg` (1200x630).
9. **Cores:** variáveis `--accent`, `--ink`, `--stone` no `style.css`.

## Observações
- O formulário não usa servidor: valida e abre o WhatsApp com a mensagem pronta.
- Respeita `prefers-reduced-motion`, tem foco visível e navegação por teclado.
