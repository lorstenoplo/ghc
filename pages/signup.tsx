import Link from "next/link";
import Image from "next/image";
import { Form, Formik } from "formik";
import { useMutation } from "react-query";
import register from "@/utils/frontend/mutations/register"
import { toErrorMap } from "@/utils/frontend/toErrorMap"
import { useRouter } from "next/router";

export default function SignUp() {

    const router = useRouter();
    const mutation = useMutation(register);


    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen">
            {/* <!-- Left: Image --> */}
            <div className="w-2/3 h-full hidden lg:block">
                <Image width={1200} height={675} src="https://www.zdnet.com/a/img/resize/a2cf67f9a3194824d803a04ab730e78cf8cf6481/2018/03/14/e8cf6195-d306-407c-b30e-6ba83c57ec9b/hyperlooptt-system-front-view.jpg?auto=webp&fit=crop&height=675&width=1200" alt="GHC" className="w-full h-full" />
            </div>
            {/* <!-- Right: Register Form --> */}
            <Formik
                initialValues={{
                    username: "",
                    password: "",
                }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await mutation.mutateAsync(values);
                    const user = response.user;
                    const token = response.token;
                    if (response.errors) {
                        setErrors(toErrorMap(response.errors));
                    } else if (user && token) {
                        localStorage.setItem("qid", token);
                        router.replace((router.query.next as string) || "/");
                    } else {
                        console.log(response)
                    }
                }}
            >
                {({ isSubmitting, handleChange, values }) => (
                    <Form className="lg:w-1/3">
                        <div className="lg:p-10 md:p-52 sm:p-20 p-8 w-full">
                            <h1 className="text-2xl font-semibold mb-4">SignUp</h1>

                            {/* <!-- Username Input --> */}
                            <div className="mb-4">
                                <label className="block text-gray-600">Username</label>
                                <input onChange={handleChange} value={values.username} type="text" id="username" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                            </div>
                            {/* <!-- Password Input --> */}
                            <div className="mb-4">
                                <label className="block text-gray-600">Password</label>
                                <input onChange={handleChange} value={values.password} type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
                            </div>
                            {/* <!-- Remember Me Checkbox --> */}
                            <div className="mb-4 flex items-center">
                                <input defaultChecked type="checkbox" id="remember" name="remember" className="text-blue-500" />
                                <label className="text-gray-600 ml-2">Remember Me</label>
                            </div>
                    
                            {/* <!-- Signup Button --> */}
                            <button disabled={isSubmitting} type="submit" className="disabled:bg-gray-500 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">{isSubmitting ? "Please Wait..." : "Sign Up"}</button>

                            {/* <!-- Sign up  Link --> */}
                            <div className="mt-6 text-blue-500 text-center">
                                <Link href="/login" className="hover:underline">Alread have an account? Login</Link>
                            </div>
                        </div>
                    </Form>)
                }
            </Formik>
        </div>
    )
}