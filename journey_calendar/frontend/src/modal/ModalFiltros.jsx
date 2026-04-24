import { Checkbox, Dialog, Select, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

function ModalFiltros({
    setIsFiltrosModalOpen,
    setIsPaginationEnabled,
    setPageSize,
    isFiltrosModalOpen,
    isPaginationEnabled,
    emojiVisibility,
    setEmojiVisibility,
    itemVisibility,
    setItemVisibility,
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

                                <div className="flex flex-col gap-3 my-4">
                                    <div className="flex gap-3">
                                        <div
                                            onClick={() => setIsPaginationEnabled(!isPaginationEnabled)}
                                            className="mb-2 w-[52px] h-[26px] bg-white rounded-full border-2 border-gray-500 flex items-center cursor-pointer"
                                        >
                                            <div className={"w-[18px] h-[18px] bg-gray-500 rounded-full transition-all " + (isPaginationEnabled ? "translate-x-[28px] bg-gray-700" : "translate-x-[2px]")} />
                                        </div>
                                        <p className="font-semibold text-slate-600" >{isPaginationEnabled ? "Paginação Ativada" : "Paginação Desativada"}</p>
                                    </div>
                                    {isPaginationEnabled ? (<div>
                                        <input type="number" className="ml-3 w-25 h-3 rounded focus:outline-none p-2 bg-slate-100 py-4 px-3" value={pageSize} min="1" max="25" onChange={(e) => setPageSize(Number(e.target.value))} />
                                    </div>) : null}
                                </div>

                                <div className="flex flex-col gap-3 mt-4">
                                    <p className="font-semibold text-slate-600">Mostrar agendamentos</p>

                                    <div className="flex gap-2 flex-wrap">
                                        {[
                                            { key: "agendado", label: "📅 Agendado" },
                                            { key: "presente", label: "✅ Presente" },
                                            { key: "cancelado", label: "❌ Cancelado" },
                                            { key: "ausencia", label: "⚠️ Ausência" },
                                        ].map(({ key, label }) => {
                                            const active = itemVisibility[key]

                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => {
                                                        setItemVisibility(prev => ({
                                                            ...prev,
                                                            [key]: !prev[key]
                                                        }));

                                                        setEmojiVisibility(prev => ({
                                                            ...prev,
                                                            [key]: !prev[key]
                                                        }));
                                                    }}
                                                    className={`px-3 py-1 rounded-full border text-sm transition-all duration-200 focus:outline-none
                                                        ${active
                                                            ? "bg-white border-blue-600"
                                                            : "bg-slate-200 opacity-50 text-slate-600 border-slate-300 hover:bg-slate-100"
                                                        }`}
                                                >
                                                    {label}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 mt-4">
                                    <p className="font-semibold text-slate-600">Emojis</p>

                                    <div className="flex gap-2 flex-wrap">
                                        {[
                                            { key: "agendado", label: "📅 Agendado" },
                                            { key: "presente", label: "✅ Presente" },
                                            { key: "cancelado", label: "❌ Cancelado" },
                                            { key: "ausencia", label: "⚠️ Ausência" },
                                        ].map(({ key, label }) => {
                                            const active = emojiVisibility[key]

                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() =>
                                                        setEmojiVisibility(prev => ({
                                                            ...prev,
                                                            [key]: !prev[key]
                                                        }))
                                                    }
                                                    className={`px-3 py-1 rounded-full border text-sm transition-all duration-200 focus:outline-none
                                                        ${active
                                                            ? "bg-white border-blue-600"
                                                            : "bg-slate-200 opacity-50 text-slate-600 border-slate-300 hover:bg-slate-100"
                                                        }`}
                                                >
                                                    {label}
                                                </button>
                                            )
                                        })}
                                    </div>
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