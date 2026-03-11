import { Checkbox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { useMemo } from "react";

function ModalEditar({
    setIsEditarModalOpen,
    isEditarModalOpen
}) {
    return (
        <>
            <Transition appear show={isEditarModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsEditarModalOpen(false)}>
                    <div className="fixed inset-0" aria-hidden="true" />
                    <div className="fixed inset-0 flex justify-center mt-20 p-4 bg-gradient-to-t from-slate-500 to-transparent rounded-xl">
                        <Dialog.Panel className="w-full max-w-[800px] overflow-y-hidden transform rounded-2xl bg-white py-5 px shadow-2xl transition-all scroll-m-0 h-fit mt-7">
                            <div className="w-full px-5">
                                <h1 className="text-2xl font-semibold text-gray-700">
                                    Editar agendamento ou locação
                                </h1>

                                <div className="w-full border border-b-slate-800 my-4" />

                                <div>
                                    <form className="flex flex-col gap-5">
                                        <div className="flex gap-1 flex-col">
                                            <span className="text-xl text-gray-600 font-medium">Paciente</span>
                                            <select defaultChecked="Selecione um paciente" className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                                <option>Selecione um paciente</option>
                                                <option>Paciente 1</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-1 flex-col">
                                            <span className="text-xl text-gray-600 font-medium">Profissional</span>
                                            <select defaultChecked="Selecione um profissional" className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                                <option>Selecione um profissional</option>
                                                <option>Profissional 1</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-1 flex-col">
                                            <span className="text-xl text-gray-600 font-medium">Slot</span>
                                            <select defaultChecked="Consultório 1" className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                                <option>Consultório 1</option>
                                                <option>Consultório 2</option>
                                                <option>Consultório 3</option>
                                                <option>Consultório 4</option>
                                                <option>Consultório 5</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex gap-1 flex-col w-50">
                                                <span className="text-xl text-gray-600 font-medium">Inicio</span>
                                                <input type="time" className="ml-3 w-fix h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3"></input>
                                            </div>
                                            <div className="flex gap-1 flex-col w-50">
                                                <span className="text-xl text-gray-600 font-medium">Fim</span>
                                                <input type="time" className="ml-3 w-fix h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3"></input>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 flex-col w-fix">
                                            <span className="text-xl text-gray-600 font-medium">Data</span>
                                            <input type="date" className="ml-3 w-fix h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3"></input>
                                        </div>
                                        <div className="flex gap-1 flex-col w-fix">
                                            <span className="text-xl text-gray-600 font-medium">É recorrente?</span>
                                            <fieldset className="flex w-fix gap-6 ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                                <div className="flex gap-1 w-fix">
                                                    <input type="radio"></input>
                                                    <span className="text-md text-gray-600 font-medium">Sim</span>
                                                </div>
                                                <div className="flex gap-1 w-fix">
                                                    <input type="radio"></input>
                                                    <span className="text-md text-gray-600 font-medium">Não</span>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="flex gap-1 flex-col w-fix">
                                            <span className="text-xl text-gray-600 font-medium">Status</span>
                                            <fieldset className="flex w-fix gap-6 ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                                <div className="flex gap-1 w-fix">
                                                    <input type="radio"></input>
                                                    <span className="text-md text-gray-600 font-medium">Agendado</span>
                                                </div>
                                                <div className="flex gap-1 w-fix">
                                                    <input type="radio"></input>
                                                    <span className="text-md text-gray-600 font-medium">Pendente</span>
                                                </div>
                                                <div className="flex gap-1 w-fix">
                                                    <input type="radio"></input>
                                                    <span className="text-md text-gray-600 font-medium">Cancelado</span>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <button className="w-full border bg-[#dfa70d] rounded-md text-md text-slate-700 font-medium p-2 shadow-sm hover:translate-y-[-4px] hover:bg-[#e9b31e] transition-all">Editar</button>
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

export default ModalEditar;