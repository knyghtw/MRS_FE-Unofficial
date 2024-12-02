"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import currency from "../../../utils/currency";
import Drawer from "@/components/Drawer";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import InputArea from "@/components/InputArea";
import InputSelect from "@/components/InputSelect";
import getProducts from "../../../api/products/get";
import showProduct from "../../../api/products/show";
import updateProduct from "../../../api/products/update";
import createProducts from "../../../api/products/create";
import deleteProducts from "../../../api/products/destroy";

import createDetailProd from "../../../api/productDetails/create";
import deleteDetailProd from "../../../api/productDetails/destroy";

import {
  PlusIcon,
  Bars3Icon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

export default function ManageProductLayout() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState({});
  const [productDelete, setProductDelete] = useState(null);
  const [imageURL, setImageURL] = useState("/image_placeholder.png");
  const [imageFile, setImageFile] = useState(null);

  const [productIdEdit, setProductIdEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [typeEdit, setTypeEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageURLEdit, setImageURLEdit] = useState("");
  const [productDetailsEdit, setProductDetailsEdit] = useState([]);
  const [deleteProductDetail, setDeleteProductDetail] = useState([]);

  const types = [
    { value: "Parfum Body", name: "Parfum Body" },
    { value: "Parfum Laundry", name: "Parfum Laundry" },
    { value: "Minyak Kepentingan", name: "Minyak Kepentingan" },
    { value: "Sabun Mandi", name: "Sabun Mandi" },
    { value: "Sabun Cuci Piring", name: "Sabun Cuci Piring" },
    { value: "Dupa", name: "Dupa" },
  ];
  const categories = [
    { value: 1, name: "Feminim" },
    { value: 2, name: "Masculine" },
    { value: 3, name: "Unisex" },
    { value: 4, name: "Other" },
  ];

  const [tests, setTests] = useState([]);
  const [newUkuran, setNewUkuran] = useState("");
  const [newHarga, setNewHarga] = useState("");
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isSaveEditDisabled, setIsSaveEditDisabled] = useState(true);
  const router = useRouter();

  const handleAdd = () => {
    if (newUkuran && newHarga) {
      const newTest = {
        ProductDetailUkuran: newUkuran,
        ProductDetailHarga: parseInt(newHarga),
      };
      setTests([...tests, newTest]);
      setNewUkuran("");
      setNewHarga("");
    }
  };

  const fetchProducts = async () => {
    setIsClient(false);
    const res = await getProducts();
    setProducts(res);
    setIsClient(true);
  };

  const fetchShowProducts = async (id) => {
    const res = await showProduct(id);
    if (res.data) {
      setProductIdEdit(res.data.ProductId);
      setNameEdit(res.data.ProductName);
      setDescriptionEdit(res.data.ProductDescription);
      setImageURL(`${baseUrl}${res.data.ProductImage}`);
      setTypeEdit(res.data.ProductJenis);
      setCategoryEdit(res.data.ProductCategory);
      setProductDetailsEdit(res.data.ProductDetails);
    }
  };

  const handleDelete = (index) => {
    const newTests = tests.filter((_, i) => i !== index);
    setTests(newTests);
  };

  const handleDeleteProductDetail = (id, index) => {
    setDeleteProductDetail([...deleteProductDetail, { id }]);
    setProductDetailsEdit(productDetailsEdit.filter((_, i) => i !== index));
  };

  const CATEGORY_MAP = {
    1: "Feminim",
    2: "Masculine",
    3: "Unisex",
    4: "Other",
  };

  const deleteProduct = async (id) => {
    await deleteProducts(id);
    setProductDelete(null);
    fetchProducts();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const newImageURL = URL.createObjectURL(file);
      setImageURL(newImageURL);
    }
    event.target.value = null;
  };

  const deleteImage = () => {
    setImageURL("/image_placeholder.png");
    setImageFile(null);
    // document.getElementById("image-upload").value = "";
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setType("");
    setCategory("");
    deleteImage();
    setImageFile(null);
    setTests([]);
  };

  const handleEditCancel = () => {
    setNameEdit("");
    setDescriptionEdit("");
    setTypeEdit("");
    setCategoryEdit("");
    setImageURL("/image_placeholder.png");
    setImageFile(null);
    setProductDetailsEdit([]);
    setDeleteProductDetail([]);
    setTests([]);
  };

  const handleForm = async () => {
    if (!isSaveDisabled) {
      const formData = new FormData();
      formData.append("ProductName", name);
      formData.append("ProductDescription", description);
      formData.append("ProductJenis", type);
      formData.append("ProductCategory", category);
      formData.append("ProductImage", imageFile);

      tests.forEach((test, index) => {
        formData.append(
          `ProductDetails[${index}][ProductDetailUkuran]`,
          test.ProductDetailUkuran
        );
        formData.append(
          `ProductDetails[${index}][ProductDetailHarga]`,
          test.ProductDetailHarga
        );
      });

      await createProducts(formData);

      handleCancel();
      fetchProducts();
    }
  };

  const handleEditForm = async (id) => {
    if (!isSaveEditDisabled) {
        const formData = new FormData();
        formData.append("ProductName", nameEdit);
        formData.append("ProductDescription", descriptionEdit);
        formData.append("ProductJenis", typeEdit);
        formData.append("ProductCategory", categoryEdit);

        if (imageFile) {
            formData.append("ProductImage", imageFile);
        }

        await updateProduct(id, formData);

        deleteProductDetail.forEach(async (detail) => {
            await deleteDetailProd(detail.id);
        });

        tests.forEach(async (detail) => {
            const formDataDetail = new FormData();
            formDataDetail.append("ProductDetailProductId", id);
            formDataDetail.append("ProductDetailHarga", detail.ProductDetailHarga);
            formDataDetail.append("ProductDetailUkuran", detail.ProductDetailUkuran);
            await createDetailProd(formDataDetail);
        });

        handleEditCancel();
        fetchProducts(); 
    }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {}, [products]);

  useEffect(() => {
    if (
      name.trim() !== "" &&
      description.trim() !== "<p><br></p>" &&
      type.trim() !== "" &&
      category.trim() !== "" &&
      tests.length > 0 &&
      imageURL !== "/image_placeholder.png"
    ) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }

    setIsClient(true);
  }, [name, description, type, category, tests, imageURL]);

  useEffect(() => {
    if (
      nameEdit.trim() !== "" &&
      descriptionEdit.trim() !== "<p><br></p>" &&
      typeEdit.trim() !== "" &&
      productDetailsEdit.length + tests.length > 0 &&
      imageURL !== "/image_placeholder.png"
    ) {
      setIsSaveEditDisabled(false);
    } else {
      setIsSaveEditDisabled(true);
    }

    setIsClient(true);
  }, [
    nameEdit,
    descriptionEdit,
    tests,
    typeEdit,
    categoryEdit,
    productDetailsEdit,
    imageURL,
  ]);

  return (
    <>
      {isClient ? (
        <div className="bg-gray-200">
          <Modal
            id="add-product"
            title="Tambah Product"
            body={
              <div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4 items-center">
                    <img className="w-24 h-24 rounded-full" src={imageURL} />
                    <div className="grid grid-cols-2 gap-4">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="inline-flex items-center bg-invisible text-primary border-2 border-primary hover:bg-primary hover:text-white hover:border-white p-3 rounded-lg w-full justify-center">
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
                      <Button
                        color="primary text-white"
                        text={
                          <>
                            <TrashIcon className="h-6 w-6 mr-2 text-white" />{" "}
                            Delete Image
                          </>
                        }
                        onClick={deleteImage}
                      />
                    </div>
                  </div>
                  <div className="py-1">
                    <p>Nama Products</p>
                    <Input
                      name="name_product"
                      type="text"
                      placeholder="Enter Text"
                      className="bg-gray-200 border-0"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="py-1">
                    <p>Deskripsi</p>
                    <InputArea
                      className="bg-gray-200 border-0"
                      value={description}
                      onChange={setDescription}
                    />
                  </div>
                  <div className="py-1">
                    <p>Jenis</p>
                    <InputSelect
                      className="bg-gray-200 border-0"
                      name="jenis"
                      options={types}
                      selectedName="Select Type"
                      selectedValue="-"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>
                  <div className="py-1">
                    <p>Kategori</p>
                    <InputSelect
                      className="bg-gray-200 border-0"
                      name="kategori"
                      options={categories}
                      selectedName="Select Category"
                      selectedValue="-"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4 items-center">
                      <div className="grid grid-cols-2 gap-x-4 flex-1">
                        <Input
                          name="ProductDetailUkuran"
                          type="text"
                          placeholder="Ukuran"
                          className="bg-gray-200"
                          value={newUkuran}
                          onChange={(e) => setNewUkuran(e.target.value)}
                        />
                        <Input
                          name="ProductDetailHarga"
                          type="number"
                          placeholder="Harga"
                          className="bg-gray-200"
                          value={newHarga}
                          onChange={(e) => setNewHarga(e.target.value)}
                        />
                      </div>
                      <Button
                        color="primary btn-outline text-primary font-bold"
                        text={<PlusIcon className="h-6 w-6" />}
                        onClick={handleAdd}
                      />
                    </div>
                    {tests.map((test, index) => (
                      <div
                        className="flex flex-row items-center gap-4"
                        key={index}
                      >
                        <div className="flex flex-1 items-center gap-x-4">
                          <p className="pl-4">{test.ProductDetailUkuran}</p>
                          <p className="pl-20 justify-self-center">
                            {currency(test.ProductDetailHarga)}
                          </p>
                        </div>
                        <Button
                          color="primary btn-outline text-primary font-bold"
                          text={<TrashIcon className="h-6 w-6" />}
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    ))}
                  </div>

                  <form
                    method="dialog"
                    className="grid grid-cols-2 gap-x-4 mt-8"
                  >
                    <Button
                      color="primary btn-outline text-primary"
                      text="Cancel"
                      onClick={handleCancel}
                    />
                    <Button
                      color="primary text-white"
                      text="Save"
                      type="submit"
                      onClick={() => {
                        handleForm();
                      }}
                      isDisabled={isSaveDisabled}
                    />
                  </form>
                </div>
              </div>
            }
          />
          <Modal
            id="update-product"
            title="Edit Product"
            body={
              <div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row gap-4 items-center">
                    <img className="w-24 h-24 rounded-full" src={imageURL} />
                    <div className="grid grid-cols-2 gap-4">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="inline-flex items-center bg-invisible text-primary border-2 border-primary hover:bg-primary hover:text-white hover:border-white p-3 rounded-lg w-full justify-center">
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
                      <Button
                        color="primary text-white"
                        text={
                          <>
                            <TrashIcon className="h-6 w-6 mr-2 text-white" />{" "}
                            Delete Image
                          </>
                        }
                        onClick={deleteImage}
                      />
                    </div>
                  </div>
                  <div className="py-1">
                    <p>Nama Products</p>
                    <Input
                      name="name_product"
                      type="text"
                      placeholder="Enter Text"
                      className="bg-gray-200 border-0"
                      value={nameEdit}
                      onChange={(e) => setNameEdit(e.target.value)}
                    />
                  </div>
                  <div className="py-1">
                    <p>Deskripsi</p>
                    <InputArea
                      className="bg-gray-200 border-0"
                      value={descriptionEdit}
                      onChange={setDescriptionEdit}
                    />
                  </div>
                  <div className="py-1">
                    <p>Jenis</p>
                    <InputSelect
                      className="bg-gray-200 border-0"
                      name="jenis"
                      options={types}
                      selectedName={typeEdit}
                      selectedValue={typeEdit}
                      value={type}
                      onChange={(e) => setTypeEdit(e.target.value)}
                    />
                  </div>
                  <div className="py-1">
                    <p>Kategori</p>
                    <InputSelect
                      className="bg-gray-200 border-0"
                      name="kategori"
                      options={categories}
                      selectedName={CATEGORY_MAP[categoryEdit]}
                      selectedValue={categoryEdit}
                      value={category}
                      onChange={(e) => setCategoryEdit(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row gap-4 items-center">
                    <div className="grid grid-cols-2 gap-x-4">
                      <Input
                        name="ProductDetailUkuran"
                        type="text"
                        placeholder="Ukuran"
                        className="bg-gray-200"
                        value={newUkuran}
                        onChange={(e) => setNewUkuran(e.target.value)}
                      />
                      <Input
                        name="ProductDetailHarga"
                        type="number"
                        placeholder="Harga"
                        className="bg-gray-200"
                        value={newHarga}
                        onChange={(e) => setNewHarga(e.target.value)}
                      />
                    </div>
                    <Button
                      color="primary btn-outline text-primary font-bold"
                      text={<PlusIcon className="h-6 w-6" />}
                      onClick={handleAdd}
                    />
                  </div>
                  {productDetailsEdit.map((detail, index) => (
                    <div
                      className="flex flex-row items-center gap-4"
                      key={index}
                    >
                      <div className="flex flex-1 items-center gap-x-4">
                        <p className="pl-4">{detail.ProductDetailUkuran}</p>
                        <p className="pl-20 justify-self-center">
                          {currency(detail.ProductDetailHarga)}
                        </p>
                      </div>
                      <Button
                        color="primary btn-outline text-primary font-bold"
                        text={<TrashIcon className="h-6 w-6" />}
                        onClick={() =>
                          handleDeleteProductDetail(
                            detail.ProductDetailId,
                            index
                          )
                        }
                      />
                    </div>
                  ))}
                  {tests.map((test, index) => (
                    <div
                      className="flex flex-row items-center gap-4"
                      key={index}
                    >
                      <div className="flex flex-1 items-center gap-x-4">
                        <p className="pl-4">{test.ProductDetailUkuran}</p>
                        <p className="pl-20 justify-self-center">
                          {currency(test.ProductDetailHarga)}
                        </p>
                      </div>
                      <Button
                        color="primary btn-outline text-primary font-bold"
                        text={<TrashIcon className="h-6 w-6" />}
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  ))}
                  <form
                    method="dialog"
                    className="grid grid-cols-2 gap-x-4 mt-8"
                  >
                    <Button
                      color="primary btn-outline text-primary"
                      text="Cancel"
                      onClick={handleEditCancel}
                    />
                    <Button
                      color="primary text-white"
                      text="Save"
                      type="submit"
                      onClick={() => {
                        handleEditForm(productIdEdit);
                      }}
                      isDisabled={isSaveEditDisabled}
                    />
                  </form>
                </div>
              </div>
            }
          />
          <Modal
            id="delete-product"
            title="Anda Yakin ingin menghapus data ini?"
            body={
              <form method="dialog">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    color="primary btn-outline text-purple"
                    text="Yes"
                    onClick={() => deleteProduct(productDelete)}
                  />
                  <Button
                    color="primary btn-outline text-purple"
                    text="No"
                    onClick={() => setProductDelete(null)}
                  />
                </div>
              </form>
            }
          />
          <Drawer isManageProduct>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open Drawer
            </label>
            <>
              <div className="bg-white rounded-lg">
                <div className="flex justify-between m-6">
                  <div>
                    <h1 className="text-black text-lg">Product List</h1>
                  </div>
                  <div></div>
                  <div>
                    <Button
                      color="primary text-white"
                      text={
                        <>
                          <PlusIcon className="h-6 w-6 mr-2" />
                          Tambah Product
                        </>
                      }
                      onClick={() =>{
                        handleCancel()
                        document.getElementById("add-product").showModal()}
                      }
                    />
                  </div>
                </div>

                <div className="overflow-x-auto px-6 pb-16">
                  <table className="table text-black">
                    <thead className="text-sm text-black font-normal">
                      <tr>
                        <th>Foto</th>
                        <th>Nama</th>
                        <th>Kategori</th>
                        <th>Jenis</th>
                        <th>Ukuran</th>
                        <th>Harga</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.data?.items.map((product) => (
                        <tr key={product.id}>
                          <td>
                            <img
                              className="w-12 h-12 rounded-full"
                              src={`${baseUrl}${product.ProductImage}`}
                            />
                          </td>
                          <td>{product.ProductName}</td>
                          <td>{CATEGORY_MAP[product.ProductCategory]}</td>
                          <td>{product.ProductJenis}</td>
                          <td>
                            {product.ProductDetails.map((detail) => (
                              <p
                                className="py-1"
                                key={detail.ProductDetailUkuran}
                              >
                                {detail.ProductDetailUkuran}
                              </p>
                            ))}
                          </td>
                          <td>
                            {product.ProductDetails.map((detail) => (
                              <p
                                className="py-1"
                                key={detail.ProductDetailHarga}
                              >
                                {currency(detail.ProductDetailHarga)}
                              </p>
                            ))}
                          </td>
                          <td>
                            <div className="dropdown dropdown-end">
                              <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-secondary m-1"
                              >
                                <Bars3Icon className="h-4 w-4" />
                              </div>
                              <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-secondary rounded-none z-50 w-32 p-0 shadow"
                              >
                                <li>
                                  <a
                                    onClick={() => {
                                      handleEditCancel()
                                      fetchShowProducts(product.ProductId);
                                      document
                                        .getElementById("update-product")
                                        .showModal();
                                    }}
                                  >
                                    <PencilIcon className="h-4 w-4 mr-1 ml-2 text-success" />{" "}
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    onClick={() => {
                                      setProductDelete(product.ProductId);
                                      document
                                        .getElementById("delete-product")
                                        .showModal();
                                    }}
                                  >
                                    <TrashIcon className="h-4 w-4 mr-1 ml-2 text-error" />{" "}
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
