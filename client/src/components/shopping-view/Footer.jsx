import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/assets/logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/shop/home" className="inline-block">
              <Logo />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Redefining performance gear for the next generation. Join the 1M+ users who trust us for their daily grind.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-black transition-all">
                <Facebook size={18} />
              </Link>
              <Link to="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-black transition-all">
                <Instagram size={18} />
              </Link>
              <Link to="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-black transition-all">
                <Twitter size={18} />
              </Link>
              <Link to="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-black transition-all">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Shop</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/shop/productList" className="text-muted-foreground hover:text-primary transition-colors">Smartwatches</Link></li>
              <li><Link to="/shop/productList" className="text-muted-foreground hover:text-primary transition-colors">Wireless Audio</Link></li>
              <li><Link to="/shop/productList" className="text-muted-foreground hover:text-primary transition-colors">Accessories</Link></li>
              <li><Link to="/shop/productList" className="text-muted-foreground hover:text-primary transition-colors">Limited Drops</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Track Your Order</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Return Policy</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Warranty Info</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Join the Force</h4>
            <p className="text-muted-foreground text-sm">Get early access to drops and exclusive offers.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button className="absolute right-2 top-1.5 bg-primary text-black font-bold p-1.5 rounded-full hover:scale-105 transition-transform">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <p>© {currentYear} ALL RIGHTS RESERVED BY YOUR BRAND</p>
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
