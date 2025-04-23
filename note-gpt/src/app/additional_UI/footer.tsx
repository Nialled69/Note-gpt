import { Github, Instagram, Linkedin } from "lucide-react";
import { SiLetterboxd, SiDiscord } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="w-full bg-black py-6 mt-12 text-center">
        <div className="flex justify-center gap-8 mb-4">
            <a
            href="https://www.instagram.com/daftendank"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
            >
            <Instagram className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </a>
            <a
            href="https://github.com/Nialled69"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-200"
            >
            <Github className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </a>
            <a
            href="https://www.linkedin.com/in/sarthik-dasgupta-437997339/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
            >
            <Linkedin className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </a>
            <a
            href="https://letterboxd.com/Nialled"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-green-400 transition-colors duration-200"
            >
            <SiLetterboxd className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </a>
            <a
            href="https://discord.com/users/755991299190030340"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-indigo-400 transition-colors duration-200"
            >
            <SiDiscord className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </a>
        </div>
        <p className="text-gray-400 text-sm mt-4 pt-4">Note-GPT © All rights reserved</p>
        </footer>
  );
}
