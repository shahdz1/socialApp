import { LuSend } from "react-icons/lu";
import { IoMdImages } from "react-icons/io";
// import { FaSpinner } from "react-icons/fa6";
import { Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import type { ICreatePost } from "../../../interface/AllPosts.interface";
import axios from "axios";
import { authContext, type AuthContextType } from "../../../context/authContext";
import { baseUrl } from "../../../const/evn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
export default function CreatePost() {
  const auth = useContext(authContext) as AuthContextType;
  const token = auth.token;
  let [img, setImg] = useState<File | null>(null);
  let [imgSrc, setSrc] = useState("");
  let inputFile = useRef<HTMLInputElement | null>(null);
  let {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      body: "",
    },
  });

  async function createUserPosts(formData: any) {
    let { data } = await axios.post(`${baseUrl}/posts`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  }
  let query = useQueryClient();

  let { mutate } = useMutation({
    mutationFn: createUserPosts,
    onSuccess: () => {
      resetForm();
      setImg(null);
      setSrc("");
      toast.success("post created successfuly...!");
      query.invalidateQueries({ queryKey: ["allPosts"] });
      query.invalidateQueries({ queryKey: ["profileData"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "there is an error");
    },
  });

  function changeImg(e: any) {
    setImg(e.target.files[0]);
    setSrc(URL.createObjectURL(e.target.files[0]));
  }
  function sendData(data: ICreatePost) {
    let formData = new FormData();
    if (!formData && !inputFile) return;
    if (data.body) {
      formData.append("body", data.body);
    }
    if (img) {
      formData.append("image", img);
    }
    mutate(formData);
  }
  return (
    <>
      <div className="pt-5 ">
        <form
          onSubmit={handleSubmit(sendData)}
          className="editor bg-white rounded-2xl mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
        >
          <p className=" font-bold  mb-1.5 text-sky-900 text-2xl">
            Creat a post
          </p>
          <textarea
            className="description bg-gray-100 sec p-3 h-30 rounded-2xl mb-3 border border-gray-300 outline-none"
            spellCheck="false"
            placeholder="What is in your mind...."
            defaultValue={""}
            {...register("body")}
          />

          <div className="flex  items-center gap-x-1">
            {imgSrc !== "" ? (
              <img src={imgSrc} className="w-25 m-3"></img>
            ) : null}
            <IoMdImages
              size={30}
              className=" text-sky-700"
              onClick={() => inputFile.current?.click()}
            />
            <Input type="file" hidden ref={inputFile} onChange={changeImg} />
            <Button type="submit">
              <LuSend />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
