/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/bubble_chart.js":
/*!*****************************!*\
  !*** ./src/bubble_chart.js ***!
  \*****************************/
/*! exports provided: bubble_chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bubble_chart", function() { return bubble_chart; });
var bubble_chart = function bubble_chart() {
  var margin = {
    left: 100,
    right: 80,
    top: 10,
    bottom: 130
  };
  var width = 1300 - margin.left - margin.right;
  var height = 700 - margin.top - margin.bottom;
  var flag = true;
  var bubble_chart = d3.select('#bubble_chart').append('svg').attr("height", height + margin.top + margin.bottom).attr("width", width + margin.left + margin.right);
  var g = bubble_chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var xAxis = g.append("g").attr("class", "bubble-x-axis").attr("transform", "translate(0, " + height + ")");
  var yAxis = g.append("g").attr("class", "bubble-y-axis");
  g.append("text").attr("class", "xAxisLabel").attr("x", width / 2).attr("y", height + 100).attr("font-size", "30px").attr("text-anchor", "middle").text("Planet Population").attr("stroke", "lime").attr("fill", "lime");
  var yLabel = g.append("text").attr("class", "yAxisLabel").attr("x", -(height / 2)).attr("y", -60).attr("font-size", "30px").attr("text-anchor", "middle").attr("transform", "rotate(-90)").text("Orbital Period (days)").attr("stroke", "lime").attr("fill", "lime");
  d3.json("data/planets.json").then(function (data) {
    data.forEach(function (datum) {
      datum.rotation_period = +datum.rotation_period;
      datum.orbital_period = +datum.orbital_period;
      datum.diameter = +datum.diameter;
      datum.population = +datum.population;
    });
    var y = d3.scaleLinear().domain([0, d3.max(data, function (d) {
      return d.orbital_period;
    })]).range([height, 0]);
    var x = d3.scaleLinear().domain([0, d3.max(data, function (d) {
      return d.population;
    })]).range([0, width]);
    var r = d3.scaleLinear().domain([0, d3.max(data, function (d) {
      return d.diameter;
    })]).range([10, 90]);
    var xAxisCall = d3.axisBottom(x);
    xAxis.call(xAxisCall).selectAll("text").attr("y", "10").attr("x", "-5").attr("text-anchor", "end").attr("transform", "rotate(-40)").attr("stroke", "lime");
    var yAxisCall = d3.axisLeft(y).ticks(7).tickFormat(function (d) {
      return d;
    });
    yAxis.call(yAxisCall).selectAll("text").attr("stroke", "lime");
    var circles = g.selectAll("circle").data(data);
    circles.enter().append("circle").attr("class", "planet").attr("cx", function (d) {
      return x(d.population) + 20;
    }).attr("cy", function (d) {
      return y(d.orbital_period) + 20;
    }).attr("r", function (d) {
      return r(d.diameter);
    }).attr("fill", function (d) {
      switch (true) {
        case d.rotation_period < 20:
          return "lightgreen";

        case d.rotation_period < 30:
          return "lightblue";

        case d.rotation_period < 40:
          return "orange";

        default:
          return "red";
      }
    }).attr("opacity", .75).on("mouseover", showTooltip).on("mousemove", moveTooltip).on("mouseleave", hideTooltip);
  });
  var tooltip = d3.select("#bubble_chart").append("div").style("opacity", 0).attr("class", "tooltip").style("background-color", "lime").style("border-radius", "5px").style("padding", "5px").style("width", "190px").style("color", "black").style("position", "absolute");
  var formatComma = d3.format(",");

  var showTooltip = function showTooltip(d) {
    tooltip.transition().duration(50);
    tooltip.style("opacity", .85).html("Name: " + d.name + "<br>" + "Diameter: " + formatComma(d.diameter) + " km" + "<br>" + "Population: " + formatComma(d.population) + "<br>" + "Orbital Period: " + d.orbital_period + " days" + "<br>" + "Rotation Period: " + d.rotation_period + " hours" + "<br>" + "Climate: " + d.climate + "<br>" + "Terrain: " + d.terrain).style("left", d3.mouse(this)[0] + 125 + "px").style("top", d3.mouse(this)[1] + 40 + "px");
  };

  var moveTooltip = function moveTooltip() {
    tooltip.style("left", d3.mouse(this)[0] + 125 + "px").style("top", d3.mouse(this)[1] + 40 + "px");
  };

  var hideTooltip = function hideTooltip() {
    tooltip.transition().duration(50).style("opacity", 0);
  };

  var legend = d3.select("#bubble_chart").append("div").style("position", "absolute").style("left", "1000px").style("top", "20px").style("height", "150px").style("width", "190px").style("border", "1px solid lime").style("border-radius", "5px");
  var marker1 = bubble_chart.append("circle").style("position", "absolute").attr("cx", 1025).attr("cy", 50).attr("r", 9).style("fill", "lightgreen").style("opacity", .75);
  var marker2 = bubble_chart.append("circle").style("position", "absolute").attr("cx", 1025).attr("cy", 80).attr("r", 9).style("fill", "lightblue").style("opacity", .75);
  var marker3 = bubble_chart.append("circle").style("position", "absolute").attr("cx", 1025).attr("cy", 110).attr("r", 9).style("fill", "orange").style("opacity", .75);
  var marker4 = bubble_chart.append("circle").style("position", "absolute").attr("cx", 1025).attr("cy", 140).attr("r", 9).style("fill", "red").style("opacity", .75);
  var text1 = bubble_chart.append("text").style("position", "absolute").attr("x", 1050).attr("y", 56).text("< 20 hour day").style("color", "lime").style("fill", "lime");
  var text2 = bubble_chart.append("text").style("position", "absolute").attr("x", 1050).attr("y", 86).text("20 - 29 hour day").style("color", "lime").style("fill", "lime");
  var text3 = bubble_chart.append("text").style("position", "absolute").attr("x", 1050).attr("y", 116).text("30 - 39 hour day").style("color", "lime").style("fill", "lime");
  var text4 = bubble_chart.append("text").style("position", "absolute").attr("x", 1050).attr("y", 146).text(">= 40 hour day").style("color", "lime").style("fill", "lime");
};

/***/ }),

/***/ "./src/chart.js":
/*!**********************!*\
  !*** ./src/chart.js ***!
  \**********************/
