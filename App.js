// Nested div and heading 
const parent=React.createElement("div",{id:"parent"},React.createElement("div",{id:"child"},React.createElement("h1",{},"This is the Heading")));
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
//simple div 
const heading=React.createElement("h1",{id:"heading"},"Hello World");
console.log(heading);
root.render(heading);
// Nested with sibling
const parent1=React.createElement("div",{id:"parent"},React.createElement("div",{id:"child"}
,[React.createElement("h1",{},"This is the h1 Heading"),React.createElement("h2",{},"This is the h2 Heading")]));
const root1=ReactDOM.createRoot(document.getElementById("root"));
root.render(parent1);
//Nested div 
const parent2=React.createElement("div",{id:"parent"},[React.createElement("div",{id:"child1"}
    ,[React.createElement("h1",{},"This is the h1 Heading"),React.createElement("h2",{},"This is the h2 Heading")]),
    React.createElement("div",{id:"child2"}
    ,[React.createElement("h1",{},"This is the h1 Heading"),React.createElement("h2",{},"This is the h2 Heading")])]);
    root.render(parent2);