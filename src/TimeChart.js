import React, { Component } from 'react'
import * as d3 from 'd3'
import axios from 'axios';

var varmonth = 1;
var varyear = 2019;

class TimeChart extends Component {
  constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {
      axios.post('https://f9cd519d.ngrok.io/analytics/time', {
            month: varmonth,
            year: varyear,
        })
            .then(response => {
                // console.log(response.data.details);
                // console.log(response.data.details.length);
                this.setState({
                  data: response.data.details,
                });
                this.drawBarChart(this.state.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        
    }
    yearChanged(e) {
        d3.select("#timecanvas").remove();
        varyear = e.target.value;
        var selectionData = {
            month: varmonth,
            year: varyear,
        }
        axios.post('https://f9cd519d.ngrok.io/analytics/time', selectionData)
            .then(response => {
                // console.log(response.data.details);
                // console.log(response.data.details.length);
                this.setState({
                  data: response.data.details,
                });
                this.drawBarChart(this.state.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    onDropdownSelected(e) {
        d3.select("#timecanvas").remove();
        varmonth = e.target.value;
        var selectionData = {
            month: varmonth,
            year: varyear,
        }
        axios.post('https://f9cd519d.ngrok.io/analytics/time', selectionData)
            .then(response => {
                // console.log(response.data.details);
                // console.log(response.data.details.length);
                this.setState({
                  data: response.data.details,
                });
                this.drawBarChart(this.state.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    drawBarChart(data)  {
    	const canvasHeight = (data.length)*45;
		const scale = 50
    	const svgCanvas = d3.select(this.refs.canvas)
    	.append("svg")
        .attr("id", "timecanvas")
	    .attr("width", "70%")
	    .attr("height", canvasHeight)
	    .style("border", "1px solid black")
        .style("background", "#FAD7A0")

    svgCanvas.selectAll("rect1")
	    .data(data).enter()
        .append("rect")
        .attr("height", 40)
        .attr("width", (datapoint) => (datapoint.am) * scale)
        .attr("fill", "#E67E22")
        .attr("y", (datapoint, iteration) => iteration * 45)

    svgCanvas.selectAll("rect2")
        .data(data).enter()
        .append("rect")
        .attr("height", 40)
        .attr("width", (datapoint) => (datapoint.pm) * scale)
        .attr("fill", "#F39C12")
        .attr("x", (datapoint) => (datapoint.am) * scale)
        .attr("y", (datapoint, iteration) => iteration * 45)

    var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    svgCanvas.selectAll("text")
	    .data(data).enter()
        .append("text")
        .attr("y", (dataPoint, i) => (i+1) * 45 - 20)
        .text(datapoint => {
            return weekdays[datapoint.day] + " (" + datapoint.am + "/" + datapoint.pm + ")";
        })
    }
    render() { 
        return <div>
        <div>Weekly distribution (am/pm) for : <select onChange={this.onDropdownSelected.bind(this)}>
        <option key={1} value={1}>January</option>
        <option key={2} value={2}>February</option>
        <option key={3} value={3}>March</option>
        <option key={4} value={4}>April</option>
        <option key={5} value={5}>May</option>
        <option key={6} value={6}>June</option>
        <option key={7} value={7}>July</option>
        <option key={8} value={8}>August</option>
        <option key={9} value={9}>September</option>
        <option key={10} value={10}>October</option>
        <option key={11} value={11}>November</option>
        <option key={12} value={12}>December</option>
        </select>
        <select
        onChange={this.yearChanged.bind(this)}>
        <option key={1} value={2019}>2019</option>
        <option key={2} value={2020}>2020</option>
        <option key={3} value={2021}>2021</option>
        <option key={4} value={2022}>2022</option>
        <option key={5} value={2023}>2023</option>
        <option key={6} value={2024}>2024</option>
        <option key={7} value={2025}>2025</option>
        </select>
        </div>
        <br />
        <div ref="canvas"></div>
        </div> 
    }
}
export default TimeChart;