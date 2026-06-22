# ![Pokébal](/assets/icons/pokeball-green-40px.png) Elenas Pokédex

<div align="center">
        
![Lernprojekt](https://img.shields.io/badge/Lernprojekt-Frontend-00939b?style=for-the-badge)
<img width="12" />
![Projektstatus](https://img.shields.io/badge/Projektstatus-abgeschlossen_im_Jun_2026-009600?style=for-the-badge)

</div>

<div align="center">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
        <img width="12" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo" />
        <img width="12" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
        <img width="12" />
        <img src="https://pokeapi.co/static/pokeapi_256.3fa72200.png" height="40" alt="Pokémon logo" />
</div>
<img/>
<div align="center">
        
Diese Web-App ist ein interaktiver und responsiver Pokédex, der Daten dynamisch aus der offiziellen PokéAPI abruft.<br>Die Anwendung ermöglicht es Nutzern, durch die Pokémon-Liste zu scrollen, gezielt nach bestimmten Namen zu suchen und detaillierte Statuswerte in einer übersichtlichen Ansicht aufzurufen.

</div>
        
![Screenshot des Pokédex](/assets/img/screenshot.jpg)


<div align="center">
        
🌐 Live-Ansicht meines Projekts: 👉 [Elenas Pokédex](https://elenah-2026.github.io/pokedex/)

</div>

## 👩‍💻 Entwicklerin

<div align="center">

### ![Avatar Elena](/assets/icons/elena-avatar-80px.png) Elena Hiener

</div>

<div align="center">
      
📧 Email: [hiener.elena@web.de](mailto:hiener.elena@web.de)
<img width="12" />
🔗 LinkedIn: [elena-hiener](https://de.linkedin.com/in/elena-hiener)
<img width="12" />
🐙 GitHub: [ElenaH-2026](https://github.com/ElenaH-2026)

</div>


## 📑 Inhaltsverzeichnis

⚙️ [Voraussetzungen](#️-voraussetzungen)
- 💻 [Laufzeitumgebung](#-laufzeitumgebung)
- 🎨 [Frontend-Technologien (UI)](#-frontend-technologien-ui)
- 💾 [Datenquelle / Schnittstelle](#-datenquelle--schnittstelle)

🚀 [Quickstart](#-quickstart)

🛠️ [Usage](#️-usage)
- 🗂️ [Projektstruktur](#-projektstruktur)
- 🌟 [Features](#-features)

📝 [Lizenz](#-lizenz)


## ⚙️ Voraussetzungen

### 💻 Laufzeitumgebung

*Für dieses Projekt ist keine spezielle Laufzeitumgebung erforderlich.*

### 🎨 Frontend-Technologien (UI)
<div>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="30" alt="html5 logo"  />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="30" alt="css3 logo" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="30" alt="javascript logo"  />
</div>

| Technologie | Aufgabe |
| --- | --- |
| HTML5 | Struktur der App |
| CSS3+ | Design und die visuelle Gestaltung |
| JavaScript ES6+ | Dynamik und Interaktivität |

### 💾 Datenquelle / Schnittstelle

👉 [PokéAPI](https://pokeapi.co/) [<img src="https://pokeapi.co/static/pokeapi_256.3fa72200.png" height="20" alt="Pokémon logo" />](https://pokeapi.co/)


## 🚀 Quickstart

1. Repository klonen:

```bash
git clone https://github.com/ElenaH-2026/pokedex.git
```

2. In das Verzeichnis wechseln:

```bash
cd pokedex
```

3. Starte deinen lokalen Entwicklungsserver:
```text
z.B. Live Server in VS Code
```

4. Öffne danach die URL im Browser auf deinem Computer:
```text
http://localhost:<live-server-port>
```

5. Oder öffne die URL im Browser auf deiner virtuellen Maschine:
```text
http://<deine_ip>:<live-server-port>
```


## 🛠️ Usage

### 📁 Projektstruktur

```text
.
│   .gitignore
│   README.md
│   LICENSE.md
│   index.html
│   script.js
│   style.css
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

| Feature | Zusatzinformation |
| --- | --- |
| ⚡ Fetch-then-Render | *Daten werden erst geladen, dannach gerendert* |
| 💾 Smart Caching | *keine redundante Netzwerk-Requests, bereits geladene Daten und Bilder werden zwischengespeichert* |
| 💡 Lazy Loading | *Details werden erst bei Bedarf geladen* |
| 📱 Vollständig Responsive | *320px bis 1440px+* |
| 🎨 Typ-basiertes Farbdesign | *zweifarbig bei Pokémon mit 2 Typen* |
| ✨ individuelle "Load More"-Anzahl | *Lade so viele oder wenige Pokemon wie du willst.* |
| 🔍 Suchfunktion | *nach Pokémonnamen, ab drei Buchstaben* |
| 🔔 Benutzer-Feedback | *bei erfolgloser Suche* |


## 📝 Lizenz

> [!NOTE] 
> Dieses Projekt ist ein reines Übungsprojekt und ist zu Lernzwecken im Zuge meiner Weiterbildung bei der [Developer Akadamy](https://developerakademie.com) entstanden.
<br>Die Pokémon-Daten werden über die PokéAPI bezogen.

> [!IMPORTANT]
> Details zur Lizenz und den Markenrechten findest du in der [LICENSE.md](https://github.com/ElenaH-2026/pokedex?tab=License-1-ov-file).
