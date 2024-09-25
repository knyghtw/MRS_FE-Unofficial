/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Slider from "@/components/Slider";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import getBestSeller from "@/api/products/getBestSeller";
import currency from "@/utils/currency";
import {
  ShoppingCartIcon,
  Bars3CenterLeftIcon,
} from "@heroicons/react/24/solid";

export default function BestSeller() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState({});
  const [feminims, setFeminims] = useState([]);
  const [masculines, setMasculines] = useState([]);
  const [unisexs, setUnisexs] = useState([]);
  const [others, setOthers] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    setIsClient(false);
    const res = await getBestSeller();
    setProducts(res);
    setIsClient(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sessionStorage.clear();
    if (products.data?.items) {
      const newFeminims = [];
      const newMasculines = [];
      const newUnisexs = [];
      const newOthers = [];

      products.data.items.forEach((product) => {
        switch (product.ProductCategory) {
          case 1:
            newFeminims.push(product);
            break;
          case 2:
            newMasculines.push(product);
            break;
          case 3:
            newUnisexs.push(product);
            break;
          case 4:
            newOthers.push(product);
            break;
          default:
            break;
        }
      });

      setFeminims(newFeminims);
      setMasculines(newMasculines);
      setUnisexs(newUnisexs);
      setOthers(newOthers);
    }
    setIsClient(true);
  }, [products]);

  return (
    <>
      {isClient ? (
        <div className="bg-gray-200 text-black min-h-screen">
          <div>
            <Navbar color="white" selectedTab="tab-1" />
            <Slider />
          </div>

          <div className="mt-10 mx-10">
            <div className="flex justify-end my-8 gap-x-4">                            
                <Button
                  color="primary text-white"
                  text="Login"
                  onClick={() => {                    
                    router.push("/login");
                  }}
                />
                <Button
                  color="primary btn-outline text-white"
                  text="Register"
                  onClick={() => {                    
                    router.push("/register");
                  }}
                />              
            </div>
          </div>

          {feminims.length == 0 ? (
            <></>
          ) : (
            <div className="mt-10 mx-10">
              <div className="flex justify-between my-8">
                <div>
                  <h1 className="text-primary text-4xl font-playfair font-bold">
                    Feminim
                  </h1>
                </div>
                <div>
                  <Button
                    color="primary text-white"
                    text="Show All"
                    onClick={() => {
                      sessionStorage.setItem("currentCategory", 1);
                      router.push("/products");
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-x-12">
                {feminims.map((feminim, index) => (
                  <Card
                    key={index}
                    classname="bg-invisible border-[1.5px] border-primary w-full shadow-xl"
                  >
                    <>
                      <p className="pb-2 text-primary text-2xl text-center font-bold">
                        {feminim.ProductName}
                      </p>
                      <img
                        className="w-full max-w-24 h-fit max-h-44 self-center"
                        src={`${baseUrl}${feminim.ProductImage}`}
                        alt={`${feminim.ProductName}`}
                      />
                      <div className="border-t-[1.5px] border-primary mt-2">
                        <p className="mt-4">Feminim</p>
                        <div className="flex justify-between items-center my-1">
                          <div>
                            <p>
                              {feminim.ProductDetails[0]?.ProductDetailUkuran}
                            </p>
                          </div>
                          <div>
                            <div>
                              <Button
                                color="border-1 btn-ghost"
                                text={
                                  <Bars3CenterLeftIcon className="text-black w-4 h-4" />
                                }
                                onClick={() =>
                                  router.push(`product/${feminim.ProductId}`)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center my-1">
                          <div>
                            <p className="text-primary font-bold">
                              {currency(
                                feminim.ProductDetails[0]?.ProductDetailHarga
                              )}
                            </p>
                          </div>
                          <div>
                            <Button
                              color="primary"
                              text={
                                <ShoppingCartIcon className="text-white w-4 h-4" />
                              }
                              onClick={() =>
                                router.push(`product/${feminim.ProductId}`)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {masculines.length == 0 ? (
            <></>
          ) : (
            <div className="mt-10 mx-10">
              <div className="flex justify-between my-8">
                <div>
                  <h1 className="text-primary text-4xl font-playfair font-bold">
                    Masculine
                  </h1>
                </div>
                <div>
                  <Button
                    color="primary text-white"
                    text="Show All"
                    onClick={() => {
                      sessionStorage.setItem("currentCategory", 2);
                      router.push("/products");
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-x-12">
                {masculines.map((masculine, index) => (
                  <Card
                    key={index}
                    classname="bg-invisible border-[1.5px] border-primary w-full shadow-xl"
                  >
                    <>
                      <p className="pb-2 text-primary text-2xl text-center font-bold">
                        {masculine.ProductName}
                      </p>
                      <img
                        className="w-full max-w-24 h-fit max-h-44 self-center"
                        src={`${baseUrl}${masculine.ProductImage}`}
                        alt={`${masculine.ProductName}`}
                      />
                      <div className="border-t-[1.5px] border-primary mt-2">
                        <p className="mt-4">Masculine</p>
                        <div className="flex justify-between items-center my-1">
                          <div>
                            <p>
                              {masculine.ProductDetails[0]?.ProductDetailUkuran}
                            </p>
                          </div>
                          <div>
                            <div>
                              <Button
                                color="neutral btn-neutral"
                                text={
                                  <Bars3CenterLeftIcon className="text-black w-4 h-4" />
                                }
                                onClick={() =>
                                  router.push(`product/${masculine.ProductId}`)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center my-1">
                          <div>
                            <p className="text-primary font-bold">
                              {currency(
                                masculine.ProductDetails[0]?.ProductDetailHarga
                              )}
                            </p>
                          </div>
                          <div>
                            <Button
                              color="primary"
                              text={
                                <ShoppingCartIcon className="text-white w-4 h-4" />
                              }
                              onClick={() =>
                                router.push(`product/${masculine.ProductId}`)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {unisexs.length == 0 ? (
            <></>
          ) : (
            <div className="mt-10 mx-10">
              <div className="flex justify-between my-8">
                <div>
                  <h1 className="text-primary text-4xl font-playfair font-bold">
                    Unisex
                  </h1>
                </div>
                <div>
                  <Button
                    color="primary text-white"
                    text="Show All"
                    onClick={() => {
                      sessionStorage.setItem("currentCategory", 3);
                      router.push("/products");
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-x-12">
                {unisexs.map((unisex, index) => (
                  <Card
                    key={index}
                    classname="bg-invisible border-[1.5px] border-primary w-full shadow-xl"
                  >
                    <>
                      <p className="pb-2 text-primary text-2xl text-center font-bold">
                        {unisex.ProductName}
                      </p>
                      <img
                        className="w-full max-w-24 h-fit max-h-44 self-center"
                        src={`${baseUrl}${unisex.ProductImage}`}
                        alt={`${unisex.ProductName}`}
                      />
                      <div className="border-t-[1.5px] border-primary mt-2">
                        <p className="mt-4">Unisex</p>
                        <div className="flex justify-between items-center my-1">
                          <div>
                            <p>
                              {unisex.ProductDetails[0]?.ProductDetailUkuran}
                            </p>
                          </div>
                          <div>
                            <div>
                              <Button
                                color="neutral btn-neutral"
                                text={
                                  <Bars3CenterLeftIcon className="text-black w-4 h-4" />
                                }
                                onClick={() =>
                                  router.push(`product/${unisex.ProductId}`)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center my-1">
                          <div>
                            <p className="text-primary font-bold">
                              {currency(
                                unisex.ProductDetails[0]?.ProductDetailHarga
                              )}
                            </p>
                          </div>
                          <div>
                            <Button
                              color="primary"
                              text={
                                <ShoppingCartIcon className="text-white w-4 h-4" />
                              }
                              onClick={() =>
                                router.push(`product/${unisex.ProductId}`)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {others.length == 0 ? (
            <></>
          ) : (
            <div className="pb-10 mt-10 mx-10">
              <div className="flex justify-between my-8">
                <div>
                  <h1 className="text-primary text-4xl font-playfair font-bold">
                    Other Products
                  </h1>
                </div>
                <div>
                  <Button
                    color="primary text-white"
                    text="Show All"
                    onClick={() => {
                      sessionStorage.setItem("currentCategory", 4);
                      router.push("/products");
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-x-12">
                {others.map((other, index) => (
                  <Card
                    key={index}
                    classname="bg-invisible border-[1.5px] border-primary w-full shadow-xl"
                  >
                    <>
                      <p className="pb-2 text-primary text-2xl text-center font-bold">
                        {other.ProductName}
                      </p>
                      <img
                        className="w-full max-w-24 h-fit max-h-44 self-center"
                        src={`${baseUrl}${other.ProductImage}`}
                        alt={`${others.ProductName}`}
                      />
                      <div className="border-t-[1.5px] border-primary mt-2">
                        <p className="mt-4">Other</p>
                        <div className="flex justify-between items-center my-1">
                          <div>
                            <p>
                              {other.ProductDetails[0]?.ProductDetailUkuran}
                            </p>
                          </div>
                          <div>
                            <div>
                              <Button
                                color="neutral btn-neutral"
                                text={
                                  <Bars3CenterLeftIcon className="text-black w-4 h-4" />
                                }
                                onClick={() =>
                                  router.push(`product/${other.ProductId}`)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center my-1">
                          <div>
                            <p className="text-primary font-bold">
                              {currency(
                                other.ProductDetails[0]?.ProductDetailHarga
                              )}
                            </p>
                          </div>
                          <div>
                            <Button
                              color="primary"
                              text={
                                <ShoppingCartIcon className="text-white w-4 h-4" />
                              }
                              onClick={() =>
                                router.push(`product/${other.ProductId}`)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  </Card>
                ))}
              </div>
            </div>
          )}

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