/*! exports provided: chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chart", function() { return chart; });
var chart = function chart() {
  var margin = {
    left: 100,
    right: 80,
    top: 10,
    bottom: 130
  };
  var width = 1300 - margin.left - margin.right;
  var height = 700 - margin.top - margin.bottom;
  var flag = true;
  var t = d3.transition().duration(2500);
  var chart = d3.select('#chart').append("svg").attr("height", height + margin.top + margin.bottom).attr("width", width + margin.left + margin.right);
  var g = chart.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var xAxisGroup = g.append("g").attr("class", "x-axis").attr("transform", "translate(0, " + height + ")");
  var yAxisGroup = g.append("g").attr("class", "y-axis");
  var y = d3.scaleLinear().range([height, 0]);
  var x = d3.scaleBand().range([0, width]).paddingInner(0.3).paddingOuter(0.3);
  var xLabel = g.append("text").attr("class", "xAxisLabel").attr("x", width / 2).attr("y", height + 120).attr("font-size", "30px").attr("text-anchor", "middle").text("Star Wars Characters").attr("stroke", "fuchsia").attr("fill", "fuchsia");
  var yLabel = g.append("text").attr("class", "yAxisLabel").attr("x", -(height / 2)).attr("y", -60).attr("font-size", "30px").attr("text-anchor", "middle").attr("transform", "rotate(-90)").text("Height").attr("stroke", "fuchsia").attr("fill", "fuchsia");
  d3.json("data/people.json").then(function (data) {
    data.forEach(function (datum) {
      datum.height = +datum.height;
      datum.mass = +datum.mass;
    });
    d3.interval(function () {
      update(data);
      flag = !flag;
    }, 3000);
    update(data);
  });

  var update = function update(data) {
    var value = flag ? "height" : "mass";
    y.domain([0, d3.max(data, function (d) {
      return d[value];
    })]);
    x.domain(data.map(function (d) {
      return d.name;
    })); // X Axis

    var xAxisCall = d3.axisBottom(x);
    xAxisGroup.transition(t).call(xAxisCall).selectAll("text").attr("y", "10").attr("x", "-5").attr("text-anchor", "end").attr("transform", "rotate(-40)").attr("stroke", "fuchsia"); // Y Axis

    var yAxisCall = d3.axisLeft(y).ticks(7).tickFormat(function (d) {
      return d;
    });
    yAxisGroup.transition(t).call(yAxisCall).selectAll("text").attr("stroke", "fuchsia"); // JOIN new data with old elements.

    var rectangles = g.selectAll("rect").data(data); // EXIT old elements not present in data.

    rectangles.exit().attr("fill", "yellow").transition(t).attr("y", y(0)).attr("height", 0).remove(); // UPDATE old elements present in new data.

    rectangles.transition(t).attr("y", function (d) {
      return y(d[value]);
    }).attr("height", function (d) {
      return height - y(d[value]);
    }).attr("width", x.bandwidth).attr("x", function (d, i) {
      return x(d.name);
    }); // ENTER new elements present in new data.

    rectangles.enter().append("rect").attr("width", x.bandwidth).attr("x", function (d, i) {
      return x(d.name);
    }).attr("fill", "yellow").attr("y", y(0)).attr("height", 0).transition(t).attr("y", function (d) {
      return y(d[value]);
    }).attr("height", function (d) {
      return height - y(d[value]);
    });
    var label = flag ? "Height (cm)" : "Mass (kg)";
    var xlabel = flag ? "Star Wars Character's Height" : "Star Wars Character's Weight";
    yLabel.text(label);
    xLabel.text(xlabel);
  };
};

/***/ }),

/***/ "./src/circular.js":
/*!*************************!*\
  !*** ./src/circular.js ***!
  \*************************/
/*! exports provided: circular */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circular", function() { return circular; });
var circular = function circular() {
  var margin = {
    left: 100,
    right: 100,
    top: 100,
    bottom: 100
  };
  var width = 1100 - margin.left - margin.right;
  var height = 800 - margin.top - margin.bottom;
  var innerRadius = 150;
  var outerRadius = Math.min(width, height) / 2;
  var circular = d3.select("#circular").append("svg").attr("height", height + margin.top + margin.bottom).attr("width", width + margin.left + margin.right);
  var graph = circular.append("g").attr("transform", "translate(" + width / 1.5 + "," + (height / 2 + 100) + ")");
  d3.json("data/starships.json").then(function (data) {
    data.forEach(function (datum) {
      datum.cost_in_credits = +datum.cost_in_credits;
      datum.length = +datum.length;
      datum.max_atmosphering_speed = +datum.max_atmosphering_speed;
      datum.crew = +datum.crew;
      datum.passengers = +datum.passengers;
      datum.cargo_capacity = +datum.cargo_capacity;
      datum.hyperdrive_rating = +datum.hyperdrive_rating;
      datum.MGLT = +datum.MGLT;
    });
    var x = d3.scaleBand().range([0, 2 * Math.PI]).align(0).domain(data.map(function (d) {
      return d.name;
    }));
    var y = d3.scaleLinear().range([innerRadius, outerRadius]).domain([0, 1]);
    graph.append("g").selectAll("path").data(data).enter().append("path").attr("fill", "blue").attr("stroke", "white").attr("d", d3.arc().innerRadius(innerRadius).outerRadius(function (d) {
      return y(d.hyperdrive_rating);
    }).startAngle(function (d) {
      return x(d.name);
    }).endAngle(function (d) {
      return x(d.name) + x.bandwidth();
    }).padAngle(0.03).padRadius(innerRadius));
    graph.append("g").selectAll("g").data(data).enter().append("g").attr("text-anchor", function (d) {
      return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start";
    }).attr("transform", function (d) {
      return "rotate(" + ((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d.hyperdrive_rating) + 10) + ",0)";
    }).append("text").attr("color", "white").text(function (d) {
      return d.name;
    }).attr("transform", function (d) {
      return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)";
    }).style("font-size", "11px").attr("alignment-baseline", "middle");
  });
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chart */ "./src/chart.js");
/* harmony import */ var _bubble_chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bubble_chart */ "./src/bubble_chart.js");
/* harmony import */ var _circular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./circular */ "./src/circular.js");



