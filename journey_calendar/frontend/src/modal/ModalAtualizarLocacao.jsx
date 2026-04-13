import { Checkbox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { FaTimes, FaTrash, FaArrowLeft, FaCheckCircle, FaDumpster, FaRecycle } from "react-icons/fa";

import { Streamlit } from "streamlit-component-lib";

import { useMemo } from "react";

function ModalAtualizarLocacao({
    setIsAtualizarLocacaoModalOpen,
    isAtualizarLocacaoModalOpen,
    item,
    patients,
    professionals,
    tipo_aluguel,
    columns
}) {

    const handleSubmit = () => {
        Streamlit.setComponentValue({
            tipo: "locacao",
            operacao: "Remove",
            id: item.id
        })
        setIsAtualizarLocacaoModalOpen(false)
    }

    const handleSubmitEmLote = () => {
        Streamlit.setComponentValue({
            tipo: "locacao",
            operacao: "RemoveLote",
            id_locacao: formData.id,
            id_usuario: formData.profissional,
            id_tipo_aluguel: formData.tipo_aluguel,
            id_slot: formData.slot,
            id_recorrencia: formData.recorrencia,
            data_locacao: formData.data_locacao,
            inicio_hora: formData.inicio,
            fim_hora: formData.fim
        })
        setIsAtualizarLocacaoModalOpen(false)
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
        tipo: "locacao",
        operacao: "Update",
        id: "",
        profissional: "",
        slot: "",
        tipo_aluguel: "",
        recorrencia: null,
        data_locacao: "",
        inicio: "",
        fim: "",
        em_lote: "",
    })

    const sortAlfabetical = (options) => {
        return [...options].sort((a, b) =>
            a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
        )
    }

    useEffect(() => {
        if (item && isAtualizarLocacaoModalOpen) {

            const start = new Date(item.inicio)
            const end = new Date(item.fim)

            setFormData({
                tipo: "locacao",
                operacao: "Update",
                id: item.id,
                profissional: professionals.find(p => p.nome === item.profissional)?.id_usuario || "",
                slot: item.slot,
                tipo_aluguel: item.tipo_aluguel,
                recorrencia: item.recorrencia,
                data_locacao: start.toISOString().slice(0, 10),
                inicio: item.inicio.slice(11, 16),
                fim: item.fim.slice(11, 16),
                em_lote: item.em_lote || false
            })

            // console.log("Form data:", formData)
            // console.log("Item data:", item)
        }
    }, [item, isAtualizarLocacaoModalOpen, professionals])

    const handleChange = (e) => {
        const { name, value } = e.target

        const parsedValue = name === "em_lote" ? value === "true" : value;

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }))
    }

    const handleUpdate = () => {

        Streamlit.setComponentValue({
            tipo: "locacao",
            operacao: "Update",
            id_locacao: formData.id,
            id_usuario: formData.profissional,
            id_tipo_aluguel: formData.tipo_aluguel,
            id_slot: formData.slot,
            id_recorrencia: formData.recorrencia,
            data_locacao: formData.data_locacao,
            inicio_hora: formData.inicio,
            fim_hora: formData.fim,
            em_lote: formData.em_lote
        })

        setIsAtualizarLocacaoModalOpen(false)
    }

    return (
        <>
            <Transition appear show={isAtualizarLocacaoModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsAtualizarLocacaoModalOpen(false)}>
                    <div className="fixed inset-0" aria-hidden="true" />
                    <div className="fixed inset-0 flex justify-center mt-20 p-4 bg-gradient-to-t from-slate-500 to-transparent rounded-xl">
                        <Dialog.Panel className="w-full max-w-[800px] overflow-y-hidden transform rounded-2xl bg-white py-5 px shadow-2xl transition-all scroll-m-0 h-fit mt-7">
                            <div className="w-full px-5">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-semibold text-gray-700">
                                        Atualizar ou excluir locação
                                    </h1>
                                    <div className="flex gap-3">
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
                                        <span className="text-xl text-gray-600 font-medium">Profissional</span>
                                        <select
                                            name="profissional"
                                            value={formData.profissional}
                                            onChange={handleChange}
                                            className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3"
                                        >
                                            <option value="">Selecione um profissional</option>
                                            {sortAlfabetical(professionals).map((professional) => (
                                                <option key={professional.id_usuario} value={professional.id_usuario}>{professional.nome}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex gap-1 flex-col">
                                        <span className="text-xl text-gray-600 font-medium">Tipo de Locação</span>
                                        <select
                                            name="tipo_aluguel"
                                            value={formData.tipo_aluguel}
                                            onChange={handleChange}
                                            className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3"
                                        >
                                            <option value="">Selecione um tipo de locação</option>
                                            {tipo_aluguel.map((tipo_aluguel) => (
                                                <option key={tipo_aluguel.id_tipo_aluguel} value={tipo_aluguel.id_tipo_aluguel}>{tipo_aluguel.nome_tipo}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex gap-1 flex-col">
                                        <span className="text-xl text-gray-600 font-medium">Slot</span>
                                        <select
                                            name="slot"
                                            value={formData.slot}
                                            onChange={handleChange}
                                            className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3"
                                        >
                                            <option value="Selecione um slot">Selecione um slot</option>
                                            {columns.map((column) => (
                                                <option key={column.id_slot} value={column.id_slot}>{column.nome}</option>
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
                                    <div className="flex gap-1 flex-col w-fix">
                                        <span className="text-xl text-gray-600 font-medium">Data</span>
                                        <input
                                            type="date"
                                            name="data_locacao"
                                            value={formData.data_locacao}
                                            onChange={handleChange}
                                            className="ml-3 w-fix h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3"
                                        />
                                    </div>
                                    <div className="w-full flex gap-3">
                                        <button className="w-fuit px-3 border bg-[#09a7a7] rounded-md text-md text-slate-50 font-medium p-2 shadow-sm hover:translate-y-[-4px] hover:bg-[#10c2c2] transition-all active:outline-none" onClick={() => setIsAtualizarLocacaoModalOpen(false)}><FaArrowLeft /></button>
                                        <button className="w-full border bg-[#106ce4] rounded-md text-md text-slate-50 font-medium p-2 shadow-sm hover:translate-y-[-4px] hover:bg-[#2078eb] transition-all active:outline-none" onClick={handleUpdate}>Editar</button>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog >
            </Transition >
        </>
    )
}

export default ModalAtualizarLocacao;