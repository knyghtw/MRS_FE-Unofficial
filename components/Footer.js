"use client";
import { useState, useEffect } from "react";
import getSocmed from "@/api/socialMedias/get";
import getAddress from "@/api/footers/get";

export default function Footer() {
  const [socmeds, setSocmeds] = useState({});
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await getSocmed();
    const address = await getAddress();
    setSocmeds(response);
    setAddress(address.data.items[0].FooterContentAddress)
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [loading, socmeds, address]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <footer className="footer bg-gray-200 text-primary px-10 pt-24 pb-36">
          <nav className="md:place-self-center mx-10">
            <h6 className="text-2xl font-bold">Mr Salsabila</h6>
            <div className="flex flex-cols gap-x-4">
              {socmeds.data?.items?.map((item) => {
                if (
                  item.SocialMediaName === "Tokopedia" &&
                  item.SocialMediaURL
                ) {
                  return (
                    <a href={item.SocialMediaURL} key={item.SocialMediaName}>
                      <img
                        src="/images/icon/tokopedia.png"
                        width={30}
                        height={30}
                      />
                    </a>
                  );
                }
                if (
                  item.SocialMediaName === "Shopee" &&
                  item.SocialMediaURL
                ) {
                  return (
                    <a href={item.SocialMediaURL} key={item.SocialMediaName}>
                      <img
                        src="/images/icon/shopee.png"
                        width={30}
                        height={30}
                      />
                    </a>
                  );
                }
                return null;
              })}
            </div>
          </nav>
          <nav>
            <p className="font-bold text-xl">Legal</p>
            <a href="/privacy-policy" className="link link-hover text-black">Privacy policy</a>
            <a href="/term-and-condition" className="link link-hover text-black">Terms of use</a>
            <a href="/faq" className="link link-hover text-black">FAQ</a>
          </nav>
          <nav>
            <p className="font-bold text-xl">Contact Us</p>
            <a href={address || "#"} className="link link-hover text-black">Our Address</a>
            <div className="flex flex-row items-center justify-center gap-x-2 mt-2">
              {socmeds.data?.items?.map((item) => {
                if (
                  item.SocialMediaName === "Instagram" &&
                  item.SocialMediaURL
                ) {
                  return (
                    <a href={item.SocialMediaURL} key={item.SocialMediaName}>
                      <img className="w-8" src="/images/icon/instagram.png" />
                    </a>
                  );
                }
                if (
                  item.SocialMediaName === "Facebook" &&
                  item.SocialMediaURL
                ) {
                  return (
                    <a href={item.SocialMediaURL} key={item.SocialMediaName}>
                      <img className="w-8" src="/images/icon/facebook.png" />
                    </a>
                  );
                }
                if (
                  item.SocialMediaName === "Tiktok" &&
                  item.SocialMediaURL
                ) {
                  return (
                    <a href={item.SocialMediaURL} key={item.SocialMediaName}>
                      <img className="w-8" src="/images/icon/tiktok.png" />
                    </a>
                  );
                }
                if (item.SocialMediaName === "Email" && item.SocialMediaURL) {
                  return (
                    <a href={item.SocialMediaURL} key={item.SocialMediaName}>
                      <img className="w-8" src="/images/icon/mail.png" />
                    </a>
                  );
                }
                return null;
              })}
            </div>
          </nav>
          <nav>
            <p className="font-bold text-xl">Getting Touch</p>            
            <a className="link link-hover text-black">0851-5757-7075</a>
            <a className="link link-hover text-black">Malang</a>
          </nav>
        </footer>
      )}
    </>
  );
}
