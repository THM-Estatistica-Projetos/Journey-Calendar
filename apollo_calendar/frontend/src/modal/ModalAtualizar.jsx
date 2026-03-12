import { Checkbox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { FaTimes, FaTrash, FaArrowLeft } from "react-icons/fa";

import { Streamlit } from "streamlit-component-lib";

import { useMemo } from "react";

function ModalAtualizar({
    setIsAtualizarModalOpen,
    isAtualizarModalOpen,
    item,
    patients,
    professionals,
    columns
}) {

    const handleSubmit = () => {
        Streamlit.setComponentValue({
            operacao: "Remove",
            id: item.id
        })
        setIsAtualizarModalOpen(false)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("pt-BR")
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    const [formData, setFormData] = useState({
        operacao: "Update",
        id: "",
        paciente: "",
        profissional: "",
        slot: "",
        data: "",
        inicio: "",
        fim: "",
        status: ""
    })

    useEffect(() => {
        if (item && isAtualizarModalOpen) {

            const start = new Date(item.startTime)
            const end = new Date(item.endTime)

            setFormData({
                operacao: "Update",
                id: item.id,
                paciente: patients.find(p => p.nome === item.title)?.id_paciente || "",
                profissional: professionals.find(p => p.nome === item.subtitle)?.id_usuario || "",
                slot: item.columnId,
                data: start.toISOString().slice(0, 10),
                inicio: item.startTime.slice(11, 16),
                fim: item.endTime.slice(11, 16),
                status: item.status || ""
            })
        }
    }, [item, isAtualizarModalOpen])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUpdate = () => {

        Streamlit.setComponentValue({
            operacao: "Update",
            id_agendamento: formData.id,
            id_paciente: formData.paciente,
            id_usuario: formData.profissional,
            id_slot: formData.slot,
            data_agendamento: formData.data,
            inicio_hora: formData.inicio,
            fim_hora: formData.fim,
            status: formData.status
        })

        setIsAtualizarModalOpen(false)
    }

    return (
        <>
            <Transition appear show={isAtualizarModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsAtualizarModalOpen(false)}>
                    <div className="fixed inset-0" aria-hidden="true" />
                    <div className="fixed inset-0 flex justify-center mt-20 p-4 bg-gradient-to-t from-slate-500 to-transparent rounded-xl">
                        <Dialog.Panel className="w-full max-w-[800px] overflow-y-hidden transform rounded-2xl bg-white py-5 px shadow-2xl transition-all scroll-m-0 h-fit mt-7">
                            <div className="w-full px-5">
                                <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-semibold text-gray-700">
                                    Atualizar ou excluir agendamento ou locação
                                </h1>
                                <button className="w-fit py-3 px-4 border bg-[#c51d11] rounded-md text-md text-slate-50 font-medium shadow-sm hover:translate-y-[-4px] hover:bg-[#db2a1e] transition-all active:outline-none" onClick={handleSubmit}><FaTrash /></button>
                                </div>

                                <div className="w-full border border-b-slate-800 my-4" />

                                <div className="flex gap-3 flex-col mb-4 w-full">
                                    <div className="flex gap-1 flex-col">
                                        <span className="text-xl text-gray-600 font-medium">Paciente</span>
                                        <select
                                            name="paciente"
                                            value={formData.paciente}
                                            onChange={handleChange}
                                            className="ml-3 rounded bg-slate-100 py-3 px-3 w-fix"
                                        >
                                            {patients.map((patient) => (
                                                <option key={patient.id_paciente} value={patient.id_paciente}>
                                                    {patient.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex gap-1 flex-col">
                                        <span className="text-xl text-gray-600 font-medium">Slot</span>
                                        <select
                                            name="slot"
                                            value={formData.slot}
                                            onChange={handleChange}
                                            className="ml-3 rounded bg-slate-100 py-3 px-3 w-fix"
                                        >
                                            {columns.map((column) => (
                                                <option key={column.id_slot} value={column.id_slot}>{column.nome}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex gap-1 flex-col">
                                        <span className="text-xl text-gray-600 font-medium">Profissional</span>
                                        <select
                                            name="profissional"
                                            value={formData.profissional}
                                            onChange={handleChange}
                                            className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3"
                                        >
                                            <option value="">Selecione um profissional</option>
                                            {professionals.map((professional) => (
                                                <option key={professional.id_usuario} value={professional.id_usuario}>{professional.nome}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="flex gap-1 flex-col w-50">
                                            <span className="text-xl text-gray-600 font-medium">Inicio</span>
                                            <input
                                                type="time"
                                                name="inicio"
                                                value={formData.inicio}
                                                onChange={handleChange}
                                                className="ml-3 w-fix h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3"
                                            />
                                        </div>
                                        <div className="flex gap-1 flex-col w-50">
                                            <span className="text-xl text-gray-600 font-medium">Fim</span>
                                            <input
                                                type="time"
                                                name="fim"
                                                value={formData.fim}
                                                onChange={handleChange}
                                                className="ml-3 w-fix h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-1 flex-col">
                                        <span className="text-xl text-gray-600 font-medium whitespace-nowrap flex-shrink-0">
                                            Data:
                                        </span>
                                        <p className="ml-3 flex-1 rounded bg-slate-100 py-3 px-3">
                                            {formatDate(item.startTime)}
                                        </p>
                                    </div>
                                    <div className="flex gap-1 flex-col w-fix">
                                            <span className="text-xl text-gray-600 font-medium">Status</span>
                                            <fieldset className="flex w-fix gap-6 ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                                <div className="flex gap-1 w-fix">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="Agendado"
                                                        checked={formData.status === "Agendado"}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="text-md text-gray-600 font-medium">Agendado</span>
                                                </div>
                                                <div className="flex gap-1 w-fix">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="Presente"
                                                        checked={formData.status === "Presente"}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="text-md text-gray-600 font-medium">Presente</span>
                                                </div>
                                                <div className="flex gap-1 w-fix">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="Cancelado"
                                                        checked={formData.status === "Cancelado"}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="text-md text-gray-600 font-medium">Cancelado</span>
                                                </div>
                                            </fieldset>
                                        </div>
                                </div>

                                <div className="w-full flex gap-3">
                                    <button className="w-fuit px-3 border bg-[#09a7a7] rounded-md text-md text-slate-50 font-medium p-2 shadow-sm hover:translate-y-[-4px] hover:bg-[#10c2c2] transition-all active:outline-none" onClick={() => setIsAtualizarModalOpen(false)}><FaArrowLeft /></button>
                                    <button className="w-full border bg-[#106ce4] rounded-md text-md text-slate-50 font-medium p-2 shadow-sm hover:translate-y-[-4px] hover:bg-[#2078eb] transition-all active:outline-none" onClick={handleUpdate}>Editar</button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalAtualizar;