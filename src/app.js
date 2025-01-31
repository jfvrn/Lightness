import { Color } from "./modules/Color";
import { generatePalette, hexToCSSHSL } from "./modules/Utils.js";
import * as convert from "color-convert";
import { Notyf } from 'notyf';


// Instancier Notyf
const notyf = new Notyf();

//gestion de l'entrée utilisateur
const form = document.querySelector("form");

//gestion des événements lors de la soumission du formulaire
form.addEventListener("submit", (e) => {
    const notyf = new Notyf();
  e.preventDefault(); // empeche le comportement par défault (refresh la page)
  const hexaColorInput = e.target.firstElementChild.value;

  //try catch cheaté
  try {
    //vérifie que l'input soit bien un code hexa
    if (!/^#[0-9A-F]{6}$/i.test(hexaColorInput)) {
      // si ce n'est pas le cas => lance une erreur
      throw new Error(`${hexaColorInput} is not a valid Hexadecimal color`);
    }
    // Crée la palette à partir du code hexadécimal
    const palette = generatePalette(hexaColorInput);
    displayColors(palette);
    // Affiche dans la console la valeur d'entrée et la palette
    console.log(hexaColorInput, palette);
  } catch (err) {
    notyf.error(err.message);
  }
})

const displayColors = (palette) => {

    document.querySelectorAll("main div").forEach(div => div.remove()); //reset la palette a chaque input

    palette.forEach(color => { 
        new Color([color[0],color[1],color[2]]).display(); //créer un objet color pour chaque couleur de la palette
    });

    //animation de la palette qui monte
    const header = document.querySelector("header");
    header.classList.add("minimized");

    // Crée un tableau avec les index de la palette que nous souhaitons 
	// transformer en hex pour le dégradé. On le map ensuite de telle sorte
	// à recevoir en retour les valeur hex pour chaque couleur de la palette
	// à l'index du tableau de départ. On ajoute également un "#" au début 
	// des chaînes de caractère. 
	const gradientColors = [0, Math.round(palette.length / 2), palette.length - 1].map(
        (index) => `#${convert.hsl.hex(palette[index])}`
      );
        
        // Utilise les valeurs du tableau gradientColors pour modifier 
        // le dégradé. 
        document.body.style.background = `linear-gradient(-45deg, ${gradientColors.join(",")}`;
        
        // Redéfini background-size
        document.body.style.backgroundSize = `400% 400%`;

    // Reçoit l'input du formulaire, et modifie la variable css "--shadow-color"
	// avec ce qui sort de la fonction hexToCSSHSL
	document.documentElement.style.setProperty("--shadow-color", hexToCSSHSL(input));
};

//copie de la couleur dans le presse-papier
const main = document.querySelector("main");

main.addEventListener("click", (e) => {
    if (e.target.classList.contains("color")) {
        const paletteElement = e.target.closest(".color").dataset.color;
        navigator.clipboard.writeText(paletteElement).then(
            function () {
                notyf.success(`copied ${paletteElement} to clipboard`);
            }
          );    
    }
    
})


