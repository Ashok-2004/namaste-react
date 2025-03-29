import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body'

// React Element => object => html(render)
const heading=React.createElement('h1',{id:"heading"},"this is namaste React");
const root=ReactDOM.createRoot(document.getElementById("root"))
root.render(heading)

//JSX-(traspiled before it reaches the JS)-Parcel-Babel
// JSX =>Babel Transpiles it to React.createElement=> ReactElement(Js Object)=>HtmlELement(render)
const jsxHeading=<h1 id="heading" className="heading" tabIndex="5">
    This is namaste React using JSX
    </h1>;

//React Component

// React function component
const Title=() =>(
    <div>
        <h1 id="heading">
            Namaste React using JSX
        </h1>
    </div>
)
const number=1000;
const Heading=()=>(
    <div>
    <Title/>
    <h2>{jsxHeading}</h2>
    <h1 className="heading" id="heading">Namaste React Function Component</h1>
    </div>
)
root .render(<Heading/>);

const Header= ()=>{
    return(
        <div className='header'>
            <div className="logo-container">
                <img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDN051xHnibkrTWV8_-yIxekWpMXfaLFeYPQ&s" />
            </div>
            <div className="nav-Items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}
const Body= ()=>{
    return (
        <div className="body">
            <div className="search">Search</div> 
            <div className="res-container">
                {resList.map(restaurants=><RestrauntCard key={restaurants.info.id} resData={restaurants}/>)}
            </div>
        </div>
    )
}
const Applayout= ()=>{
    return (
        <div className="app">
            <Header/>
            <Body/>
        </div>
    )
}
root.render(<Applayout/>)