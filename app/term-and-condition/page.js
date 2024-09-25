/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import getTnc from "@/api/footers/get";
import parse from "html-react-parser";

export default function TermAndConditionLayout() {
  const [isClient, setIsClient] = useState(false);
  const [tnc, setTnc] = useState("");  

  useEffect(() => {
    const fetchTnc = async () => {
      try {
        const data = await getTnc();
        setTnc(data.data.items[0].FooterContentTermAndCondition);
      } catch (error) {
        return null;
      }
    };
    fetchTnc();
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="bg-gray-200 text-black min-h-screen">
          <div>
            <Navbar color="white" />
            <Slider />
          </div>
          <div className="mt-10 mx-10">
            <p className="text-center text-5xl text-primary font-playfair font-bold">
              Terms and Condition
            </p>
            <p className="mt-10 text-primary text-xl">{parse(tnc)}</p>
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
