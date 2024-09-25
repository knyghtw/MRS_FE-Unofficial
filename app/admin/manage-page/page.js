/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Drawer from "@/components/Drawer";
import Card from "@/components/Card";
import Button from "@/components/Button";
import {
  Bars3Icon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Modal from "@/components/Modal";

import getJumbotron from "@/api/jumbotrons/get";
import deleteJumbotron from "@/api/jumbotrons/destroy";

export default function ManagePageLayout() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  const [isClient, setIsClient] = useState(false);
  const [jumbotrons, setJumbotrons] = useState({});
  const [jumbotronDelete, setJumbotronDelete] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    setIsClient(false);
    const response = await getJumbotron();
    setJumbotrons(response);
    setIsClient(true);
  };

  const handleDelete = async (id) => {
    await deleteJumbotron(id);
    setJumbotronDelete(null);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [jumbotrons]);

  return (
    <>
      {isClient ? (
        <div className="bg-gray-200">
          <Modal
            id="delete-jumbotron"
            title="Delete Confirmation"
            body={
              <>
                <p className="py-4">Are you sure want to delete?</p>
                <div className="modal-action">
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      handleDelete(jumbotronDelete);
                    }}
                  >
                    Delete
                  </button>
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                </div>
              </>
            }
          >
            <>
              <div className="modal-box">
                <h3 className="font-bold text-lg">Delete Confirmation</h3>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </>
          </Modal>
          <Drawer isManagePage>
            <div role="tablist" className="tabs tabs-lifted tabs-lg">
              {/* Jumbotron */}
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab font-semibold text-gray-700 text-2xl [--tab-bg:white]"
                aria-label="Jumbotron"
                onClick={() => sessionStorage.setItem("current_tab", 1)}
                defaultChecked={
                  sessionStorage.getItem("current_tab") == null ||
                  sessionStorage.getItem("current_tab") == 1
                }
              />
              <div
                role="tabpanel"
                className="tab-content bg-white text-gray-700 border-base-300 rounded-box p-6"
              >
                <div className="flex justify-between place-content-center">
                  <p className="text-2xl">List Jumbotron</p>
                  <Button
                    color="primary text-lg text-xl font-normal text-white"
                    iconL={<PlusIcon className="h-7 w-7" />}
                    onClick={() => {
                      {
                        sessionStorage.setItem("current_tab", 1);
                        router.push("/admin/manage-page/jumbotron");
                      }
                    }}
                    text="Tambah Banner"
                  />
                </div>

                <table className="table">
                  <thead>
                    <tr className="text-black text-base">
                      <th>Foto</th>
                      <th>No. Jumbotron</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jumbotrons.data.items.map((jumbotron, index) => (
                      <tr className="text-center" key={index}>
                        <td>
                          <img
                            src={`${baseUrl}${jumbotron.JumbotronImage}`}
                            alt="Jumbotron Image"
                            width={140}
                            height={80}
                            placeholder="blur"
                            blurDataURL="/image_placeholder.png"
                            onError={() => setSrc("/image_placeholder.png")}
                          />
                        </td>
                        <td>No. {index + 1}</td>
                        <td>
                          <div className="dropdown">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-square bg-white hover:opacity-25"
                            >
                              <Bars3Icon className="h-7 w-7 text-black" />
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu bg-white text-black rounded-box z-[1] w-52 p-2 shadow"
                            >
                              <li
                                onClick={() => {
                                  setIsClient(false);
                                  sessionStorage.setItem("current_tab", 1);
                                  router.push(
                                    `/admin/manage-page/jumbotron/${jumbotron.JumbotronId}`
                                  );
                                }}
                              >
                                <div className="flex">
                                  <PencilIcon className="h-4 w-4 text-green-600" />
                                  <a>Edit</a>
                                </div>
                              </li>
                              <li
                                onClick={() => {
                                  setJumbotronDelete(jumbotron.JumbotronId);
                                  document
                                    .getElementById("delete-jumbotron")
                                    .showModal();
                                }}
                              >
                                <div className="flex">
                                  <TrashIcon className="h-4 w-4 text-red" />
                                  <a>Delete</a>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab font-semibold text-gray-700 text-2xl [--tab-bg:white]"
                aria-label="Footer"
                onClick={() => sessionStorage.setItem("current_tab", 2)}
                defaultChecked={sessionStorage.getItem("current_tab") == 2}
              />
              <div
                role="tabpanel"
                className="tab-content text-gray-700 bg-white border-base-300 rounded-box p-6"
              >
                <div className="flex flex-col gap-y-5">
                  <Card classname={"w-full outline outline-1"}>
                    <div className="flex place-content-center place-items-center">
                      <p className="font-semibold text-2xl align-middle flex flex-1">
                        Privacy Policy
                      </p>
                      <Button
                        color="primary text-white font-normal text-lg flex w-32"
                        text="Edit"
                        onClick={() => {
                          sessionStorage.setItem("current_tab", 2);
                          setIsClient(false);
                          router.push("/admin/manage-page/footer/pnp");
                        }}
                      />
                    </div>
                  </Card>

                  <Card classname={"w-full outline outline-1"}>
                    <div className="flex place-content-center place-items-center">
                      <p className="font-semibold text-2xl align-middle flex flex-1">
                        Terms and Conditions
                      </p>
                      <Button
                        color="primary text-white font-normal text-lg flex w-32"
                        text="Edit"
                        onClick={() => {
                          setIsClient(false);
                          router.push("/admin/manage-page/footer/tnc");
                        }}
                      />
                    </div>
                  </Card>

                  <Card classname={"w-full outline outline-1"}>
                    <div className="flex place-content-center place-items-center">
                      <p className="font-semibold text-2xl align-middle flex flex-1">
                        FAQ
                      </p>
                      <Button
                        color="primary text-white font-normal text-lg flex w-32"
                        text="Edit"
                        onClick={() => {
                          setIsClient(false);
                          router.push("/admin/manage-page/footer/faq");
                        }}
                      />
                    </div>
                  </Card>

                  <Card classname={"w-full outline outline-1"}>
                    <div className="flex place-content-center place-items-center">
                      <p className="font-semibold text-2xl align-middle flex flex-1">
                        Contact Us
                      </p>
                      <Button
                        color="primary text-white font-normal text-lg flex w-32"
                        text="Edit"
                        onClick={() => {
                          setIsClient(false);
                          router.push("/admin/manage-page/footer/contactus");
                        }}
                      />
                    </div>
                  </Card>

                  <Card classname={"w-full outline outline-1"}>
                    <div className="flex place-content-center place-items-center">
                      <p className="font-semibold text-2xl align-middle flex flex-1">
                        Address
                      </p>
                      <Button
                        color="primary text-white font-normal text-lg flex w-32"
                        text="Edit"
                        onClick={() => {
                          setIsClient(false);
                          router.push("/admin/manage-page/footer/address");
                        }}
                      />
                    </div>
                  </Card>
                </div>
              </div>

              {/* About Us */}
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab font-semibold text-gray-700 text-2xl [--tab-bg:white]"
                aria-label="About Us"
                onClick={() => sessionStorage.setItem("current_tab", 3)}
                defaultChecked={sessionStorage.getItem("current_tab") == 3}
              />
              <div
                role="tabpanel"
                className="tab-content text-gray-700 bg-white border-base-300 rounded-box p-6"
              >
                <div className="flex flex-col gap-y-5">
                  <Card classname={"w-full outline outline-1"}>
                    <div className="flex place-content-center place-items-center">
                      <p className="font-semibold text-2xl align-middle flex flex-1">
                        Visi
                      </p>
                      <Button
                        color="primary text-white font-normal text-lg flex w-32"
                        text="Edit"
                        onClick={() => {
                          sessionStorage.setItem("current_tab", 3);
                          setIsClient(false);
                          router.push("/admin/manage-page/about-us/visi");
                        }}
                      />
                    </div>
                  </Card>

                  <Card classname={"w-full outline outline-1"}>
                    <div className="flex place-content-center place-items-center">
                      <p className="font-semibold text-2xl align-middle flex flex-1">
                        Misi
                      </p>
                      <Button
                        color="primary text-white font-normal text-lg flex w-32"
                        text="Edit"
                        onClick={() => {
                          sessionStorage.setItem("current_tab", 3);
                          setIsClient(false);
                          router.push("/admin/manage-page/about-us/misi");
                        }}
                      />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
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
