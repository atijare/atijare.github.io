# Hoop Connect

Hoop Connect is a front-end NBA web app where fans can explore players, browse teams by division, and interact through a fan form.

## Overview

This project is a multi-page website built with plain HTML, CSS, and JavaScript.
It focuses on core front-end concepts: reusable layout, DOM interaction, client-side form validation, and loading data from a local JSON file.

## Pages

- `index.html`: Home page with hero image carousel and featured players
- `profiles.html`: Player profiles split into Superstar and Rising Star tabs
- `teams.html`: Interactive team browser by conference and division
- `fanzone.html`: Fan form with real-time input validation and submit feedback

## Key Features

- Automatic and manual image carousel controls
- Tab-based content switching on the profiles page
- Team filtering UI driven by `data/teams.json`
- Client-side form validation with success message
- Shared navigation/header/footer across pages

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla ES6)
- JSON data file for teams

## Folder Structure

```text
.
├── index.html
├── profiles.html
├── teams.html
├── fanzone.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── data/
│   └── teams.json
└── images/
```

## Run Locally

1. Open a terminal in the project root.
2. Start a local server:

```bash
python3 -m http.server 8000
```

3. Open the app in your browser:

```text
http://localhost:8000/index.html
```

Using a local server is recommended because the teams page uses `fetch()` to load JSON data.

## JavaScript Behavior

All page scripts are initialized in `js/script.js` after `DOMContentLoaded`.

- `setupCarousel()` handles slide movement and auto-rotation
- `setupTabs()` switches between profile sections
- `setupTeamPages()` loads and filters team data
- `setupFormValidation()` validates fan form inputs

## Future Enhancements

- Add search and sorting for teams/players
- Store fan submissions with `localStorage` or a backend
- Improve accessibility (keyboard navigation, ARIA labels, focus states)
- Add automated UI testing

## License

No license is currently specified.
