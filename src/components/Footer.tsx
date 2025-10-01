import React from 'react';
import { Linkedin, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-300 mt-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <div className="flex items-center justify-between mb-8">
          <img src="/alive-logo.png" alt="ALIVE Logo" className="h-20 w-20" />
          <ul className="flex space-x-4">
            <li>
              <a href="#" aria-label="LinkedIn" className="text-gray-800 hover:text-gray-600">
                <Linkedin size={20} />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Facebook" className="text-gray-800 hover:text-gray-600">
                <Facebook size={20} />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Twitter" className="text-gray-800 hover:text-gray-600">
                <Twitter size={20} />
              </a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div>
            <p className="text-gray-700 mb-1 font-medium">
              At Alive Event Management & Catering Group, wespecialize in creating vibrant,
            </p>
            <p className="text-gray-700 mb-1 font-medium">
            memorable events tailored to your vision.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">Information</h3>
            <ul className="space-y-1 text-gray-600">
              <li><a href="#" className="hover:underline">Press Centre</a></li>
              <li><a href="#" className="hover:underline">Our Blog</a></li>
              <li><a href="#" className="hover:underline">Terms and Condition</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">Menu</h3>
            <ul className="space-y-1 text-gray-600">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Services</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-gray-800">Contact</h3>
            <ul className="space-y-1 text-gray-600">
              <li><span className="font-semibold">Phone:</span> +123 456 789</li>
              <li><span className="font-semibold">Email:</span> example@example.com</li>
              <li>Address Line 01</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal links */}
        <div className="border-t border-gray-300 pt-4 mt-6 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 text-xs text-gray-600">
          <span>
            &copy; Cyber.AI - Cyber Punk 2024. All rights reserved.
          </span>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
