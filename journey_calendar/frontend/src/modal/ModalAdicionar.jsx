import { Checkbox, Dialog, Select, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

import { Streamlit } from "streamlit-component-lib";

function ModalAdicionar({
    setIsAdicionarModalOpen,
    isAdicionarModalOpen,
    patientsMap,
    professionalsMap,
    tipo_aluguel,
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

    const hoje = new Date().toLocaleDateString("sv-SE")

    const initialAgendamentoFormData = {
        /*tipo: "agendamento",*/
        operacao: "Add",
        paciente: "",
        profissional: "",
        slot: columns[0]?.[columnKey] || "",
        inicio: "",
        fim: "",
        data: hoje,
        data_referencia: hoje,
        status: "Agendado",
        paciente_apollo: false,
        em_lote: false,
    }

    const [agendamentoFormData, setAgendamentoFormData] = useState(initialAgendamentoFormData)

    const handleChangeAgendamento = (e) => {
        const { name, value } = e.target

        const parsedValue = name === "paciente_apollo" || name === "em_lote" ? value === "true" : value;

        setAgendamentoFormData((prev) => ({
            ...prev,
            [name]: parsedValue
        }))
    }

    useEffect(() => {
        if (isAdicionarModalOpen) {
            setAgendamentoFormData(initialAgendamentoFormData)
        }
    }, [isAdicionarModalOpen])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsAdicionarModalOpen(false)
        Streamlit.setComponentValue(agendamentoFormData)
    }

    const sortAlfabetical = (options) => {
        return [...options].sort((a, b) =>
            a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" })
        )
    }

    return (
        <>
            <Transition appear show={isAdicionarModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsAdicionarModalOpen(false)}>
                    <div className="fixed inset-0" aria-hidden="true" />
                    <div className="fixed inset-0 flex justify-center mt-20 p-4 bg-gradient-to-t from-slate-500 to-transparent rounded-xl">
                        <Dialog.Panel className="w-full max-w-[800px] transform rounded-2xl bg-white py-5 px shadow-2xl transition-all h-fit max-h-[80vh] overflow-y-auto mt-7">
                            <div className="w-full px-5">
                                <h1 className="text-2xl font-semibold text-gray-700">
                                    Adicionar novo agendamento
                                </h1>

                                <div className="w-full border border-b-slate-800 my-4" />

                                {/*<div className="flex gap-3 w-full justify-center">
                                    <button className={`w-full px-10 py-2 rounded-xl my-3 content-center border text-slate-500 focus:outline-none border-slate-200 ${isLocacao == null ? null : isLocacao ? null : "bg-slate-200"}`} onClick={() => setIsLocacao(false)}>Novo Agendamento</button>
                                    <button className={`w-full px-10 py-2 rounded-xl my-3 content-center border text-slate-500 focus:outline-none border-slate-200 ${isLocacao == null ? null : isLocacao ? "bg-slate-200" : null}`} onClick={() => setIsLocacao(true)}>Nova Locação</button>
                                </div>*/}

                                <div>
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                        <div className="flex gap-1 flex-col w-fix">
                                            <span className="text-xl text-gray-600 font-medium">Criar em lote?</span>
                                            <fieldset className="flex w-fix gap-6 ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                                <div className="flex gap-1 w-fix">
                                                    <input
                                                        type="radio"
                                                        name="em_lote"
                                                        value="true"
                                                        checked={agendamentoFormData.em_lote === true}
                                                        onChange={handleChangeAgendamento}
                                                    />
                                                    <span className="text-md text-gray-600 font-medium">Sim</span>
                                                </div>
                                                <div className="flex gap-1 w-fix">
                                                    <input
                                                        type="radio"
                                                        name="em_lote"
                                                        value="false"
                                                        checked={agendamentoFormData.em_lote === false}
                                                        onChange={handleChangeAgendamento}
                                                    />
                                                    <span className="text-md text-gray-600 font-medium">Não</span>
                                                </div>
                                            </fieldset>
                                        </div>
                                        {agendamentoFormData.em_lote ? (
                                            <div className="flex gap-1 flex-col w-fix ml-10">
                                                <span className="text-xl text-gray-600 font-medium">Até quando?</span>
                                                <input
                                                    type="date"
                                                    name="data_referencia"
                                                    value={agendamentoFormData.data_referencia}
                                                    onChange={handleChangeAgendamento}
                                                    className="ml-3 w-fix h-3 rounded focus:outline-none p-2 bg-slate-200 py-4 px-3"
                                                />
                                            </div>
                                        ) : null}
                                        <div className="flex gap-1 flex-col">
                                            <span className="text-xl text-gray-600 font-medium">Paciente</span>
                                            <select
                                                name="paciente"
                                                value={agendamentoFormData.paciente}
                                                onChange={handleChangeAgendamento}
                                                className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3"
                                            >
                                                <option value="">Selecione um paciente</option>
                                                {sortAlfabetical(
                                                    Object.entries(patientsMap).map(([id, nome]) => ({
                                                        id,
                                                        nome
                                                    }))
                                                ).map(({ id, nome }) => (
                                                    <option key={id} value={id}>
                                                        {nome}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex gap-1 flex-col">
                                            <span className="text-xl text-gray-600 font-medium">Profissional</span>
                                            <select
                                                name="profissional"
                                                value={agendamentoFormData.profissional}
                                                onChange={handleChangeAgendamento}
                                                className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3"
                                            >
                                                <option value="">Selecione um profissional</option>
                                                {sortAlfabetical(
                                                    Object.entries(professionalsMap).map(([id, nome]) => ({
                                                        id,
                                                        nome
                                                    }))
                                                ).map(({ id, nome }) => (
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
                                                value={agendamentoFormData.slot}
                                                onChange={handleChangeAgendamento}
                                                className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3"
                                            >
                                                <option value="">Selecione um slot</option>
                                                {columns.map((column) => (
                                                    <option key={column[columnKey]} value={column[columnKey]}>{column.nome}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex gap-1 flex-col w-50">
                                                <span className="text-xl text-gray-600 font-medium">Inicio</span>
                                                <input
                                                    type="time"
                                                    name="inicio"
                                                    value={agendamentoFormData.inicio}
                                                    onChange={handleChangeAgendamento}
                                                    className="ml-3 w-fix h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3"
                                                />
                                            </div>
                                            <div className="flex gap-1 flex-col w-50">
                                                <span className="text-xl text-gray-600 font-medium">Fim</span>
                                                <input
                                                    type="time"
                                                    name="fim"
                                                    value={agendamentoFormData.fim}
                                                    onChange={handleChangeAgendamento}
                                                    className="ml-3 w-fix h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-1 flex-col w-fix">
                                            <span className="text-xl text-gray-600 font-medium">Data</span>
                                            <input
                                                type="date"
                                                name="data"
                                                value={agendamentoFormData.data}
                                                onChange={handleChangeAgendamento}
                                                className="ml-3 w-fix h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3"
                                            />
                                        </div>
                                        <div className="flex gap-1 flex-col w-fix">
                                            <span className="text-xl text-gray-600 font-medium">Status</span>
                                            <fieldset className="flex w-fix gap-6 ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                                <div className="flex gap-1 w-fix">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="Agendado"
                                                        checked={agendamentoFormData.status === "Agendado"}
                                                        onChange={handleChangeAgendamento}
                                                    />
                                                    <span className="text-md text-gray-600 font-medium">Agendado</span>
                                                </div>
                                                <div className="flex gap-1 w-fix">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        value="Presente"
                                                        checked={agendamentoFormData.status === "Presente"}
                                                        onChange={handleChangeAgendamento}
                                                    />
                                                    <span className="text-md text-gray-600 font-medium">Presente</span>
                                                </div>
                                                {/*<div className="flex gap-1 w-fix">
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value="Cancelado"
                                                            checked={agendamentoFormData.status === "Cancelado"}
                                                            onChange={handleChangeAgendamento}
                                                        />
                                                        <span className="text-md text-gray-600 font-medium">Cancelado</span>
                                                    </div>*/}
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
                                                        checked={agendamentoFormData.paciente_apollo === true}
                                                        onChange={handleChangeAgendamento}
                                                    />
                                                    <span className="text-md text-gray-600 font-medium">Sim</span>
                                                </div>
                                                <div className="flex gap-1 w-fix">
                                                    <input
                                                        type="radio"
                                                        name="paciente_apollo"
                                                        value="false"
                                                        checked={agendamentoFormData.paciente_apollo === false}
                                                        onChange={handleChangeAgendamento}
                                                    />
                                                    <span className="text-md text-gray-600 font-medium">Não</span>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <button type="submit" className="w-full border bg-[#afd5a3] rounded-md text-md text-slate-600 font-medium p-2 shadow-sm hover:translate-y-[-4px] hover:bg-[#bdddc1] transition-all">
                                            Adicionar
                                        </button>
                                    </form>
                                </div>

                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalAdicionar