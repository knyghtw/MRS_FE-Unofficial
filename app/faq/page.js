/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Slider from "../../components/Slider";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import getFAQ from "@/api/footers/get";
import parser from 'html-react-parser';

export default function FAQLayout() {
  const [isClient, setIsClient] = useState(false);  
  const [faq, setFAQ] = useState("");  

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const data = await getFAQ();
        setFAQ(data.data.items[0].FooterContentFAQ);        
      } catch(error) {
        return null;
      }
    }
    fetchFAQ();
    setIsClient(true);
  }, []); 

  return (
    <>
      {isClient ? (
        <div className="bg-gray-200 text-black min-h-screen">
          <div>
            <Navbar color="white" />
            <Slider/>
          </div>
          <div className="mt-10 mx-10">
            <p className="text-center text-5xl text-primary font-playfair font-bold">
              FAQ
            </p>
            <p className="mt-10 text-primary text-xl">
              {parser(faq)}
            </p>
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
