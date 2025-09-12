import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";
import { File } from "../share/svg/howItWorkSvg";

export default function Footer() {
  return (
    <div className="flex flex-col bg-[#181A2F] text-white py-12 md:py-16 lg:py-24">
      {/* Header */}
      <footer className=" ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className=" flex items-center justify-center ">
                 <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
                </div>
                <span className="text-4xl ">Glass File</span>
              </div>
         
            </div>

            {/* User Resources */}
            <div>
              <h2 className="text-lg font-semibold mb-6">User Resources & Guidelines</h2>
              <div className="space-y-2 text-sm">
                <a href="/governance-accountability" className="block text-slate-400 hover:text-white transition-colors">
                  Governance & Accountability
                </a>
                <a href="/governance-charter" className="block text-slate-400 hover:text-white transition-colors">
                  Governance Charter
                </a>
                <a href="/legal-resources" className="block text-slate-400 hover:text-white transition-colors">
                  Legal Resources
                </a>
                <a href="/juror-ethics" className="block text-slate-400 hover:text-white transition-colors">
                  Juror Ethics & Juror Directions
                </a>
                <a href="/juror-pipeline" className="block text-slate-400 hover:text-white transition-colors">
                  Juror Pipeline
                </a>
                <a href="/juror-protocol" className="block text-slate-400 hover:text-white transition-colors">
                  Juror Protocol
                </a>
              </div>
            </div>

            {/* User Support */}
            <div>
              <h2 className="text-lg font-semibold mb-6">User Support & Policies</h2>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-slate-400 hover:text-white transition-colors">
                  FAQ
                </a>
                <a href="/contact" className="block text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </a>
                <a href="/terms" className="block text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="/policy" className="block text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/security" className="block text-slate-400 hover:text-white transition-colors">
                  Security
                </a>
                <a href="/fee-policy" className="block text-slate-400 hover:text-white transition-colors">
                  Fee Policy
                </a>
              </div>
            </div>

            {/* Contact */}
            {/* <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <p>Need help? Get in touch with our support team.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mt-4">
                  Contact Support
                </button>
              </div>
            </div> */}
          </div>

             {/* Bottom Footer */}
          <div className="border-t  border-slate-800 mt-8 pt-8">
            <div className="text-center text-slate-400 text-sm">
              © 2025 Glass File. All rights reserved.
            </div>
          </div>
        </div>
     
      </footer>

    </div>
  );
}
