# ![Pokébal](/assets/icons/pokeball-green-40px.png) Elenas Pokédex

![Screenshot des Pokédex](/assets/img/screenshot.jpg)

<div align="center">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
        <img width="12" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo" />
        <img width="12" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
        <img width="12" />
        <img src="https://pokeapi.co/static/pokeapi_256.3fa72200.png" height="40" alt="Pokémon logo" />
</div>
<img height="12" />
<div align="center">

![Lernprojekt](https://img.shields.io/badge/Lernprojekt-Frontend-17d8c2?style=for-the-badge)
<img width="12" />
![Projektstatus](https://img.shields.io/badge/Projektstatus-abgeschlossen-3fcc41?style=for-the-badge)

</div>

<div align="center">
        
🌐 Live-Ansicht meines Projekts: 👉 [Elenas Pokédex](https://elenahiener.developerakademie.net/modul-8_2026-05_pokedex/index.html)

</div>

## Inhaltsverzeichnis

⚙️ [Voraussetzungen](#️-voraussetzungen)
- 💻 [Laufzeitumgebung](#-laufzeitumgebung)
- 🎨 [Frontend-Technologien (UI)](#-frontend-technologien-ui)
- 💾 [Datenquelle / Schnittstelle](#-datenquelle--schnittstelle)

🚀 [Quickstart](#-quickstart)

🛠️ [Usage](#️-usage)
- 🎯 [Projektbeschreibung](#-projektbeschreibung)
- 🗂️ [Projektstruktur](#-projektstruktur)
- 🌟 [Features](#-features)

👩‍💻 [Entwicklerin](#-entwicklerin)

📝 [Lizenz](#-lizenz)


## ⚙️ Voraussetzungen

### 💻 Laufzeitumgebung

*nicht erforderlich*

### 🎨 Frontend-Technologien (UI)

| Technologie | Aufgabe |
| --- | --- |
| HTML5 | Struktur der App |
| CSS3+ | Design und die visuelle Gestaltung |
| JavaScript ES6+ | Dynamik und Interaktivität |

### 💾 Datenquelle / Schnittstelle

👉  [PokéAPI](https://pokeapi.co/)


## 🚀 Quickstart

1. Repository klonen:

```bash
git clone https://github.com/pokedex.git
```

2. In das Verzeichnis wechseln:

```bash
cd pokedex
```

3. Starte deinen lokalen Entwicklungsserver:
```text
z.B. Live Server in VS Code
```

4. Öffne danach die URL im Browser:
```text
http://localhost:5501
```


## 🛠️ Usage

### 🎯 Projektbeschreibung

Diese Web-App ist ein interaktiver und responsiver Pokédex, der Daten dynamisch aus der offiziellen PokéAPI abruft. Die Anwendung ermöglicht es Nutzern, durch die Pokémon-Liste zu scrollen, gezielt nach bestimmten Namen zu suchen und detaillierte Statuswerte in einer übersichtlichen Ansicht aufzurufen.

### 📁 Projektstruktur

```text
.
│   index.html
│   README.md
│   script.js
│   style.css
│   .gitignore
│   
├───assets/
│   ├───fonts/
│   ├───icons/
│   └───img/
│           
├───scripts/
│       templates.js
│       
└───styles/
        assets.css
        fonts.css
        standard.css
```

### 🌟 Features

⚡ **Fetch-then-Render** (Daten werden erst geladen, dannach gerendert)

💾 **Smart Caching** (keine redundante Netzwerk-Requests, bereits geladene Daten und Bilder werden zwischengespeichert)

💡 **Lazy Loading** (Details werden erst bei Bedarf geladen)

📱 **Vollständig Responsive** (320px bis 1440px+)

🎨 **Typ-basiertes Farbdesign** (zweifarbig bei Pokémon mit 2 Typen)

✨ **individuelle "Load More"-Anzahl** (Lade so viele oder wenige Pokemon wie du willst.)

🔍 **Suchfunktion** (nach Pokémonnamen, ab drei Buchstaben)

🔔 **Benutzer-Feedback** (bei erfolgloser Suche)


## 💻 Entwicklerin

### ![Avatar Elena](/assets/icons/elena-avatar-80px.png) Elena Hiener
📧 Email: [hiener.elena@web.de](mailto:hiener.elena@web.de)

🔗 LinkedIn: [elena-hiener](https://de.linkedin.com/in/elena-hiener)

🐙 GitHub: [ElenaH-2026](https://github.com/ElenaH-2026)


## 📝 Lizenz

Dieses Projekt ist ein reines Übungsprojekt und ist zu Lernzwecken im Zuge meiner Weiterbildung bei der [Developer Akadamy](https://developerakademie.com) entstanden.
Die Pokémon-Daten werden über die PokéAPI bezogen.
Es steht in keiner Verbindung zu The Pokémon Company, Nintendo oder Game Freak.

### Pokémon-Daten und Markenrechte
Alle Pokémon-Namen, Bilder und Daten, die über die [PokéAPI](https://pokeapi.co) bezogen wurden, sind geistiges Eigentum von Nintendo, Creatures Inc. und GAME FREAK inc. 
