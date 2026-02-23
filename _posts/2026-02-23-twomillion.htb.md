---
layout: post
title: "TwoMillion"
date: 2026-02-23 00:00:00 +0100
tags: ["Deobfuscation", "CVE", "OS Command Injection", "API"]
os: "Linux"
level: "Easy"
image: "https://htb-mp-prod-public-storage.s3.eu-central-1.amazonaws.com/avatars/d7bc2758fb7589dfa046bee9ce4d75cb.png"
---

## Information Gathering

```bash
sudo nmap -sS -sC -sV -p- -T4 -Pn -oA target-tcp 10.129.2.241
```

```python
Starting Nmap 7.98 ( https://nmap.org ) at 2026-02-23 12:31 +0100
Nmap scan report for 2million.htb (10.129.2.241)
Host is up (0.068s latency).
Not shown: 65533 closed tcp ports (reset)
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.1 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 3e:ea:45:4b:c5:d1:6d:6f:e2:d4:d1:3b:0a:3d:a9:4f (ECDSA)
|_  256 64:cc:75:de:4a:e6:a5:b4:73:eb:3f:1b:cf:b4:e3:94 (ED25519)
80/tcp open  http    nginx
|_http-title: Hack The Box :: Penetration Testing Labs
|_http-trane-info: Problem with XML parsing of /evox/about
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 26.02 seconds
```

La web parece ser unos laboratorios de HackTheBox.

![Image](/assets/machines/twomillion.htb/images/777e1569-d728-4bec-9e70-355a8adb4822.webp)

Clicar en "Join HTB".

![](/assets/machines/twomillion.htb/images/099f901f-ca34-4cc5-ab01-1174290abf3a.webp)


Nos llevará a `/invite` donde se necesita un código para acceder. Al revisar en las "Herramientas de Desarrollador" en el campo "Network" vemos que se carga un archivo llamado.
* `invite.min.js`

## Encryption phase
![](/assets/machines/twomillion.htb/images/eb60c3dc-f48b-44f9-bff7-2834e7a2951f.webp)

El archivo esta ofuscado por medio de la técnica "JavaScript Packed". Está técnica es ampliamente conocida y se puede desofuscar por completo en varias web.

![](/assets/machines/twomillion.htb/images/2ae5e250-6b86-4238-83e3-e5df9242797a.webp)

La desofuscación nos muestra los siguientes endpoints:
* `/api/v1/invite/verify`
* `/api/v1/invite/how/to/generate`

Al realizar la petición a este último endpoint, recibimos un mensaje encriptado en ROT13. Este cifrado consiste en iterar por cada carácter y modificarlo por el carácter que se encuentra 13 posiciones más adelante. Por ejemplo, la letra `a` se convertiría en la `n`.

![](/assets/machines/twomillion.htb/images/27f0721a-3924-41ed-b179-ff07562ee74e.webp)

Lo curioso de este cifrado, a parte de que es super sencillo descifrarlo. Es que realmente con cifrarlo otra vez, realmente estarías descifrandolo dado que el alfabeto tiene 26 carácteres.

![](/assets/machines/twomillion.htb/images/b4cc550c-f502-4913-961f-b8bf3cd5bedb.webp)

Ahora descubrimos otro endpoint diferente `/api/v1/invite/generate`. Realizamos la petición.

![](/assets/machines/twomillion.htb/images/4f32b47c-ca60-4bb0-ac70-598c30e73227.webp)

Nos encontramos con un código `VkpWTEctNjQ2V1ktRzY2OU4tWUY2S04`, codificado en base64.

![](/assets/machines/twomillion.htb/images/43303203-5d66-41e1-bc2c-81502e1cef88.webp)

Al decodificarlo obtenemos el código bueno, introducirlo en `/invite`.


![](/assets/machines/twomillion.htb/images/3d9a0672-a8ed-4510-be2c-96944665efd8.webp)

La web redirigirá a /register.

![](/assets/machines/twomillion.htb/images/1267aa59-0a3a-42de-b28b-afb8dc93ee7e.webp)

Nos registramos y luego iniciamos sesión `xsmaky:password`.

