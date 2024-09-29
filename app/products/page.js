/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/Slider";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Footer from "../../components/Footer";
import Navbar from "@/components/Navbar";
import getProducts from "@/api/products/get";
import {
  ShoppingCartIcon,
  Bars3CenterLeftIcon,
  UserGroupIcon,
  EllipsisHorizontalCircleIcon,
  CircleStackIcon,
  SparklesIcon,
  RectangleStackIcon,
  RectangleGroupIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Input from "@/components/Input";
import currency from "@/utils/currency";

export default function ProductsLayout() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState({});
  const [currentCategory, setCurrentCategory] = useState(
    sessionStorage.getItem("currentCategory") || 0
  );
  const [currentJenis, setCurrentJenis] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Jenis
  const [isParfumBody, setIsParfumBody] = useState(false);
  const [isParfumLaundry, setIsParfumLaundry] = useState(false);
  const [isMinyakKepentingan, setIsMinyakKepentingan] = useState(false);
  const [isSabunMandi, setIsSabunMandi] = useState(false);
  const [isSabunCuciPiring, setIsSabunCuciPiring] = useState(false);
  const [isDupa, setIsDupa] = useState(false);

  // const [priceSlider, setPriceSlider] = useState("25");
  const router = useRouter();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const CATEGORY_MAP = {
    1: "Feminim",
    2: "Masculine",
    3: "Unisex",
    4: "Other",
  };

  useEffect(() => {
    setIsClient(true);
    const fetchProducts = async () => {
      if (currentJenis == "" || currentCategory > 0) {
        const res = await getProducts(
          `filter=ProductCategory:${currentCategory}&search=${searchQuery}`,
          200
        );
        setProducts(res);
        setIsLoading(false);
      }
      if (currentCategory == 0) {
        const res = await getProducts(
          `filter=ProductJenis:${currentJenis}&search=${searchQuery}`,
          200
        );
        setProducts(res);
        setIsLoading(false);
      }
      if (currentCategory == 0 && currentJenis == "") {
        const res = await getProducts(`search=${searchQuery}`, 200);
        setProducts(res);
        setIsLoading(false);
      }
      if (currentCategory > 0 && currentJenis) {
        const res = await getProducts(
          `filter[]=ProductJenis:${currentJenis}&filter[]=ProductCategory:${currentCategory}&search=${searchQuery}`,
          200
        );
        setProducts(res);
        setIsLoading(false);
      }
    };
    fetchProducts();
    setIsLoading(true);
  }, [currentCategory, currentJenis, searchQuery]);

  return (
    <>
      {isClient ? (
        <div className="bg-gray-200 text-black min-h-screen">
          <div>
            <Navbar color="white" selectedTab="tab-2" />
            <Slider />
          </div>
          <div className="mt-10 mx-10">
            <div className="flex gap-x-7">
              <div className="flex flex-col gap-x-2">
                <p className="text-4xl text-pink-800 font-semibold">Products</p>
                <Input
                  className="my-4 border-black bg-gray-100"
                  type="text"
                  name="search"
                  placeholder="Masukkan nama product"
                  onChange={handleInputChange(setSearchQuery)}
                  svg={<MagnifyingGlassIcon className="h-7 w-7" />}
                />
                <div className="flex justify-between">
                  <p className="text-2xl font-bold self-center">Jenis</p>
                  <Button
                    color={"primary text-white"}
                    hidden={currentJenis == ""}
                    text={"Reset"}
                    onClick={() => {
                      setIsParfumBody(false);
                      setIsParfumLaundry(false);
                      setIsMinyakKepentingan(false);
                      setIsSabunMandi(false);
                      setIsSabunCuciPiring(false);
                      setIsDupa(false);
                      setCurrentJenis("");
                    }}
                  />
                </div>
                <div className="flex flex-col gap-y-5 mt-4">
                  {isParfumBody ? (
                    <button className="btn btn-outline text-pink-800 text-lg flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="#9D174D"
                        class="bi bi-person-standing-dress"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
                      </svg>
                      <p className="flex flex-initial w-48">Parfum Body</p>
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost text-lg flex"
                      onClick={() => {
                        setIsParfumBody(true);
                        setIsParfumLaundry(false);
                        setIsMinyakKepentingan(false);
                        setIsSabunMandi(false);
                        setIsSabunCuciPiring(false);
                        setIsDupa(false);
                        setCurrentJenis("Parfum Body");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="black"
                        class="bi bi-person-standing-dress"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
                      </svg>
                      <p className="flex flex-initial w-48 font-normal">
                        Parfum Body
                      </p>
                    </button>
                  )}
                  {isParfumLaundry ? (
                    <button className="btn btn-outline text-pink-800 font-normal text-lg flex flex-col">
                      <RectangleGroupIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial font-semibold w-48">
                        Parfum Laundry
                      </p>
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost font-normal text-lg flex flex-col"
                      onClick={() => {
                        setIsParfumBody(false);
                        setIsParfumLaundry(true);
                        setIsMinyakKepentingan(false);
                        setIsSabunMandi(false);
                        setIsSabunCuciPiring(false);
                        setIsDupa(false);
                        setCurrentJenis("Parfum Laundry");
                      }}
                    >
                      <RectangleGroupIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">Parfum Laundry</p>
                    </button>
                  )}
                  {isMinyakKepentingan ? (
                    <button className="btn btn-outline text-pink-800 font-semibold text-base flex flex-col">
                      <RectangleStackIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">
                        Minyak Kepentingan
                      </p>
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost font-normal text-lg flex flex-col"
                      onClick={() => {
                        setIsParfumBody(false);
                        setIsParfumLaundry(false);
                        setIsMinyakKepentingan(true);
                        setIsSabunMandi(false);
                        setIsSabunCuciPiring(false);
                        setIsDupa(false);
                        setCurrentJenis("Minyak Kepentingan");
                      }}
                    >
                      <RectangleStackIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">
                        Minyak Kepentingan
                      </p>
                    </button>
                  )}
                  {isSabunMandi ? (
                    <button className="btn btn-outline text-pink-800 font-semibold text-lg flex flex-col">
                      <SparklesIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">Sabun Mandi</p>
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost font-normal text-lg flex flex-col"
                      onClick={() => {
                        setIsParfumBody(false);
                        setIsParfumLaundry(false);
                        setIsMinyakKepentingan(false);
                        setIsSabunMandi(true);
                        setIsSabunCuciPiring(false);
                        setIsDupa(false);
                        setCurrentJenis("Sabun Mandi");
                      }}
                    >
                      <SparklesIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">Sabun Mandi</p>
                    </button>
                  )}
                  {isSabunCuciPiring ? (
                    <button className="btn btn-outline text-pink-800 font-semibold text-lg flex flex-col">
                      <CircleStackIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">
                        Sabun Cuci Piring
                      </p>
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost font-normal text-lg flex flex-col"
                      onClick={() => {
                        setIsParfumBody(false);
                        setIsParfumLaundry(false);
                        setIsMinyakKepentingan(false);
                        setIsSabunMandi(false);
                        setIsSabunCuciPiring(true);
                        setIsDupa(false);
                        setCurrentJenis("Sabun Cuci Piring");
                      }}
                    >
                      <CircleStackIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">
                        Sabun Cuci Piring
                      </p>
                    </button>
                  )}
                  {isDupa ? (
                    <button className="btn btn-outline text-pink-800 font-semibold text-lg flex flex-col">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-magic"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z" />
                      </svg>
                      <p className="flex flex-initial w-48">Dupa</p>
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost font-normal text-lg flex flex-col"
                      onClick={() => {
                        setIsParfumBody(false);
                        setIsParfumLaundry(false);
                        setIsMinyakKepentingan(false);
                        setIsSabunMandi(false);
                        setIsSabunCuciPiring(false);
                        setIsDupa(true);
                        setCurrentJenis("Dupa");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-magic"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 2.672a.5.5 0 1 0 1 0V.843a.5.5 0 0 0-1 0zm4.5.035A.5.5 0 0 0 13.293 2L12 3.293a.5.5 0 1 0 .707.707zM7.293 4A.5.5 0 1 0 8 3.293L6.707 2A.5.5 0 0 0 6 2.707zm-.621 2.5a.5.5 0 1 0 0-1H4.843a.5.5 0 1 0 0 1zm8.485 0a.5.5 0 1 0 0-1h-1.829a.5.5 0 0 0 0 1zM13.293 10A.5.5 0 1 0 14 9.293L12.707 8a.5.5 0 1 0-.707.707zM9.5 11.157a.5.5 0 0 0 1 0V9.328a.5.5 0 0 0-1 0zm1.854-5.097a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L8.646 5.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0l1.293-1.293Zm-3 3a.5.5 0 0 0 0-.706l-.708-.708a.5.5 0 0 0-.707 0L.646 13.94a.5.5 0 0 0 0 .707l.708.708a.5.5 0 0 0 .707 0z" />
                      </svg>
                      <p className="flex flex-initial w-48">Dupa</p>
                    </button>
                  )}
                </div>

                <div className="flex justify-between mt-11">
                  <p className="text-2xl font-bold self-center">Kategori</p>
                  <Button
                    color={"primary text-white"}
                    hidden={currentCategory == 0}
                    text={"Reset"}
                    onClick={() => {
                      sessionStorage.clear();
                      setCurrentCategory(0);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-y-5 mt-4">
                  {currentCategory == 1 ? (
                    <button className="btn btn-outline text-pink-800 text-lg flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="#9D174D"
                        class="bi bi-person-standing-dress"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
                      </svg>
                      <p className="flex flex-initial w-48">Feminim</p>
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost font-normal text-lg flex"
                      onClick={() => {
                        sessionStorage.setItem("currentCategory", 1);
                        setCurrentCategory(1);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="black"
                        class="bi bi-person-standing-dress"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m-.5 12.25V12h1v3.25a.75.75 0 0 0 1.5 0V12h1l-1-5v-.215a.285.285 0 0 1 .56-.078l.793 2.777a.711.711 0 1 0 1.364-.405l-1.065-3.461A3 3 0 0 0 8.784 3.5H7.216a3 3 0 0 0-2.868 2.118L3.283 9.079a.711.711 0 1 0 1.365.405l.793-2.777a.285.285 0 0 1 .56.078V7l-1 5h1v3.25a.75.75 0 0 0 1.5 0Z" />
                      </svg>
                      <p className="flex flex-initial w-48">Feminim</p>
                    </button>
                  )}
                  {currentCategory == 2 ? (
                    <button className="btn btn-outline text-pink-800 text-lg flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-person-standing"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0" />
                      </svg>
                      <p className="flex flex-initial w-48">Masculine</p>
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost font-normal text-lg flex"
                      onClick={() => {
                        sessionStorage.setItem("currentCategory", 2);
                        setCurrentCategory(2);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        class="bi bi-person-standing"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M6 6.75v8.5a.75.75 0 0 0 1.5 0V10.5a.5.5 0 0 1 1 0v4.75a.75.75 0 0 0 1.5 0v-8.5a.25.25 0 1 1 .5 0v2.5a.75.75 0 0 0 1.5 0V6.5a3 3 0 0 0-3-3H7a3 3 0 0 0-3 3v2.75a.75.75 0 0 0 1.5 0v-2.5a.25.25 0 0 1 .5 0" />
                      </svg>
                      <p className="flex flex-initial w-48">Masculine</p>
                    </button>
                  )}
                  {currentCategory == 3 ? (
                    <button className="btn btn-outline text-pink-800 text-lg flex flex-col">
                      <UserGroupIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">Unisex</p>
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost font-normal text-lg flex flex-col"
                      onClick={() => {
                        sessionStorage.setItem("currentCategory", 3);
                        setCurrentCategory(3);
                      }}
                    >
                      <UserGroupIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">Unisex</p>
                    </button>
                  )}
                  {currentCategory == 4 ? (
                    <button className="btn btn-outline text-pink-800 text-lg flex flex-col">
                      <EllipsisHorizontalCircleIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">Other Products</p>
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost font-normal text-lg flex flex-col"
                      onClick={() => {
                        sessionStorage.setItem("currentCategory", 4);
                        setCurrentCategory(4);
                      }}
                    >
                      <EllipsisHorizontalCircleIcon className="h-7 w-7 mr-2 flex" />
                      <p className="flex flex-initial w-48">Other Products</p>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex w-full gap-x-4 h-fit">
                {isLoading ? (
                  <div className="flex min-h-screen w-full justify-center items-center bg-transparent">
                    <span className="loading loading-spinner loading-lg text-pink-700"></span>
                  </div>
                ) : (
                  <>
                    {products.data && products.data.items.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {products.data.items.map((productItem, index) => (
                          <Card
                            key={index}
                            classname="bg-invisible border-[1.5px] border-primary px-4 w-full shadow-xl"
                          >
                            <>
                              <p className="pb-2 text-primary text-2xl text-center font-bold">
                                {productItem.ProductName}
                              </p>
                              <img
                                className="w-full max-w-24 h-fit max-h-44 self-center"
                                alt={`parfume ${index}`}
                                src={`${baseUrl}` + productItem.ProductImage}
                              />
                              <div className="border-t-[1.5px] border-primary mt-2">
                                <p className="mt-4">
                                  {CATEGORY_MAP[productItem.ProductCategory]}
                                </p>
                                <div className="flex justify-between items-center my-1">
                                  <div>
                                    <p>
                                      {
                                        productItem.ProductDetails[0]
                                          .ProductDetailUkuran
                                      }
                                    </p>
                                  </div>
                                  <div>
                                    <Button
                                      color="neutral btn-neutral"
                                      text={
                                        <Bars3CenterLeftIcon className="text-black w-4 h-4" />
                                      }
                                      onClick={() =>
                                        router.push(
                                          `/product/${productItem.ProductId}`
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between gap-x-2 items-center my-1">
                                  <div>
                                    <p className="text-primary font-bold">
                                      {currency(
                                        productItem.ProductDetails[0]
                                          .ProductDetailHarga
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <Button
                                      color="ghost bg-pink-800"
                                      text={
                                        <ShoppingCartIcon className="text-white w-4 h-4" />
                                      }
                                      onClick={() =>
                                        router.push(
                                          `/product/${productItem.ProductId}`
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p>Item kosong</p>
                    )}
                  </>
                )}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      ) : (
        <div className="flex flex-row min-h-screen justify-center items-center bg-gray-100">
          <span className="loading loading-spinner loading-lg text-pink-700"></span>
        </div>
      )}
    </>
  );
}
