import { useState } from "react"

export default function Main() {
    const [ingredient,setIngredient] = useState([])


    const ingredientLists = ingredient.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>


    ))

    function addIngredient(formData){
        const newingredient = formData.get("ingredient")
        setIngredient(prevIngredient => [...prevIngredient,newingredient])

    }

    
    return (
        <main>
            <form action={addIngredient}className="add-ingredient-form">
                <input type="text"
                    placeholder="e.g. Omelette"
                    aria-label="Add Ingredient"
                    name="ingredient"
                 />
                 <button>Add Ingredients</button>
            </form>
            {ingredient.length > 0 ?
          <section>
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientLists}</ul>
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button>Get a recipe</button>
                </div>
            </section> : <h2>No ingredients added yet.</h2>
            }
       
        </main>
    )
}