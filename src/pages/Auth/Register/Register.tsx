import { Input, Label } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../schema/registerSchema";
import { sendData } from "../../../services/auth/registerService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Register() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      password: "",
      rePassword: "",
      gender:undefined
    },
    mode: "onBlur",
  });
  async function submitForm(data: any) {
    try {
      let result = await sendData(data);
      console.log(result);
      toast.success(result.data.message);
      navigate("/");
    } catch (err) {
      toast.error("user already exists");
    }
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-100 lg:max-w-1/2 shadow-2xl bg-white p-6 rounded-lg px-8 ">
        <h1 className="text-5xl font-bold text-sky-800">Register</h1>
        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="grid lg:grid-cols-2 gap-x-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="text-sky-600 font-bold">
                Name
              </Label>
              <Input
                {...register("name")}
                className="w-64"
                id="name"
                placeholder="Enter your name"
                type="text"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="username" className="text-sky-600 font-bold">
                Username
              </Label>
              <Input
                {...register("username")}
                className="w-64"
                id="username"
                placeholder="Enter your username"
                type="text"
              />
              {errors.username && (
                <span className="text-red-500 text-sm">
                  {errors.username.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="text-sky-600 font-bold">
                Email
              </Label>
              <Input
                {...register("email")}
                className="w-64"
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
            <div className="flex flex-col gap-1">
              <Label htmlFor="dateOfBirth" className="text-sky-600 font-bold">
                date Of Birth
              </Label>
              <Input
                className="w-64"
                id="dateOfBirth"
                type="date"
                {...register("dateOfBirth")}
              />
              {errors.dateOfBirth && (
                <span className="text-red-500 text-sm">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="password" className="text-sky-600 font-bold">
                password
              </Label>
              <Input
                className="w-64"
                id="password"
                placeholder="Enter your password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="rePassword" className="text-sky-600 font-bold">
                confirm password
              </Label>
              <Input
                {...register("rePassword")}
                className="w-64"
                id="rePassword"
                placeholder="confirm your password"
                type="password"
              />
              {errors.rePassword && (
                <span className="text-red-500 text-sm">
                  {errors.rePassword.message}
                </span>
              )}
            </div>
          </div>
          <Label htmlFor="gender" className="text-sky-600 font-bold">
            Gender
          </Label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-sm">
              {errors.gender.message}
            </span>
          )}
          <button className="text-white bg-linear-to-r from-cyan-500 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-2xl text-lg px-4 py-2.5 text-center leading-5">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
