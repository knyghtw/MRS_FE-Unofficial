/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import getAboutUs from "../../api/aboutUs/show";
import getSocialMedia from "@/api/socialMedias/get";

export default function BestSeller() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const [isClient, setIsClient] = useState(false);
  const [about, setAbout] = useState({});
  const [imageVisi, setImageVisi] = useState("/image_placeholder.png");
  const [imageMisi, setImageMisi] = useState("/image_placeholder.png");
  const [socmeds, setSocmeds] = useState({});

  const fetchData = async () => {
    setIsClient(false);
    const res = await getAboutUs(1);
    const socmed = await getSocialMedia();
    setAbout(res);
    setSocmeds(socmed);
    setIsClient(true);
    if (about.data) setImageVisi(`${baseUrl}${about.data.AboutUsVisiImage}`);
    if (about.data) setImageMisi(`${baseUrl}${about.data.AboutUsMisiImage}`)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {isClient ? (
        <div className="bg-gray-200 text-black min-h-screen">
          <div>
            <Navbar color="white" selectedTab="tab-3" />
            <Slider />
          </div>
          <div className="mt-10 mx-10">
            <div>
              <p className="text-center text-5xl text-primary font-playfair font-bold">
                Company Information
              </p>
              <div className="grid grid-cols-2 gap-x-12 mt-10">
                <img
                  className="rounded-3xl w-full h-80"
                  src={imageVisi || "/image_placeholder.png"}
                />
                <div>
                  <p className="text-primary text-4xl font-bold font-playfair">
                    Visi
                  </p>
                  <p className="text-primary text-2xl mt-6">
                    {about.data.AboutUsVisi}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-12 mt-10">
                <div>
                  <p className="text-primary text-4xl font-bold font-playfair">
                    Misi
                  </p>
                  <p className="text-primary text-2xl mt-6">
                    {about.data.AboutUsMisi}
                  </p>
                </div>
                <img
                  className="rounded-3xl w-full h-80"
                  src={imageMisi || "/image_placeholder.png"}
                />
              </div>
            </div>
            <div className="mt-14">
              <p className="text-center text-5xl text-primary font-playfair font-bold">
                Social Media
              </p>

              <div className="flex flex-row items-center justify-center gap-x-16 mt-10">
                {socmeds.data.items.map((item) => {
                  if (
                    item.SocialMediaName === "Instagram" &&
                    item.SocialMediaURL
                  ) {
                    return (
                      <a
                        href={item.SocialMediaURL}
                        className="flex flex-col gap-4 items-center justify-center"
                      >
                        <img
                          className="w-20"
                          src="/images/icon/instagram.png"
                        />
                        <p className="text-lg font-medium">Instagram</p>
                      </a>
                    );
                  }
                  if (
                    item.SocialMediaName === "Facebook" &&
                    item.SocialMediaURL
                  ) {
                    return (
                      <a
                        href={item.SocialMediaURL}
                        className="flex flex-col gap-4 items-center justify-center"
                      >
                        <img className="w-20" src="/images/icon/facebook.png" />
                        <p className="text-lg font-medium">Facebook</p>
                      </a>
                    );
                  }
                  if (
                    item.SocialMediaName === "Tiktok" &&
                    item.SocialMediaURL
                  ) {
                    return (
                      <a
                        href={item.SocialMediaURL}
                        className="flex flex-col gap-4 items-center justify-center"
                      >
                        <img className="w-20" src="/images/icon/tiktok.png" />
                        <p className="text-lg font-medium">Tiktok</p>
                      </a>
                    );
                  }
                  if (item.SocialMediaName === "Email" && item.SocialMediaURL) {
                    return (
                      <a
                        href={item.SocialMediaURL}
                        className="flex flex-col gap-4 items-center justify-center"
                      >
                        <img className="w-20" src="/images/icon/mail.png" />
                        <p className="text-lg font-medium">Mail</p>
                      </a>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="flex flex-row min-h-screen justify-center items-center bg-gray-100">
          <span className="loading loading-spinner loading-lg text-pink-700"></span>
        </div>
      )}
    </>
  );
}
