import { useContext } from "react";
import RecipeItem from "../../components/receipe-item";
import { GlobalContext } from "../../context";

export default function Favourites(){
    const {favoritesList} = useContext(GlobalContext);
    
    return (
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
            {favoritesList && favoritesList.length>0 
                ? favoritesList.map((item)=><RecipeItem key={item.id} item={item} />)
                : <div>
                    <p className="lg:text-4xl text-xl text-center text-black font-extrabold">Nothing is added in favorites.</p>
                </div>
        }
        </div>
    );
}