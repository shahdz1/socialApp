import { Input, Label, ListBox, Select } from "@heroui/react";
export default function Register() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-100 lg:max-w-1/2 shadow-2xl bg-white p-6 rounded-lg px-8 ">
        <h1 className="text-5xl font-bold text-sky-800">
          Register
        </h1>
        <form className="flex flex-col gap-4 mt-6">
          <div className="grid lg:grid-cols-2 gap-x-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="text-sky-600 font-bold">
                Name
              </Label>
              <Input
                className="w-64"
                id="name"
                placeholder="Enter your name"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="username" className="text-sky-600 font-bold">
                Username
              </Label>
              <Input
                className="w-64"
                id="username"
                placeholder="Enter your username"
                type="text"
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-x-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email" className="text-sky-600 font-bold">
                Email
              </Label>
              <Input
                className="w-64"
                id="email"
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="dateOfBirth" className="text-sky-600 font-bold">
                date Of Birth
              </Label>
              <Input className="w-64" id="dateOfBirth" type="date" />
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
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="rePassword" className="text-sky-600 font-bold">
                confirm password
              </Label>
              <Input
                className="w-64"
                id="rePassword"
                placeholder="confirm your password"
                type="password"
              />
            </div>
          </div>
          <Select className="w-full" placeholder="Select gender">
            <Label className="text-sky-600 font-bold">Gender</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="female" textValue="female">
                  female
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="male" textValue="male">
                  male
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
          <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-2xl text-lg px-4 py-2.5 text-center leading-5">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}
