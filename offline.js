// page loaded
jQuery(document).ready(function($) {

	// form data saving
	$("#mainform").submit(lib.Save);

	// online/offline event handler
	if (window.localStorage) {
		lib.Net.ChangeStatus();
		$(window).bind('online offline', lib.Net.ChangeStatus);
	}
	
	// load data
	lib.Load();

});

// online/offline library
var lib = lib || {};

lib.Net = function() {

	var online = true;

	// is browser online?
	function Online() { return navigator.onLine; }
	
	// online/offline event
	function ChangeStatus() {
		if (online != Online()) {
			online = Online();
			var s = $("#status");
			s.text(online ? "Online" : "Offline");
			if (online) s.removeClass("offline");
			else s.addClass("offline");
		}
	}
	
	return {
		Online: Online,
		ChangeStatus: ChangeStatus
	};

}();

// save data online or offline
lib.Save = function(e) {

	e.preventDefault();
	
	var valor = $("#mainform input").val();
	var linha = "<li>"+valor+"</li>";
	if (lib.Net.Online() || !window.localStorage) {
	
		//enviar dados para o server
		alert("Salvando online.");
		
	}
	else {
	
		// save data offline
		// window.localStorage.setItem(valor);
		alert("Salvando offline.");
		console.log(valor);

	}

    $("#lista").prepend(linha);

};

// load data online or offline
lib.Load = function() {
	console.log()
	if (lib.Net.Online() || !window.localStorage) {
	
		// load data online
		alert("Online:\ndados devem vir do servidor.");
	
	}
	else {
	
		// load data offline
		$("#mainform input").each(function(i) {
			this.value = window.localStorage.getItem(this.id);
		});
		alert("Offline:\ndados locais.");

	}
};