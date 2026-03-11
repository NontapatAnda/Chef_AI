import { useState } from "react"
import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props) {
    const [message, setMessage] = useState("")

    const downloadRecipe = () => {
        try {
            const element = document.createElement("a")
            const file = new Blob([props.recipe], { type: "text/plain" })
            element.href = URL.createObjectURL(file)
            element.download = `recipe_${Date.now()}.txt`
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
            URL.revokeObjectURL(element.href)
            
            setMessage("✓ Recipe downloaded!")
            setTimeout(() => setMessage(""), 3000)
        } catch (error) {
            setMessage("✗ Download failed")
            setTimeout(() => setMessage(""), 3000)
        }
    }


    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
            <div className="save-recipe-button">
                <button 
                    onClick={downloadRecipe}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    ⬇️ Download Recipe
                </button>
                {message && <span style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>{message}</span>}
            </div>
        </section>
    )
}


    
