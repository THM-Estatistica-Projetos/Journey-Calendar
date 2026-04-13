import os
from pathlib import Path
import streamlit as st
import streamlit.components.v1 as components
from datetime import timedelta, datetime

_RELEASE = True

if _RELEASE == False:
    _journey_calendar = components.declare_component(
        "journey_calendar",
        url="http://localhost:3001",
    )
else:
    build_dir = Path(__file__).parent / "frontend" / "build"

    if not build_dir.exists():
        raise RuntimeError(f"Build directory not found: {build_dir}")

    _journey_calendar = components.declare_component(
        "journey_calendar",
        path=str(build_dir),
    )

def journey_calendar(
    items=[],
    containers=[],
    tipo_aluguel=[],
    patients=[],
    professionals=[],
    columns=[],
    time_slots=None,
    config=None,
    key=None,
    acesso="Medico"
):
    """
    items: Lista de dicionários formatados
    columns: Lista de strings ou dicts [{"id": "C1", "title": "Consultório 1"}]
    time_slots: Lista de horários ["08:00", "09:00", ...]
    """
    # Horários padrão se não informados
    if time_slots is None:
        time_slots = [f"{h:02d}:00" for h in range(6, 22)]
        
    return _journey_calendar(
        items=items,
        containers=containers,
        tipo_aluguel=tipo_aluguel,
        patients=patients,
        professionals=professionals,
        columns=columns,
        timeSlots=time_slots,
        config=config,
        key=key,
        acesso=acesso
    )
    
st.write("Teste")