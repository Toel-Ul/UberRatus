$(document).ready (function () {
	let ec = $("select[name=etatcivil]");
	let n = $("input[name=nom]");
	let p = $("input[name=prénom]");
	let nC = $("input[name=complet]");
	let niveau = $("input[name=niveau]");
	let lvl = $("output[name=lvl]");
	let check = $("input[name=affiche]");
	let total = 0;
	ec.change(function(){
		nC.val(ec.val() + " " + p.val() + " " + n.val());
	});

	n.keyup(function(){
		nC.val(ec.val() + " " + p.val() + " " + n.val());
	});

	p.keyup(function(){
		nC.val(ec.val() + " " + p.val() + " " + n.val());
	});

	niveau.mousemove(function(){
		lvl.val(niveau.val());
	});

	check.change(function(){
		if(check.prop("checked")){
			$("input[name=mdp]").attr('type','text');
			$("input[name=mdp2]").attr('type','text');
		}
		else{
			$("input[name=mdp]").attr('type','password');
			$("input[name=mdp2]").attr('type','password');
		}
	});
	function sauce(nom_plat,sauceListe){
		let entrees = document.getElementById("div_"+nom_plat);
		let cesar = $("input[name="+nom_plat+"]");
		let sauce = document.createElement("select");
		sauce.id = nom_plat+"_mySauce";
		for(var i = 0;i< sauceListe.length;i++){
			var option = document.createElement("option");
			option.value = sauceListe[i];
			option.text = sauceListe[i];
			sauce.appendChild(option);
		}
		
		cesar.change(function(){
			if(cesar.prop("checked")){
				entrees.append(sauce);
				update_price(true,nom_plat);
			}
			else{
				sauce.remove();
				update_price(false,nom_plat);
			}
		});
	}
	function quantite(nom_plat){
		let plat = document.getElementById("div_"+nom_plat);
		let commande=$("input[name"+nom_plat+"]");
		let quantite= document.createElement("number");
		quantite.id=nom_plat+"_quantite";
		quantite.min=1;
		quantite.max=10;
		commande.change(function (){
			if(commande.prop("checked")){
				plat.append(quantite);
			}
			else{
				plat.remove(quantite);
			}
		});

	}

	function update_price(flag,nom_plat){
		let price = document.getElementById("price_"+nom_plat);
		if(flag){
			total += parseInt(price.textContent);
		}
		else{
			total -= parseInt(price.textContent);
		}
		let prix = document.getElementById("prix_total");
		prix.textContent = "Total : " + total + " $."
	}
	let sauceListe = ["Ketchup","Mayo","Huile d'olive","Vinaigrette"];
	let ingredients = ["Thon","Anchois","Jambon","Pepperoni","Boeuf",
		"Mozzarella","Bleu d'Auvergne","Emmental","Chèvre",
	"Artichaut","Aubergine","Olive","Poivron"];
	sauce("cesar",["Huile d'olive","Vinaigrette"]);
	sauce("wings",["Ketchup","Mayo"]);
	sauce("charcut",["Moutarde Forte","Moutarde Douce"]);
	sauce("ingredient1",ingredients);
	sauce("ingredient2",ingredients);
	sauce("ingredient3",ingredients);
	sauce("supplement1",ingredients);
	sauce("supplement2",ingredients);
	sauce("supplement3",ingredients);

	quantite("cesar");
	quantite("wings");
	quantite("charcut");
	
	
    

});