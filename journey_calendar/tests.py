import os
from pathlib import Path
import streamlit as st
import streamlit.components.v1 as components
from datetime import timedelta, datetime

_RELEASE = False

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

def journey_calendar(items, containers, tipo_aluguel, patients, professionals, columns, time_slots=None, config=None, key=None, acesso="", paciente_apollo=False):
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
        acesso=acesso,
        paciente_apollo=paciente_apollo
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
            "container_id": item.get("container_id"),
            "title": "RESERVADO" if nome == "ADM/TEMP" else nome,
            "subtitle": item.get("profissional", {}).get("usuario", {}).get("nome", ""),
            "startTime": item.get("inicio"), # ISO String
            "endTime": item.get("fim"),      # ISO String
            "columnId": str(item.get("slot", {}).get("id_slot")),
            "color": paciente.get("cor", "#3788d8"),
            "status": "Presente",
            "paciente_apollo": item.get("paciente_apollo", False),
            "em_lote": item.get("em_lote")
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

db_fake_raw = [
    {
        "id": 1,
        "container_id": 1,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T09:00:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T10:00:00.000Z",
        "slot": {"id_slot": 1},
        "paciente_apollo": True,
        "paciente": {"id_paciente": 101, "nome": "João Silva", "cor": "#2196F3"},
        "profissional": {"usuario": {"nome": "Sei la"}},
        "em_lote": True
    },
    {
        "id": 2,
        "container_id": 2,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T08:30:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T09:00:00.000Z",
        "slot": {"id_slot": 2},
        "paciente_apollo": False,
        "paciente": {"id_paciente": 102, "nome": "Maria Oliveira", "cor": "#2196F3"},
        "profissional": {"usuario": {"nome": "Dr. Carlos"}},
        "em_lote": True
    },
    {
        "id": 3,
        "container_id": 3,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T10:00:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T10:30:00.000Z",
        "slot": {"id_slot": 1},
        "paciente_apollo": False,
        "paciente": {"id_paciente": 103, "nome": "Pedro Santos", "cor": "#2196F3"},
        "profissional": {"usuario": {"nome": "Dra. Ana"}}
    },
    {
        "id": 4,
        "container_id": 4,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T13:30:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T16:00:00.000Z",
        "slot": {"id_slot": 2},
        "paciente_apollo": True,
        "em_lote": True,
        "paciente": {"id_paciente": 104, "nome": "Fernanda Costa", "cor": "#172531"},
        "profissional": {"usuario": {"nome": "Dr. Paulo"}}
    },
    {
        "id": 5,
        "container_id": 5,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T13:30:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T18:00:00.000Z",
        "slot": {"id_slot": 3},
        "paciente_apollo": False,
        "paciente": {"id_paciente": 105, "nome": "Eduardo Paiva", "cor": "#172531"},
        "profissional": {"usuario": {"nome": "Dr. Paulo"}}
    },
    {
        "id": 6,
        "container_id": 6,
        "inicio": f"{st.session_state.data.strftime('%Y-%m-%d')}T16:00:00.000Z",
        "fim": f"{st.session_state.data.strftime('%Y-%m-%d')}T16:30:00.000Z",
        "slot": {"id_slot": 4},
        "paciente_apollo": True,
        "paciente": {"id_paciente": 106, "nome": "Juliana Rocha", "cor": "#172531"},
        "profissional": {"usuario": {"nome": "Tiago"}},
        "em_lote": True
    }
]

containers = [
    {
        "id": 1,
        "inicio": f"{data_str}T08:00:00.000Z",
        "fim": f"{data_str}T12:00:00.000Z",
        "slot": "1",
        "tipo_aluguel": "Sala cheia",
        "data_locacao": data_str,
        "profissional": "Tiago",
        "em_lote": False,
        "color": "#ff9100"
    },
    {
        "id": 2,
        "inicio": f"{data_str}T09:30:00.000Z",
        "fim": f"{data_str}T11:30:00.000Z",
        "slot": "2",
        "tipo_aluguel": "Período manhã",
        "profissional": "Ronney",
        "data_locacao": data_str,
        "em_lote": False,
        "color": "#cbd5f5"
    },
    {
        "id": 3,
        "inicio": f"{data_str}T13:00:00.000Z",
        "fim": f"{data_str}T18:00:00.000Z",
        "slot": "3",
        "tipo_aluguel": "Período tarde",
        "profissional": "Eduardo",
        "data_locacao": data_str,
        "em_lote": True,
        "color": "#bbf7d0"
    },
    {
        "id": 4,
        "inicio": f"{data_str}T07:00:00.000Z",
        "fim": f"{data_str}T19:00:00.000Z",
        "slot": "4",
        "tipo_aluguel": "Dia inteiro",
        "data_locacao": data_str,
        "profissional": "Alice",
        "em_lote": False,
        "color": "#fde68a"
    },
    {
        "id": 5,
        "inicio": f"{data_str}T10:15:00.000Z",
        "fim": f"{data_str}T14:45:00.000Z",
        "slot": "5",
        "tipo_aluguel": "Custom",
        "profissional": "Tiago",
        "em_lote": False,
        "color": "#fca5a5"
    }
]

tipo_aluguel = [
	{
		"id_tipo_aluguel": 1,
		"nome_tipo": "Aluguel Fixo"
	},
	{
		"id_tipo_aluguel": 2,
		"nome_tipo": "Horas Avulsas"
	}
]

patients = [
    {
        "id_paciente": item["paciente"].get("id_paciente"),
        "nome": item["paciente"].get("nome"),
        "paciente_apollo": item.get("paciente_apollo", item["paciente"].get("paciente_apollo", False))
    }
    for item in db_fake_raw
]

items = format_data_for_calendar(db_fake_raw)
headers = [{"id_slot": f"{i}", "nome": f"Consultório {i}", "sigla": f"C{i}"} for i in range(1, 30)]

today = st.session_state.data
start_week = today - timedelta(days=(today.weekday() + 1) % 7)

headers_medico = []

dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]

for i in range(7):
    d = start_week + timedelta(days=i)

    headers_medico.append({
        "date": d.strftime("%Y-%m-%d"),
        "label": f"{dias[i]} {d.day}"
    })

#paciente_apollo_default = st.toggle("Paciente Apollo padrao?", value=False)

#resultado = journey_calendar(
#    items=items, 
#    patients=patients,
#    professionals=professionals,
#    columns=headers_medico,
#    config={
#        "primaryKey": "id",
#        "columnKey": "columnId",
#        "timeKey": "startTime",
#        "endTime": "endTime",
#        "colorKey": "color",
#        "showToggle": True
#    },
#    key="1",
#    acesso="Medico"
#)

resultado = journey_calendar(
    items=items,
    containers=containers,
    tipo_aluguel=tipo_aluguel,
    patients=patients,
    professionals=professionals,
    columns=headers,
    config={
        "primaryKey": "id",
        "columnKey": "columnId",
        "timeKey": "startTime",
        "endTime": "endTime",
        "colorKey": "color",
        "showToggle": True,
        "pageSize": 5
    },
    key="2",
    acesso="Admin"
)

st.write(resultado)
