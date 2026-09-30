import { Button, Dropdown, Input, Kbd, Label, Modal } from "@heroui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import {
  authContext,
  type AuthContextType,
} from "../../../context/authContext";
import axios from "axios";
import { baseUrl } from "../../../const/evn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { ICreatePost } from "../../../interface/AllPosts.interface";
import { IoMdImages } from "react-icons/io";

export default function DropdownList({ postId }: { postId: string }) {
  const { token } = useContext(authContext) as AuthContextType;
  function deletePost() {
    return axios.delete(`${baseUrl}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  const queryClient = useQueryClient();
  let { mutate: deletePostMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
    onError: () => {
      return (
        <p className="text-center text-red-700 font-bold">there is an error</p>
      );
    },
  });

  // / edit post /////
  let [img, setImg] = useState<File | null>(null);
  let [imgSrc, setSrc] = useState("");
  let inputFile = useRef<HTMLInputElement | null>(null);
  let [isOpenModal, setModal] = useState(false);

  let {
    register,
    handleSubmit,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      body: "",
    },
  });

  function editPosts(formData: FormData) {
    return axios.put(`${baseUrl}/posts/${postId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  let query = useQueryClient();

  let { mutate: editPostMutation } = useMutation({
    mutationFn: editPosts,
    onSuccess: () => {
      resetForm();
      setImg(null);
      setSrc("");
      setModal(false);
      toast.success("post edited successfuly...!");
      query.invalidateQueries({ queryKey: ["allPosts"] });
      query.invalidateQueries({ queryKey: ["profileData"] });
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || err?.message || "there is an error",
      );
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
    editPostMutation(formData);
  }

  return (
    <>
      <Dropdown>
        <Button aria-label="Menu" variant="secondary">
          <HiOutlineDotsVertical />
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
            <Dropdown.Item
              id="edit-Post"
              textValue="Edit Post"
              onClick={() => {
                setModal(true);
              }}
            >
              <Label className="text-yellow-600">Edit Post</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Content>
                  <FaEdit size={15} className="text-yellow-600" />
                </Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item
              id="delete-Post"
              textValue="Delete Post"
              variant="danger"
              onClick={() => {
                deletePostMutation();
              }}
            >
              <Label>Delete Post</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Content>
                  <MdDelete size={20} className="text-red-600" />
                </Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>

      <Modal isOpen={isOpenModal}>
        <Modal.Backdrop className="fixed inset-0 flex items-center justify-center p-4">
          <Modal.Container>
            <form onSubmit={handleSubmit(sendData)} className="w-full">
              <Modal.Dialog className="w-full max-w-lg">
                <Modal.CloseTrigger
                  onClick={() => {
                    setModal(false);
                  }}
                />
                <Modal.Header>
                  <Modal.Heading>edit your post</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <textarea
                    className="description bg-gray-100 sec p-3 h-30 w-50 rounded-2xl mb-3 border border-gray-300 outline-none"
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
                    <Input
                      type="file"
                      hidden
                      ref={inputFile}
                      onChange={changeImg}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="w-full" type="submit">
                    update post
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </form>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
