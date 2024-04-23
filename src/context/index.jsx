import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoritesList,setFavoritesList] = useState([]);
    const navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const res = await fetch(
                `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
            );
            const data = await res.json();
            if (data?.data?.recipes) {
                setRecipeList(data?.data?.recipes);
                setLoading(false);
                setSearchParam("");
                navigate('/')
            }

        } catch (e) {
            console.log(e);
            setLoading(false);
            setSearchParam("");
        }
    }

    function handleAddToFavorites(getCurrentItem){
        console.log(getCurrentItem);
        let cpyFavoritesList = [...favoritesList];
        const index = cpyFavoritesList.findIndex(item=>item.id === getCurrentItem.id);
        if(index === -1){
            cpyFavoritesList.push(getCurrentItem);
        }else{
            cpyFavoritesList.splice(index,1);
        }
        setFavoritesList(cpyFavoritesList);
        
    }
    // console.log(favoritesList, 'FavoritesList');
    return (
        <GlobalContext.Provider value={{ searchParam, loading, recipeList, favoritesList, setSearchParam, handleSubmit, recipeDetailsData, setRecipeDetailsData, handleAddToFavorites }}>{children}</GlobalContext.Provider>
    );
}