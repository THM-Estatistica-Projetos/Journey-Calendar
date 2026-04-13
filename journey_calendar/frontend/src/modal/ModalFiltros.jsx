import { Checkbox, Dialog, Select, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

function ModalFiltros({
    setIsFiltrosModalOpen,
    setIsPaginationEnabled,
    setPageSize,
    isFiltrosModalOpen,
    isPaginationEnabled,
    columns,
    pageSize,
}) {

    return (
        <>
            <Transition appear show={isFiltrosModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsFiltrosModalOpen(false)}>
                    <div className="fixed inset-0" aria-hidden="true" />
                    <div className="fixed inset-0 flex justify-center mt-20 p-4 bg-gradient-to-t from-slate-500 to-transparent rounded-xl">
                        <Dialog.Panel className="w-full max-w-[800px] transform rounded-2xl bg-white py-5 px shadow-2xl transition-all h-fit max-h-[80vh] overflow-y-auto mt-7">
                            <div className="w-full px-5">
                                <h1 className="text-2xl font-semibold text-gray-700">
                                    Filtros do calendário
                                </h1>

                                <div className="w-full border border-b-slate-800 my-4" />

                                <div className="flex flex-col gap-3">
                                <div className="flex gap-3">
                                    <div
                                        onClick={() => setIsPaginationEnabled(!isPaginationEnabled)}
                                        className="mb-2 w-[52px] h-[26px] bg-white rounded-full border-2 border-gray-500 flex items-center cursor-pointer"
                                    >
                                        <div className={"w-[18px] h-[18px] bg-gray-500 rounded-full transition-all " + (isPaginationEnabled ? "translate-x-[28px] bg-gray-700" : "translate-x-[2px]")} />
                                    </div>
                                    <p className="" >{isPaginationEnabled ? "Paginação Ativada" : "Paginação Desativada"}</p>
                                </div>
                                {isPaginationEnabled ? (<div>
                                    <input type="number" className="ml-3 w-25 h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3" value={pageSize} min="1" max="25" onChange={(e) => setPageSize(Number(e.target.value))}/>
                                </div>) : null}
                                </div>

                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ModalFiltros;