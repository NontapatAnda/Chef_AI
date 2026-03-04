import { useState } from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"

export default function Main() {
    const [ingredient,setIngredient] = useState(["all the main spices", "pasta", "ground beef", "tomato paste"])
    const [recipeShown,setRecipe] = useState(false)



    function addIngredient(formData){
        const newingredient = formData.get("ingredient")
        setIngredient(prevIngredient => [...prevIngredient,newingredient])

    }

    function toggleRecipe(){
        setRecipe(prev => !prev)
    }

    
    return (
        <main>
            <form action={addIngredient}className="add-ingredient-form">
                <input type="text"
                    placeholder="e.g. Omelette"
                    aria-label="Add Ingredient"
                    name="ingredient"
                 />
                 <button>Add Ingredient</button>
            </form>
            {ingredient.length > 0 && <IngredientsList ingredient={ingredient} toggleRecipe={toggleRecipe}/>}
      
            
            {recipeShown && <ClaudeRecipe />}
       
        </main>
    )
}