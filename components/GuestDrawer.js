import Input from "./Input";
import { useState, useEffect } from "react";
import {  
  CircleStackIcon,
  EllipsisHorizontalCircleIcon,
  MagnifyingGlassIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  SlashIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export default function GuestDrawer() {
  const [priceSlider, setPriceSlider] = useState("25");

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };
  return (
    <div className="flex flex-col gap-x-2">
      <p className="text-4xl text-pink-800 font-semibold">Products</p>
      <Input
        className="my-4 border-black bg-gray-100"
        type="text"
        name="search"
        placeholder="Cari disini"
        svg={<MagnifyingGlassIcon className="h-7 w-7" />}
      />
      <p className="text-2xl font-bold">Jenis</p>
      <div className="flex flex-col gap-y-5 mt-4">
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
        <button className="btn btn-ghost font-normal text-lg flex">
          <RectangleGroupIcon className="h-7 w-7 mr-2 flex" />
          <p className="flex flex-initial w-48">Parfum Laundry</p>
        </button>
        <button className="btn btn-ghost font-normal text-lg flex">
          <RectangleStackIcon className="h-7 w-7 mr-2 flex" />
          <p className="flex flex-initial w-48">Minyak Kepentingan</p>
        </button>
        <button className="btn btn-ghost font-normal text-lg flex">
          <SparklesIcon className="h-7 w-7 mr-2 flex" />
          <p className="flex flex-initial w-48">Sabun Mandi</p>
        </button>
        <button className="btn btn-ghost font-normal text-lg flex">
          <CircleStackIcon className="h-7 w-7 mr-2 flex" />
          <p className="flex flex-initial w-48">Sabun Cuci Piring</p>
        </button>
        <button className="btn btn-ghost font-normal text-lg flex">
          <SlashIcon className="h-7 w-7 mr-2 flex" />
          <p className="flex flex-initial w-48">Dupa</p>
        </button>
      </div>

      <p className="text-2xl font-bold mt-11">Kategori</p>
      <div className="flex flex-col gap-y-5 mt-4">
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
        <button className="btn btn-ghost font-normal text-lg flex">
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
        <button className="btn btn-ghost font-normal text-lg flex">
          <UserGroupIcon className="h-7 w-7 mr-2 flex" />          
          <p className="flex flex-initial w-48">Unisex</p>
        </button>
        <button className="btn btn-ghost font-normal text-lg flex">
          <EllipsisHorizontalCircleIcon className="h-7 w-7 mr-2 flex" />
          <p className="flex flex-initial w-48">Other Products</p>
        </button>
      </div>

      <p className="text-2xl font-bold mt-11 mb-5">Harga</p>
      <input
        type="range"
        min={0}
        max="100"
        value={priceSlider}
        className="range [--range-shdw:black]"
        step="25"
        onChange={handleInputChange(setPriceSlider)}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex">10.000</div>
        <div className="flex">150.000</div>
      </div>
    </div>
  );
}
