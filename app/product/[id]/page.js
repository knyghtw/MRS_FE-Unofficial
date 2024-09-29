/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import getWithId from "@/api/products/getWithId";
import getProducts from "@/api/products/get";
import {
  Bars3CenterLeftIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Modal from "@/components/Modal";
import currency from "@/utils/currency";

export default function ProductLayout({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const { id } = params;
  const [isClient, setIsClient] = useState(false);
  const [itemQty, setItemQty] = useState(1);
  const [itemSubtotal, setItemSubtotal] = useState(0);
  const [activeSizeIndex, setActiveSizeIndex] = useState(0);
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState({});
  const [productSize, setProductSize] = useState("");
  const [productPrice, setProductPrice] = useState(0);  
  const [productCategory, setProductCategory] = useState("");
  const router = useRouter();

  const CATEGORY_MAP = {
    1: "Feminim",
    2: "Masculine",
    3: "Unisex",
    4: "Other",
  };

  const fetchProduct = async (productId) => {
    try {
      setIsClient(false);
      const data = await getWithId(productId);
      setProduct(data);
      setProductCategory(data.data.ProductCategory);      
      setProductSize(data.data.ProductDetails[0].ProductDetailUkuran);
      setProductPrice(data.data.ProductDetails[0].ProductDetailHarga);      
      setItemSubtotal(data.data.ProductDetails[0].ProductDetailHarga);
      const res = await getProducts(
        `filter=ProductCategory:${data.data.ProductCategory}`,
        `4`
      );
      setProducts(res);
      setIsClient(true);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const handleIncrement = () => {
    setItemQty(itemQty + 1);
  };

  useEffect(() => {
    setItemSubtotal(productPrice * itemQty);
  }, [productPrice, itemQty]);

  const handleDecrement = () => {
    if (itemQty > 1) {
      setItemQty(itemQty - 1);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const handleContinue = () => {
    const message = `Halo Customer Salsabila MR,
Pesanan baru telah dibuat dengan detail
sebagai berikut :

Produk  :  ${product.data.ProductName}
Jumlah : ${itemQty}
Ukuran : ${productSize}
Harga : ${currency(productPrice * itemQty)}

Mohon Konfirmasi Order nya kak, apakah benar atau tidak?

Mohon untuk mengisi data dibawah yah kak.
Untuk keperluan pengiriman product.
Nama : 
No Hp : 
Alamat : `;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/6285157577075/?text=${encodedMessage}`;
    setItemQty(1);
    window.open(url, "_blank");
  };

  return (
    <>
      {isClient ? (
        <>
          <dialog id={"make-order"} className="modal">
            <div className="modal-box bg-gray-100 text-black">
              <div className="py-4">
                <>
                  <p className="text-xl lg:text-2xl text-pink-800 font-semibold mb-8">
                    Atur jumlah dan catatan
                  </p>
                  <div className="flex items-center gap-x-3">
                    <div className="flex flex-1">
                      <div className="flex w-36 h-11 border border-pink-800 rounded-md justify-center">
                        <button
                          onClick={handleDecrement}
                          className="px-2 text-pink-800 hover:text-pink-800 text-2xl flex-1"
                        >
                          -
                        </button>
                        <span className="px-2 text-lg flex-1 text-center content-center text-pink-800">
                          {itemQty}
                        </span>
                        <button
                          onClick={handleIncrement}
                          className="flex-1 px-2 text-pink-800 hover:text-pink-800 text-2xl"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-pink-800 text-lg ml-3 content-center">
                        Size:
                      </p>
                    </div>
                    <div className="flex flex-1">
                      <p className="text-pink-800 text-lg">{productSize}</p>
                    </div>
                  </div>
                  <div className="mt-9 flex">
                    <div className="flex flex-1 text-xl">Subtotal</div>
                    <div className="flex flex-1 font-semibold text-xl text-pink-800">
                      {currency(itemSubtotal)}
                    </div>
                  </div>
                  <Button
                    color="primary w-full mt-12 text-white text-lg"
                    text="Pesan"
                    onClick={() => {
                      document
                        .getElementById("purchase-successful")
                        .showModal();
                      document.getElementById("make-order").close();
                    }}
                  />
                </>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={() => setItemQty(1)}>close</button>
            </form>
          </dialog>

          <Modal
            id="purchase-successful"
            body={
              <>
                <div className="mx-20 my-3">
                  <Image
                    src="/pana.png"
                    alt="Purchase Successful"
                    width={247}
                    height={249}
                  />
                </div>
                <p className="my-3 text-2xl font-semibold">
                  Silakan hubungi kontak di bawah ini
                </p>
                <Button
                  color="primary w-full mt-3 text-white"
                  text="Continue"
                  onClick={() => {
                    handleContinue();
                    document.getElementById("purchase-successful").close();
                  }}
                />
              </>
            }
          />
          <div className="bg-gray-200 text-black min-h-screen">
            <Navbar color="pink-700" />
            <div className="pt-32 px-16 flex justify-center gap-x-12 lg:gap-x-24 max-h-[550px]">
              <img
                src={`${baseUrl}` + product.data.ProductImage}
                width={250}
                height={100}
                alt="Product Image"
              />
              <div className="flex-col">
                <p className="text-2xl">
                  {CATEGORY_MAP[product.data.ProductCategory]}
                </p>
                <p className="mt-5 font-playfair text-6xl font-semibold text-pink-800">
                  {product.data.ProductName}
                </p>
                <p className="mt-5 text-4xl font-semibold text-pink-800">
                  {currency(productPrice)}
                </p>
                <div className="flex mt-5 gap-x-5">
                  <p className="text-lg my-3">Size: </p>
                  {product.data.ProductDetails.map((productDetail, index) => (
                    <Button
                      key={productDetail.ProductDetailUkuran}
                      color={
                        index === activeSizeIndex
                          ? "primary text-white w-24"
                          : "primary btn-outline text-black border-pink-800 w-24"
                      }
                      text={productDetail.ProductDetailUkuran}
                      onClick={() => {
                        setActiveSizeIndex(index);
                        setProductPrice(productDetail.ProductDetailHarga);
                        setProductSize(productDetail.ProductDetailUkuran);
                        setItemSubtotal(productDetail.ProductDetailHarga);
                      }}
                    />
                  ))}
                </div>
                <div
                  className="mt-5"
                  dangerouslySetInnerHTML={{
                    __html: product.data.ProductDescription,
                  }}
                />
                <Button
                  color="primary mt-5 text-white w-96 2xl:w-[553px]"
                  text="Beli Sekarang"
                  iconR={<ShoppingCartIcon className="text-white w-4 h-4" />}
                  onClick={() => {                    
                    document.getElementById("make-order").showModal();
                  }}
                />
              </div>
            </div>
            <div className="mt-10 mx-16 lg:mx-80">
              <p className="font-playfair text-6xl font-semibold text-pink-800">
                Referensi Untukmu
              </p>
              <div className="flex mt-10 mb-12 gap-x-7">
                {products.data.items.map((productItem, index) => (
                  <Card
                    key={index}
                    classname="bg-invisible border-[1.5px] border-primary w-full max-w-72 h-[500px] shadow-xl"
                  >
                    <>
                      <p className="pb-2 text-primary text-2xl text-center font-bold">
                        {productItem.ProductName}
                      </p>
                      <div className="self-center">
                        <img
                          src={`${baseUrl}` + productItem.ProductImage}
                          alt={`parfume ${index}`}
                          height={171}
                          width={114}
                        />
                      </div>
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
                        </div>
                        <div className="flex justify-between items-center my-1">
                          <div>
                            <p className="text-primary font-bold">
                              {currency(
                                productItem.ProductDetails[0].ProductDetailHarga
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
                                router.push(`/product/${productItem.ProductId}`)
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
            <Footer />
          </div>
        </>
      ) : (
        <div className="flex flex-row min-h-screen justify-center items-center bg-gray-100">
          <span className="loading loading-spinner loading-lg text-pink-700"></span>
        </div>
      )}
    </>
  );
}
