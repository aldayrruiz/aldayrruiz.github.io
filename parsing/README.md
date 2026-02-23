El script `from_obisidian_to_repo.py`:

* Toma las imágenes y crea unas nuevas modificando el formato a webp.
* Crea un archivo markdown nuevo tomando como base el antiguo.
* Modifica las refencias de las imágenes al nuevo formato.
* Organiza las carpetas para su fácil movilización.

### Requisitos

Tener la siguiente estructura:
```
.
├── Planning
│   ├── Planning.md
│   └── attachments
│       ├── image1.png
│       ├── image2.png
├── README.md
└── from_obisidian_to_repo.py
```

Instalar Pillow

```bash
pip install Pillow
```

Ejecutar el script

```bash
python from_obisidian_to_repo.py

¿Qué máquina de Hack The Box quieres documentar?: Planning
```

El script buscará la carpeta `Planning` dentro del directorio `parsing` y realizará el parsing creando lo siguiente:

```
└── output_copy
    ├── 2026-01-23-planning.htb.md
    └── assets
        └── machines
            └── planning.htb
                └── images
                    ├── 0ae6aebe-76d9-4b71-87dc-1e1afab77e41.webp
                    ├── 12953499-0956-465c-94bc-140d1402929a.webp
                    ├── 1c0a3c2f-5698-4bee-9c9b-6c53ad3ecb86.webp
```

Ahora solo copiar la carpeta que contiene las imagenes `planning.htb` a la carpeta `assets` y el md a `_post`.