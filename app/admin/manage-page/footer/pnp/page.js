"use client";
import { useState, useEffect } from "react";
import Drawer from "@/components/Drawer";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import InputArea from "@/components/InputArea";

import getFooterData from "../../../../../api/footers/get";
import updateFooterData from "../../../../../api/footers/update";

export default function ManagePnPLayout() {
  const [isClient, setIsClient] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [id, setId] = useState({});
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const router = useRouter();

  const fetchFooter = async () => {
    setIsClient(false);
    const response = await getFooterData();
    setId(response.data.items[0].FooterContentId);
    setPrivacyPolicy(response.data.items[0].FooterContentPrivacyPolicy);
    setIsClient(true);
  };

  const handleSave = async () => {
    const request = {
      FooterContentPrivacyPolicy: privacyPolicy,
    };
    await updateFooterData(id, request);
    fetchFooter();
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  useEffect(() => {
    if (privacyPolicy.trim() !== "") {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [privacyPolicy]);

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
                defaultChecked
              />
              <div
                role="tabpanel"
                className="tab-content bg-white text-gray-700 border-base-300 rounded-box px-6 pt-6 pb-12"
              >
                <div className="flex justify-between place-content-center">
                  <p className="flex flex-1 text-2xl">Privacy & Policy</p>
                  <Button
                    color="primary flex w-1/4 text-lg text-xl font-normal text-white"
                    text="Save"
                    onClick={() => {
                      handleSave();
                    }}
                    isDisabled={isSaveDisabled}
                  />
                </div>
                <InputArea
                  classname="h-[60vh]"
                  value={privacyPolicy}
                  onChange={setPrivacyPolicy}
                />
              </div>

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
