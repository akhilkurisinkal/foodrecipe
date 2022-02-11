import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {
  const APP_ID='e1f72714';
  const APP_KEY='1107185880abb32abb5781fc590c1171';

  //state variables
  const [recipes, setRecipes]=useState([]);
  const [search, setSearch]=useState("");
  const [query, setQuery]=useState("Chicken");


//
  useEffect(()=>{
    getRecipes();
  },[query]);

  const updateSearch=e=>{
    setSearch(e.target.value);
  }

  const getSearch=e=>{
    e.preventDefault();
    setQuery(search);
  }
  //fetching recipes from API
  const getRecipes = async ()=>{
    const response =await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-btn">Search</button>
      </form>
      {
        recipes.map(recipe=>(
          <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} />
        ))
      }
    </div>
  );
}

export default App;
