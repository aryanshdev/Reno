"use client";

import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AddSchool() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    emailID: "",
    contact: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  // TODO: Move validation logic to a separate utility file for reusability
  const validateForm = () => {
    const newErr = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErr.name = "School name is required";
    if (!formData.emailID.trim()) {
      newErr.emailID = "Email is required";
    } else if (!emailRegex.test(formData.emailID)) {
      newErr.emailID = "Invalid email format";
    }
    if (!formData.contact.trim()) {
      newErr.contact = "Contact is required";
    } else if (formData.contact.length < 10) {
      newErr.contact = "Must be at least 10 digits";
    }
    if (!formData.city.trim()) newErr.city = "City is required";
    if (!formData.state.trim()) newErr.state = "State is required";
    if (!formData.address.trim()) newErr.address = "Address is required";
    if (!imageFile) newErr.image = "School image is required";

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const dataPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        dataPayload.append(key, formData[key]);
      });
      dataPayload.append("image", imageFile);

      const response = await fetch("/api/schools", {
        method: "POST",
        body: dataPayload,
      });

      if (response.ok) {
        toast.success("School Added Successfully!");
        
        setFormData({
          name: "",
          emailID: "",
          contact: "",
          address: "",
          city: "",
          state: "",
        });
        setImageFile(null);
        e.target.reset(); 
      } else {
        toast.error("Failed To Add School. Please Try Again.");
      }
    } catch (error) {
      console.error(error);
      setServerMessage("An Error Occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Add New School</h1>
        <p className="text-gray-400 text-sm">
          Enter the details below to register a new institution in the database.
        </p>
      </div>

      <div className="">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">School Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600"
                placeholder="School Name Here"
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <input
                name="emailID"
                value={formData.emailID}
                onChange={handleChange}
                className="w-full bg-black border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600 bg-zinc-950"
                placeholder="Email ID"
              />
              {errors.emailID && <span className="text-red-500 text-xs">{errors.emailID}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Contact Number</label>
              <input
                type="number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600"
                placeholder="Phone Number"
              />
              {errors.contact && <span className="text-red-500 text-xs">{errors.contact}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600"
                placeholder="City/District"
              />
              {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600"
                placeholder="State"
              />
              {errors.state && <span className="text-red-500 text-xs">{errors.state}</span>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">School Image</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer"
                />
                <div className="absolute right-3 top-3 text-gray-600 pointer-events-none">
                  <Upload size={18} />
                </div>
              </div>
              {errors.image && <span className="text-red-500 text-xs">{errors.image}</span>}
            </div>

          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Address</label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-zinc-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-600 resize-none"
              placeholder="Full Address"
            />
            {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
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

          {/* TODO: Create a dedicated Toast component for notifications */}
          {serverMessage && (
            <p className={`text-center text-sm mt-4 ${serverMessage.includes("success") ? "text-green-500" : "text-red-500"}`}>
              {serverMessage}
            </p>
          )}

        </form>
      </div>
    </div>
  );
}