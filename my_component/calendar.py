import streamlit.components.v1 as components

import requests
import streamlit as st
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from numpy import random

import pandas as pd

_RELEASE = True

# Main component
if _RELEASE == False:
    _apollo_calendar = components.declare_component(
        "apollo_calendar",
        url="http://localhost:3001"
    )
else: 
    parent_dir = os.path.dirname(__file__)
    build_dir = os.path.join(parent_dir, "frontend/build")
    
    _apollo_calendar = components.declare_component(
        "apollo_calendar",
        path=build_dir
    )

def apollo_calendar(items, columns, time_slots=None, config=None, key=None):
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
        columns=columns,
        timeSlots=time_slots,
        config=config,
        key=key
    )