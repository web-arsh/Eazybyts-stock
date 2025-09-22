"use client";
import React, { useRef, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import SearchBox from "../Search/Search";
import axios from "axios";

export default function DashboardLayout({ children }) {
  const [data, setData] = useState(undefined);
  const barShow = useRef(null);

  const keyPress = async (e) => {
    const value = e.currentTarget?.value;
    if (e.key === "Enter") {
      try {
        const response = await axios.post(
          "/api/search",
          { search: value },
          { headers: { "Content-Type": "application/json" } }
        );
        setData(response.data);
      } catch (error) {
        console.error("Search request failed:", error);
      }
    }

    if (e.currentTarget?.value === "") {
      setData(undefined);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 w-full flex flex-col relative">
        {/* Topbar */}
        <header className="h-16 shadow-sm bg-white flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-indigo-600">Stock</h1>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search (Press Enter)"
              className="block w-full sm:w-96 px-4 py-2 border rounded-md text-sm focus:outline-none"
              onKeyDown={keyPress}
            />
          </div>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <button className="bg-indigo-500 text-white rounded px-3 py-1 hover:ring-2 hover:ring-indigo-200">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        {/* Page Content */}
        <main className="overflow-y-auto">
          {/* Search Dropdown */}
          <div
            className={`w-96 h-fit absolute top-16 left-4 lg:left-5 mx-4 border-2 border-gray-300 flex-col bg-white ${
              data ? "flex" : "hidden"
            } shadow-md rounded z-10`}
            ref={barShow}
          >
            <SearchBox data={data} />
          </div>

          <div className="rounded-lg h-[90vh] max-h-full w-full p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
