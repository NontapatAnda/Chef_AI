import { useState } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromLlama} from "../../ai" 

export default function Main() {
    const [ingredient,setIngredient] = useState([])
    const [recipe,setRecipe] = useState("")



    function addIngredient(formData){
        const newingredient = formData.get("ingredient")
        setIngredient(prevIngredient => [...prevIngredient,newingredient])

    }

    async function getRecipe(){
        const generatedRecipe = await getRecipeFromLlama(ingredient)
        setRecipe(generatedRecipe)
           
        }
    

    
    return (
        <main>
            <form action={addIngredient}className="add-ingredient-form">
                <input type="text"
                    placeholder="e.g. Eggs"
                    aria-label="Add Ingredient"
                    name="ingredient"
                 />
                 <button>Add Ingredient</button>
            </form>
            {ingredient.length > 0 && <IngredientsList ingredient={ingredient} getRecipe={getRecipe}/>}
      
            
            {recipe && <ClaudeRecipe recipe={recipe}/>}
       
        </main>
    )
}