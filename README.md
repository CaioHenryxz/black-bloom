# Black Bloom — Tattoo & Arte

Site de apresentação do estúdio Black Bloom. O visitante pode conhecer os estilos de tatuagem, explorar os trabalhos dos artistas e iniciar um contato com o estúdio.

A página está em HTML, com estilos em [style.css](style.css), interações em [app.js](app.js) e fotografias em [assets](assets).

## Executar localmente

Na raiz do projeto, inicie um servidor estático com Python 3:

```sh
python -m http.server 8000
```

Abra http://localhost:8000 no navegador.

## Publicação na Vercel

Importe o repositório, use a raiz como diretório do projeto e selecione o preset **Other**. Deixe o comando de build vazio e use `.` como diretório de saída. O arquivo de entrada é [index.html](index.html).
