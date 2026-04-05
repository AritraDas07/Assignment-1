"use client";
import React from "react";
import { ImGithub } from "react-icons/im";
import { HiLink } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="footer relative z-[2]">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-5">
        <p className="text-secondary text-[15px] font-medium">
          Designed & Built by{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-[#06b6d4] font-bold">
            Himanshu Sangwan
          </span>
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/himanshu8443"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
          >
            <ImGithub size={20} />
          </a>
          <a
            href="https://github.com/himanshu8443"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon"
          >
            <HiLink size={20} />
          </a>
        </div>

        <p className="text-text-muted text-[13px]">
          © 2025 Himanshu Sangwan
        </p>
      </div>
    </footer>
  );
};

export default Footer;
