import {color} from "d3-color"
import {interpolateHsl, interpolateRgb} from "d3-interpolate"
let d3 = {color, interpolateHsl, interpolateRgb}

export function getColors(colorName, nbSeries, opacity) {
	if ("DEFAULT" == colorName) {
		//default on ne fait rien
		return;
	} 
	var mainColors
	var interpolation = _interpolateHsl; //par défaut interpolation HSL
	if ("RAINBOW" == colorName || "iRAINBOW" == colorName) {
			mainColors = [ "#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#00FF00", "rgb(75, 0, 130)", "rgb(238, 130, 238)" ];
	} else if ("SPECTRUM" == colorName || "iSPECTRUM" == colorName) {
		mainColors = [ "rgb(230, 30, 30)", "rgb(230, 230, 30)", "rgb(30, 230, 30)", "rgb(30, 230, 230)", "rgb(30, 30, 230)", "rgb(230, 30, 230)", "rgb(230, 30, 30)" ];
		interpolation = _interpolateCatmul;
	} else if ("RED2GREEN" == colorName || "iRED2GREEN" == colorName) {
		mainColors = [ "rgb(255, 51, 51)", "rgb(250, 235, 0)", "rgb(51, 200, 51)" ];
	} else if ("GREEN2BLUE" == colorName || "iGREEN2BLUE" == colorName) {
		mainColors = [ "rgb(51, 153, 51)", "rgb(51, 153, 200)", "rgb(51, 51, 255)" ];
	} else if ("HEAT" == colorName || "iHEAT" == colorName) {
		mainColors = [ "rgb(255, 51, 51)", "rgb(255, 255, 51)", "rgb(51, 153, 51)", "rgb(51, 153, 255)" ];
	} else if ("GREEN:INTENSITY" == colorName || "iGREEN:INTENSITY" == colorName) {
		mainColors = [ "rgb(51, 153, 51)", "rgb(170, 250, 170)" ];
		interpolation = _interpolateLinear;
	} else if ("ANDROID" == colorName || "iANDROID" == colorName) {
		mainColors = [ "#0099CC", "#9933CC", "#CC0000", "#FF8800", "#669900"  ];
		//mainColors = [ "#33B5E5", "#AA66CC", "#ff4444", "#ffbb33", "#99cc00" ];
	} else if ("ANDROID:LIGHT" == colorName || "iANDROID:LIGHT" == colorName) {
		mainColors = [ "#33B5E5", "#AA66CC", "#ff4444", "#ffbb33", "#99cc00" ];
	}  
	if(colorName.charAt(0) == 'i') { 
		mainColors = mainColors.reverse(); 
	}
	var resultColors;
	var isCycle = mainColors[0] == mainColors[mainColors.length-1];
	var resultColors = interpolation(mainColors, nbSeries + (isCycle ? 1 : 0)); //si les couleurs représente un cycle, on exclue la derniére couleur (qui est aussi la premiére)
	
	if (opacity) {
		// use the alpha
		return resultColors.map(function( val, i ) {
			var d3Color = d3.color(val);
			d3Color.opacity = opacity;
			return d3Color.formatRgb();
		});
	}
	return resultColors;
};

function _interpolateHsl(mainColors, nbColors) {
	return _point2PointColors(mainColors, nbColors, function(t, c1, c2, c3, c4) {
		return d3.interpolateHsl(c2, c3)(t);
	}); 
};

function _interpolateLinear(mainColors, nbColors) {
	return _point2PointColors(mainColors, nbColors, function(t, c1, c2, c3, c4) {
		return d3.interpolateRgb(c2, c3)(t);
	});
};

function _interpolateCatmul(mainColors, nbColors) {
	return _point2PointColors(mainColors, nbColors, function(t, c1, c2, c3, c4) {
		var empty = {r:null,g : null,b : null };
		
		var nc1 = c1 ? d3.rgb(c1) : empty;
		var nc2 = d3.rgb(c2);
		var nc3 = d3.rgb(c3);
		var nc4 = c4 ? d3.rgb(c4) : empty;
		var red = ( Math.max(Math.min(Math.round(_catmull(t, nc1.r, nc2.r, nc3.r, nc4.r)), 255), 0));
		var green = ( Math.max(Math.min(Math.round(_catmull(t, nc1.g, nc2.g, nc3.g, nc4.g)), 255), 0));
		var blue = (Math.max(Math.min(Math.round(_catmull(t, nc1.b, nc2.b, nc3.b, nc4.b)), 255), 0));
		return d3.rgb(red,green,blue);
	});
};

function  _point2PointColors(mainColors, nbColors, colorInterpolation) {
	if(nbColors == 1) {
		return [mainColors[0]];
	}
	var startJ = 0;
	var interpolatedColor = new Array();
	var nbInterpolatedColor = mainColors.length;
	var nbInterpolatedColorDegree = 0;
	while ((nbInterpolatedColor - 1) % (nbColors - 1) != 0 && nbInterpolatedColorDegree < 20) {
		nbInterpolatedColorDegree++;
		nbInterpolatedColor = mainColors.length + nbInterpolatedColorDegree * (mainColors.length - 1);
	}
	nbInterpolatedColorDegree++;
	for (var i = 0; i < mainColors.length - 1; i++) {
		var c1 = i - 1 >= 0 ? mainColors[i - 1] : null;
		var c2 = mainColors[i];
		var c3 = mainColors[i + 1];
		var c4 = i + 2 < mainColors.length ? mainColors[i + 2] : null;
		for (var j = startJ; j < nbInterpolatedColorDegree + 1; j++) {
			var color = colorInterpolation(j / nbInterpolatedColorDegree, c1, c2, c3, c4);
			interpolatedColor.push(color);
		}
		startJ = 1; //on ne refait pas le premier point (dejé atteint)
	}
	var result = new Array();
	for (var i = 0; i < nbColors; i++) {
		var index = (interpolatedColor.length - 1) / (nbColors - 1) * i;
		//var index = i % (interpolatedColor.length - 1);
		result.push(interpolatedColor[index]);
	}
	return result;
};

//Catmull-Rom spline interpolation function
//p0 et p3 servent a orienter le chemin entre p1 et p2
//t est une fraction entre 
function _catmull (t, inP0, p1, p2, inP3) {
		var delta = p2 - p1;
		var p0 = inP0 != null ? inP0 : p1 - delta;
		var p3 = inP3 != null ? inP3 : p2 + delta;
	return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
}