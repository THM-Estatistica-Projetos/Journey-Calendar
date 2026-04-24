import { Checkbox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { FaTimes, FaTrash, FaArrowLeft, FaCheckCircle, FaDumpster, FaRecycle } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";

import { Streamlit } from "streamlit-component-lib";

import { useMemo } from "react";

function ModalAtualizar({
    setIsAtualizarModalOpen,
    isAtualizarModalOpen,
    item,
    patientsMap,
    professionalsMap,
    columns,
    config
}) {

    const {
        primaryKey,
        titleKey,
        subtitleKey,
        columnKey,
        timeKey,
        endKey
    } = config

    const handleSubmit = () => {
        Streamlit.setComponentValue({
            tipo: "agendamento",
            operacao: "Remove",
            id: item.id,
            id_paciente: formData.paciente,
            id_usuario: formData.profissional,
            id_slot: formData.slot,
        })
        setIsAtualizarModalOpen(false)
    }

    const handleSubmitEmLote = () => {
        Streamlit.setComponentValue({
            /*tipo: "agendamento",*/
            operacao: "RemoveLote",
            id_agendamento: formData.id,
            id_paciente: formData.paciente,
            id_usuario: formData.profissional,
            id_slot: formData.slot,
            data_agendamento: formData.data,
            inicio_hora: formData.inicio,
            fim_hora: formData.fim
        })
        setIsAtualizarModalOpen(false)
    }

    const handleTransformSubmit = () => {
        Streamlit.setComponentValue({
            /*tipo: "agendamento",*/
            operacao: "Transform",
            id_agendamento: formData.id,
            id_paciente: formData.paciente,
            id_usuario: formData.profissional,
            id_slot: formData.slot,
            data_agendamento: formData.data,
            inicio_hora: formData.inicio,
            fim_hora: formData.fim
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
        /*tipo: "agendamento",*/
        operacao: "Update",
        id: "",
        paciente: "",
        profissional: "",
        slot: "",
        data: "",
        inicio: "",
        fim: "",
        status: "",
        paciente_apollo: ""
    })

    const sortAlfabetical = (options) => {
        return [...options].sort((a, b) =>
            a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
        )
    }

    useEffect(() => {
        if (item && isAtualizarModalOpen) {

            const start = new Date(item[timeKey])
            const end = new Date(item[endKey])


            setFormData({
                operacao: "Update",
                id: item[primaryKey],
                paciente: item[titleKey] || "",
                profissional: item[subtitleKey] || "",
                slot: item[columnKey],
                data: start.toISOString().slice(0, 10),
                inicio: item[timeKey]?.slice(11, 16),
                fim: item[endKey]?.slice(11, 16),
                status: item.status || "",
                paciente_apollo: item.paciente_apollo || false,
                em_lote: item.em_lote || false
            })
        }
    }, [item, isAtualizarModalOpen, config])

    console.log("Agendamentos", item)
    console.log("Slot", columns)

    const handleChange = (e) => {
        const { name, value } = e.target

        const parsedValue = name === "paciente_apollo" || name === "em_lote" ? value === "true" : value;

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }))
    }

    const handleUpdate = () => {

        Streamlit.setComponentValue({
            tipo: "agendamento",
            operacao: "Update",
            id_agendamento: formData.id,
            id_paciente: formData.paciente,
            id_usuario: formData.profissional,
            id_slot: formData.slot,
            data_agendamento: formData.data,
            inicio_hora: formData.inicio,
            fim_hora: formData.fim,
            status: formData.status,
            paciente_apollo: formData.paciente_apollo,
            em_lote: formData.em_lote
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
                                        Atualizar ou excluir agendamento
                                    </h1>
                                    <div className="flex gap-3">
                                        {/*<button className="w-fit py-3 px-4 border bg-[#1159c5] rounded-md text-md text-slate-50 font-medium shadow-sm hover:translate-y-[-4px] hover:bg-[#1b6ce6] transition-all active:outline-none" onClick={handleTransformSubmit}><FaRecycle className="size-5"/></button>*/}
                                        <button className="w-fit py-3 px-4 border bg-[#c51d11] rounded-md text-md text-slate-50 font-medium shadow-sm hover:translate-y-[-4px] hover:bg-[#db2a1e] transition-all active:outline-none" onClick={handleSubmit}><FaTrash /></button>
                                        {formData.em_lote ? (<button className="w-fit py-3 px-4 border bg-[#690d06] rounded-md text-md text-slate-50 font-medium shadow-sm hover:translate-y-[-4px] hover:bg-[#88140c] transition-all active:outline-none" onClick={handleSubmitEmLote}><FaDumpster className="size-5" /></button>) : null}
                                    </div>
                                </div>

                                <div className="w-full border border-b-slate-800 my-4" />

                                <div className="flex gap-3 flex-col mb-4 w-full">
                                    <div className="flex gap-1 flex-col w-fix">
                                        <span className="text-xl text-gray-600 font-medium">Atualizar em lote?</span>
                                        <fieldset className="flex w-fix gap-6 ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                            <div className="flex gap-1 w-fix">
                                                <input
                                                    type="radio"
                                                    name="em_lote"
                                                    value="true"
                                                    checked={formData.em_lote === true}
                                                    onChange={handleChange}
                                                />
                                                <span className="text-md text-gray-600 font-medium">Sim</span>
                                            </div>
                                            <div className="flex gap-1 w-fix">
                                                <input
                                                    type="radio"
                                                    name="em_lote"
                                                    value="false"
                                                    checked={formData.em_lote === false}
                                                    onChange={handleChange}
                                                />
                                                <span className="text-md text-gray-600 font-medium">Não</span>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="flex gap-1 flex-col">
                                        <span className="text-xl text-gray-600 font-medium">Paciente</span>
                                        <select
                                            name="paciente"
                                            value={formData.paciente}
                                            onChange={handleChange}
                                            className="ml-3 rounded bg-slate-100 py-3 px-3 w-fix"
                                        >
                                            {Object.entries(patientsMap).map(([id, nome]) => (
                                                <option key={id} value={id}>
                                                    {nome}
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
                                                <option key={column[columnKey]} value={column[columnKey]}>{column.nome}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex gap-1 flex-col">
                                        <span className="text-xl text-gray-600 font-medium">Profissional</span>
                                        <select
                                            name="profissional"
                                            value={formData.profissional}
                                            onChange={handleChange}
                                            className="ml-3 w-fix rounded bg-slate-100 py-3 px-3"
                                        >
                                            {Object.entries(professionalsMap).map(([id, nome]) => (
                                                <option key={id} value={id}>
                                                    {nome}
                                                </option>
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
                                            {formatDate(item[timeKey])}
                                        </p>
                                    </div>
                                    <div className="flex gap-1 flex-col w-fix">
                                        <span className="text-xl text-gray-600 font-medium">Status</span>
                                        <fieldset className="flex w-fix gap-6 ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                            <div className="flex gap-1 w-fix">
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value={null}
                                                    checked={formData.status === null}
                                                    onChange={handleChange}
                                                />
                                                <span className="text-md text-gray-600 font-medium">Agendado</span>
                                            </div>
                                            <div className={`flex gap-1 w-fix ${formData.status === null ? "opacity-100" : "opacity-30 cursor-not-allowed"}`}>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="Presente"
                                                    checked={formData.status === "Presente"}
                                                    onChange={handleChange}
                                                    disabled={formData.status !== null}
                                                />
                                                <span className="text-md text-gray-600 font-medium">Presente</span>
                                            </div>
                                            <div className={`flex gap-1 w-fix ${formData.status === null ? "opacity-100" : "opacity-30 cursor-not-allowed"}`}>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="Cancelado"
                                                    checked={formData.status === "Cancelado"}
                                                    onChange={handleChange}
                                                    disabled={formData.status !== null}
                                                />
                                                <span className="text-md text-gray-600 font-medium">Cancelado</span>
                                            </div>
                                            <div className={`flex gap-1 w-fix ${formData.status === null ? "opacity-100" : "opacity-30 cursor-not-allowed"}`}>
                                                <input
                                                    type="radio"
                                                    name="status"
                                                    value="Ausência sem Aviso"
                                                    checked={formData.status === "Ausência sem Aviso"}
                                                    onChange={handleChange}
                                                    disabled={formData.status !== null}
                                                />
                                                <span className="text-md text-gray-600 font-medium">Ausência sem Aviso</span>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="flex gap-1 flex-col w-fix">
                                        <span className="text-xl text-gray-600 font-medium">Paciente Apollo?</span>
                                        <fieldset className="flex w-fix gap-6 ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                            <div className="flex gap-1 w-fix">
                                                <input
                                                    type="radio"
                                                    name="paciente_apollo"
                                                    value="true"
                                                    checked={formData.paciente_apollo === true}
                                                    onChange={handleChange}
                                                />
                                                <span className="text-md text-gray-600 font-medium">Sim</span>
                                            </div>
                                            <div className="flex gap-1 w-fix">
                                                <input
                                                    type="radio"
                                                    name="paciente_apollo"
                                                    value="false"
                                                    checked={formData.paciente_apollo === false}
                                                    onChange={handleChange}
                                                />
                                                <span className="text-md text-gray-600 font-medium">Não</span>
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