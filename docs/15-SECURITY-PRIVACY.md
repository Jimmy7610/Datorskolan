# Säkerhet och integritet

## MVP

MVP ska fungera helt lokalt i användarens webbläsare.

## Persondata

Undvik:
- personnummer,
- adress,
- födelsedatum,
- e-post om det inte behövs,
- känslig användardata.

## Barn

Om projektet senare får konton, molnsynk eller analytics måste särskild hänsyn tas till barns integritet och tillämplig lagstiftning.

## Simulerade miljöer

E-post, filer och webbsidor i övningar ska vara fiktiva.

## Externa länkar

Tidiga nivåer bör undvika att skicka nybörjare till externa webbplatser mitt i utbildningen.

## XSS

Om användaren kan skriva text som senare renderas:
- använd `textContent`,
- undvik osäker `innerHTML`.

## localStorage

Versionera lagrad data.

Exempel:
`datorskolan:v1:progress`
