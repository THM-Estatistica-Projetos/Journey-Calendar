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
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-[700px] h-full overflow-y-scroll transform rounded-2xl bg-white py-10 px-6 shadow-2xl transition-all">
                            <div className="w-full px-5">
                                <h1 className="text-2xl font-semibold text-gray-700">
                                    Adicionar novo agendamento ou aluguel
                                </h1>

                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalAdicionar;