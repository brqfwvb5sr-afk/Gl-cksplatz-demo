# Glücksplatz Demo

Statische Demo-Website für `Glücksplatz` in `6034 Inwil LU`, optimiert für einen schnellen Erstkontakt über Telefon, E-Mail, Google Maps und die bestehende Website.

## Projektstruktur

```text
.
|-- assets/
|   `-- favicon.svg
|-- scripts/
|   `-- main.js
|-- styles/
|   `-- main.css
|-- .nojekyll
|-- index.html
`-- README.md
```

## Datenbasis

- Briefing: Name, Branche, Ort, Adresse, Telefon, Google-Maps-Link und Öffnungszeiten
- Offizielle Website `https://xn--glcksplatz-beb.ch/`: Angebotsbereiche, Name der Begleitung und E-Mail `info@glücksplatz.ch`

## Lokal starten

Node oder `npm install` sind nicht nötig.

### PowerShell / Windows

```powershell
py -m http.server 8000
```

### Alternative mit Python

```bash
python -m http.server 8000
```

Danach im Browser öffnen:

```text
http://localhost:8000
```

## Git-Setup

Falls das Projekt in einem neuen Repository gestartet wird:

```bash
git init
git add .
git commit -m "Initial commit: Glücksplatz demo site"
```

## Deployment auf GitHub Pages

### 1. Repository auf GitHub anlegen

Repository-Name:

```text
Glücksplatz-demo
```

### 2. Remote setzen und Code pushen

```bash
git remote add origin https://github.com/DEIN-USERNAME/Glücksplatz-demo.git
git branch -M main
git push -u origin main
```

### 3. GitHub Pages aktivieren

1. Repository auf GitHub öffnen.
2. `Settings` öffnen.
3. Links `Pages` wählen.
4. Unter `Build and deployment` bei `Source` die Option `Deploy from a branch` wählen.
5. Branch `main` und Ordner `/ (root)` auswählen.
6. Speichern.

### 4. Veröffentlichung prüfen

GitHub Pages veröffentlicht die Seite danach unter der Projekt-URL. Da der Repository-Name ein `ü` enthält, wird die URL im Browser normalerweise URL-kodiert dargestellt:

```text
https://DEIN-USERNAME.github.io/Gl%C3%BCcksplatz-demo/
```

### 5. Weitere Änderungen deployen

```bash
git add .
git commit -m "Update Glücksplatz demo site"
git push
```

Jeder Push auf `main` aktualisiert die GitHub-Pages-Seite erneut.

## Hinweise

- `.nojekyll` bleibt im Projekt, damit GitHub Pages die statische Seite direkt ausliefert.
- Die Demo ergänzt die bestehende Website, ersetzt sie aber nicht.
- Verwendete GitHub-Pages-Dokumentation:
  - https://docs.github.com/en/pages/quickstart?apiVersion=2022-11-28
  - https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site?apiVersion=2022-11-28
