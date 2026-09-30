import { Button, Input } from "@heroui/react";
import { LuSend } from "react-icons/lu";
import { IoMdImages } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../const/evn";
import { authContext, type AuthContextType } from "../../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa6";
export default function createComment({ postId }: { postId: string }) {
  const [imgFile, setFile] = useState();
  const imgInput = useRef<HTMLInputElement | null>(null);
  const auth = useContext(authContext) as AuthContextType;
  const token = auth.token;

  let {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const query = useQueryClient();

  let { isPending, mutate } = useMutation({
    mutationFn: postCreateComment,
    onSuccess: (res) => {
      resetForm();
      toast.success(res.data?.message);
      query.invalidateQueries({ queryKey: ["allPosts"] });
      query.invalidateQueries({ queryKey: ["postComments"] });
      query.invalidateQueries({ queryKey: ["profileData"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "there is an error");
    },
  });

  function getImgFile(e: any) {
    setFile(e.target.files[0]);
  }

  function postCreateComment(commentData: any) {
    return axios.post(`${baseUrl}/posts/${postId}/comments`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function sendData(data: { content: string }) {
    if (!data.content && !imgFile) return;
    const formDate = new FormData();

    if (data.content) {
      formDate.append("content", data.content);
    }
    if (imgFile) {
      formDate.append("image", imgFile);
    }
    mutate(formDate);
  }

  return (
    <form onSubmit={handleSubmit(sendData)}>
      <div className="flex items-center gap-x-1">
        <Input
          className="bg-slate-200"
          placeholder="enter your comment..."
          {...register("content")}
        />
        <IoMdImages
          size={30}
          className=" text-sky-700"
          onClick={() => {
            imgInput.current?.click();
          }}
        />
        <input type="file" hidden ref={imgInput} onChange={getImgFile} />
        <Button type="submit">{isPending ? <FaSpinner className="animate-spin" /> : <LuSend />}</Button>
      </div>
    </form>
  );
}
