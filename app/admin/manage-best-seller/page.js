"use client";
import { useState, useEffect } from "react";
import currency from "../../../utils/currency";
import Drawer from "@/components/Drawer";
import Button from "@/components/Button";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";
import InputSelect from "@/components/InputSelect";
import getProducts from "../../../api/products/get";
import deleteProduct from "../../../api/products/deleteBestSeller";
import addProduct from "../../../api/products/addBestSeller";

export default function ManageBestSellerLayout() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState([]);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [filteredItems, setFilteredItems] = useState([]);
  const [products, setProducts] = useState({});
  const [productDelete, setProductDelete] = useState(null);
  const [categories, setCategories] = useState([]);

  const CATEGORY_MAP = {
    "1": "Female",
    "2": "Masculine",
    "3": "Unisex",
    "4": "Other"
  };

  const fetchProducts = async () => {
    setIsClient(false);
    const res = await getProducts();
    setProducts(res);

    const bestSellerCounts = res.data.items.reduce((acc, item) => {
      if (item.ProductIsBestSeller === 1) {
        acc[item.ProductCategory] = (acc[item.ProductCategory] || 0) + 1;
      }
      return acc;
    }, {});

    const uniqueCategories = Array.from(
      new Set(res.data.items.map((item) => item.ProductCategory))
    ).map((category) => ({
      value: category,
      name: CATEGORY_MAP[category] || category,
      disabled: bestSellerCounts[category] >= 4,
    }));

    setCategories(uniqueCategories);
    setIsClient(true);
  };

  const deleteBestSeller = async (id) => {
    await deleteProduct(id);
    setProductDelete(null);
    fetchProducts();
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedItem("");
    setItems([]);
    setFilteredItems([]);
    setIsSaveDisabled(true);
  };

  const handleForm = async () => {
    if (!isSaveDisabled) {
      const form = {
        items: items,
      };
      await Promise.all(form.items.map(item => addProduct(item)));
      handleReset();
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const items = products.data?.items
        .filter(
          (product) =>
            product.ProductCategory == selectedCategory &&
            product.ProductIsBestSeller === 0
        )
        .map((product) => ({
          value: product.ProductId,
          name: product.ProductName,
        }));

      setFilteredItems(items);
    } else {
      setFilteredItems([]);
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    setIsSaveDisabled(items.length === 0);
  }, [items]);

  const handleItemsChange = (e) => {
    const newValue = e.target.value;
    setSelectedItem(newValue);
    if (newValue) {
      setItems([newValue]);
    } else {
      setItems([]);
    }
  };

  return (
    <>
      {isClient ? (
        <div className="bg-gray-200">
          <Drawer isManageBestSeller>
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open Drawer
            </label>

            <Modal
              id="add-best"
              title="Choose Best Seller Item"
              body={
                <div className="flex flex-col gap-4">
                  <InputSelect
                    name="kategori"
                    className="bg-gray-200 border-0"
                    options={categories}
                    selectedName="Select Category"
                    selectedValue="-"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  {selectedCategory && (
                    <InputSelect
                      name="item"
                      className="bg-gray-200 border-0"
                      options={filteredItems}
                      selectedName="Select Item"
                      selectedValue="-"
                      value={selectedItem}
                      onChange={handleItemsChange}
                    />
                  )}
                  <form method="dialog" className="grid grid-cols-2 gap-x-4">
                    <Button
                      color="black btn-outline text-black"
                      text="Close"
                      onClick={handleReset}
                    />
                    <Button
                      color="primary text-white"
                      text="Save Changes"
                      onClick={handleForm}
                      isDisabled={isSaveDisabled}
                    />
                  </form>
                </div>
              }
            />

            <Modal
              id="delete-product"
              title="Are you sure you want to delete this product?"
              body={
                <form method="dialog">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      color="primary btn-outline text-purple"
                      text="Yes"
                      onClick={() => deleteBestSeller(productDelete)}
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
                          Add Product
                        </>
                      }
                      onClick={() =>
                        document.getElementById("add-best").showModal()
                      }
                    />
                  </div>
                </div>

                <div className="overflow-x-auto px-6 pb-16">
                  <table className="table text-black">
                    <thead className="text-sm text-black font-normal">
                      <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.data.items
                        .filter((product) => product.ProductIsBestSeller === 1)
                        .map((product) => (
                          <tr key={product.ProductId}>
                            <td>
                              <img
                                className="w-12 h-12 rounded-full"
                                src={`${baseUrl}${product.ProductImage}`}
                              />
                            </td>
                            <td>{product.ProductName}</td>{" "}
                            <td>{CATEGORY_MAP[product.ProductCategory]}</td>
                            <td>{product.ProductJenis}</td>
                            <td>
                              {product.ProductDetails.map((detail) => (
                                <p className="py-1" key={detail.ProductDetailUkuran}>
                                  {detail.ProductDetailUkuran}
                                </p>
                              ))}
                            </td>
                            <td>
                              {product.ProductDetails.map((detail) => (
                                <p className="py-1" key={detail.ProductDetailHarga}>
                                  {currency(detail.ProductDetailHarga)}
                                </p>
                              ))}
                            </td>
                            <td>
                              <Button
                                color="secondary"
                                text={
                                  <TrashIcon className="h-4 w-4 text-error" />
                                }
                                onClick={() => {
                                  setProductDelete(product.ProductId);
                                  document
                                    .getElementById("delete-product")
                                    .showModal();
                                }}
                              />
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
