import React from 'react';
import * as d3 from 'd3';
import { margin,width,height } from '../../variables';
export default class Heatmap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { call: false };
    }
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {
        // append the svg object to the body of the page
        const { data } = this.props;
        console.log("heatmap",data);
        var svg = d3.select("#Heatmap")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // List of all variables and number of them
        var domain = d3.set(data.map(function (d) { return d.x })).values()
        // var num = Math.sqrt(data.length)

        // Create a color scale
        var color = d3.scaleLinear()
            .domain([-1, 0, 1])
            // .range(["red","#fff","blue"]);
            .range(["#B22222", "#fff", "#000080"]);

        // Create a size scale for bubbles on top right. Watch out: must be a rootscale!
        var size = d3.scaleSqrt()
            .domain([0, 1])
            .range([0, 9]);

        // X scale
        var x = d3.scalePoint()
            .range([0, width])
            .domain(domain)

        // Y scale
        var y = d3.scalePoint()
            .range([0, height])
            .domain(domain)

        // Create one 'g' element for each cell of the correlogram
        var cor = svg.selectAll(".cor")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "cor")
            .attr("transform", function (d) {
                return "translate(" + x(d.x) + "," + y(d.y) + ")";
            });
        // cor
        //     .filter(function (d) {
        //         var ypos = domain.indexOf(d.y);
        //         var xpos = domain.indexOf(d.x);
        //         return xpos == ypos;
        //     })
        //     .append("rect")
        //     .attr("x",function (d) {
        //         if(d.x === d.y){
        //             console.log(d.x)
        //             return d.x;
        //         }
        //     })
        //     .attr("y",function (d) {
        //         if(d.x === d.y){
        //             return d.y;
        //         }
        //     })
        //     .attr("width", 60)
        //     .attr("height", 40)
        //     .style("fill", "red")
            // .style("mix-blend-mode", "hue")
        // Low left part + Diagonal: Add the text with specific color
        cor
            .filter(function (d) {
                var ypos = domain.indexOf(d.y);
                var xpos = domain.indexOf(d.x);
                return xpos <= ypos;
            })
            .append("text")
            .attr("y", 5)
            .text(function (d) {
                if (d.x === d.y) {
                    return d.x;
                } else {
                    return d.value.toFixed(2);
                }
            })
            .style("font-size", function(d) {
                if (d.x === d.y){
                    return 15;
                }else {
                    return 10;
                }
            })
            .style("text-align", "center")
            .style("font-weight", function(d){
                if (d.x === d.y){
                    return "bold";
                }else{
                    return "normal";
                }
            })
            .style("fill", function (d) {
                if (d.x === d.y) {
                    return "#000";
                } else {
                    return color(d.value);
                }
            });
        
            var tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background-color", "whitesmoke")
            .style("color", "black")
            .style("border-radius", "5px")
            .style("padding", "10px")
            .style("opacity", .6)

        var showTooltip = function (d) {
          tooltip
            .html("Value: " + d.value.toFixed(2))
            .style("visibility", "visible");
        }
        var moveTooltip = function (d) {
          tooltip
            .style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
        }
        // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
        var hideTooltip = function (d) {
          tooltip
            .style("visibility", "hidden");
        }
        // Up right part: add circles
        cor
            .filter(function (d) {
                var ypos = domain.indexOf(d.y);
                var xpos = domain.indexOf(d.x);
                return xpos > ypos;
            })
            .append("circle")
            .attr("r", function (d) { return size(Math.abs(d.value)) })
            .style("fill", function (d) {
                if (d.x === d.y) {
                    return "#000";
                } else {
                    return color(d.value);
                }
            })
            .style("opacity", 0.8)
            .on("mouseover", showTooltip )
            .on("mousemove", moveTooltip )
            .on("mouseleave", hideTooltip );

    }
    render() {
        return (null);
      }


}