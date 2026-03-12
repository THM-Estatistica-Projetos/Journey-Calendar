import { Checkbox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { Streamlit } from "streamlit-component-lib";

import { useMemo } from "react";

function ModalExcluir({
    setIsExcluirModalOpen,
    isExcluirModalOpen,
    item
}) {

    const handleSubmit = () => {
        Streamlit.setComponentValue({
            operacao: "Remove",
            id: item.id
        })
        setIsExcluirModalOpen(false)
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

    return (
        <>
            <Transition appear show={isExcluirModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsExcluirModalOpen(false)}>
                    <div className="fixed inset-0" aria-hidden="true" />
                    <div className="fixed inset-0 flex justify-center mt-20 p-4 bg-gradient-to-t from-slate-500 to-transparent rounded-xl">
                        <Dialog.Panel className="w-full max-w-[800px] overflow-y-hidden transform rounded-2xl bg-white py-5 px shadow-2xl transition-all scroll-m-0 h-fit mt-7">
                            <div className="w-full px-5">
                                <h1 className="text-2xl font-semibold text-gray-700">
                                    Excluir agendamento ou locação
                                </h1>

                                <div className="w-full border border-b-slate-800 my-4" />

                                <div className="flex gap-3 flex-col mb-4 w-full">
                                    <div className="flex items-center w-full">
                                        <span className="text-xl text-gray-600 font-medium whitespace-nowrap flex-shrink-0">Id: </span>
                                        <p className="ml-3 flex-1 rounded bg-slate-100 py-3 px-3">{item.id}</p>
                                    </div>
                                    <div className="flex items-center w-fix">
                                        <span className="text-xl text-gray-600 font-medium whitespace-nowrap flex-shrink-0">Id do slot: </span>
                                        <p className="ml-3 w-100 rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">{item.columnId}</p>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <span className="text-xl text-gray-600 font-medium whitespace-nowrap flex-shrink-0">Paciente: </span>
                                        <p className="ml-3 flex-1 rounded bg-slate-100 py-3 px-3">{item.title}</p>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <span className="text-xl text-gray-600 font-medium whitespace-nowrap flex-shrink-0">Profissional: </span>
                                        <p className="ml-3 flex-1 rounded bg-slate-100 py-3 px-3">{item.subtitle}</p>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <span className="text-xl text-gray-600 font-medium whitespace-nowrap flex-shrink-0">
                                            Data:
                                        </span>
                                        <p className="ml-3 flex-1 rounded bg-slate-100 py-3 px-3">
                                            {formatDate(item.startTime)}
                                        </p>
                                    </div>
                                    <div className="flex w-full gap-3">
                                        <div className="flex items-center w-full">
                                            <span className="text-xl text-gray-600 font-medium whitespace-nowrap flex-shrink-0">Começo: </span>
                                            <p className="ml-3 flex-1 rounded bg-slate-100 py-3 px-3">{formatTime(item.startTime)}</p>
                                        </div>
                                        <div className="flex items-center w-full">
                                            <span className="text-xl text-gray-600 font-medium whitespace-nowrap flex-shrink-0">Final: </span>
                                            <p className="ml-3 flex-1 rounded bg-slate-100 py-3 px-3">{formatTime(item.endTime)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex gap-3">
                                    <button className="w-full border bg-[#09a7a7] rounded-md text-md text-slate-50 font-medium p-2 shadow-sm hover:translate-y-[-4px] hover:bg-[#10c2c2] transition-all active:outline-none" onClick={() => setIsExcluirModalOpen(false)}>Cancelar</button>
                                    <button className="w-full border bg-[#c51d11] rounded-md text-md text-slate-50 font-medium p-2 shadow-sm hover:translate-y-[-4px] hover:bg-[#db2a1e] transition-all active:outline-none" onClick={handleSubmit}>Remover</button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalExcluir;