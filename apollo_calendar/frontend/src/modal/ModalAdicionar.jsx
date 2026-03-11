import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { useMemo } from "react";

function ModalAdicionar({
    setIsAdicionarModalOpen,
    isAdicionarModalOpen
}) {
    return(
        <>
            <Transition appear show={isAdicionarModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsAdicionarModalOpen(false)}>
                    <div className="fixed inset-0" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-start mt-10 p-4">
                        <Dialog.Panel className="w-full max-w-[700px] overflow-y-hidden transform rounded-2xl bg-white py-10 px-6 shadow-2xl transition-all scroll-m-0">
                            <div className="w-full px-5">
                                <h1 className="text-2xl font-semibold text-gray-700">
                                    Adicionar novo agendamento ou locação
                                </h1>

                                <div>
                                    <form className="flex flex-col gap-5">
                                        <div className="flex gap-1 flex-col">
                                            <span>Título</span>
                                            <input type="text" placeholder="Paciente" className="w-full h-3 rounded focus:outline-none p-2"></input>
                                        </div>
                                        <div className="flex gap-1 flex-col">
                                            <span>Profissional</span>
                                            <input type="text" placeholder="Profissional" className="w-full h-3 rounded focus:outline-none p-2"></input>
                                        </div>
                                        <button>Adicionar</button>
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

export default ModalAdicionar;