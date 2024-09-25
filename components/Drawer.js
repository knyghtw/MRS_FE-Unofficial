"use client";
import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
  RocketLaunchIcon,
  CubeIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Button from "./Button";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";

export default function Sidebar({
  isManagePage,
  isManageProduct,
  isManageBestSeller,
  children,
}) {
  
  const router = useRouter();
  return (
    <>
      <Modal
        id="logout"
        title="Anda yakin ingin log out?"
        body={
          <form method="dialog">
            <div className="grid grid-cols-2 gap-2">
              <Button
                color="primary btn-outline text-purple"
                text="Yes"
                onClick={() => {router.push('/logout')}}
              />
              <Button
                color="primary btn-outline text-purple"
                text="No"
              />
            </div>
          </form>
        }
      />
      <div className="drawer min-h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col m-10">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost btn-outline mb-4"
            >
              <Bars3Icon className="h-7 w-7 text-black" />
            </label>
          </div>
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full text-black bg-white gap-y-4">
            <div className="flex">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="btn btn-square btn-ghost btn-outline"
              >
                <XMarkIcon className="h-7 w-7 text-black" />
              </label>
              <p className="font-semibold text-4xl text-pink-900 ml-5">Admin</p>
            </div>
            <li className="menu-title mt-4 text-black text-lg">
              <span>Management System</span>
            </li>
            <li>
              {isManagePage ? (
                <Button
                  color="outline border-pink-800 text-pink-800 text-lg hover:cursor-default hover:border-pink-800 hover:text-pink-800 hover:bg-white"
                  iconL={<UserIcon className="h-7 w-7 mr-2" />}
                  text={"Manage Page"}
                />
              ) : (
                <a href="/admin/manage-page">
                  <UserIcon className="h-7 w-7 mr-2" />
                  <p className="text-lg">Manage Page</p>
                </a>
              )}
            </li>
            <li>
              {isManageProduct ? (
                <button className="btn btn-outline border-pink-800 text-pink-800 text-lg">
                  <CubeIcon className="h-7 w-7 mr-2" />
                  Manage Product
                </button>
              ) : (
                <a href="/admin/manage-product">
                  <CubeIcon className="h-7 w-7 mr-2" />
                  <p className="text-lg">Manage Product</p>
                </a>
              )}
            </li>
            <li>
              {isManageBestSeller ? (
                <button className="btn btn-outline border-pink-800 text-pink-800 text-lg">
                  <RocketLaunchIcon className="h-7 w-7 mr-2" />
                  Manage Best Seller
                </button>
              ) : (
                <a href="/admin/manage-best-seller">
                  <RocketLaunchIcon className="h-7 w-7 mr-2" />
                  <p className="text-lg">Manage Best Seller</p>
                </a>
              )}
            </li>
            <li className="menu-title mt-4 text-gray-800 text-lg">
              <span>Authentication</span>
            </li>
            <li>
              <a
                onClick={() => {
                  document.getElementById("logout").showModal();
                }}
              >
                <ArrowLeftStartOnRectangleIcon className="h-7 w-7 mr-2" />
                <p className="text-lg">Logout</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
