import {
    Streamlit,
    withStreamlitConnection
} from "streamlit-component-lib"
import React, { useEffect, useMemo, useState } from "react"
import ModalAdicionar from "../modal/ModalAdicionar"
import ModalAtualizar from "../modal/ModalAtualizar"

function CalendarioAdmin({ args }) {
    const {
        items = [], // Eventos a serem mostrados
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
    } = args

    const [isMinimalist, setIsMinimalist] = useState(false)

    useEffect(() => {
        Streamlit.setFrameHeight()
    })

    const getHourSlot = (dateStr) => {
        const d = new Date(dateStr)
        const h = d.getUTCHours().toString().padStart(2, "0")
        return `${h}:00`
    }

    const gridData = useMemo(() => {
        const map = {}

        items.forEach(item => {
            const timeKey = getHourSlot(item[config.timeKey])
            const key = `${item[config.columnKey]}-${timeKey}`

            if (!map[key]) map[key] = []
            map[key].push(item)
        })

        return map
    }, [items, config])

    const [isAdicionarModalOpen, setIsAdicionarModalOpen] = useState(false)
    const [isEditarModalOpen, setIsEditarModalOpen] = useState(false)
    const [isAtualizarModalOpen, setIsAtualizarModalOpen] = useState(false)

    const [selectedEvent, setSelectedEvent] = useState({})

    const handleEventClick = (item) => {
        setSelectedEvent(item)
        setIsAtualizarModalOpen(true)
    }

    return (
        <div className="font-sans text-slate-900">
            {config.showToggle && (
                <div className="flex gap-3">
                    <div
                        onClick={() => setIsMinimalist(!isMinimalist)}
                        className="mb-2 w-[52px] h-[26px] bg-white rounded-full border-2 border-gray-500 flex items-center cursor-pointer"
                    >
                        <div className={"w-[18px] h-[18px] bg-gray-500 rounded-full transition-all " + (isMinimalist ? "translate-x-[28px] bg-gray-700" : "translate-x-[2px]")} />
                    </div>
                    <p className="" >{isMinimalist ? "Tema minimalista" : "Tema padrão"}</p>
                </div>
            )}

            <div className="flex gap-4 w-full">
                <button className="w-full px-10 py-2 rounded-xl my-3 content-center border text-slate-500 focus:outline-none border-slate-200" onClick={() => setIsAdicionarModalOpen(true)}>Adicionar Consulta</button>
                {/*<button className="w-full px-10 py-2 rounded-xl my-3 content-center border text-slate-500 focus:outline-none border-slate-200" onClick={() => setIsEditarModalOpen(true)}>Editar Consulta</button>
                <button className="w-full px-10 py-2 rounded-xl my-3 content-center border text-slate-500 focus:outline-none border-slate-200" onClick={() => setIsAtualizarModalOpen(true)}>Remover Consulta</button>*/}
            </div>

            <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                <table className="table-auto min-w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-3 border-r border-slate-200 text-xs font-semibold text-slate-500 sticky left-0 bg-slate-50 z-10 w-20">
                                Horário
                            </th>
                            {columns.map((col) => (
                                <th key={col.id_slot} className="p-4 text-sm font-bold text-slate-700 border-r border-slate-200 text-left whitespace-nowrap">
                                    {col.nome}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {timeSlots.map((time) => (
                            <tr key={time} style={{ height: `${config.slotHeight || 70}px` }} className="border-b border-slate-100 transition-colors">
                                <td className="p-3 text-xs text-slate-400 font-medium sticky left-0 bg-white border-r border-slate-200">
                                    {time}
                                </td>

                                {columns.map((col) => {
                                    const cellItems = gridData[`${col.id_slot}-${time}`] || []
                                    return (
                                        <td key={`${time}-${col.id_slot}`} className="p-0 border-r border-slate-200 align-top relative">
                                            <div className="absolute inset-x-0 top-0 z-10 p-1 flex gap-1">
                                                {cellItems.map((item) => (
                                                    <EventCard
                                                        key={item[config.primaryKey]}
                                                        item={item}
                                                        isMinimalist={isMinimalist}
                                                        config={config}
                                                        onClickEvent={handleEventClick}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ModalAdicionar
                setIsAdicionarModalOpen={setIsAdicionarModalOpen}
                isAdicionarModalOpen={isAdicionarModalOpen}
                patients={patients}
                professionals={professionals}
                columns={columns}
            />
            <ModalAtualizar
                setIsAtualizarModalOpen={setIsAtualizarModalOpen}
                isAtualizarModalOpen={isAtualizarModalOpen}
                item={selectedEvent}
                patients={patients}
                professionals={professionals}
                columns={columns}
            />
        </div>
    )
}

const EventCard = ({ item, isMinimalist, config, onClickEvent }) => {
    const color = item[config.colorKey] || "#3788d8"
    const slotHeight = config.slotHeight || 70

    const calculateHeight = () => {
        if (!item[config.timeKey] || !item[config.endTime]) return slotHeight - 8

        const start = new Date(item[config.timeKey])
        const end = new Date(item[config.endTime])
        const durationInMinutes = (end - start) / (1000 * 60)

        const height = (durationInMinutes / 60) * slotHeight
        return `${height - 8}px`
    }

    const calculateOffset = () => {
        if (!item[config.timeKey]) return 0

        const start = new Date(item[config.timeKey])
        const minutes = start.getUTCMinutes()

        return (minutes / 60) * slotHeight
    }

    const style = {
        height: calculateHeight(),
        marginTop: `${calculateOffset()}px`,
        zIndex: 10,
        ...(isMinimalist
            ? { borderLeft: `4px solid ${color}`, backgroundColor: '#f8fafc' }
            : { backgroundColor: `${color}20`, borderLeft: `4px solid ${color}` })
    };

    return (
        <div onClick={() => onClickEvent(item)}
            style={style}
            className="w-full p-2 rounded shadow-sm transition-all hover:shadow-md cursor-default items-center"
        >
            <div className="text-[10px] font-bold text-slate-500 mb-1">
                {formatTime(item[config.timeKey])} - {formatTime(item[config.endTime])}
            </div>
            <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                {item.title || "Sem título"}
            </div>
            {item.subtitle && (
                <div className="text-[10px] text-slate-500 italic truncate">
                    {item.subtitle}
                </div>
            )}
        </div>
    )
}

// Helper de formatação simples
const formatTime = (dateStr) => {
    if (!dateStr) return ""
    try {
        return new Date(dateStr).toLocaleTimeString('pt-BR', {
            hour: '2-digit', minute: '2-digit', timeZone: 'UTC'
        })
    } catch (e) { return dateStr }
}

export default CalendarioAdmin