![](/assets/machines/twomillion.htb/images/14d8649c-6da8-41ca-a1c6-72eb1a1ef5a2.webp)

## API Enumeration

La web dispone de una descarga de un archivo `xsmaky.openvpn`.

![](/assets/machines/twomillion.htb/images/e54243cf-9569-4330-9f95-2a3e8d54ff14.webp)

Al entrar en `/api`, tomando nuestras cookies por defecto, este nos muestra las rutas que contiene.

![](/assets/machines/twomillion.htb/images/f1c0c744-8a3d-4164-b51a-4d52d26b70ae.webp)

Al entrar en `/api/v1`, vemos todos los endpoints disponibles y descubrimos unos nuevos endpoints `/api/v1/admin`.

![](/assets/machines/twomillion.htb/images/ab2001da-59e6-4a4b-bbf8-721b53d5198f.webp)

El endpoint `/api/v1/admin/settings/update` parece no tener ningún control de acceso. Si logramos explotarlo podríamos modificar nuestro rol a `admin`.

![](/assets/machines/twomillion.htb/images/a5734b52-fb6a-4e8b-b9cb-0e754dbb48b8.webp)

Necesita la cabecera `Content-Type`.

![](/assets/machines/twomillion.htb/images/ad9caa7e-66d9-454c-a60c-f63fdd8ea10a.webp)

Necesita un parámetro `email`, introducir el email del usuario.

![](/assets/machines/twomillion.htb/images/e2818382-7e69-4399-bb17-cece79f715e6.webp)

Necesita un parámetro `is_admin`, el cual tiene que ser `0/1`.

![](/assets/machines/twomillion.htb/images/7acb8f28-3247-4b40-9c6f-ba69aab73a41.webp)

Obviamente le ponemos a `1`.

![](/assets/machines/twomillion.htb/images/7846a0c3-c313-46ec-a29f-c7df1f1baa4c.webp)

## OS Command Injection

Ahora vamos a testear el otro endpoint `/api/v1/admin/vpn/generate`, para generar un archivo `.openvpn` como administradores.

![](/assets/machines/twomillion.htb/images/c478217a-5fc8-4ac7-9d23-4acca8572d67.webp)

Al introducir nuestro `username` se ejecuta de forma normal. Si enviamos una prueba de OS Command Injection:
* `;echo xsmaky`

![Image](/assets/machines/twomillion.htb/images/f65c28d4-4e43-4524-aada-5eeb4074d10b.webp)

Se concatena `.openvpn` a nuestro `echo`. Eso quiere decir que ha funcionado, el comando estará generando un `.openvpn` tal que `... -o $INPUT`.

Lanzar una reverse shell reverse shell.

![](/assets/machines/twomillion.htb/images/25f16430-7196-4959-87a6-ac94484ce63f.webp)

Obtener la reverse shell.

![](/assets/machines/twomillion.htb/images/bc65ad83-27c2-4cc9-b659-904da63feaba.webp)

## Privilege Escalation

Existe un `.env` con las credenciales de la base de datos, que le pertenecen al usuario `admin` (también existe en el sistema) y sí las credenciales son las mismas, así que escalar con `su`.

![](/assets/machines/twomillion.htb/images/45b43d06-813e-4db4-a2fe-9079563c08f5.webp)

Parece ser que el usuario `admin` recibió un correo de parte de `g0blin` advirtiendo sobre un CVE `OverlayFS / FUSE`.

![](/assets/machines/twomillion.htb/images/252a78be-27b7-4859-9a30-c899fc924086.webp)

Al hacer una busqueda rápida, encontraremos el `CVE-2023-0386`. Hay varios exploit, personalmente usé el siguiente.
* https://github.com/puckiestyle/CVE-2023-0386

Tendréis que transferiros el repositorio por medio de un `.zip` a la máquina `2million.htb`.

![](/assets/machines/twomillion.htb/images/5151237b-61b8-4e0d-9440-0566714bf66f.webp)

Ejecutar el siguiente comando.

```
$ ./fuse ./ovlcap/lower ./gc
```

Ejecutar `./exp` en otra terminal.

![](/assets/machines/twomillion.htb/images/aa873dab-db4d-48c0-a324-607443318037.webp)
¡Happy Hacking!