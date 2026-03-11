import { Checkbox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { useMemo } from "react";

function ModalExcluir({
    setIsExcluirModalOpen,
    isExcluirModalOpen
}) {
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

                                <div>
                                    <form className="flex flex-col gap-5">
                                        <div className="flex gap-1 flex-col">
                                            <span className="text-xl text-gray-600 font-medium">Agendamento</span>
                                            <select defaultChecked="Selecione um agendamento" className="ml-3 w-fix rounded focus:outline-none p-2 bg-slate-100 py-3 px-3">
                                                <option>Selecione um agendamento</option>
                                                <option>Agendamento 1</option>
                                            </select>
                                        </div>
                                        
                                        <button className="w-full border bg-[#c51d11] rounded-md text-md text-slate-50 font-medium p-2 shadow-sm hover:translate-y-[-4px] hover:bg-[#db2a1e] transition-all">Remover</button>
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

export default ModalExcluir;