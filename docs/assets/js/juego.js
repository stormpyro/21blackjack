/* Función flecha anónima autoinvocada
	(()=>{
		Quiere decir que ni bien se abra mi programa se va ejecutar esta función anónima. Pero las varibles o funciones creadas
		no podrán ser accesibles una vez se haya terminado de ejecutar la función anónima autoinvocada. Todo se guarda en memoria
		pero no podrá ser accesible para el usuario final. A esto se le llama PATRÓN DISEÑO.
	})();
	Tratar de reducir el codigo, darse cuenta en los returns de las funciones. Regresamos valores demas:
	()=>{
		let regreso = 0;//Mala practica, más peso del archivo
		return regreso;
	}
	()=>{
		return 0; // Es mejor este, menos peso del archivo
	}

	const cte1 = 3;
	const cte2 = 2;
	const cte3 = 3;//Asi no, mala practica

	const cte1 = 3,
			cte2 = 2;
			ct3 = 3; // Asi si, buena practica y ademas reduce el peso de tu archivo.
*/

(() => {
	"use strict";
	/* 
    2C = Clubs ( Tréboles )
    2D = Diamonds
    2H = Hearts
    2S = Spades

*/

	let deck = [];
	const symbols = ["C", "D", "H", "S"],
		especials = ["A", "J", "Q", "K"];

	//Puntajes
	let puntosJugador = 0,
		puntosComputadora = 0;

	// Referencias HTML
	const imgJugador = document.querySelector("#jugador-cartas"),
		imgComputadora = document.querySelector("#computadora-cartas"),
		imagen = () => document.createElement("img"),
		btnPedir = document.querySelector("#pedirCarta"),
		btnNuevo = document.querySelector("#nuevoJuego"),
		btnDetener = document.querySelector("#detenerJuego");

	//Indicadores small html
	let puntosHTMl = document.querySelectorAll("small");

	const iniciarJuego = () => {
		deck = crearDeck();
	};

	const crearDeck = () => {
		deck = [];
		// deck = [2C...10C,2D,...10S];
		for (let i = 2; i <= 10; i++) {
			for (let symbol of symbols) {
				deck.push(`${i}${symbol}`);
			}
		}

		// deck = [2C...10C,2D,...10S,AC,...KC,AD,...KS];
		for (let esp of especials) {
			for (let symbol of symbols) {
				deck.push(`${esp}${symbol}`);
			}
		}

		// deck shuffle osea mezclado aleatoriamente gracias a underscore.js
		return _.shuffle(deck);
	};

	const pedirCarta = () => {
		// Que pasa si llega a 0 la cantidad de cartas en el deck.
		if (deck.length === 0) throw "Ya no hay más cartas en el deck";

		return deck.pop();
	};

	const valorCarta = (carta) => {
		let valor = carta.substring(0, carta.length - 1);
		valor = isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;

		return valor;
	};

	// let carta = pedirCarta(); //pedirCarta() me retorna la carta en string
	// console.log(valorCarta(carta)); //Obtiene el valor y lo retorna en number.

	/* DOM
Diferencia entre innerText e innerHTML(NO SON METODOS SON PROPIEDADES):
    innerText -> inserta solo texto directamente en el elemento.
    innerHTML -> inserta solo codigo HTML directamente.
Es mejor usar el querySelector y el querySelectorAll:
    document.querySelector('#unId');
    document.querySelector('.la1eraClase');
    document.querySelectorAll('.todasLasClases');
Cuando se usa createElement solo se crea en memoria pero para agregarlo al html debe usarse append.
    let btn = document.createElement('button');
    document.body.append( btn );
Para agregar una clase se usa classList.add:
    btn.classList.add('submit-btn');
*/

	// Listeners botones

	const evaluacionFinal = () => {
		(puntosJugador > puntosComputadora && puntosJugador < 21) ||
		puntosComputadora > 21
			? () => {
					btnPedir.disabled = true;
					btnDetener.disabled = true;
					setTimeout(() => {
						alert("Que suerte tienes mijo! Ganaste!");
					}, 150);
			  }
			: (puntosComputadora > puntosJugador && puntosComputadora < 21) ||
			  puntosJugador > 21
			? () => {
					btnPedir.disabled = true;
					btnDetener.disabled = true;
					setTimeout(() => {
						alert("Que mala suerte! Perdiste, cua cua!");
					}, 150);
			  }
			: "";
	};
	const turnoComputadora = (puntosMinimos) => {
		do {
			const carta = pedirCarta();
			puntosComputadora = puntosComputadora + valorCarta(carta);
			puntosHTMl[1].innerText = puntosComputadora;
			let img = imagen();
			img.classList.add("carta");
			img.src = `assets/cartas/${carta}.png`;
			img.alt = "cartaComputadora";
			imgComputadora.append(img);

			if (puntosMinimos > 21) break;

			if (puntosComputadora > 21) {
				console.warn("Ganaste el juego, Felicidades!");
				btnPedir.disabled = true;
				btnDetener.disabled = true;
				setTimeout(() => {
					alert("Ganaste el juego, Felicidades!");
				}, 150);
			} else if (puntosComputadora === 21 && puntosJugador !== 21) {
				console.warn("Perdise el juego, intenta nuevamente!");
				btnPedir.disabled = true;
				btnDetener.disabled = true;
				setTimeout(() => {
					alert("Perdise el juego, intenta nuevamente!");
				}, 150);
			} else if (puntosComputadora === puntosJugador) {
				console.warn("Empate! Revancha?");
				btnPedir.disabled = true;
				btnDetener.disabled = true;
				setTimeout(() => {
					alert("Empate! Revancha?");
				}, 150);
			}
		} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
	};

	btnPedir.addEventListener("click", () => {
		const carta = pedirCarta();
		puntosJugador = puntosJugador + valorCarta(carta);
		puntosHTMl[0].innerText = puntosJugador;
		let img = imagen();
		img.classList.add("carta");
		img.src = `assets/cartas/${carta}.png`;
		img.alt = "carta";
		imgJugador.append(img);

		evaluacionFinal();
		if (puntosJugador > 21) {
			setTimeout(() => {
				alert("Perdiste! Ala k Sad :(");
			}, 150);
			turnoComputadora(puntosJugador);
			console.warn("Perdiste! Ala k Sad :(");
			btnPedir.disabled = true;
			btnDetener.disabled = true;
		}

		if (puntosJugador === 21) {
			console.warn("Ganaste :) AEA!");
			btnPedir.disabled = true;
			btnDetener.disabled = true;
			setTimeout(() => {
				alert("Ganaste :) AEA!");
			}, 150);
			turnoComputadora(puntosJugador);
		}

		console.log(puntosJugador);

		//<img class="carta" src="assets/cartas/10D.png" alt="carta">
	});

	btnDetener.addEventListener("click", () => {
		btnDetener.disabled = true;
		btnPedir.diabled = true;
		turnoComputadora(puntosJugador);
		evaluacionFinal();
	});

	btnNuevo.addEventListener("click", () => {
		console.clear();
		iniciarJuego();
		btnDetener.disabled = false;
		btnPedir.disabled = false;
		puntosJugador = 0;
		puntosComputadora = 0;
		puntosHTMl[0].innerText = 0;
		puntosHTMl[1].innerText = 0;

		/* 	
	Otra forma de eliminar las cartas

	const cartasJugador = imgJugador.querySelectorAll(".carta");
	const cartasComputadora = imgComputadora.querySelectorAll(".carta");

	for (const carta of cartasJugador) {
		imgJugador.removeChild(carta);
	}
	for (const carta of cartasComputadora) {
		imgComputadora.removeChild(carta);
	} */

		imgJugador.innerHTML = "";
		imgComputadora.innerHTML = "";
	});
})();
