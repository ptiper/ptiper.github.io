# ptiper.com

Site perso de Guillaume Verdier, servi sur https://ptiper.com.

## Objectif

- Présenter mon profil et mes réalisations passées.
- Être trouvable par les LLM (LinkedIn leur bloque l'accès).
- Recevoir des opportunités de travail, de projets ou de discussions e-commerce, surtout via le networking.
- Ton : "let's talk", pas une recherche d'emploi active.

## Public

Recruteurs, personnes voulant parler de mes projets ou d'e-commerce.

## Décisions

- Site bilingue : anglais à la racine, français sous /fr/.
- Une seule page longue.
- HTML statique très rapide, CSS adaptatif (mobile, tablette, ordinateur). JavaScript minimal accepté.
- Hébergement GitHub Pages, dépôt public ptiper/ptiper.github.io, branche main, dossier racine.
- Cloudflare en DNS et proxy (plan Free).
- Suivi du trafic : Cloudflare Web Analytics (humains) et AI Crawl Control (LLM). Robots IA tous autorisés.
- Style visuel "Carnet au trait" : dessins noir et blanc à la plume, avec une petite ligne manuscrite sous chaque dessin. SVG produits par Claude.
- Modes clair et sombre.
- Pas de photo, pas de CV téléchargeable.
- Aucune info perso sur le site (email perso, téléphone, adresse).
- Contact par alias email sur le domaine (Infomaniak) et formulaire.
- Liens LinkedIn et GitHub.
- Données structurées schema.org Person prévues.

## Règles

- Mettre à jour llms.txt et robots.txt à chaque évolution du contenu du site.
- Jamais de tiret cadratin, ni dans les fichiers ni dans les messages.
- Commits avec l'email noreply GitHub (déjà configuré dans le git local du dépôt).

## Configuration en place (octobre 2026)

### GitHub Pages
- Source : branche main, dossier racine. Fichier CNAME = ptiper.com.
- HTTPS forcé (https_enforced), certificat Let's Encrypt émis par GitHub pour ptiper.com et www.ptiper.com.
- Domaine ptiper.com vérifié au niveau du compte GitHub ptiper (TXT `_github-pages-challenge-ptiper`).
- www.ptiper.com redirige en 301 vers https://ptiper.com.

### DNS
- Domaine enregistré chez Infomaniak, DNS délégués à Cloudflare (annalise.ns.cloudflare.com, jaziel.ns.cloudflare.com). DNSSEC inactif.
- Cloudflare plan Free. SSL/TLS en Full (strict).
- Site, en Proxied (orange) :
  - A @ : 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
  - AAAA @ : 2606:50c0:8000::153, 2606:50c0:8001::153, 2606:50c0:8002::153, 2606:50c0:8003::153
  - CNAME www : ptiper.github.io

### Enregistrements à ne jamais toucher (DNS only, gris)
- MX @ : 5 mta-gw.infomaniak.ch (mail Infomaniak)
- TXT @ : v=spf1 include:spf.infomaniak.ch -all (SPF)
- CNAME autoconfig : infomaniak.com (config auto des clients mail)
- CNAME autodiscover : infomaniak.com (config auto des clients mail)
- TXT _github-pages-challenge-ptiper : vérification du domaine GitHub, à garder en permanence
- Pas de DKIM ni de DMARC pour l'instant (Cloudflare recommande d'ajouter un DMARC).
- Les erreurs 526 sur autoconfig et autodiscover dans AI Crawl Control > Signals sont normales (pas des sites web).

### Cloudflare, mesure et robots
- Web Analytics actif en installation automatique (script injecté par Cloudflare, sans cookies).
- AI Crawl Control : aucun crawler bloqué. Politiques IA Search, Agent, Training sur Allow.
- Bot Preference Sync désactivé : robots.txt servi tel quel depuis le dépôt.
- AI Labyrinth et Bot Fight Mode désactivés.

### Dépannage
- Si le site renvoie une erreur 526, le renouvellement du certificat GitHub a probablement échoué derrière le proxy : repasser les A, AAAA et www en DNS only (gris), attendre le nouveau certificat, puis remettre en Proxied.
- Si GitHub n'émet pas de certificat, retirer puis remettre le domaine perso (API Pages, champ cname). Cela crée deux commits automatiques sur le CNAME.

## À décider

- Réalisations à mettre en avant.
