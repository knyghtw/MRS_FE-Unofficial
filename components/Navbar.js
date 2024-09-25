export default function Navbar({ color, selectedTab }) {
  return (
    <div
      className={`absolute top-0 left-0 w-full z-50 bg-transparent text-${color} pointer-events-auto`}
    >
      <div className="flex justify-between items-center p-4 bg-opacity-50">
        <a className="btn btn-ghost text-4xl font-playfair ml-12">
          SALSABILA<sup className="text-xl">MR</sup>
        </a>
        <div role="tablist" className={`space-x-12 mr-12`}>
          <a
            role="tab"
            className={`tab ${
              selectedTab == "tab-1" ? "font-bold" : ""
            } text-2xl text-${color}`}
            href={`${selectedTab == "tab-1" ? "#" : "/"}`}
            onClick={() => sessionStorage.clear()}
          >
            Best Seller
          </a>
          <a
            role="tab"
            className={`tab ${
              selectedTab == "tab-2" ? `tab-active font-bold` : ""
            } text-2xl text-${color}`}
            href={`${selectedTab == "tab-2" ? "#" : "/products"}`}
            onClick={() => {
              if (selectedTab != "tab-2") sessionStorage.clear();
            }}
          >
            Product
          </a>
          <a
            role="tab"
            className={`tab ${
              selectedTab == "tab-3" ? "tab-active font-bold" : ""
            } text-2xl text-${color}`}
            href={`${selectedTab == "tab-3" ? "#" : "/about-us"}`}
            onClick={() => sessionStorage.clear()}
          >
            About
          </a>
        </div>
      </div>
    </div>
  );
}
