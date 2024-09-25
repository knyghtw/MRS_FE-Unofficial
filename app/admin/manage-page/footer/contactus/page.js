"use client";
import { useState, useEffect } from "react";
import Drawer from "@/components/Drawer";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";

import getSocialMedia from "@/api/socialMedias/get";
import updateSocialMedia from "@/api/socialMedias/update";

export default function ManageContactUsLayout() {
  const [isClient, setIsClient] = useState(false);
  const [isSaveContactDisabled, setIsSaveContactDisabled] = useState(true);
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [mail, setMail] = useState("");

  const [isSaveStoreDisabled, setIsSaveStoreDisabled] = useState(true);
  const [tokopedia, setTokopedia] = useState("");
  const [shopee, setShopee] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    setIsClient(false);

    const response = await getSocialMedia();
    response.data.items.map((socmed) => {
      switch (socmed.SocialMediaName) {
        case "Instagram":
          setInstagram(socmed.SocialMediaURL);
          break;
        case "Facebook":
          setFacebook(socmed.SocialMediaURL);
          break;
        case "Tiktok":
          setTiktok(socmed.SocialMediaURL);
          break;
        case "Email":
          setMail(socmed.SocialMediaURL);
          break;
        case "Tokopedia":
          setTokopedia(socmed.SocialMediaURL);
          break;
        case "Shopee":
          setShopee(socmed.SocialMediaURL);
          break;
        default:
          break;
      }
    });
    setIsClient(true);
  };

  const handleContact = async () => {
    const response = await getSocialMedia();
    response.data.items.map(async (contact) => {
      switch (contact.SocialMediaName) {
        case "Instagram":
          const requestInstagram = {
            SocialMediaURL: instagram,
          };
          await updateSocialMedia(contact.SocialMediaId, requestInstagram);
          break;
        case "Facebook":
          const requestFacebook = {
            SocialMediaURL: facebook,
          };
          await updateSocialMedia(contact.SocialMediaId, requestFacebook);
          break;
        case "Tiktok":
          const requestTiktok = {
            SocialMediaURL: tiktok,
          };
          await updateSocialMedia(contact.SocialMediaId, requestTiktok);
          break;
        case "Email":
          const requestEmail = {
            SocialMediaURL: mail,
          };
          await updateSocialMedia(contact.SocialMediaId, requestEmail);
          break;
        default:
          break;
      }
    });
    fetchData();
  };

  const handleStore = async () => {
    const response = await getSocialMedia();
    response.data.items.map(async (store) => {
      switch (store.SocialMediaName) {
        case "Tokopedia":
          const requestTokopedia = {
            SocialMediaURL: tokopedia,
          };
          await updateSocialMedia(store.SocialMediaId, requestTokopedia);
          break;
        case "Shopee":
          const requestShopee = {
            SocialMediaURL: shopee,
          };
          await updateSocialMedia(store.SocialMediaId, requestShopee);
          break;
        default:
          break;
      }
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (
      instagram !== null &&
      facebook !== null &&
      tiktok !== null &&
      mail !== null
    ) {
      setIsSaveContactDisabled(false);
    } else {
      setIsSaveContactDisabled(true);
    }

    if (instagram == "") {
      setInstagram(null)
    }
    if (facebook == "") {
      setFacebook(null)
    }
    if (tiktok == "") {
      setTiktok(null)
    }
    if (mail == "") {
      setMail(null)
    }
  }, [instagram, facebook, tiktok, mail]);

  useEffect(() => {
    if ((tokopedia !== null) && (shopee !== null)) {
      setIsSaveStoreDisabled(false);
    } else {
      setIsSaveStoreDisabled(true);
    }

    if (tokopedia == "") {
      setTokopedia(null)
    }
    if (shopee == "") {
      setShopee(null)
    }
  }, [tokopedia, shopee]);

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
                <Card classname={"w-full"}>
                  <div className="flex place-content-center place-items-center">
                    <p className="text-2xl align-middle flex flex-1 font-semibold">
                      Contact Us
                    </p>
                    <div className="flex gap-x-11 flex-none w-32">
                      <Button
                        color="primary text-white font-normal text-lg w-full"
                        text="Save"
                        isDisabled={isSaveContactDisabled}
                        onClick={() => {
                          handleContact();
                        }}
                      />
                    </div>
                  </div>
                  {/* IG Link */}
                  <Card classname={"w-full outline outline-1 my-2"}>
                    <p className="text-2xl align-middle flex flex-1">
                      Instagram
                    </p>
                    <Input
                      name="ig_url"
                      type="url"
                      placeholder="Enter instagram link here"
                      className="bg-white text-black border-black"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                    />
                  </Card>

                  {/* FB Link */}
                  <Card classname={"w-full outline outline-1 my-2"}>
                    <p className="text-2xl align-middle flex flex-1">
                      Facebook
                    </p>
                    <Input
                      name="fb_url"
                      type="url"
                      placeholder="Enter facebook link here"
                      className="bg-white text-black border-black"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                    />
                  </Card>

                  {/* Tiktok Link */}
                  <Card classname={"w-full outline outline-1 my-2"}>
                    <p className="text-2xl align-middle flex flex-1">TikTok</p>
                    <Input
                      name="tiktok_url"
                      type="url"
                      placeholder="Enter tiktok link here"
                      className="bg-white text-black border-black"
                      value={tiktok}
                      onChange={(e) => setTiktok(e.target.value)}
                    />
                  </Card>

                  {/* Email */}
                  <Card classname={"w-full outline outline-1 my-2"}>
                    <p className="text-2xl align-middle flex flex-1">E-mail</p>
                    <Input
                      name="email_address"
                      type="email"
                      placeholder="Enter e-mail address here"
                      className="bg-white text-black border-black"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                    />
                  </Card>
                </Card>

                <hr />

                <Card classname={"w-full"}>
                  <div className="flex place-content-center place-items-center">
                    <p className="text-2xl align-middle flex flex-1 font-semibold">
                      Store
                    </p>
                    <div className="flex gap-x-11 flex-none w-32">
                      <Button
                        color="primary text-white font-normal text-lg w-full"
                        text="Save"
                        onClick={() => {
                          handleStore();
                        }}
                        isDisabled={isSaveStoreDisabled}
                      />
                    </div>
                  </div>
                  <Card classname={"w-full outline outline-1 my-2"}>
                    <p className="text-2xl align-middle flex flex-1">
                      Tokopedia
                    </p>
                    <Input
                      name="tokped_url"
                      type="url"
                      placeholder="Enter tokopedia link here"
                      className="bg-white text-black border-black"
                      value={tokopedia}
                      onChange={(e) => setTokopedia(e.target.value)}
                    />
                  </Card>
                  <Card classname={"w-full outline outline-1 my-2"}>
                    <p className="text-2xl align-middle flex flex-1">Shopee</p>
                    <Input
                      name="shopee_url"
                      type="url"
                      placeholder="Enter shopee link here"
                      className="bg-white text-black border-black"
                      value={shopee}
                      onChange={(e) => setShopee(e.target.value)}
                    />
                  </Card>
                </Card>
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
