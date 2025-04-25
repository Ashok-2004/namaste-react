import { Component } from "react";
import { Link } from "react-router-dom";
import User from "./User";
import Userf from "./Userf";

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamMembers: [
                { id: 1, name: "Akshay Saini", role: "Founder & CEO", location: "Himachal Pradesh" },            ]
        };
        console.log("parent constructor");
    }

    componentDidMount() {
        console.log("parent component Did Mount");
    }

    render() {
        console.log("parent render");
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        <span className="block">About Us</span>
                        <span className="block text-pink-500">Our Story & Mission</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Bringing the best food from your favorite restaurants directly to your doorstep.
                    </p>
                </div>

                {/* Mission Statement */}
                <div className="bg-pink-50 rounded-xl shadow-sm p-8 mb-16">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed">
                                We're on a mission to transform the way people experience food delivery. 
                                By connecting food lovers with the best restaurants in their city, 
                                we aim to make ordering food as seamless and enjoyable as possible.
                            </p>
                            <p className="text-gray-600 leading-relaxed mt-4">
                                Whether you're craving a late-night snack, organizing a family dinner, 
                                or planning office meals, our platform provides you with countless options 
                                to satisfy any craving.
                            </p>
                        </div>
                        <div className="mt-8 md:mt-0 md:w-2/5">
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                                <div className="bg-pink-200 h-64 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <User name="Akshay Saini"location="Himachal Pradesh" />
                                <Userf name="Ashok"location="Himachal Pradesh"/>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gray-50 rounded-xl shadow-sm p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Get In Touch</h2>
                    <div className="text-center max-w-2xl mx-auto">
                        <p className="text-gray-600 mb-6">
                            Have questions or feedback? We'd love to hear from you!
                        </p>
                        <Link 
                            to="/contact" 
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;