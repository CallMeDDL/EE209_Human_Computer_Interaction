var select = document.getElementById("inputGroupSelect");
var edgeimg = document.getElementById("edgeimg");
var resimg = document.getElementById("resimg");
var progress = document.getElementById("progressbtn");


document.getElementById("stop").onclick = function(){
	document.getElementById("resimg-box").style.visibility = "hidden";
	progress.style.width = "0%";
}

document.getElementById("run").onclick = function(){
	setTimeout(function(){
		progress.style.width = "20%";
		setTimeout(function(){
			progress.style.width = "50%";
			setTimeout(function(){
				progress.style.width = "80%";
				setTimeout(function(){
					progress.style.width = "100%";
					setTimeout(function(){
						document.getElementById("resimg-box1").style.visibility = "visible";
						document.getElementById("resimg-box2").style.visibility = "visible";
					}, Math.floor(Math.random() * Math.floor(500) + 800));
				}, Math.floor(Math.random() * Math.floor(500) + 800));
			}, Math.floor(Math.random() * Math.floor(500) + 800));
		}, Math.floor(Math.random() * Math.floor(500) + 800));
	}, Math.floor(Math.random() * Math.floor(500) + 800));

}
select.onchange = function(){
	if (select.options[select.selectedIndex].value == 1){
		edgeimg.src = "img/test/sample_1_line.jpg";
		resimg.src = "img/test/sample_1.jpg";
		document.getElementById("resimg-box").style.visibility = "hidden";
		progress.style.width = "0%";
	}
	else if (select.options[select.selectedIndex].value == 2){
		edgeimg.src = "img/test/sample_2_line.jpg";
		resimg.src = "img/test/sample_2.jpg";
		document.getElementById("resimg-box").style.visibility = "hidden";
		progress.style.width = "0%";
	}
	else if (select.options[select.selectedIndex].value == 3){
		edgeimg.src = "img/test/sample_3_line.jpg";
		resimg.src = "img/test/sample_3.jpg";
		document.getElementById("resimg-box").style.visibility = "hidden";
		progress.style.width = "0%";
	}
	else if (select.options[select.selectedIndex].value == 4){
		edgeimg.src = "img/test/sample_4_line.jpg";
		resimg.src = "img/test/sample_4.jpg";
		document.getElementById("resimg-box").style.visibility = "hidden";
		progress.style.width = "0%";
	}
	else if (select.options[select.selectedIndex].value == 5){
		edgeimg.src = "img/test/sample_5_line.jpg";
		resimg.src = "img/test/sample_5.jpg";
		document.getElementById("resimg-box").style.visibility = "hidden";
		progress.style.width = "0%";
	}

}
