import {
    Streamlit,
    withStreamlitConnection
} from "streamlit-component-lib"
import React, { useEffect, useMemo, useState } from "react"
import { MdOutlineExpandMore } from "react-icons/md";

function AgendaMedico({ args }) {
    const {
        items = [], // Eventos a serem mostrados
        container = [],
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
    } = args

    const [isMinimalist, setIsMinimalist] = useState(false)

    useEffect(() => {
        Streamlit.setFrameHeight()
    })

    const getDayKey = (dateStr) => {
        const d = new Date(dateStr)
        return d.toISOString().split("T")[0]
    }

    const getHourSlot = (dateStr) => {
        const d = new Date(dateStr)
        const h = d.getUTCHours().toString().padStart(2, "0")
        return `${h}:00`
    }

    const gridData = useMemo(() => {
        const map = {}

        items.forEach(item => {
            const timeKey = getHourSlot(item[config.timeKey])
            const dayKey = getDayKey(item[config.timeKey])
            const key = `${dayKey}-${timeKey}`

            if (!map[key]) map[key] = []
            map[key].push(item)
        })

        return map
    }, [items, config])

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

            <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                <table className="table-auto min-w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-3 border-r border-slate-200 text-xs font-semibold text-slate-500 sticky left-0 bg-slate-50 z-10 w-20">
                                Horário
                            </th>
                            {columns.map((col) => (
                                <th key={col.date} className="p-4 text-sm font-bold text-slate-700 border-r border-slate-200 text-left whitespace-nowrap">
                                    {col.label}
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
                                    const cellItems = gridData[`${col.date}-${time}`] || []
                                    return (
                                        <td key={`${time}-${col.date}`} className="p-0 border-r border-slate-200 align-top relative">
                                            <div className="absolute inset-x-0 top-0 z-10 p-1 flex gap-1">
                                                {cellItems.map((item) => (
                                                    <EventCard
                                                        key={item[config.primaryKey]}
                                                        item={item}
                                                        isMinimalist={isMinimalist}
                                                        config={config}
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
        </div>
    )
}

const EventCard = ({ item, isMinimalist, config }) => {
    const color = item[config.colorKey] || "#3788d8"
    const slotHeight = config.slotHeight || 70

    const calculateHeight = () => {
        if (!item[config.timeKey] || !item[config.endTime]) return slotHeight - 8

        const start = new Date(item[config.timeKey])
        const end = new Date(item[config.endTime])
        const durationInMinutes = (end - start) / (1000 * 60)

        const height = (durationInMinutes / 60) * slotHeight
        return height - 8
    }

    const calculateOffset = () => {
        if (!item[config.timeKey]) return 0

        const start = new Date(item[config.timeKey])
        const minutes = start.getUTCMinutes()

        return (minutes / 60) * slotHeight
    }

    const height = calculateHeight();
    let offset = calculateOffset();

    const style = {
        height: `${height}px`,
        marginTop: `${offset}px`,
        zIndex: 10,
        ...(isMinimalist
            ? { borderLeft: `4px solid ${color}`, backgroundColor: '#f8fafc' }
            : { backgroundColor: `${color}20`, borderLeft: `4px solid ${color}` })
    };

    offset = offset - 70

    const styleHover = {
        zIndex: 100,
        ...(isMinimalist
            ? { borderLeft: `4px solid ${color}`, backgroundColor: '#f8fafc' }
            : { backgroundColor: `${color}`, borderLeft: `4px solid ${color}` })
    };

    const [isExpanded, setIsExpanded] = useState(false)

    /*return (
        <div
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
    )*/
    return (
        <>
            {height < 62 ? (
                <div
                style={style}
                className={"w-full p-2 rounded shadow-sm transition-all hover:shadow-md cursor-default items-center overflow-hidden"}
            >
                <div className="flex justify-between w-full">
                    <div className="text-[10px] font-bold text-slate-500 mb-1">
                        {formatTime(item[config.timeKey])} - {formatTime(item[config.endTime])}
                    </div>
                    {height < 62 ? (
                        <>
                            <MdOutlineExpandMore onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)} className="w-10" />
                        </>
                    ) : (
                        <>
                        </>
                    )}
                </div>
            </div>
            ) : (
            <div
                style={style}
                className={"w-full p-2 rounded shadow-sm transition-all hover:shadow-md cursor-default items-center overflow-hidden"}
            >
                <div className="flex justify-between w-full">
                    <div className="text-[10px] font-bold text-slate-500 mb-1">
                        {formatTime(item[config.timeKey])} - {formatTime(item[config.endTime])}
                    </div>
                    {height < 62 ? (
                        <>
                            <MdOutlineExpandMore onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)} className="w-10" />
                        </>
                    ) : (
                        <>
                        </>
                    )}
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
            )}
            {isExpanded ? (
                <div style={styleHover} className={`absolute rounded w-full translate-y-[${offset}px] p-2`}>
                    <div className="flex justify-between w-full">
                        <div className="text-[10px] font-bold text-white mb-1">
                            {formatTime(item[config.timeKey])} - {formatTime(item[config.endTime])}
                        </div>
                    </div>
                    <div className="text-xs font-semibold text-white line-clamp-1">
                        {item.title || "Sem título"}
                    </div>
                    {item.subtitle && (
                        <div className="text-[10px] text-white italic truncate">
                            {item.subtitle}
                        </div>
                    )}
                </div>
            ) : (<></>)}
        </>
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

export default AgendaMedico