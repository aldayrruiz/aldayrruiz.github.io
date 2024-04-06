# Github Pages Portfolio

Este repositorio esta usando Github Pages.

## Development

Para intalar las dependencias del proyecto ejecutar.

```bash
gem install
```

Para lanzar el proyecto en local, se necesita:

```bash
gem install bundler jekyll
bundle exec jekyll serve
```

### Subir walkthough

Subir en la carpeta un archivo con nombre `YYYY-MM-DD-[NOMBRE_MAQUINA].htb.markdown`.

Si el .markdown esta usando imagenes, estas imagenes debes colocarlas bajo, la carpeta `assets/machines/[NOMBRE_MAQUINA].htb/images/[FILENAME].png`

Y para hacer referecia desde el archivo markdown a la imagen utiliza la siguiente ruta

`![Nombre Imágen](/assets/machines/[NOMBRE_MAQUINA].htb/images/[FILENAME].png)`
