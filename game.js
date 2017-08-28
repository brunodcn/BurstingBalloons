var timerId = null; //variable that will store the function Timeout call

function startingGame(){
	var url = window.location.search;
	
	var level_of_the_game = url.replace("?","");
	
	var time_seconds = 0;

	if(level_of_the_game == 1){   //1 easy -> 120 seconds
		time_seconds = 120;
}

	if(level_of_the_game == 2){   //2 normal -> 60 seconds
		time_seconds = 60;
}

	if(level_of_the_game == 3){   //3 hard -> 30 seconds
		time_seconds = 30;
}

//Inserting time into span
	document.getElementById('chrono').innerHTML = time_seconds;

	var qnt_balloons = 30;

	create_balloons(qnt_balloons);

	//Printing quantity of balloons
	document.getElementById('new_balloon').innerHTML = qnt_balloons;

	document.getElementById('bursted_balloon').innerHTML = 0;

	counting_time(time_seconds + 1);
}

function counting_time(seconds){

	seconds = seconds - 1;

	if (seconds == -1) {
		clearTimeout (timerId);
		game_over();
		return false;  //Stops the execution of the function setTimeout
	}

	document.getElementById('chrono').innerHTML = seconds;

	timerId = setTimeout("counting_time("+seconds+")", 1000); //Jquery function
}

function game_over(){

	alert("Sorry, you were not able to burst all the balloons.")
}

function create_balloons(qnt_balloons){

	for(var i = 1; i <= qnt_balloons; i++){

		var balloon = document.createElement("img");
		balloon.src = 'imagens/balao_azul_pequeno.png';
		balloon.style.margin = '12px';
		balloon.id = 'b' + i;
		balloon.onclick = function(){burst (this);};

		document.getElementById('scenario').appendChild(balloon);
		//appendChild will not fulfill the div, it will create img as a child of it
	}
}

function burst(e){
	var id_balloon = e.id;

	document.getElementById(id_balloon).setAttribute("onclick","");
	document.getElementById(id_balloon).src = "imagens/balao_azul_pequeno_estourado.png";

	points(-1);
}

function points(action){
	
	var new_balloon = document.getElementById("new_balloon").innerHTML;

	var bursted_balloon = document.getElementById("bursted_balloon").innerHTML;

	new_balloon = parseInt(new_balloon);

	bursted_balloon = parseInt(bursted_balloon);

	new_balloon = new_balloon + action;

	bursted_balloon = bursted_balloon - action;

	document.getElementById('new_balloon').innerHTML = new_balloon;

	document.getElementById('bursted_balloon').innerHTML = bursted_balloon;

	game_situation(new_balloon);

}

function game_situation(new_balloon){
	if (new_balloon == 0) {
		alert('NICE! You did it!');
		stop_game();
	}
}

function stop_game(){
	clearTimeout(timerId);
	}

