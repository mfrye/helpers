// Set global browser information object
window.browserInfo = {};

// Gets browser name, version number, and whether browser is Internet Explorer 8/9
(function() {
	var N=navigator.appName, ua=navigator.userAgent, tem;
	var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) { M[2]= tem[1]; }
	M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
	window.browserInfo = { name: M[0], version: M[1], isIE: (M[0] === 'MSIE' && M[1] <= 10 ? true : false) };
})();

// Stores data in broswerInfo object
/* Ex. object
window.browserInfo = {
	name: 'chrome',
	version: 23,
	isIE: false
};