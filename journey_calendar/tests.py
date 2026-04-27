import os
from pathlib import Path
import streamlit as st
import streamlit.components.v1 as components
from datetime import date, timedelta, datetime

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

st.set_page_config(layout="wide")

def journey_calendar(items, containers, patients, professionals, columns, time_slots=None, config=None, key=None, acesso="", paciente_apollo=False):
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

profissionais_formatados = [
    {"id_usuario": 1, "nome": "Dr. João"},
    {"id_usuario": 2, "nome": "Dra. Maria"},
    {"id_usuario": 3, "nome": "Dr. Pedro"},
    {"id_usuario": 4, "nome": "Dra. Ana"},
    {"id_usuario": 5, "nome": "Dr. Carlos"},
]

agendamentos_formatados = [
    {
        "id": 165886,
        "title": 2930,
        "subtitle": 5,
        "slotId": 5,
        "inicio": "2026-04-01T07:00:00.000Z",
        "fim": "2026-04-01T08:00:00.000Z",
        "status": "Presente",
        "cor": "#DA70D6"
    },
    {
        "id": 165887,
        "title": 2931,
        "subtitle": 2,
        "slotId": 3,
        "inicio": "2026-04-01T08:00:00.000Z",
        "fim": "2026-04-01T09:30:00.000Z",
        "status": "Cancelado",
        "cor": "#FF6B6B"
    },
    {
        "id": 165888,
        "title": 2932,
        "subtitle": 1,
        "slotId": 1,
        "inicio": "2026-04-01T09:30:00.000Z",
        "fim": "2026-04-01T10:30:00.000Z",
        "status": "Ausência sem Aviso",
        "cor": "#FFA500"
    },
    {
        "id": 165889,
        "title": 2933,
        "subtitle": 4,
        "slotId": 2,
        "inicio": "2026-04-01T10:30:00.000Z",
        "fim": "2026-04-01T12:00:00.000Z",
        "status": None,
        "cor": "#4CAF50"
    },
    {
        "id": 165890,
        "title": 2934,
        "subtitle": 3,
        "slotId": 4,
        "inicio": "2026-04-01T13:00:00.000Z",
        "fim": "2026-04-01T14:00:00.000Z",
        "status": "Presente",
        "cor": "#2196F3"
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

pacientes_formatados = [
    {"id": 2930, "nome": "Paciente 2930", "cpf": "000", "paciente_apollo": False},
    {"id": 2931, "nome": "Paciente 2931", "cpf": "000", "paciente_apollo": False},
    {"id": 2932, "nome": "Paciente 2932", "cpf": "000", "paciente_apollo": False},
    {"id": 2933, "nome": "Paciente 2933", "cpf": "000", "paciente_apollo": False},
    {"id": 2934, "nome": "Paciente 2934", "cpf": "000", "paciente_apollo": False},
]

slots_formatados = [
    {"slotId": 1, "nome": "Sala 1", "sigla": "S1"},
    {"slotId": 2, "nome": "Sala 2", "sigla": "S2"},
    {"slotId": 3, "nome": "Sala 3", "sigla": "S3"},
    {"slotId": 4, "nome": "Sala 4", "sigla": "S4"},
    {"slotId": 5, "nome": "Sala 5", "sigla": "S5"},
    {"slotId": 6, "nome": "Sala 6", "sigla": "S6"},
    {"slotId": 7, "nome": "Sala 7", "sigla": "S7"},
    {"slotId": 8, "nome": "Sala 8", "sigla": "S8"},
    {"slotId": 9, "nome": "Sala 9", "sigla": "S9"},
    {"slotId": 10, "nome": "Sala 10", "sigla": "S10"},
    {"slotId": 11, "nome": "Sala 11", "sigla": "S11"},
    {"slotId": 12, "nome": "Sala 12", "sigla": "S12"},
    {"slotId": 13, "nome": "Sala 13", "sigla": "S13"},
    {"slotId": 14, "nome": "Sala 14", "sigla": "S14"},
    {"slotId": 15, "nome": "Sala 15", "sigla": "S15"},
    {"slotId": 16, "nome": "Sala 16", "sigla": "S16"},
    {"slotId": 17, "nome": "Sala 17", "sigla": "S17"},
    {"slotId": 18, "nome": "Sala 18", "sigla": "S18"},
]

headers_medico = []

dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]

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

retorno = journey_calendar(
    items=agendamentos_formatados,
    containers=[],
    patients=pacientes_formatados,
    professionals=profissionais_formatados,
    columns=slots_formatados,
    config={
        "primaryKey": "id",
        "titleKey": "title",
        "subtitleKey": "subtitle",
        "columnKey": "slotId",
        "timeKey": "inicio",
        "endKey": "fim",
        "colorKey": "cor",
        "showToggle": True,
        "pageSize": 10
    },
    key="apollo_calendar",
    acesso="Admin"
)

st.write(retorno)
