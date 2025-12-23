"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Clock,
  Flame,
  Calendar,
  DollarSign,
  Crown,
  CheckCircle,
  Upload,
  User,
} from "lucide-react";
import Image from "next/image";
import {
  useMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/featured/auth/authApi";
import ProfileIcon from "./ProfileIcon";
import { getImageUrl } from "../share/imageUrl";
import { toast } from "sonner";
import Spinner from "../../app/(commonLayout)/Spinner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import { MdEmail, MdPeople, MdPhone, MdHome, MdCake } from "react-icons/md";
import { FaTransgender } from "react-icons/fa";

export default function ProfileDashboardComponents() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { data: userData, isLoading, refetch } = useMyProfileQuery();
  const [updateProfile, { isLoading: updating }] = useUpdateProfileMutation();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    birthDate: "",
  });
  const [phoneError, setPhoneError] = useState("");
  console.log(userData);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        middleName: userData.middleName || "",
        lastName: userData.lastName || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
        gender: userData.gender || "",
        birthDate: userData.birthDate ? userData.birthDate.split("T")[0] : "",
      });
      setImagePreview(getImageUrl(userData?.profile));
    }
  }, [userData]);

  useEffect(() => {
    if (!imageFile) return;

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value || "" });

    // Validate phone number
    if (value) {
      if (!isValidPhoneNumber(value)) {
        setPhoneError("Invalid phone number for selected country");
      } else {
        setPhoneError("");
      }
    } else {
      setPhoneError("");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone before submitting
    if (formData.phone && !isValidPhoneNumber(formData.phone)) {
      setPhoneError(
        "Please enter a valid phone number for the selected country"
      );
      return;
    }

    try {
      // Create FormData and append all fields separately
      const formDataToSend = new FormData();
      formDataToSend.append("firstName", formData.firstName || "");
      formDataToSend.append("middleName", formData.middleName || "");
      formDataToSend.append("lastName", formData.lastName || "");
      formDataToSend.append("email", formData.email || "");
      formDataToSend.append("address", formData.address || "");
      formDataToSend.append("phone", formData.phone || "");
      formDataToSend.append("gender", formData.gender || "");
      formDataToSend.append("birthDate", formData.birthDate || "");

      // Append image file if available
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      // Send data to API
      const response = await updateProfile({ data: formDataToSend }).unwrap();

      if (response.success) {
        toast.success("Profile updated successfully!");

        if (response.token) {
          localStorage.setItem("accessToken", response.token);
        }

        refetch(); // Refresh data
        setOpen(false);
        setImageFile(null); // Reset image
      } else {
        toast.error(response.toast || "Failed to update profile!");
      }
    } catch (error) {
      toast.error(
        error.data?.toast || "An error occurred while updating the profile"
      );
    }
  };

  if (isLoading) return <Spinner />;

  // Concatenate full name
  const fullName = [
    userData?.firstName,
    userData?.middleName,
    userData?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  // Format birth date
  const formattedBirthDate = userData?.birthDate
    ? new Date(userData.birthDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-xl border border-gray-200 shadow-sm  my-10">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 relative">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <ProfileIcon
              image={userData?.profile}
              size={112} /* 28*4 */
              showBorder={true}
              borderColor="border-white"
              className="shadow-md"
            />
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="py-6">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg rounded-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gray-800">
                Edit Profile
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex flex-col items-center">
                <label
                  htmlFor="image-upload"
                  className="relative cursor-pointer group"
                >
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Profile Preview"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <Upload size={24} className="mb-2" />
                        <span className="text-sm">Upload Image</span>
                      </div>
                    )}
                  </div>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Click to upload profile picture
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Middle Name
                  </label>
                  <Input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="py-3  cursor-not-allowed"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="US"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className={`w-full border py-3 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                      phoneError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {phoneError && (
                    <p className="text-sm text-red-500 mt-1">{phoneError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md py-3 px-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Birth Date
                  </label>
                  <Input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    className="py-3"
                  />
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-200"
                disabled={updating || (formData.phone && phoneError)}
              >
                {updating ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="">
            <div className="flex items-center gap-3 ">
              <div className="text-red-500">
                <MdPeople size={24} />
              </div>
              <h3 className="font-medium text-gray-700">Name</h3>
            </div>
            <p className="text-xl font-bold mt-4 text-gray-800">
              {fullName || "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="">
            <div className="flex items-center gap-3 ">
              <div className="text-red-500">
                <MdEmail size={24} />
              </div>
              <h3 className="font-medium text-gray-700">Email</h3>
            </div>
            <p className="text-xl font-bold mt-4 text-gray-800 break-all">
              {userData?.email || "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-red-500">
                <MdPhone size={24} />
              </div>
              <h3 className="font-medium text-gray-700">Phone</h3>
            </div>
            <p className="text-xl font-bold mt-4 text-gray-800">
              {userData?.phone || "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-red-500">
                <MdHome size={24} />
              </div>
              <h3 className="font-medium text-gray-700">Address</h3>
            </div>
            <p className="text-xl font-bold mt-4 text-gray-800">
              {userData?.address || "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-red-500">
                <FaTransgender size={24} />
              </div>
              <h3 className="font-medium text-gray-700">Gender</h3>
            </div>
            <p className="text-xl font-bold mt-4 text-gray-800 capitalize">
              {userData?.gender || "N/A"}
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-red-500">
                <MdCake size={24} />
              </div>
              <h3 className="font-medium text-gray-700">Birth Date</h3>
            </div>
            <p className="text-xl font-bold mt-4 text-gray-800">
              {formattedBirthDate}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}