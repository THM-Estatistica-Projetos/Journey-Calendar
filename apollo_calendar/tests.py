import os
from pathlib import Path
import streamlit as st
import streamlit.components.v1 as components
from datetime import timedelta, datetime

_RELEASE = False

if _RELEASE == False:
    _apollo_calendar = components.declare_component(
        "apollo_calendar",
        url="http://localhost:3001",
    )
else:
    build_dir = Path(__file__).parent / "frontend" / "build"

    if not build_dir.exists():
        raise RuntimeError(f"Build directory not found: {build_dir}")

    _apollo_calendar = components.declare_component(
        "apollo_calendar",
        path=str(build_dir),
    )

if "data" not in st.session_state:
    st.session_state.data = datetime.today()

def addDate():
    st.session_state.data += timedelta(days=1)

def removeDate():
    st.session_state.data -= timedelta(days=1)
#---

col1, col2, col3 = st.columns([1, 9, 1])

with col1:
    st.write("")
    st.button("Dia anterior", width="stretch", on_click=removeDate)

with col2:
    st.session_state.data = st.date_input(
        "Selecione a data",
        value=st.session_state.data
    )

with col3:
    st.write("")
    st.button("Dia posterior", width="stretch", on_click=addDate)

data_str = st.session_state.data.strftime("%Y-%m-%d")

st.set_page_config(layout="wide")

def apollo_calendar(items, patients, professionals, columns, time_slots=None, config=None, key=None):
    """
    items: Lista de dicionários formatados
    columns: Lista de strings ou dicts [{"id": "C1", "title": "Consultório 1"}]
    time_slots: Lista de horários ["08:00", "09:00", ...]
    """
    # Horários padrão se não informados
    if time_slots is None:
        time_slots = [f"{h:02d}:00" for h in range(6, 22)]
        
    return _apollo_calendar(
        items=items,
        patients=patients,
        professionals=professionals,
        columns=columns,
        timeSlots=time_slots,
        config=config,
        key=key
    )
    
def format_data_for_calendar(raw_data):
    """Transforma qualquer dado da sua API no formato que o componente espera"""
    formatted = []
    for item in raw_data:
        # Exemplo de lógica de negócio centralizada aqui
        paciente = item.get("paciente", {})
        nome = paciente.get("nome", "VAGO")
        
        formatted.append({
            "id": item.get("id"),
            "title": "RESERVADO" if nome == "ADM/TEMP" else nome,
            "subtitle": item.get("profissional", {}).get("usuario", {}).get("nome", ""),
            "startTime": item.get("inicio"), # ISO String
            "endTime": item.get("fim"),      # ISO String
            "columnId": str(item.get("slot", {}).get("id_slot")),
            "color": paciente.get("cor", "#3788d8"),
            "status": "Agendado"
        })
    return formatted

professionals = [
    {
        "id_usuario" : 1,
        "nome": "Tiago",
        "papel":"medico_parceiro"
    },
    {
        "id_usuario" : 2,
        "nome": "Ronney",
        "papel":"medico_parceiro"
    },
    {
        "id_usuario" : 3,
        "nome": "Eduardo",
        "papel":"apollo_especial"
    },
    {
        "id_usuario" : 4,
        "nome": "Alice",
        "papel":"apollo_especial"
    },
]

patients = [
    {
        "id_paciente" : 1,
        "nome": "André"
    },
    {
        "id_paciente" : 2,
        "nome": "Eduardo"
    }
]

db_fake_raw = [
    {
        "id": 1,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T09:00:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T11:00:00.000Z",
        "slot": {"id_slot": 1},
        "paciente": {"nome": "João Silva", "cor": "#2196F3"},
        "profissional": {"usuario": {"nome": "Sei la"}},
    },
    {
        "id": 2,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T08:30:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T09:30:00.000Z",
        "slot": {"id_slot": 2},
        "paciente": {"nome": "Maria Oliveira", "cor": "#2196F3"},
        "profissional": {"usuario": {"nome": "Dr. Carlos"}}
    },
    {
        "id": 3,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T10:00:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T12:30:00.000Z",
        "slot": {"id_slot": 1},
        "paciente": {"nome": "Pedro Santos", "cor": "#2196F3"},
        "profissional": {"usuario": {"nome": "Dra. Ana"}}
    },
    {
        "id": 4,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T13:00:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T16:00:00.000Z",
        "slot": {"id_slot": 2},
        "paciente": {"nome": "Fernanda Costa", "cor": "#172531"},
        "profissional": {"usuario": {"nome": "Dr. Paulo"}}
    },
    {
        "id": 5,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T13:30:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T18:00:00.000Z",
        "slot": {"id_slot": 3},
        "paciente": {"nome": "Eduardo Paiva", "cor": "#172531"},
        "profissional": {"usuario": {"nome": "Dr. Paulo"}}
    },
    {
        "id": 6,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T16:00:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T18:00:00.000Z",
        "slot": {"id_slot": 4},
        "paciente": {"nome": "Juliana Rocha", "cor": "#172531"},
        "profissional": {"usuario": {"nome": "Dr. Marcos"}}
    }
]

items = format_data_for_calendar(db_fake_raw)
headers = [{"id_slot": f"{i}", "nome": f"Consultório {i}", "sigla": f"C{i}"} for i in range(1, 6)]

resultado = apollo_calendar(
    items=items, 
    patients=patients,
    professionals=professionals,
    columns=headers,
    config={
        "primaryKey": "id",
        "columnKey": "columnId",
        "timeKey": "startTime",
        "endTime": "endTime",
        "colorKey": "color",
        "showToggle": True
    }
)

st.write(resultado)
