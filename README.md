# Github Pages Portfolio

Este repositorio esta usando Github Pages.

## ¿Clone/Fork?

Seguir las instrucciones de instalación de Ruby, Gem y Jekyll.

* https://jekyllrb.com/docs/installation/ubuntu/

Para instalar las dependencias.

```bash
bundle install
```

Para lanzar el proyecto en local.

```bash
bundle exec jekyll serve
```

### Subir walkthough

Subir en la carpeta un archivo con nombre `YYYY-MM-DD-[NOMBRE_MAQUINA].htb.md`.

Si el .markdown esta usando imagenes, estas imagenes debes colocarlas bajo, la carpeta `assets/machines/[NOMBRE_MAQUINA].htb/images/[FILENAME]`

Y para hacer referecia desde el archivo markdown a la imagen utiliza la siguiente ruta

`![Nombre Imágen](/assets/machines/[NOMBRE_MAQUINA].htb/images/[FILENAME])`

Tengo preparado un script automatizado para generar walkthroughs a partir de .md de Obsidian, revisar el directorio [parsing](./parsing/README.md)