import React from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="py-6 px-4 border-t">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <Link href="/" className="text-2xl font-bold">
              {"</salt>"}
            </Link>
            <p className="text-sm mt-4 max-w-md">
              School of Applied Technology: Accelerating growth in tech through
              innovative education and talent matching.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link
                href={"https://www.linkedin.com/company/salteurope/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link
                href={"https://www.youtube.com/@School-of-Applied-Technology"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={20} />
              </Link>
              <Link
                href={"https://www.instagram.com/salt_europe/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} />
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Contact Us
            </h3>
            <p className="text-sm mb-2">hello@appliedtechnology.se</p>
            <p className="text-sm mb-4">+46 736 44 41 18</p>
            <Link
              href={"https://maps.app.goo.gl/aN772tg4r67nXxv5A"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-sm">
                Lustgårdsgatan 19, 112 51 Stockholm, Sweden
              </p>
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-4 pt-6 text-sm text-center md:text-left">
          <p>
            © {new Date().getFullYear()} School of Applied Technology, JSFS-STHLM-2024-09-27. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
