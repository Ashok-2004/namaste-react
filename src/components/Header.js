import { LOGO_LINK } from "../utils/constant";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
    const [btnName, setBtnName] = useState("Login");
    const onlineStatus = useOnlineStatus();
    
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img 
                                className="h-14 w-auto" 
                                src={LOGO_LINK} 
                                alt="Swiggy Clone Logo"
                            />
                        </Link>
                    </div>
                    
                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <div className="flex items-center px-3 py-1 rounded-full bg-gray-100">
                            <span className="mr-2 text-sm font-medium text-gray-700">Status:</span>
                            {onlineStatus ? (
                                <span className="flex items-center text-green-600">
                                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                                    Online
                                </span>
                            ) : (
                                <span className="flex items-center text-red-600">
                                    <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                                    Offline
                                </span>
                            )}
                        </div>
                        
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/grocery">Grocery</NavLink>
                        <NavLink to="/about">About Us</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                    </nav>
                    
                    {/* Right buttons */}
                    <div className="flex items-center space-x-4">
                        <Link to="/cart" className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="absolute top-0 right-0 h-5 w-5 text-xs flex items-center justify-center bg-pink-500 text-white rounded-full">0</span>
                        </Link>
                        
                        <button 
                            className="px-4 py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                            onClick={() => { 
                                btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                            }}
                        >
                            {btnName}
                        </button>
                    </div>
                    
                    {/* Mobile menu button - hidden on desktop */}
                    <div className="md:hidden flex items-center">
                        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Helper component for navigation links
const NavLink = ({ to, children }) => {
    return (
        <Link 
            to={to} 
            className="text-gray-700 hover:text-pink-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
            {children}
        </Link>
    );
};

export default Header;