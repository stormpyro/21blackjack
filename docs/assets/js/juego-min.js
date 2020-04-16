(() => {
	"use strict";
	let e = [];
	const t = ["C", "D", "H", "S"],
		a = ["A", "J", "Q", "K"];
	let s = 0,
		n = 0;
	const l = document.querySelector("#jugador-cartas"),
		r = document.querySelector("#computadora-cartas"),
		d = () => document.createElement("img"),
		o = document.querySelector("#pedirCarta"),
		c = document.querySelector("#nuevoJuego"),
		i = document.querySelector("#detenerJuego");
	let u = document.querySelectorAll("small");
	const m = () => {
			e = [];
			for (let a = 2; a <= 10; a++) for (let s of t) e.push(`${a}${s}`);
			for (let s of a) for (let a of t) e.push(`${s}${a}`);
			return _.shuffle(e);
		},
		b = () => {
			if (0 === e.length) throw "Ya no hay más cartas en el deck";
			return e.pop();
		},
		p = (e) => {
			let t = e.substring(0, e.length - 1);
			return (t = isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t);
		},
		g = (e) => {
			do {
				const t = b();
				(n += p(t)), (u[1].innerText = n);
				let a = d();
				if (
					(a.classList.add("carta"),
					(a.src = `assets/cartas/${t}.png`),
					(a.alt = "cartaComputadora"),
					r.append(a),
					e > 21)
				)
					break;
				n > 21
					? (console.warn("Ganaste el juego, Felicidades!"),
					  (o.disabled = !0),
					  (i.disabled = !0),
					  setTimeout(() => {
							alert("Ganaste el juego, Felicidades!");
					  }, 150))
					: 21 === n && 21 !== s
					? (console.warn("Perdise el juego, intenta nuevamente!"),
					  (o.disabled = !0),
					  (i.disabled = !0),
					  setTimeout(() => {
							alert("Perdise el juego, intenta nuevamente!");
					  }, 150))
					: n === s &&
					  (console.warn("Empate! Revancha?"),
					  (o.disabled = !0),
					  (i.disabled = !0),
					  setTimeout(() => {
							alert("Empate! Revancha?");
					  }, 150));
			} while (n < e && e <= 21);
		};
	o.addEventListener("click", () => {
		const e = b();
		(s += p(e)), (u[0].innerText = s);
		let t = d();
		t.classList.add("carta"),
			(t.src = `assets/cartas/${e}.png`),
			(t.alt = "carta"),
			l.append(t),
			s > 21 &&
				(setTimeout(() => {
					alert("Perdiste! Ala k Sad :(");
				}, 150),
				g(s),
				console.warn("Perdiste! Ala k Sad :("),
				(o.disabled = !0),
				(i.disabled = !0)),
			21 === s &&
				(console.warn("Ganaste :) AEA!"),
				(o.disabled = !0),
				(i.disabled = !0),
				setTimeout(() => {
					alert("Ganaste :) AEA!");
				}, 150),
				g(s)),
			console.log(s);
	}),
		i.addEventListener("click", () => {
			(i.disabled = !0), (o.diabled = !0), g(s);
		}),
		c.addEventListener("click", () => {
			console.clear(),
				(e = m()),
				(i.disabled = !1),
				(o.disabled = !1),
				(s = 0),
				(n = 0),
				(u[0].innerText = 0),
				(u[1].innerText = 0),
				(l.innerHTML = ""),
				(r.innerHTML = "");
		});
})();
