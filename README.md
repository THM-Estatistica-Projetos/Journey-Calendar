# streamlit-custom-component

Streamlit component for a calendar using react and pure HTML

## Installation instructions

```sh
pip install git+https://github.com/THM-Estatistica-Projetos/Journey-Calendar.git
```

## Usage instructions

```python
import streamlit as st

from journey_calendar import journey_calendar

journey_calendar(
    items=items,
    columns=headers
)
```

## Local development

1. Start Streamlit from the project root:

   ```sh
   streamlit run journey_calendar/calendar.py
   ```

2. In another terminal, run the Vite dev server from `journey_calendar/frontend`:

   ```sh
   npm install
   npm start
   ```

### Important dev server notes

- The browser connects to the Vite dev server directly. Streamlit does **not** proxy this port, so the Vite port must be reachable from the client just like the Streamlit port.
- Vite listens on the value of `VITE_PORT` (default `3001`). This variable lives in `journey_calendar/frontend/.env`. Update that file whenever you need to change the port, and remember that Windows/WSL/Hyper-V or dev containers may silently remap addresses like `3001`.
- If a port is unavailable or blocked by a firewall/mobile connection, set `VITE_PORT=5173` (Vite's default) or any other open port inside the `.env` file before running `npm run start`, and ensure that port is reachable from your browser.

### Reinstall the component for updates

```sh
pip uninstall journey_calendar -y
pip install --no-cache-dir git+https://github.com/THM-Estatistica-Projetos/Journey-Calendar.git
```