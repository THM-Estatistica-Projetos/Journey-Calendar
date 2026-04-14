import {
    Streamlit,
    withStreamlitConnection
} from "streamlit-component-lib"
import React, { useEffect, useMemo, useState } from "react"
import ModalAdicionar from "../modal/ModalAdicionar"
import ModalAtualizar from "../modal/ModalAtualizar"
import ModalFiltros from "../modal/ModalFiltros";
import { MdOutlineExpandMore } from "react-icons/md";

import Logo from "../assets/img/logo.png";

function CalendarioAdmin({ args }) {
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
            slotHeight: 70,
            pageSize: 10,
        },
    } = args

    const [isMinimalist, setIsMinimalist] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)

    const [isFiltrosModalOpen, setIsFiltrosModalOpen] = useState(false)
    const [isAdicionarModalOpen, setIsAdicionarModalOpen] = useState(false)
    const [isAtualizarModalOpen, setIsAtualizarModalOpen] = useState(false)

    const [isPaginationEnabled, setIsPaginationEnabled] = useState(false)
    const [pageSize, setPageSize] = useState(config.pageSize)

    const [selectedEvent, setSelectedEvent] = useState({})

    const effectivePageSize = isPaginationEnabled
        ? pageSize
        : columns.length

    const paginatedColumns = useMemo(() => {
        const start = currentPage * effectivePageSize
        const end = start + effectivePageSize
        return columns.slice(start, end)
    }, [columns, currentPage, effectivePageSize])

    useEffect(() => {
        if (!isPaginationEnabled) {
            setCurrentPage(0)
        }
    }, [isPaginationEnabled])

    useEffect(() => {
        Streamlit.setFrameHeight()
    })

    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });

    const changeDays = (days) => {
        const current = new Date(date);
        current.setDate(current.getDate() + days);
        setDate(current.toISOString().split("T")[0]);
    };

    const getHourSlot = (dateStr) => {
        const d = new Date(dateStr)
        const h = d.getUTCHours().toString().padStart(2, "0")
        return `${h}:00`
    }

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            if (!item[config.timeKey]) return false;

            const itemDate = new Date(item[config.timeKey])
                .toISOString()
                .split("T")[0];

            return itemDate === date;
        });
    }, [items, date, config]);

    const gridData = useMemo(() => {
        const map = {}

        filteredItems.forEach(item => {
            const timeKey = getHourSlot(item[config.timeKey])
            const key = `${item[config.columnKey]}-${timeKey}`

            if (!map[key]) map[key] = []
            map[key].push(item)
        })

        return map
    }, [items, config])

    const containerGrid = useMemo(() => {
        const map = {}

        containers.forEach(container => {
            const timeKey = getHourSlot(container.inicio)
            const key = `${container.slot}-${timeKey}`

            if (!map[key]) map[key] = []
            map[key].push(container)
        })

        return map
    }, [containers])

    const handleEventClick = (item) => {
        console.log(item)
        setSelectedEvent(item)
        setIsAtualizarModalOpen(true)
    }

    const [showAgendamentos, setShowAgendamentos] = useState(true)

    return (
        <div className="font-sans text-slate-900">
            <div className="flex items-center gap-3 py-3 rounded-lg">
                <button onClick={() => changeDays(-7)} className="px-10 py-2 bg-white border rounded-md">-1 Semana</button>
                <button onClick={() => changeDays(-1)} className="px-10 py-2 bg-white border rounded-md">Dia anterior</button>

                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="flex-1 px-4 py-2 border rounded-md text-center" />

                <button onClick={() => changeDays(1)} className="px-10 py-2 bg-white border rounded-md">Dia posterior</button>
                <button onClick={() => changeDays(7)} className="px-10 py-2 bg-white border rounded-md">+1 Semana</button>
            </div>

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

            <div className="grid grid-cols-10 gap-4 w-full">
                <button className="col-span-1 bg-slate-100 w-full px-10 py-2 rounded-xl my-3 content-center border text-slate-500 focus:outline-none border-slate-200" onClick={() => setIsFiltrosModalOpen(true)}>Filtros</button>
                <button className="col-span-9 w-full px-10 py-2 rounded-xl my-3 content-center border text-slate-500 focus:outline-none border-slate-200" onClick={() => setIsAdicionarModalOpen(true)}>Adicionar Agendamento</button>
            </div>

            {isPaginationEnabled ? (<div className="flex justify-between items-center my-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Anterior
                </button>

                <span className="text-sm text-slate-600">
                    Página {currentPage + 1} de {Math.ceil(columns.length / effectivePageSize)}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage(prev =>
                            prev < Math.ceil(columns.length / effectivePageSize) - 1
                                ? prev + 1
                                : prev
                        )
                    }
                    disabled={currentPage >= Math.ceil(columns.length / effectivePageSize) - 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Próxima
                </button>
            </div>) : null}

            <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
                <table className="table-auto min-w-full border-collapse" key={`table-${currentPage}`}>
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-3 border-r border-slate-200 text-xs font-semibold text-slate-500 sticky left-0 bg-slate-50 z-10 w-20">
                                Horário
                            </th>
                            {paginatedColumns.map((col) => (

                                <th key={`${col.id_slot}-${currentPage}`} className="p-4 text-sm font-bold text-slate-700 border-r border-slate-200 text-left whitespace-nowrap">
                                    {col.sigla}
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

                                {paginatedColumns.map((col) => {
                                    const colKey = col[config.columnKey]

                                    const cellItems = gridData[`${colKey}-${time}`] || []
                                    return (
                                        <td key={`${time}-${col.id_slot}-${currentPage}`} className="p-0 border-r border-slate-200 align-top relative">
                                            <div className="absolute inset-x-0 top-0 z-10 p-1 flex gap-1">
                                                {showAgendamentos ? (cellItems.map((item) => (
                                                    <EventCard
                                                        key={item[config.primaryKey]}
                                                        item={item}
                                                        isMinimalist={isMinimalist}
                                                        config={config}
                                                        onClickEvent={handleEventClick}
                                                    />
                                                ))) : null}
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
                containers={containers}
                tipo_aluguel={tipo_aluguel}
                columns={columns}
            />
            <ModalAtualizar
                setIsAtualizarModalOpen={setIsAtualizarModalOpen}
                isAtualizarModalOpen={isAtualizarModalOpen}
                item={selectedEvent}
                patients={patients}
                professionals={professionals}
                containers={containers}
                tipo_aluguel={tipo_aluguel}
                columns={columns}
            />
            <ModalFiltros
                columns={columns}
                isPaginationEnabled={isPaginationEnabled}
                isFiltrosModalOpen={isFiltrosModalOpen}
                pageSize={pageSize}
                setIsFiltrosModalOpen={setIsFiltrosModalOpen}
                setIsPaginationEnabled={setIsPaginationEnabled}
                setPageSize={setPageSize}
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

    offset = offset - 88

    const styleHover = {
        zIndex: 100,
        ...(isMinimalist
            ? { borderLeft: `4px solid ${color}`, backgroundColor: '#f8fafc' }
            : { backgroundColor: `${color}`, borderLeft: `4px solid ${color}` })
    };

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <>
            {item.paciente_apollo === true ? (
                <div className={`w-7 px-1 flex items-center bg-[${color}] rounded mt-[${calculateOffset()}px]`}>
                    <img src={Logo} alt="Logo" className="bg-white rounded-full" />
                </div>
            ) : null}
            {height < 62 ? (
                <div onClick={() => onClickEvent(item)}
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
                <div onClick={() => onClickEvent(item)}
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
                    <div className="text-[10px] text-slate-500 italic truncate">
                        {item.paciente_apollo ? 'Apollo' : 'Particular'}
                    </div>
                </div>
            )}
            {isExpanded ? (
                <div style={styleHover} className={`absolute rounded w-full translate-y-[${offset}px] p-2`}>
                    <div className="flex justify-between w-full">
                        <div className={`text-[10px] font-bold ${isMinimalist ? "text-slate-500" : "text-white"} mb-1`}>
                            {formatTime(item[config.timeKey])} - {formatTime(item[config.endTime])}
                        </div>
                    </div>
                    <div className={`text-xs font-semibold ${isMinimalist ? "text-slate-500" : "text-white"} line-clamp-1`}>
                        {item.title || "Sem título"}
                    </div>
                    {item.subtitle && (
                        <div className={`text-[10px] ${isMinimalist ? "text-slate-500" : "text-white"} italic truncate`}>
                            {item.subtitle}
                        </div>
                    )}
                    <div className={`text-[10px] ${isMinimalist ? "text-slate-500" : "text-white"} italic truncate`}>
                        {item.paciente_apollo ? 'Apollo' : 'Particular'}
                    </div>
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

export default CalendarioAdmin