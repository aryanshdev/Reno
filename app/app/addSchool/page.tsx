"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface FormData {
  name: string;
  emailID: string;
  contact: string;
  address: string;
  city: string;
  state: string;
  image: FileList;
}

export default function AddSchool() {
  // 2. Initialize the hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  
  const onSubmit = async (data : FormData) => {
    try {
      const formData = new FormData();
      
      formData.append("name", data.name);
      formData.append("emailID", data.emailID);
      formData.append("contact", data.contact);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      
      formData.append("image", data.image[0]);

      const response = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("School Added Successfully!");
        reset();
      } else {
        toast.error("Failed To Add School. Please Try Again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred connecting to the server.");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Add New School</h1>
        <p className="text-gray-400 text-sm">
          Enter the details below to register a new institution in the database.
        </p>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">School Name</label>
              <input
                {...register("name", { required: "School name is required" })}
                className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600"
                placeholder="School Name Here"
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message?.toString()}</span>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <input
                {...register("emailID", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address format",
                  },
                })}
                className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600"
                placeholder="Email ID"
              />
              {errors.emailID && <span className="text-red-500 text-xs">{errors.emailID.message?.toString()}</span>}
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Contact Number</label>
              <input
                type="number"
                {...register("contact", {
                  required: "Contact number is required",
                  minLength: { value: 10, message: "Must be at least 10 digits" },
                })}
                className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600"
                placeholder="Phone Number"
              />
              {errors.contact && <span className="text-red-500 text-xs">{errors.contact.message?.toString()}</span>}
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">City</label>
              <input
                {...register("city", { required: "City is required" })}
                className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600"
                placeholder="City/District"
              />
              {errors.city && <span className="text-red-500 text-xs">{errors.city.message?.toString()}</span>}
            </div>

            {/* State */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">State</label>
              <input
                {...register("state", { required: "State is required" })}
                className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600"
                placeholder="State"
              />
              {errors.state && <span className="text-red-500 text-xs">{errors.state.message?.toString()}</span>}
            </div>
            
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">School Image</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "School image is required" })}
                  className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer"
                />
                <div className="absolute right-3 top-3 text-gray-600 pointer-events-none">
                  <Upload size={18} />
                </div>
              </div>
              {errors.image && <span className="text-red-500 text-xs">{errors.image.message?.toString()}</span>}
            </div>

          </div>

          {/* Full Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Address</label>
            <textarea
              rows={3}
              {...register("address", { required: "Address is required" })}
              className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600 resize-none"
              placeholder="Full Address"
            />
            {errors.address && <span className="text-red-500 text-xs">{errors.address.message?.toString()}</span>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              "Add School"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}