"use client";

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Search,
  School,
  Loader2,
  Loader,
  LoaderCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  imgExt: string;
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getAllSchools();
  }, []);

  const search = (query: string) => {
    setSearchName(query.toLowerCase());
  };
  const getAllSchools = async () => {
    try {
      const response = await fetch("/api/schools");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      setSchools(data.schools);
    } catch (err) {
      toast.error("Error Fetching Schools From Database");
      setError("Failed To load Schools Please Try Again.");
    } finally {
      
      setLoading(false);
    }
  };


  return (
    <div className="w-full">
      <div className="mb-8 flex items-start gap-6 flex-col md:flex-row w-full justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            School Directory
          </h1>
          <p className="text-gray-400 text-sm">
            {loading
              ? "Loading List"
              : `Viewing ${schools.length} Schools From The Database.`}
          </p>
        </div>

        {/* Search Box Area*/}
        <div className="flex w-full md:w-fit md:flex items-center border-2 border-gray-800 bg-zinc-950 rounded-lg px-3 py-2 focus-within:border-gray-600 transition-colors">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search School..."
            className="bg-transparent border-none outline-none text-white placeholder-gray-500 w-full focus:ring-0"
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-center my-10">{error}</div>
      )}
      {loading ? (
        <div className="flex h-[50vh] w-full items-center justify-center text-gray-400">
          <LoaderCircle className="animate-spin  size-20 stroke-white" />
        </div>
      ) : schools.length === 0 ? (
        <div className="text-center py-20">
          <School className="mx-auto text-gray-600 mb-4" size={48} />
          <h3 className="text-white font-medium text-lg">
            No Schools Saved Into Database
          </h3>
          <Link href={"/app/addSchool"}>
            {" "}
            <p className="text-black bg-white rounded-lg px-10 py-2 w-fit mx-auto  mt-5 font-semibold">
              Add A School Now
            </p>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools
            .filter((e) => e.name.toLowerCase().includes(searchName))
            .map((school) => (
              <SchoolDisplay key={school.id} school={school} />
            ))}
        </div>
      )}
    </div>
  );
}

const SchoolDisplay = ({ school }: { school: School }) => {
  return (
    <div
      key={school.id}
      className="bg-zinc-950 backdrop-blur-sm rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 hover:shadow-2xl hover:shadow-black/50"
    >
      <div className="relative h-48 w-full bg-gray-800 overflow-hidden">
        <img
          src={`https://res.cloudinary.com/commitly/image/upload/v1764764849/school_directory/${school.id}`}
          alt={school.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement; 
            target.setAttribute(
              "src",
              "https://placehold.co/600x400/1a1a1a/FFF?text=Image+Not+Found"
            ); // Fallback image
          }}
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-1 truncate">
          {school.name}
        </h3>
        <div className="flex gap-2 my-2 text-gray-400 text-sm mb-4 min-h-[40px] items-start w-full flex-col">
          <div className="flex w-full gap-2 h-auto items-center">
            <MapPin className="mt-1 flex-shrink-0 text-gray-500 size-4" />
            <span className="truncate">{school.address}</span>
          </div>
          <div className="flex w-full gap-2 h-auto items-center">
            <Phone className="mt-1 flex-shrink-0 text-gray-500 size-4" />
            <span className="truncate">{school.contact}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
          <span className="text-base text-white ">
            ID: {school.id}
          </span>
          <span className=" text-white ">{school.city}</span>
        </div>
      </div>
    </div>
  );
};
