let main = {
	piscines: {
	    "juillet": 'Jul 02, 2018 09:19:00',
		"aout": 'Aug 06, 2018 09:19:00',
	},
	target: "juillet",
	fonction: null
}
function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  return {
    'total': t,
    'days': Math.floor(t / (1000 * 60 * 60 * 24)),
    'hours': Math.floor((t / (1000 * 60 * 60)) % 24),
    'minutes': Math.floor((t / 1000 / 60) % 60),
    'seconds': Math.floor((t / 1000) % 60)
  };
}

let updateClock = () => {
	let t = getTimeRemaining(main.piscines[main.target]);
	$('.days').html(t.days),
	$('.hours').html(('0' + t.hours).slice(-2)),
	$('.minutes').html(('0' + t.minutes).slice(-2)),
	$('.seconds').html(('0' + t.seconds).slice(-2));
	
	t.total === 0 && (clearInterval(main.fonction) && goPool(main.target));
}
let goPool = (piscine) => {
	//faire quelque chose avec piscine si le compteur arrive à 0;
	console.log("C'est la piscine de", piscine);
}
updateClock();
main.fonction = setInterval(() => updateClock(), 100);


$(document).ready(function(){
	$(Object.keys(main.piscines).map(x=>"#" + x).join(", ")).click(function(a){
		let text = $(this).text()
		main.target = text.substr(0, text.indexOf(" ")).replace("û", "u").toLowerCase();
		$("#titlePiscine").html("Piscine de " + main.target + " dans :")
	})
})

var b19 = io.connect("https://b191.herokuapp.com/", {reconnection: !1,transports: ["websocket"]})
b19.on("connecté", ()=>console.log("JPP T CONNECTE AU SERVEUR MON POTE")).on("envoiDonnée", a=>{
	$("#piscines").html(a.dataPiscine.join(" <br> ").replace(new RegExp("[*]", "g"), ""));
	$("#checkins").html(a.dataCheckin.join(" <br> ").replace(new RegExp("[*]", "g"), ""));
}).emit("demandeDonnée");

setInterval(function(){
	b19.emit("demandeDonnée");
}, 60000)