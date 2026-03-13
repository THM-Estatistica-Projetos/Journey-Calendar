import { Checkbox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

import { Streamlit } from "streamlit-component-lib";

function ModalAdicionar({
    setIsAdicionarModalOpen,
    isAdicionarModalOpen,
    patients,
    professionals,
    columns,
    paciente_apollo_default = false
}) {

    const hoje = new Date().toLocaleDateString("sv-SE")

    const initialFormData = {
        operacao: "Add",
        paciente: "",
        profissional: "",
        slot: "Consultório 1",
        inicio: "",
        fim: "",
        data: hoje,
        status: "Agendado",
        paciente_apollo: paciente_apollo_default
    }

    const [formData, setFormData] = useState(initialFormData)

    const handleChange = (e) => {
        const { name, value } = e.target

        const parsedValue = name === "paciente_apollo" ? value === "true" : value

        setFormData((prev) => ({
            ...prev,
            [name]: parsedValue
        }))
    }

    useEffect(() => {
        if (isAdicionarModalOpen) {
            setFormData(initialFormData)
        }
    }, [isAdicionarModalOpen])

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsAdicionarModalOpen(false)

        Streamlit.setComponentValue(formData)
    }

    return (
        <>
            <Transition appear show={isAdicionarModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsAdicionarModalOpen(false)}>
                    <div className="fixed inset-0" aria-hidden="true" />
                    <div className="fixed inset-0 flex justify-center mt-20 p-4 bg-gradient-to-t from-slate-500 to-transparent rounded-xl">
                        <Dialog.Panel className="w-full max-w-[800px] overflow-y-hidden transform rounded-2xl bg-white py-5 px shadow-2xl transition-all scroll-m-0 h-fit mt-7">
                            <div className="w-full px-5">
                                <h1 className="text-2xl font-semibold text-gray-700">
                                    Adicionar novo agendamento ou locação
                                </h1>

                                <div className="w-full border border-b-slate-800 my-4" />
                                <div>
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                        <div className="flex gap-1 flex-col">
                                            <span className="text-xl text-gray-600 font-medium">Paciente</span>
                                            <select
                                                name="paciente"
                                                value={formData.paciente}
                                                onChange={handleChange}
                                                className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3"
                                            >
                                                <option value="">Selecione um paciente</option>
                                                {patients.map((patient) => (
                                                    <option key={patient.id_paciente} value={patient.id_paciente}>{patient.nome}</option>
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
                                                name="data"
                                                value={formData.data}
                                                onChange={handleChange}
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