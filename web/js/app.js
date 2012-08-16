$(function() {

	$("#code").height($(window).height()-100);
	$("#code").keyup(function() {
		run();
	});
});

var run = function() {
	code = $("#code").val();
	try {
		eval(code);

		// clear world
		$("#world").empty();

		var lines = code.split("\n");
		for(var i=0; i<lines.length; i++) {
			renderLine(lines[i]);
		}
	}
	catch(e) {
		console.log("There was an error.");
		throw e;
	}
};

var renderLine = function(line) {

	// valid variable
	var varIndex = line.indexOf("var ");
	if(varIndex != -1) {

		var varNameEndIndex = line.indexOf(" ", varIndex + 4);
		var name = line.substring(varIndex + 4, varNameEndIndex != -1 ? varNameEndIndex : 100);

		var equalsIndex = line.indexOf(" = ");
		if(equalsIndex != -1) {
			var value = line.substring(equalsIndex + 3).replace(";", "");
			renderVariable(value, name);
		}
		else {
			renderVariable("", name);
		}
	}
};

var render = function(creatable) {
	$("#world").append(Creatable.create(creatable));
};

var renderVariable = function(value, name) {
	render(["div.var", [
		["div.value", eval(value)],
		["img", { src: "img/open-box.png" }],
		["div.name", name]
	]]);
};