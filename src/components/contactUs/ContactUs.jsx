"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactUsMutation } from "@/redux/featured/contact/contactUsApi";
import { useRouter } from "next/navigation";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [contactUs, { isLoading }] = useContactUsMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      const result = await contactUs(payload).unwrap();
      toast.success("Message sent successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact Us Error:", error);
      toast.error(
        error?.data?.errorMessages[0].message || "Failed to send message."
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4  text-center min-h-[80vh] flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
        {/* Left Column - Form */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Input
                name="firstName"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="h-12 px-4 w-full lg:w-[300px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Input
                name="lastName"
                placeholder="Last Name*"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="h-12 px-4 w-full lg:w-[300px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Input
                name="email"
                type="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 px-4 w-full lg:w-[300px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Input
                name="phone"
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="h-12 px-4 w-full lg:w-[300px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <Textarea
              name="message"
              placeholder="Message must be at least 10 characters long"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="px-4 py-3 w-full lg:w-[300px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full h-12  transition-colors duration-200"
            >
              {isLoading ? "Sending..." : "Submit"}
            </Button>
          </div>
        </div>

        {/* Right Column - Contact Details */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Contact details
          </h2>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start space-x-3">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Address</h3>
                <p className="text-gray-600">
                  FOR SERVICE OF PROCESS ONLY:
                  <br />
                  ATTN: NORTHWEST REGISTERED AGENT LLC
                  <br />
                  4539 N 22ND ST; STE N<br />
                  PHOENIX, AZ 85016
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
