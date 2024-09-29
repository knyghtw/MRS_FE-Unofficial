"use client";
import { useState, useEffect } from "react";
import Drawer from "@/components/Drawer";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import InputSelect from "@/components/InputSelect";
import InputArea from "@/components/InputArea";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

export default function ManageProductLayout() {
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [imageURL, setImageURL] = useState(
    "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
  );
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setImageURL(newImageURL);
    }
  };

  const types = [
    { value: "han_solo", name: "Han Solo" },
    { value: "greedo", name: "Greedo" },
  ];
  const categories = [
    { value: "han_solo", name: "Han Solo" },
    { value: "greedo", name: "Greedo" },
  ];

  const handleForm = () => {
    if (!isSaveDisabled) {
      const form = {
        name: name,
        description: description,
        size: size,
        price: price,
        category: category,
        type: type,
        imageURL: imageURL,
      };

    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      name.trim() !== "" &&
      description.trim() !== "" &&
      size.trim() !== "" &&
      price !== undefined &&
      category.trim() !== "" &&
      type.trim() !== "" &&
      imageURL !==
        "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
    ) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [name, description, size, price, category, type, imageURL]);

  return (
    <>
      {isClient ? (
        <div className="bg-gray-200">
          <Drawer isManageProduct>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open Drawer
            </label>
            <>
              <div className="bg-white rounded-lg">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleForm();
                  }}
                  className="flex flex-col gap-4 m-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-black text-lg">Edit Product</h1>
                    </div>
                    <div>
                      <Button
                        color="primary text-white px-12"
                        text="Save"
                        onClick={handleForm}
                        isDisabled={isSaveDisabled}
                      />
                    </div>
                  </div>
                  <img
                    className="h-[400px] w-full rounded-3xl"
                    src={imageURL}
                    alt="Product"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="inline-flex items-center bg-primary text-white p-4 rounded w-full justify-center">
                      <ArrowUpTrayIcon className="h-6 w-6 text-white mr-2" />
                      Upload Image
                    </div>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <div className="grid grid-cols-2 gap-16 mb-12">
                    <div>
                      <p className="text-black text-xl">Nama Products</p>
                      <Input
                        name="name_product"
                        type="text"
                        placeholder="Enter Text"
                        className="bg-gray-200 border-0 text-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <p className="text-black text-xl">Ukuran</p>
                      <Input
                        name="name_product"
                        type="text"
                        placeholder="Enter Text"
                        className="bg-gray-200 border-0 text-black"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-16 mb-12">
                    <div>
                      <p className="text-black text-xl">Kategori</p>
                      <InputSelect
                        className="bg-gray-200 border-0 text-black"
                        name="kategori"
                        options={categories}
                        selectedName="Select Category"
                        selectedValue="-"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </div>
                    <div>
                      <p className="text-black text-xl">Jenis</p>
                      <InputSelect
                        className="bg-gray-200 border-0 text-black"
                        name="jenis"
                        options={types}
                        selectedName="Select Type"
                        selectedValue="-"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-16 mb-12">
                    <div>
                      <p className="text-black text-xl">Harga</p>
                      <Input
                        name="harga"
                        type="number"
                        placeholder="Enter Text"
                        className="bg-gray-200 border-0 text-black"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-black text-xl">Deskripsi</p>
                    <InputArea value={description} onChange={setDescription} />
                  </div>
                </form>
              </div>
            </>
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
