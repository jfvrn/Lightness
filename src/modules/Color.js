import * as convert from "color-convert";

export class Color{
    //propriétés
    #hsl;
    #hex;
    #element;
    
    //constructeur
    constructor(hsl){
        this.#hsl = hsl;
        this.#hex = `#${convert.hsl.hex(hsl)}`
        this.#element = this.#generateElement();
    }

    #generateElement(){

        const textColor = this.#hsl[2] < 60 ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
        
        return `<div class="color" data-color="${this.#hex}" style="background-color: ${this.#hex}">
	    <p style="color: ${textColor}">${this.#hex}</p>
        </div>`;
        
    }

    display(){
        const main = document.querySelector("main"); 
        main.insertAdjacentHTML("afterbegin", this.#element);  
    }

    // #generateElement() {
    //     // Crée un élément <div>
    //     const colorElement = document.createElement("div");
    //     // Lui ajoute une class "color"
    //     colorElement.classList.add("color");
    //     // Ajoute l'attribut de donnée "data-color"
    //     colorElement.dataset.color = this.#hex;
    //     // Change la couleur de fond de l'élément
    //     colorElement.style.backgroundColor = this.#hex;
    
    //     //Crée un élément <p>
    //     const textElement = document.createElement("p");
    //     // Lui ajoute comme texte la valeur hexadécimale
    //     textElement.textContent = this.#hex;
    //     // Change la couleur du texte selon la luminosité de la couleur de fond
    //     textElement.style.color = this.#hsl[2] < 60 ? "#ffffff" : "#000000";
    //     // Ajoute l'élément <p> comme enfant du <div>
    //     colorElement.appendChild(textElement);
    
    //     // Retourne le <div>
    //     return colorElement;
    //   }
    
    //   display(parentElement) {
    //     // Ajoute this.#element comme enfant d'un élément parent passé en argument.
    //     parentElement.appendChild(this.#element);
    //   }
}
