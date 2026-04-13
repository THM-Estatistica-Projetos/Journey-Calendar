import {
    Streamlit,
    withStreamlitConnection
} from "streamlit-component-lib"
import React, { useEffect, useMemo, useState } from "react"
import AgendaMedico from "./acessos/AgendaMedico"
import CalendarioAdmin from "./acessos/CalendarioAdmin"

function JourneyCalendar({ args }) {

    const {
        items = [], // Eventos a serem mostrados
        containers = [],
        tipo_aluguel = [],
        patients = [],
        professionals = [],
        columns = [], // Slots
        timeSlots = [], // Horários
        config = {
            primaryKey: 'id',
            columnKey: 'columnId',
            timeKey: 'startTime',
            endKey: 'endTime',
            colorKey: 'color',
            showToggle: true,
            slotHeight: 70
        },
        acesso = ""
    } = args

    return (
        <div>
            {acesso === "Admin" ? (
                <CalendarioAdmin args={args}/>
            ) : (
                <AgendaMedico args={args}/>
            )}
        </div>
    )
}

export default withStreamlitConnection(JourneyCalendar)