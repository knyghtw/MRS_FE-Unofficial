"use client";
import { useState, useEffect } from "react";
import Drawer from "@/components/Drawer";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";

import getAboutData from "@/api/aboutUs/get";
import updateAboutData from "@/api/aboutUs/update";

export default function ManageMisiLayout() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const [isClient, setIsClient] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [id, setId] = useState("");
  const [misi, setMisi] = useState("");
  const [imageMisi, setImageMisi] = useState("/image_placeholder.png");
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    setIsClient(false);
    try {
      const response = await getAboutData();
      setId(response.data.items[0].AboutUsId);
      setMisi(response.data.items[0].AboutUsMisi || "");
      if (response.data.items[0].AboutUsMisiImage) {
        setImageMisi(
          `${baseUrl}${response.data.items[0].AboutUsMisiImage}`
        );
      }
      setIsClient(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleImageChange = (event) => {
    const newImage = event.target.files[0];
    setImageFile(newImage);
    if (newImage) {
      const reader = new FileReader();
      reader.onload = (e) => setImageMisi(e.target.result);
      reader.readAsDataURL(newImage);
    } else {
      setImageMisi("");
    }
  };

  const handleSave = async () => {
    if (!isSaveDisabled) {
      const form = new FormData();
      form.append("AboutUsMisi", misi);
      if (imageFile !== null) {
        form.append("AboutUsMisiImage", imageFile);
      }

      await updateAboutData(id, form);
      setMisi("");
      setImageMisi("/image_placeholder.png");
      setImageFile(null);

      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setIsSaveDisabled(misi.trim() === "" || imageMisi === "/image_placeholder.png");
  }, [misi, imageMisi]);

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
              />

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
                defaultChecked
              />
              <div
                role="tabpanel"
                className="tab-content bg-white text-gray-700 border-base-300 rounded-box px-6 pt-6 pb-12"
              >
                <div className="flex justify-between place-content-center">
                  <p className="flex flex-1 text-2xl">Misi</p>
                  <Button
                    color="primary flex w-1/4 text-lg text-xl font-normal text-white"
                    text="Save"
                    onClick={handleSave}
                    isDisabled={isSaveDisabled}
                  />
                </div>
                <div className="flex pl-4 pt-4 gap-x-4">
                  <div className="flex w-1/2 flex-col gap-y-4">
                    <textarea
                      name="jumbotron_title"
                      className="textarea h-30 textarea-bordered bg-white outline outline-1 flex flex-1"
                      placeholder="Masukkan judul"
                      value={misi}
                      onChange={(e) => {
                        setMisi(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <img
                      alt="Visi Image"
                      src={imageMisi || "/image_placeholder.png"}
                      width={850}
                      height={375}
                      placeholder="blur"
                      blurDataURL={
                        imageMisi ? imageMisi : "/image_placeholder.png"
                      }
                    />
                    <Input
                      className="bg-white text-black outline outline-1"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleImageChange}
                      name="misi_img"
                    />
                    <p className="py-2 text-pink-800 hidden">
                      *Note: Max size 1 MB
                    </p>
                  </div>
                </div>
              </div>
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
