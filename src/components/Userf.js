import { Component } from "react";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                name: "Dummy",
                location: "Default",
                avatar_url: ""
            }
        };
        console.log("User child constructor");
    }

    async componentDidMount() {
        console.log("User child component Did Mount");
        
        try {
            const data = await fetch("https://api.github.com/users/Ashok-2004");
            const json = await data.json();
            
            this.setState({
                userInfo: json
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    componentDidUpdate() {
        console.log("User component Did Update");
    }

    componentWillUnmount() {
        console.log("User component Will Unmount");
    }

    render() {
        console.log("User child render");
        const { name, location } = this.props;
        const { userInfo } = this.state;

        return (
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col items-center">
                    {userInfo.avatar_url && (
                        <div className="mb-4">
                            <img 
                                src={userInfo.avatar_url} 
                                alt={`${userInfo.name}'s avatar`}
                                className="w-32 h-32 rounded-full border-4 border-pink-500 object-cover"
                            />
                        </div>
                    )}
                    <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                    <div className="flex items-center text-gray-600 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{location}</span>
                    </div>
                    
                    <div className="mt-4 text-center">
                        <p className="text-gray-700">GitHub: {userInfo.name}</p>
                        {userInfo.bio && <p className="text-gray-600 mt-2">{userInfo.bio}</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default User;