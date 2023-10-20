import Navbar from "@/components/Navbar"
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationTriangleIcon, TrashIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { Form, Formik } from "formik"
import addTeam from "@/utils/frontend/mutations/addTeam"
import { useMutation } from "react-query"
import { toErrorMap } from "@/utils/frontend/toErrorMap"
import deleteTeam from "@/utils/frontend/mutations/deleteTeam"
import useGetUser from "@/utils/frontend/useGetUser"

export default function Team() {

    const [open, setOpen] = useState<boolean>(false)
    const [teamName, setTeamName] = useState<string>("");
    const [team, setTeam] = useState<any>();
    const [name, setName] = useState<string>("");
    const [teamId, setTeamId] = useState<string>("");
    const [user, isLoading, isError] = useGetUser();
    const noUserCondn = isError || !user || isLoading;

    const mutation = useMutation(addTeam);
    const deleteTeamMutation = useMutation(deleteTeam)

    function getTeamName() {
        const name = localStorage.getItem("teamName");
        return name;
    }

    function getTeamId() {
        const id = localStorage.getItem("teamId");
        return id;
    }


    useEffect(() => {
        const localName = getTeamName() || "";
        const teamId = getTeamId() || "";
        setTeamId(teamId)
        setName(localName)
    }, [teamId, name, team])

    const cancelButtonRef = useRef(null)

    return (
        <div className="relative isolate overflow-hidden bg-gray-900 px-20 py-16 sm:py-24 lg:py-32 h-screen w-screen">

            <Navbar className="absolute top-0 left-0 w-full" />

            <div className="max-w-xl lg:max-w-lg mx-auto my-auto py-16">
                {
                    name ? <>
                        <div className="min-w-0 items-center flex flex-row rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10">
                            <CheckCircleIcon className="h-6 w-6 mr-3 text-gray-50" aria-hidden="true" />
                            <p className="text-white text-lg w-auto">Your team: {name}</p>
                            <TrashIcon onClick={async () => {
                                const res = await deleteTeamMutation.mutateAsync({ teamId });
                                const deletedTeam = res.deletedTeam;
                                if (deletedTeam) {
                                    setTeamId("");
                                    setName("")
                                    localStorage.removeItem("teamId");
                                    localStorage.removeItem("teamName");
                                }
                            }} className="hover:bg-white/5 cursor-pointer rounded-md h-6 w-6 mr-3 ml-auto text-red-500" aria-hidden="true" />
                        </div>
                    </> : <>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Create your Team Now!.</h2>
                        <p className="mt-4 text-lg leading-8 text-gray-300">Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt dolore.</p>
                        <div className="mt-6 flex max-w-md gap-x-4">
                            <input value={teamName} onChange={e => setTeamName(e.target.value)} type="text" required className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inse outline-none focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Enter your Team name" />
                            <button disabled={noUserCondn} onClick={() => teamName.trim() != "" && !noUserCondn && setOpen(true)} className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Create +</button>
                        </div>
                    </>
                }



            </div>

            <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: "clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>

            {/* Modal  */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-black text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <Formik
                                        initialValues={{
                                            mem1: "", mem2: "", mem3: "", mem4: ""
                                        }}
                                        onSubmit={async (values, { setErrors }) => {
                                            const response = await mutation.mutateAsync({ teamName, ...values });
                                            const Steam = response.team;
                                            const teamId = response.teamId;

                                            if (response.errors) {
                                                setErrors(toErrorMap(response.errors));
                                            } else if (Steam) {
                                                setTeam(Steam)
                                                localStorage.setItem("teamName", teamName)
                                                localStorage.setItem("teamId", teamId)
                                                setOpen(false)
                                            } else {
                                                console.log(response)
                                            }
                                        }}
                                    >
                                        {({ isSubmitting, handleChange, values }) => (
                                            <Form>
                                                <div className="bg-black px-4 pt-5 sm:p-6 sm:pb-4">

                                                    <div className="sm:flex sm:items-start">
                                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10">
                                                            <UserPlusIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                                                        </div>
                                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-300">
                                                                Add Team Members to "{teamName}"
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500">
                                                                    Create a team to start participating in the GHC 2023
                                                                    hosted by IIT Madras
                                                                </p>
                                                                <div className="my-2 w-4/5">


                                                                    <input name="mem1" value={values.mem1} onChange={handleChange} type="text" className="min-w-0 mb-1 w-full flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inse outline-none focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Team member 1" />
                                                                    <input name="mem2" value={values.mem2} onChange={handleChange} type="text" className="min-w-0 mb-1 w-full flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inse outline-none focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Team member 2" />
                                                                    <input name="mem3" value={values.mem3} onChange={handleChange} type="text" className="min-w-0 mb-1 w-full flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inse outline-none focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Team member 3" />
                                                                    <input name="mem4" value={values.mem4} onChange={handleChange} type="text" className="min-w-0 w-full flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inse outline-none focus:ring-indigo-500 sm:text-sm sm:leading-6" placeholder="Team member 4" />


                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-black px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="disabled:bg-gray-400 disabled:text-gray-600 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                                    >
                                                        {isSubmitting ? "Please Wait...." : "Create Team"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="disabled:bg-gray-500 disabled:ring-gray-500 disabled:text-gray-300 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset outline-none ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                        onClick={() => setOpen(false)}
                                                        ref={cancelButtonRef}
                                                        disabled={isSubmitting}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>

    )
}
