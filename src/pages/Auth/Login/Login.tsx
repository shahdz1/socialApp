import { Input, Label } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../schema/loginSchema";
import { sendData } from "../../../services/auth/loginService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  async function submitForm(data: any) {
    try {
      let result = await sendData(data);
      console.log(result);
      toast.success(result.data.message);
      navigate("/home");
    } catch (err) {
      toast.error("user already exists");
    }
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-100 lg:max-w-1/2 shadow-2xl bg-white p-6 rounded-lg px-8 ">
        <h1 className="text-5xl font-bold text-sky-800 text-center">Login</h1>
        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1.5 w-full">
              <Label htmlFor="email" className="text-sky-600 font-bold">
                Email
              </Label>
              <Input
                {...register("email")}
                className="w-full"
                id="email"
                placeholder="Enter your email"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <Label htmlFor="password" className="text-sky-600 font-bold">
                Password
              </Label>
              <Input
                {...register("password")}
                className="w-full"
                id="password"
                placeholder="Enter your password"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-2xl text-lg px-4 py-2.5 text-center leading-5">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
