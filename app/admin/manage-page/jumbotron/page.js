"use client";
import { useState, useEffect } from "react";
import Drawer from "@/components/Drawer";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Input from "@/components/Input";

import createJumbotron from "@/api/jumbotrons/create";

export default function ManageJumbotronLayout() {
  const [isClient, setIsClient] = useState(false);
  const [jumbotron_img, setJumbotronImg] = useState(null);
  const [jumbotron_img_preview, setJumbotronImgPreview] = useState("");
  const [jumbotron_title, setJumbotronTitle] = useState("");
  const [jumbotron_desc, setJumbotronDesc] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const router = useRouter();

  const handleImageChange = (event) => {
    const newImage = event.target.files[0];
    setJumbotronImg(newImage);
    if (newImage) {
      const reader = new FileReader();
      reader.onload = (e) => setJumbotronImgPreview(e.target.result);
      reader.readAsDataURL(newImage);
      setHasUnsavedChanges(true);
    } else {
      setJumbotronImgPreview("");
    }
  };

  const handleForm = async () => {
    if (!hasUnsavedChanges) {
      const formData = new FormData();
      formData.append("JumbotronTittle", jumbotron_title);
      formData.append("JumbotronDescription", jumbotron_desc);
      formData.append("JumbotronImage", jumbotron_img);

      await createJumbotron(formData)

      setJumbotronTitle(null)
      setJumbotronDesc(null)
      setJumbotronImg(null)
      setJumbotronImgPreview("")

      router.push("/admin/manage-page")
    }
  };

  useEffect(() => {
    if (
      jumbotron_title !== null &&
      jumbotron_desc !== null &&
      jumbotron_img_preview !== ""
    ) {
      setHasUnsavedChanges(false);
    } else {
      setHasUnsavedChanges(true);
    }

    if (jumbotron_title == "") {
      setJumbotronTitle(null);
    }
    if (jumbotron_desc == "") {
      setJumbotronDesc(null);
    }
  }, [jumbotron_title, jumbotron_desc, jumbotron_img_preview]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="bg-gray-200">
          <Drawer isManagePage>
            <div role="tablist" className="tabs tabs-lifted tabs-lg">
              {/* Jumbotron */}
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab font-semibold text-gray-700 text-2xl [--tab-bg:white]"
                aria-label="Jumbotron"
                onClick={() => router.push("/admin/manage-page")}
                defaultChecked
              />
              <div
                role="tabpanel"
                className="tab-content bg-white text-gray-700 border-base-300 rounded-box p-6"
              >
                <div className="flex justify-between place-content-center">
                  <p className="flex flex-1 text-2xl">Jumbotron</p>
                  <Button
                    color="primary flex w-1/4 text-lg text-xl font-normal text-white"
                    text="Save"
                    isDisabled={hasUnsavedChanges}
                    onClick={() => {
                      handleForm();
                    }}
                  />
                </div>
                {/* <form onSubmit={handleJumbotronUpdate}> */}
                <div className="flex pl-4 pt-4 gap-x-4">
                  <div className="flex w-1/2 flex-col gap-y-4">
                    <textarea
                      name="jumbotron_title"
                      className="textarea h-30 textarea-bordered bg-white outline outline-1 flex flex-1"
                      placeholder="Masukkan judul"
                      value={jumbotron_title}
                      onChange={(e) => {
                        setJumbotronTitle(e.target.value);
                      }}
                    />
                    <textarea
                      name="jumbotron_desc"
                      className="textarea h-30 textarea-bordered bg-white outline outline-1 flex flex-1"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
                      value={jumbotron_desc}
                      onChange={(e) => {
                        setJumbotronDesc(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="flex flex-col">
                    <Image
                      alt="Jumbotron Image"
                      loader={() =>
                        jumbotron_img_preview || "/image_placeholder.png"
                      }
                      src={jumbotron_img_preview || "/image_placeholder.png"}
                      width={850}
                      height={375}
                      placeholder="blur"
                      blurDataURL={
                        jumbotron_img_preview
                          ? jumbotron_img_preview
                          : "/image_placeholder.png"
                      }
                    />
                    <Input
                      className="bg-white text-black outline outline-1"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleImageChange}
                      name="jumbotron_img"
                    />
                    <p className="py-2 text-pink-800 hidden">
                      *Note: Max size 1 MB
                    </p>
                  </div>
                </div>
                {/* </form> */}
              </div>

              {/* Footer */}
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab font-semibold text-gray-700 text-2xl [--tab-bg:white]"
                aria-label="Footer"
                onClick={() => router.push("/admin/manage-page")}
              />

              {/* About Us */}
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab font-semibold text-gray-700 text-2xl text-nowrap [--tab-bg:white]"
                aria-label="About Us"
                onClick={() => router.push("/admin/manage-page")}
              />
            </div>
          </Drawer>
        </div>
      ) : (
        <div className="flex flex-row min-h-screen justify-center items-center bg-gray-100">
          <span className="loading loading-spinner loading-lg text-pink-700"></span>
        </div>
      )}
    </>
  );
}