document.addEventListener("DOMContentLoaded", function () {
  Object(_bubble_chart__WEBPACK_IMPORTED_MODULE_1__["bubble_chart"])();
  Object(_chart__WEBPACK_IMPORTED_MODULE_0__["chart"])();
  Object(_circular__WEBPACK_IMPORTED_MODULE_2__["circular"])();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2J1YmJsZV9jaGFydC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2hhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NpcmN1bGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJidWJibGVfY2hhcnQiLCJtYXJnaW4iLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJ3aWR0aCIsImhlaWdodCIsImZsYWciLCJkMyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJnIiwieEF4aXMiLCJ5QXhpcyIsInRleHQiLCJ5TGFiZWwiLCJqc29uIiwidGhlbiIsImRhdGEiLCJmb3JFYWNoIiwiZGF0dW0iLCJyb3RhdGlvbl9wZXJpb2QiLCJvcmJpdGFsX3BlcmlvZCIsImRpYW1ldGVyIiwicG9wdWxhdGlvbiIsInkiLCJzY2FsZUxpbmVhciIsImRvbWFpbiIsIm1heCIsImQiLCJyYW5nZSIsIngiLCJyIiwieEF4aXNDYWxsIiwiYXhpc0JvdHRvbSIsImNhbGwiLCJzZWxlY3RBbGwiLCJ5QXhpc0NhbGwiLCJheGlzTGVmdCIsInRpY2tzIiwidGlja0Zvcm1hdCIsImNpcmNsZXMiLCJlbnRlciIsIm9uIiwic2hvd1Rvb2x0aXAiLCJtb3ZlVG9vbHRpcCIsImhpZGVUb29sdGlwIiwidG9vbHRpcCIsInN0eWxlIiwiZm9ybWF0Q29tbWEiLCJmb3JtYXQiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJodG1sIiwibmFtZSIsImNsaW1hdGUiLCJ0ZXJyYWluIiwibW91c2UiLCJsZWdlbmQiLCJtYXJrZXIxIiwibWFya2VyMiIsIm1hcmtlcjMiLCJtYXJrZXI0IiwidGV4dDEiLCJ0ZXh0MiIsInRleHQzIiwidGV4dDQiLCJjaGFydCIsInQiLCJ4QXhpc0dyb3VwIiwieUF4aXNHcm91cCIsInNjYWxlQmFuZCIsInBhZGRpbmdJbm5lciIsInBhZGRpbmdPdXRlciIsInhMYWJlbCIsIm1hc3MiLCJpbnRlcnZhbCIsInVwZGF0ZSIsInZhbHVlIiwibWFwIiwicmVjdGFuZ2xlcyIsImV4aXQiLCJyZW1vdmUiLCJiYW5kd2lkdGgiLCJpIiwibGFiZWwiLCJ4bGFiZWwiLCJjaXJjdWxhciIsImlubmVyUmFkaXVzIiwib3V0ZXJSYWRpdXMiLCJNYXRoIiwibWluIiwiZ3JhcGgiLCJjb3N0X2luX2NyZWRpdHMiLCJsZW5ndGgiLCJtYXhfYXRtb3NwaGVyaW5nX3NwZWVkIiwiY3JldyIsInBhc3NlbmdlcnMiLCJjYXJnb19jYXBhY2l0eSIsImh5cGVyZHJpdmVfcmF0aW5nIiwiTUdMVCIsIlBJIiwiYWxpZ24iLCJhcmMiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJwYWRBbmdsZSIsInBhZFJhZGl1cyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFB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LEtBQWpJO0FBQXlJLEtBTjdLLEVBT0cxRixNQVBILENBT1UsTUFQVixFQVFHQyxJQVJILENBUVEsT0FSUixFQVFpQixPQVJqQixFQVNHSSxJQVRILENBU1EsVUFBVWUsQ0FBVixFQUFhO0FBQUUsYUFBUUEsQ0FBQyxDQUFDeUIsSUFBVjtBQUFpQixLQVR4QyxFQVVHNUMsSUFWSCxDQVVRLFdBVlIsRUFVcUIsVUFBVW1CLENBQVYsRUFBYTtBQUFFLGFBQU8sQ0FBQ0UsQ0FBQyxDQUFDRixDQUFDLENBQUN5QixJQUFILENBQUQsR0FBWXZCLENBQUMsQ0FBQ29ELFNBQUYsS0FBZ0IsQ0FBNUIsR0FBZ0NPLElBQUksQ0FBQ1csRUFBdEMsS0FBNkMsSUFBSVgsSUFBSSxDQUFDVyxFQUF0RCxJQUE0RFgsSUFBSSxDQUFDVyxFQUFqRSxHQUFzRSxhQUF0RSxHQUFzRixXQUE3RjtBQUEyRyxLQVYvSSxFQVdHckQsS0FYSCxDQVdTLFdBWFQsRUFXc0IsTUFYdEIsRUFZR3RDLElBWkgsQ0FZUSxvQkFaUixFQVk4QixRQVo5QjtBQWNELEdBcERIO0FBcURELENBdEVNLEM7Ozs7Ozs7Ozs7OztBQ0FQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0FrRyxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xEL0csb0VBQVk7QUFDWnFFLHNEQUFLO0FBQ0xvQiw0REFBUTtBQUNULENBSkQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImV4cG9ydCBjb25zdCBidWJibGVfY2hhcnQgPSAoKSA9PiB7XG4gIGxldCBtYXJnaW4gPSB7IGxlZnQ6IDEwMCwgcmlnaHQ6IDgwLCB0b3A6IDEwLCBib3R0b206IDEzMCB9O1xuXG4gIGxldCB3aWR0aCA9IDEzMDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGhlaWdodCA9IDcwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBmbGFnID0gdHJ1ZTtcblxuICBsZXQgYnViYmxlX2NoYXJ0ID0gZDMuc2VsZWN0KCcjYnViYmxlX2NoYXJ0JylcbiAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gIFxuICBsZXQgZyA9IGJ1YmJsZV9jaGFydC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyBtYXJnaW4ubGVmdCArIFwiLFwiICsgbWFyZ2luLnRvcCArIFwiKVwiKTtcblxuICBsZXQgeEF4aXMgPSBnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwiYnViYmxlLXgtYXhpc1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKDAsIFwiICsgaGVpZ2h0ICsgXCIpXCIpXG5cbiAgbGV0IHlBeGlzID0gZy5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcImJ1YmJsZS15LWF4aXNcIik7XG5cbiAgICBcbiAgZy5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcInhBeGlzTGFiZWxcIilcbiAgICAuYXR0cihcInhcIiwgd2lkdGggLyAyKVxuICAgIC5hdHRyKFwieVwiLCBoZWlnaHQgKyAxMDApXG4gICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIzMHB4XCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC50ZXh0KFwiUGxhbmV0IFBvcHVsYXRpb25cIilcbiAgICAuYXR0cihcInN0cm9rZVwiLCBcImxpbWVcIilcbiAgICAuYXR0cihcImZpbGxcIiwgXCJsaW1lXCIpO1xuXG4gIGxldCB5TGFiZWwgPSBnLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwieUF4aXNMYWJlbFwiKVxuICAgIC5hdHRyKFwieFwiLCAtIChoZWlnaHQgLyAyKSlcbiAgICAuYXR0cihcInlcIiwgLTYwKVxuICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIFwiMzBweFwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBcInJvdGF0ZSgtOTApXCIpXG4gICAgLnRleHQoXCJPcmJpdGFsIFBlcmlvZCAoZGF5cylcIilcbiAgICAuYXR0cihcInN0cm9rZVwiLCBcImxpbWVcIilcbiAgICAuYXR0cihcImZpbGxcIiwgXCJsaW1lXCIpO1xuXG4gIGQzLmpzb24oXCJkYXRhL3BsYW5ldHMuanNvblwiKVxuICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgZGF0YS5mb3JFYWNoKGRhdHVtID0+IHtcbiAgICAgICAgZGF0dW0ucm90YXRpb25fcGVyaW9kID0gK2RhdHVtLnJvdGF0aW9uX3BlcmlvZDtcbiAgICAgICAgZGF0dW0ub3JiaXRhbF9wZXJpb2QgPSArZGF0dW0ub3JiaXRhbF9wZXJpb2Q7XG4gICAgICAgIGRhdHVtLmRpYW1ldGVyID0gK2RhdHVtLmRpYW1ldGVyO1xuICAgICAgICBkYXR1bS5wb3B1bGF0aW9uID0gK2RhdHVtLnBvcHVsYXRpb247XG4gICAgICB9KVxuICBcblxuICAgICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5kb21haW4oWzAsIGQzLm1heChkYXRhLCBkID0+IHsgcmV0dXJuIChkLm9yYml0YWxfcGVyaW9kKSB9KV0pXG4gICAgICAgIC5yYW5nZShbaGVpZ2h0LCAwXSk7XG5cbiAgICAgIGxldCB4ID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgICAgICAuZG9tYWluKFswLCBkMy5tYXgoZGF0YSwgZCA9PiB7IHJldHVybiAoZC5wb3B1bGF0aW9uKSB9KV0pXG4gICAgICAgIC5yYW5nZShbMCwgKHdpZHRoKV0pO1xuXG4gICAgICBsZXQgciA9IGQzLnNjYWxlTGluZWFyKClcbiAgICAgICAgLmRvbWFpbihbMCwgZDMubWF4KGRhdGEsIGQgPT4geyByZXR1cm4gZC5kaWFtZXRlciB9KV0pXG4gICAgICAgIC5yYW5nZShbMTAsIDkwXSk7XG5cbiAgICAgIGxldCB4QXhpc0NhbGwgPSBkMy5heGlzQm90dG9tKHgpO1xuICAgICAgeEF4aXMuY2FsbCh4QXhpc0NhbGwpXG4gICAgICAgIC5zZWxlY3RBbGwoXCJ0ZXh0XCIpXG4gICAgICAgIC5hdHRyKFwieVwiLCBcIjEwXCIpXG4gICAgICAgIC5hdHRyKFwieFwiLCBcIi01XCIpXG4gICAgICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJlbmRcIilcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTQwKVwiKVxuICAgICAgICAuYXR0cihcInN0cm9rZVwiLCBcImxpbWVcIik7XG5cbiAgICAgIGxldCB5QXhpc0NhbGwgPSBkMy5heGlzTGVmdCh5KVxuICAgICAgICAudGlja3MoNylcbiAgICAgICAgLnRpY2tGb3JtYXQoZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIGRcbiAgICAgICAgfSk7XG4gICAgICB5QXhpcy5jYWxsKHlBeGlzQ2FsbClcbiAgICAgICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJsaW1lXCIpO1xuICAgICAgXG5cbiAgICAgIGxldCBjaXJjbGVzID0gZy5zZWxlY3RBbGwoXCJjaXJjbGVcIilcbiAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgIGNpcmNsZXMuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJwbGFuZXRcIilcbiAgICAgICAgLmF0dHIoXCJjeFwiLCBkID0+IHsgcmV0dXJuICh4KGQucG9wdWxhdGlvbikgKyAyMCApIH0pXG4gICAgICAgIC5hdHRyKFwiY3lcIiwgZCA9PiB7IHJldHVybiAoeShkLm9yYml0YWxfcGVyaW9kKSArIDIwKSB9KVxuICAgICAgICAuYXR0cihcInJcIiwgZCA9PiB7IHJldHVybiByKGQuZGlhbWV0ZXIpIH0pXG4gICAgICAgIC5hdHRyKFwiZmlsbFwiLCBkID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIChkLnJvdGF0aW9uX3BlcmlvZCA8IDIwKTpcbiAgICAgICAgICAgICAgcmV0dXJuIFwibGlnaHRncmVlblwiO1xuICAgICAgICAgICAgY2FzZSAoZC5yb3RhdGlvbl9wZXJpb2QgPCAzMCk6XG4gICAgICAgICAgICAgIHJldHVybiBcImxpZ2h0Ymx1ZVwiO1xuICAgICAgICAgICAgY2FzZSAoZC5yb3RhdGlvbl9wZXJpb2QgPCA0MCk6XG4gICAgICAgICAgICAgIHJldHVybiBcIm9yYW5nZVwiO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgcmV0dXJuIFwicmVkXCJcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKFwib3BhY2l0eVwiLCAuNzUpXG4gICAgICAgIC5vbihcIm1vdXNlb3ZlclwiLCBzaG93VG9vbHRpcClcbiAgICAgICAgLm9uKFwibW91c2Vtb3ZlXCIsIG1vdmVUb29sdGlwKVxuICAgICAgICAub24oXCJtb3VzZWxlYXZlXCIsIGhpZGVUb29sdGlwKVxuICAgICAgICBcbiAgICB9KVxuXG4gICAgbGV0IHRvb2x0aXAgPSBkMy5zZWxlY3QoXCIjYnViYmxlX2NoYXJ0XCIpXG4gICAgICAuYXBwZW5kKFwiZGl2XCIpXG4gICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMClcbiAgICAgICAgLmF0dHIoXCJjbGFzc1wiLCBcInRvb2x0aXBcIilcbiAgICAgICAgLnN0eWxlKFwiYmFja2dyb3VuZC1jb2xvclwiLCBcImxpbWVcIilcbiAgICAgICAgLnN0eWxlKFwiYm9yZGVyLXJhZGl1c1wiLCBcIjVweFwiKVxuICAgICAgICAuc3R5bGUoXCJwYWRkaW5nXCIsIFwiNXB4XCIpXG4gICAgICAgIC5zdHlsZShcIndpZHRoXCIsIFwiMTkwcHhcIilcbiAgICAgICAgLnN0eWxlKFwiY29sb3JcIiwgXCJibGFja1wiKVxuICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpO1xuXG4gICAgbGV0IGZvcm1hdENvbW1hID0gZDMuZm9ybWF0KFwiLFwiKTtcblxuICAgIGxldCBzaG93VG9vbHRpcCA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgIHRvb2x0aXBcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oNTApXG4gICAgICB0b29sdGlwXG4gICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjg1KVxuICAgICAgICAuaHRtbChcIk5hbWU6IFwiICsgZC5uYW1lICsgXCI8YnI+XCIgKyBcbiAgICAgICAgICAgICAgXCJEaWFtZXRlcjogXCIgKyBmb3JtYXRDb21tYShkLmRpYW1ldGVyKSArIFwiIGttXCIgKyBcIjxicj5cIiArIFxuICAgICAgICAgICAgICBcIlBvcHVsYXRpb246IFwiICsgZm9ybWF0Q29tbWEoZC5wb3B1bGF0aW9uKSArIFwiPGJyPlwiICsgXG4gICAgICAgICAgICAgIFwiT3JiaXRhbCBQZXJpb2Q6IFwiICsgZC5vcmJpdGFsX3BlcmlvZCArIFwiIGRheXNcIiArIFwiPGJyPlwiICsgXG4gICAgICAgICAgICAgIFwiUm90YXRpb24gUGVyaW9kOiBcIiArIGQucm90YXRpb25fcGVyaW9kICsgXCIgaG91cnNcIiArIFwiPGJyPlwiICsgXG4gICAgICAgICAgICAgIFwiQ2xpbWF0ZTogXCIgKyBkLmNsaW1hdGUgKyBcIjxicj5cIiArIFxuICAgICAgICAgICAgICBcIlRlcnJhaW46IFwiICsgZC50ZXJyYWluKVxuICAgICAgICAuc3R5bGUoXCJsZWZ0XCIsIChkMy5tb3VzZSh0aGlzKVswXSArIDEyNSkgKyBcInB4XCIpXG4gICAgICAgIC5zdHlsZShcInRvcFwiLCAoZDMubW91c2UodGhpcylbMV0gKyA0MCkgKyBcInB4XCIpXG4gICAgfVxuXG4gICAgbGV0IG1vdmVUb29sdGlwID0gZnVuY3Rpb24oKSB7XG4gICAgICB0b29sdGlwXG4gICAgICAgIC5zdHlsZShcImxlZnRcIiwgKGQzLm1vdXNlKHRoaXMpWzBdICsgMTI1KSArIFwicHhcIilcbiAgICAgICAgLnN0eWxlKFwidG9wXCIsIChkMy5tb3VzZSh0aGlzKVsxXSArIDQwKSArIFwicHhcIilcbiAgICB9XG5cbiAgICBsZXQgaGlkZVRvb2x0aXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRvb2x0aXBcbiAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oNTApXG4gICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMClcbiAgICB9XG5cbiAgICBsZXQgbGVnZW5kID0gZDMuc2VsZWN0KFwiI2J1YmJsZV9jaGFydFwiKVxuICAgICAgLmFwcGVuZChcImRpdlwiKVxuICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgIC5zdHlsZShcImxlZnRcIiwgXCIxMDAwcHhcIilcbiAgICAgICAgLnN0eWxlKFwidG9wXCIsIFwiMjBweFwiKVxuICAgICAgICAuc3R5bGUoXCJoZWlnaHRcIiwgXCIxNTBweFwiKVxuICAgICAgICAuc3R5bGUoXCJ3aWR0aFwiLCBcIjE5MHB4XCIpXG4gICAgICAgIC5zdHlsZShcImJvcmRlclwiLCBcIjFweCBzb2xpZCBsaW1lXCIpXG4gICAgICAgIC5zdHlsZShcImJvcmRlci1yYWRpdXNcIiwgXCI1cHhcIik7XG5cbiAgICBsZXQgbWFya2VyMSA9IGJ1YmJsZV9jaGFydFxuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgIC5hdHRyKFwiY3hcIiwgMTAyNSlcbiAgICAgICAgLmF0dHIoXCJjeVwiLCA1MClcbiAgICAgICAgLmF0dHIoXCJyXCIsIDkpXG4gICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJsaWdodGdyZWVuXCIpXG4gICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjc1KTtcblxuICAgIGxldCBtYXJrZXIyID0gYnViYmxlX2NoYXJ0XG4gICAgICAuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgLmF0dHIoXCJjeFwiLCAxMDI1KVxuICAgICAgICAuYXR0cihcImN5XCIsIDgwKVxuICAgICAgICAuYXR0cihcInJcIiwgOSlcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcImxpZ2h0Ymx1ZVwiKVxuICAgICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIC43NSk7XG5cbiAgICBsZXQgbWFya2VyMyA9IGJ1YmJsZV9jaGFydFxuICAgICAgLmFwcGVuZChcImNpcmNsZVwiKVxuICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgIC5hdHRyKFwiY3hcIiwgMTAyNSlcbiAgICAgICAgLmF0dHIoXCJjeVwiLCAxMTApXG4gICAgICAgIC5hdHRyKFwiclwiLCA5KVxuICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIFwib3JhbmdlXCIpXG4gICAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgLjc1KTtcblxuICAgIGxldCBtYXJrZXI0ID0gYnViYmxlX2NoYXJ0XG4gICAgICAuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgLmF0dHIoXCJjeFwiLCAxMDI1KVxuICAgICAgICAuYXR0cihcImN5XCIsIDE0MClcbiAgICAgICAgLmF0dHIoXCJyXCIsIDkpXG4gICAgICAgIC5zdHlsZShcImZpbGxcIiwgXCJyZWRcIilcbiAgICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAuNzUpO1xuXG4gICAgbGV0IHRleHQxID0gYnViYmxlX2NoYXJ0XG4gICAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICAuc3R5bGUoXCJwb3NpdGlvblwiLCBcImFic29sdXRlXCIpXG4gICAgICAgIC5hdHRyKFwieFwiLCAxMDUwKVxuICAgICAgICAuYXR0cihcInlcIiwgNTYpXG4gICAgICAgIC50ZXh0KFwiPCAyMCBob3VyIGRheVwiKVxuICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcImxpbWVcIilcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcImxpbWVcIik7XG5cbiAgICBsZXQgdGV4dDIgPSBidWJibGVfY2hhcnRcbiAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC5zdHlsZShcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIilcbiAgICAgICAgLmF0dHIoXCJ4XCIsIDEwNTApXG4gICAgICAgIC5hdHRyKFwieVwiLCA4NilcbiAgICAgICAgLnRleHQoXCIyMCAtIDI5IGhvdXIgZGF5XCIpXG4gICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwibGltZVwiKVxuICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIFwibGltZVwiKTtcblxuICAgIGxldCB0ZXh0MyA9IGJ1YmJsZV9jaGFydFxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAuYXR0cihcInhcIiwgMTA1MClcbiAgICAgICAgLmF0dHIoXCJ5XCIsIDExNilcbiAgICAgICAgLnRleHQoXCIzMCAtIDM5IGhvdXIgZGF5XCIpXG4gICAgICAgIC5zdHlsZShcImNvbG9yXCIsIFwibGltZVwiKVxuICAgICAgICAuc3R5bGUoXCJmaWxsXCIsIFwibGltZVwiKTtcblxuICAgIGxldCB0ZXh0NCA9IGJ1YmJsZV9jaGFydFxuICAgICAgLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgLnN0eWxlKFwicG9zaXRpb25cIiwgXCJhYnNvbHV0ZVwiKVxuICAgICAgICAuYXR0cihcInhcIiwgMTA1MClcbiAgICAgICAgLmF0dHIoXCJ5XCIsIDE0NilcbiAgICAgICAgLnRleHQoXCI+PSA0MCBob3VyIGRheVwiKVxuICAgICAgICAuc3R5bGUoXCJjb2xvclwiLCBcImxpbWVcIilcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcImxpbWVcIik7XG59IiwiZXhwb3J0IGNvbnN0IGNoYXJ0ID0gKCkgPT4ge1xuXG4gIGxldCBtYXJnaW4gPSB7IGxlZnQ6IDEwMCwgcmlnaHQ6IDgwLCB0b3A6IDEwLCBib3R0b206IDEzMCB9O1xuXG4gIGxldCB3aWR0aCA9IDEzMDAgLSBtYXJnaW4ubGVmdCAtIG1hcmdpbi5yaWdodDtcbiAgbGV0IGhlaWdodCA9IDcwMCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuXG4gIGxldCBmbGFnID0gdHJ1ZTtcblxuICBsZXQgdCA9IGQzLnRyYW5zaXRpb24oKS5kdXJhdGlvbigyNTAwKTtcblxuICBsZXQgY2hhcnQgPSBkMy5zZWxlY3QoJyNjaGFydCcpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodCArIG1hcmdpbi50b3AgKyBtYXJnaW4uYm90dG9tKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodCk7XG5cbiAgbGV0IGcgPSBjaGFydC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIrIG1hcmdpbi5sZWZ0ICsgXCIsXCIgKyBtYXJnaW4udG9wICsgXCIpXCIpXG5cbiAgbGV0IHhBeGlzR3JvdXAgPSBnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwieC1heGlzXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCwgXCIgKyBoZWlnaHQgKyBcIilcIik7XG5cbiAgbGV0IHlBeGlzR3JvdXAgPSBnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwieS1heGlzXCIpO1xuXG4gIGxldCB5ID0gZDMuc2NhbGVMaW5lYXIoKVxuICAgIC5yYW5nZShbaGVpZ2h0LCAwXSk7XG5cbiAgbGV0IHggPSBkMy5zY2FsZUJhbmQoKVxuICAgIC5yYW5nZShbMCwgd2lkdGhdKVxuICAgIC5wYWRkaW5nSW5uZXIoMC4zKVxuICAgIC5wYWRkaW5nT3V0ZXIoMC4zKVxuXG4gIGxldCB4TGFiZWwgPSBnLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcImNsYXNzXCIsIFwieEF4aXNMYWJlbFwiKVxuICAgIC5hdHRyKFwieFwiLCB3aWR0aCAvIDIpXG4gICAgLmF0dHIoXCJ5XCIsIGhlaWdodCArIDEyMClcbiAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBcIjMwcHhcIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLnRleHQoXCJTdGFyIFdhcnMgQ2hhcmFjdGVyc1wiKVxuICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiZnVjaHNpYVwiKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcImZ1Y2hzaWFcIik7XG5cbiAgbGV0IHlMYWJlbCA9IGcuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJ5QXhpc0xhYmVsXCIpXG4gICAgLmF0dHIoXCJ4XCIsIC0gKGhlaWdodCAvIDIpKVxuICAgIC5hdHRyKFwieVwiLCAtNjApXG4gICAgLmF0dHIoXCJmb250LXNpemVcIiwgXCIzMHB4XCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwicm90YXRlKC05MClcIilcbiAgICAudGV4dChcIkhlaWdodFwiKVxuICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiZnVjaHNpYVwiKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcImZ1Y2hzaWFcIik7XG5cbiAgZDMuanNvbihcImRhdGEvcGVvcGxlLmpzb25cIilcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGRhdGEuZm9yRWFjaChkYXR1bSA9PiB7XG4gICAgICAgIGRhdHVtLmhlaWdodCA9ICtkYXR1bS5oZWlnaHQ7XG4gICAgICAgIGRhdHVtLm1hc3MgPSArZGF0dW0ubWFzcztcbiAgICB9KVxuXG4gICAgXG5cbiAgZDMuaW50ZXJ2YWwoKCkgPT4ge1xuICAgIHVwZGF0ZShkYXRhKVxuICAgIGZsYWcgPSAhZmxhZ1xuICAgIH0sIDMwMDApO1xuICAgIHVwZGF0ZShkYXRhKTtcbiAgfSlcblxuICBjb25zdCB1cGRhdGUgPSAoZGF0YSkgPT4ge1xuICAgIGxldCB2YWx1ZSA9IGZsYWcgPyBcImhlaWdodFwiIDogXCJtYXNzXCI7XG4gICAgeS5kb21haW4oWzAsIGQzLm1heChkYXRhLCBkID0+IHsgcmV0dXJuIGRbdmFsdWVdIH0pXSk7XG4gICAgeC5kb21haW4oZGF0YS5tYXAoZCA9PiB7IHJldHVybiBkLm5hbWUgfSkpO1xuXG4gICAgLy8gWCBBeGlzXG4gICAgbGV0IHhBeGlzQ2FsbCA9IGQzLmF4aXNCb3R0b20oeCk7XG4gICAgeEF4aXNHcm91cC50cmFuc2l0aW9uKHQpLmNhbGwoeEF4aXNDYWxsKVxuICAgICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgIC5hdHRyKFwieVwiLCBcIjEwXCIpXG4gICAgICAuYXR0cihcInhcIiwgXCItNVwiKVxuICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcImVuZFwiKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJyb3RhdGUoLTQwKVwiKVxuICAgICAgLmF0dHIoXCJzdHJva2VcIiwgXCJmdWNoc2lhXCIpO1xuXG4gICAgLy8gWSBBeGlzXG4gICAgbGV0IHlBeGlzQ2FsbCA9IGQzLmF4aXNMZWZ0KHkpXG4gICAgICAudGlja3MoNylcbiAgICAgIC50aWNrRm9ybWF0KGQgPT4ge1xuICAgICAgICByZXR1cm4gZFxuICAgICAgfSk7XG4gICAgeUF4aXNHcm91cC50cmFuc2l0aW9uKHQpLmNhbGwoeUF4aXNDYWxsKVxuICAgICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwiZnVjaHNpYVwiKTtcblxuICAgIC8vIEpPSU4gbmV3IGRhdGEgd2l0aCBvbGQgZWxlbWVudHMuXG4gICAgbGV0IHJlY3RhbmdsZXMgPSBnLnNlbGVjdEFsbChcInJlY3RcIilcbiAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgLy8gRVhJVCBvbGQgZWxlbWVudHMgbm90IHByZXNlbnQgaW4gZGF0YS5cbiAgICByZWN0YW5nbGVzLmV4aXQoKVxuICAgICAgLmF0dHIoXCJmaWxsXCIsIFwieWVsbG93XCIpXG4gICAgLnRyYW5zaXRpb24odClcbiAgICAgIC5hdHRyKFwieVwiLCB5KDApKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMClcbiAgICAgIC5yZW1vdmUoKTtcbiAgICAvLyBVUERBVEUgb2xkIGVsZW1lbnRzIHByZXNlbnQgaW4gbmV3IGRhdGEuXG4gICAgcmVjdGFuZ2xlcy50cmFuc2l0aW9uKHQpXG4gICAgICAgIC5hdHRyKFwieVwiLCAoZCkgPT4geyByZXR1cm4geShkW3ZhbHVlXSkgfSlcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgKGQpID0+IHsgcmV0dXJuIGhlaWdodCAtIHkoZFt2YWx1ZV0pIH0pXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgeC5iYW5kd2lkdGgpXG4gICAgICAgIC5hdHRyKFwieFwiLCAoZCwgaSkgPT4geyByZXR1cm4geChkLm5hbWUpIH0pXG4gICAgLy8gRU5URVIgbmV3IGVsZW1lbnRzIHByZXNlbnQgaW4gbmV3IGRhdGEuXG4gICAgcmVjdGFuZ2xlcy5lbnRlcigpXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCB4LmJhbmR3aWR0aClcbiAgICAgIC5hdHRyKFwieFwiLCAoZCwgaSkgPT4geyByZXR1cm4geChkLm5hbWUpIH0pXG4gICAgICAuYXR0cihcImZpbGxcIiwgXCJ5ZWxsb3dcIilcbiAgICAgIC5hdHRyKFwieVwiLCB5KDApKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgMClcbiAgICAudHJhbnNpdGlvbih0KVxuICAgICAgLmF0dHIoXCJ5XCIsIChkKSA9PiB7IHJldHVybiB5KGRbdmFsdWVdKSB9KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgKGQpID0+IHsgcmV0dXJuIGhlaWdodCAtIHkoZFt2YWx1ZV0pIH0pO1xuXG4gICAgbGV0IGxhYmVsID0gZmxhZyA/IFwiSGVpZ2h0IChjbSlcIiA6IFwiTWFzcyAoa2cpXCJcbiAgICBsZXQgeGxhYmVsID0gZmxhZyA/IFwiU3RhciBXYXJzIENoYXJhY3RlcidzIEhlaWdodFwiIDogXCJTdGFyIFdhcnMgQ2hhcmFjdGVyJ3MgV2VpZ2h0XCJcbiAgICB5TGFiZWwudGV4dChsYWJlbCk7XG4gICAgeExhYmVsLnRleHQoeGxhYmVsKTtcbiAgfVxuXG59O1xuXG5cblxuXG4iLCJleHBvcnQgY29uc3QgY2lyY3VsYXIgPSAoKSA9PiB7XG4gIGxldCBtYXJnaW4gPSB7IGxlZnQ6IDEwMCwgcmlnaHQ6IDEwMCwgdG9wOiAxMDAsIGJvdHRvbTogMTAwIH1cblxuICBsZXQgd2lkdGggPSAxMTAwIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gIGxldCBoZWlnaHQgPSA4MDAgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcbiAgbGV0IGlubmVyUmFkaXVzID0gMTUwO1xuICBsZXQgb3V0ZXJSYWRpdXMgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KSAvIDI7XG5cbiAgbGV0IGNpcmN1bGFyID0gZDMuc2VsZWN0KFwiI2NpcmN1bGFyXCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXR0cihcIndpZHRoXCIsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG5cbiAgbGV0IGdyYXBoID0gY2lyY3VsYXIuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgd2lkdGggLyAxLjUgKyBcIixcIiArIChoZWlnaHQgLyAyICsgMTAwKSArIFwiKVwiKTtcblxuXG4gIGQzLmpzb24oXCJkYXRhL3N0YXJzaGlwcy5qc29uXCIpXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBkYXRhLmZvckVhY2goZGF0dW0gPT4ge1xuICAgICAgICBkYXR1bS5jb3N0X2luX2NyZWRpdHMgPSArIGRhdHVtLmNvc3RfaW5fY3JlZGl0cztcbiAgICAgICAgZGF0dW0ubGVuZ3RoID0gK2RhdHVtLmxlbmd0aDtcbiAgICAgICAgZGF0dW0ubWF4X2F0bW9zcGhlcmluZ19zcGVlZCA9ICtkYXR1bS5tYXhfYXRtb3NwaGVyaW5nX3NwZWVkO1xuICAgICAgICBkYXR1bS5jcmV3ID0gK2RhdHVtLmNyZXc7XG4gICAgICAgIGRhdHVtLnBhc3NlbmdlcnMgPSArZGF0dW0ucGFzc2VuZ2VycztcbiAgICAgICAgZGF0dW0uY2FyZ29fY2FwYWNpdHkgPSArZGF0dW0uY2FyZ29fY2FwYWNpdHk7XG4gICAgICAgIGRhdHVtLmh5cGVyZHJpdmVfcmF0aW5nID0gK2RhdHVtLmh5cGVyZHJpdmVfcmF0aW5nO1xuICAgICAgICBkYXR1bS5NR0xUID0gK2RhdHVtLk1HTFQ7XG4gICAgICB9KVxuXG5cbiAgICAgIGxldCB4ID0gZDMuc2NhbGVCYW5kKClcbiAgICAgICAgLnJhbmdlKFswLCAoMiAqIE1hdGguUEkpXSlcbiAgICAgICAgLmFsaWduKDApXG4gICAgICAgIC5kb21haW4oIGRhdGEubWFwKCAoZCkgPT4geyByZXR1cm4gZC5uYW1lIH0pKTtcblxuICAgICAgbGV0IHkgPSBkMy5zY2FsZUxpbmVhcigpXG4gICAgICAgIC5yYW5nZShbaW5uZXJSYWRpdXMsIG91dGVyUmFkaXVzXSlcbiAgICAgICAgLmRvbWFpbihbMCwgMV0pO1xuXG4gICAgICBncmFwaC5hcHBlbmQoXCJnXCIpXG4gICAgICAgIC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoXCJwYXRoXCIpXG4gICAgICAgICAgLmF0dHIoXCJmaWxsXCIsIFwiYmx1ZVwiKVxuICAgICAgICAgIC5hdHRyKFwic3Ryb2tlXCIsIFwid2hpdGVcIilcbiAgICAgICAgICAuYXR0cihcImRcIiwgZDMuYXJjKClcbiAgICAgICAgICAgIC5pbm5lclJhZGl1cyhpbm5lclJhZGl1cylcbiAgICAgICAgICAgIC5vdXRlclJhZGl1cyggKGQpID0+IHsgcmV0dXJuIHkoKGQuaHlwZXJkcml2ZV9yYXRpbmcpKTsgfSlcbiAgICAgICAgICAgIC5zdGFydEFuZ2xlKCAoZCkgPT4geyByZXR1cm4geChkLm5hbWUpOyB9KVxuICAgICAgICAgICAgLmVuZEFuZ2xlKCAoZCkgPT4geyByZXR1cm4geChkLm5hbWUpICsgeC5iYW5kd2lkdGgoKTsgfSlcbiAgICAgICAgICAgIC5wYWRBbmdsZSgwLjAzKVxuICAgICAgICAgICAgLnBhZFJhZGl1cyhpbm5lclJhZGl1cykpXG5cbiAgICAgIGdyYXBoLmFwcGVuZChcImdcIilcbiAgICAgICAgLnNlbGVjdEFsbChcImdcIilcbiAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgLmVudGVyKClcbiAgICAgICAgLmFwcGVuZChcImdcIilcbiAgICAgICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gKHgoZC5uYW1lKSArIHguYmFuZHdpZHRoKCkgLyAyICsgTWF0aC5QSSkgJSAoMiAqIE1hdGguUEkpIDwgTWF0aC5QSSA/IFwiZW5kXCIgOiBcInN0YXJ0XCI7IH0pXG4gICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBcInJvdGF0ZShcIiArICgoeChkLm5hbWUpICsgeC5iYW5kd2lkdGgoKSAvIDIpICogMTgwIC8gTWF0aC5QSSAtIDkwKSArIFwiKVwiICsgXCJ0cmFuc2xhdGUoXCIgKyAoeShkLmh5cGVyZHJpdmVfcmF0aW5nKSArIDEwKSArIFwiLDApXCI7IH0pXG4gICAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgICAgIC5hdHRyKFwiY29sb3JcIiwgXCJ3aGl0ZVwiKVxuICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkgeyByZXR1cm4gKGQubmFtZSkgfSlcbiAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZnVuY3Rpb24gKGQpIHsgcmV0dXJuICh4KGQubmFtZSkgKyB4LmJhbmR3aWR0aCgpIC8gMiArIE1hdGguUEkpICUgKDIgKiBNYXRoLlBJKSA8IE1hdGguUEkgPyBcInJvdGF0ZSgxODApXCIgOiBcInJvdGF0ZSgwKVwiOyB9KVxuICAgICAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIxMXB4XCIpXG4gICAgICAgIC5hdHRyKFwiYWxpZ25tZW50LWJhc2VsaW5lXCIsIFwibWlkZGxlXCIpXG5cbiAgICB9KVxufSIsImltcG9ydCB7IGNoYXJ0IH0gZnJvbSAnLi9jaGFydCc7XG5pbXBvcnQgeyBidWJibGVfY2hhcnQgfSBmcm9tICcuL2J1YmJsZV9jaGFydCc7XG5pbXBvcnQgeyBjaXJjdWxhciB9IGZyb20gJy4vY2lyY3VsYXInO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgYnViYmxlX2NoYXJ0KCk7XG4gIGNoYXJ0KCk7XG4gIGNpcmN1bGFyKCk7XG59KTtcblxuIl0sInNvdXJjZVJvb3QiOiIifQ==