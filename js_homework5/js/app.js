var newP = document.createElement('div');//создаем блок для новой новости
var newsBlock = document.querySelector(".news1"); //выбираем блок новостей
var allNewsAdress = "https://cors-anywhere.herokuapp.com/babruysk.by/ajax_php/news-api.php";
var oneNewsAdress = "https://cors-anywhere.herokuapp.com/http://babruysk.by/ajax_php/news-item-api.php?id=";

//при клике на =заголовок "Свежие новости" запускается AJAX запрос
var a = document.querySelector(".event-listener");// выбираем второй заголовок
a.addEventListener("click", newsListLoader, false);

// вытягиваем id по клику на объект
function onArticleTitleClick(id){ // функция нажатия на элементы новостного блока
	window.valueId = id;// делаем переменную глобальной
	// запрос для вывода подробной новости
	// var newsBlock = document.querySelector(".added-news"); //выбираем блок новостей
	var checkedNews = new XMLHttpRequest(); // начало AJAX запроса #2
	checkedNews.open("GET", oneNewsAdress + valueId); // адрес для получения новостей 
	checkedNews.onreadystatechange = function(){
		if(checkedNews.readyState === 4){ // проверка статуса
			if(checkedNews.status === 200){ 
			}else{
				alert('Error: '+checkedNews.status); 
			}
		}
	}
	checkedNews.onerror = function() {
		alert('Error: '+checkedNews.status); 
	}
	checkedNews.onloadstart = function() {
		newsBlock.innerHTML = "Загрузка..."; // удаление содержимого новостей
	}
	checkedNews.onload = function() {
		var newP = null; // переопределяем
		var newP = document.createElement('div');//создаем блок для новой новости
		newsBlock.innerHTML = "Данные запроса:"; // удаление содержимого новостей
		newsBlock.appendChild(newP);// вставляем ее после новостного блока, где написано "Загрузка..."
		var jsonNews = checkedNews.responseText;
		console.log(jsonNews); // проверяем что получаем
		if (jsonNews !== Object)
		try {
			var jsonObjNews = JSON.parse(jsonNews); // создаем пересенную объекта, полученную из JSON
		}
		catch (jsonNews){
			alert("Получен объект!");
		}
		history.pushState(null, null, "#news/" + valueId); // изменяем адрес
		newP.innerHTML = tmpl("newsTmpl", jsonObjNews);

		var p = document.querySelector(".event-listener2");// выбираем второй заголовок
		p.addEventListener("click", newsListLoader, false);
	}
checkedNews.send(null);
window.scrollBy(0,-9999);
}

// работа с хэшем
matches_2 = null;
var allNews = '#news';
var aboutNews = /(\#news\/(\d+)$)/;

window.onload = function changed() { // Функция обработчик, вызывается когда меняется hash(onload)
	if(allNews == location.hash) {
		window['newsListLoader']();//вызываем нужную функцию
	};
	var matches_2 = aboutNews.exec(window.location.hash);
	if(matches_2) {
		window["onArticleTitleClick"](matches_2[2]);//вызываем нужную функцию и передаем ID
		window.scrollBy(0,-9999);
	};
}
window.onhashchange = function changed() { // Функция обработчик, вызывается когда меняется hash(forward & back)
	if(allNews == location.hash) {
		window['newsListLoader']();
		}
	var matches_2 = aboutNews.exec(window.location.hash);
	if(matches_2) {
		window["onArticleTitleClick"](matches_2[2]);
		window.scrollBy(0,-9999);
	};
hash = location.hash;
};

// получение дочерниъ и родительских узлов
var nodes = document.querySelector(".btn-search");// нажатие на поиск
nodes.addEventListener("click", function() {
	
		var selection = prompt('Введите селектор для определения дочерних и родительских узлов', ".menu");
		var startSearch = document.querySelector(selection);
		if (startSearch !== null) {

			console.log("Выбранный элемент : ");
			console.log(selection);
			console.log("==========================");
	
			console.log("Дочерние элементы : ");
			function enumChildNodes(node) {
			    if (node && 1 == node.nodeType) {
			        var child = node.firstChild;
			        while (child) {
			            if (1 == child.nodeType) {
			                console.log(child.tagName);
			                enumChildNodes(child);
			            }
			            child = child.nextSibling;
			        }
			    }
			}
			enumChildNodes(startSearch);
			console.log("==========================");
			
			console.log("Родители : ");
			var els = [];
			startSearch = startSearch.parentNode;
			while (startSearch) {
				els.unshift(startSearch);
				startSearch = startSearch.parentNode;
			}
			console.log(els);
		}
});

function newsListLoader() {// слушатель события click
	var xhr = new XMLHttpRequest(); // начало AJAX запроса
	xhr.open("GET", allNewsAdress); // адрес для получения новостей 
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){ // проверка статуса
		if(xhr.status === 200){ 
	}else{
		alert('Error: '+xhr.status); 
		}
	}
}
xhr.onerror = function() {
	alert('Error: '+xhr.status); 
}
xhr.onloadstart = function() {
	newsBlock.innerHTML = "Загрузка..."; // удаление содержимого новостей
}
xhr.onload = function() {
	var newP = null;// переопределяем
	var newP = document.createElement('div');//создаем блок для новой новости
	newsBlock.innerHTML = "Данные запроса:"; // удаление содержимого новостей
	newsBlock.appendChild(newP);// вставляем ее после новостного блока, где написано "Загрузка..."
	var json = xhr.responseText.replace(/,(?![^,]*,)/m, ''); // убираем запятую в 144 строке
	console.log(json); // проверяем что получаем
	if (json !== Object)
		try {
			var jsonObj = JSON.parse(json); // создаем пересенную объекта, полученную из JSON
		}
		catch (json){
			alert("Получен объект!");
		}
	history.pushState(null, null, "#news"); // изменяем адрес
	newP.innerHTML = tmpl("tmpl", jsonObj);
	}
xhr.send(null);
}

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
var cache = {};

this.tmpl = function tmpl(str, data){
// Figure out if we're getting a template, or if we need to
// load the template - and be sure to cache the result.
var fn = !/\W/.test(str) ?
cache[str] = cache[str] ||
tmpl(document.getElementById(str).innerHTML) :

// Generate a reusable function that will serve as a template
// generator (and which will be cached).
new Function("obj",
"var p=[],print=function(){p.push.apply(p,arguments);};" +

// Introduce the data as local variables using with(){}
"with(obj){p.push('" +

// Convert the template into pure JavaScript
str
.replace(/[\r\t\n]/g, " ")
.split("<%").join("\t")
.replace(/((^|%>)[^\t]*)'/g, "$1\r")
.replace(/\t=(.*?)%>/g, "',$1,'")
.split("\t").join("');")
.split("%>").join("p.push('")
.split("\r").join("\\'")
+ "');}return p.join('');");

// Provide some basic currying to the user
return data ? fn( data ) : fn;
};
})();