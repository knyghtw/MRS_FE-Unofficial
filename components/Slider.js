"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination } from "swiper/modules";

import getJumbotron from "@/api/jumbotrons/get";

export default function Slider() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [jumbotrons, setJumbotrons] = useState({});

  const fetchData = async () => {
    setLoading(true);
    const response = await getJumbotron();
    setJumbotrons(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);  

  return (
    <>
      {loading ? (
        <div className="w-full bg-gray-200"></div>
      ) : (
        <>
          <div className="relative">
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              loop={true}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[EffectFade, Navigation, Pagination]}
              className="mySwiper"
            >
              {jumbotrons.data.items.map((slider, index) => (
                <SwiperSlide key={index}>
                  <div className="relative">
                    <img
                      className="w-full h-72 lg:h-96 object-cover"
                      src={`${baseUrl}${slider.JumbotronImage}`}
                      alt={`Slide ${index}`}
                    />
                    <div className="absolute top-40 left-28 w-1/2 z-50 text-white">
                      <p className="font-playfair font-bold text-5xl 2xl:text-6xl">
                        {slider.JumbotronTittle}
                      </p>
                      <p className="text-xl mt-8">
                        {slider.JumbotronDescription}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
}
