import React, { Component } from 'react'
import * as d3 from 'd3'
import axios from 'axios';

class QuestionChart extends Component {
  constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
      axios.post('https://f9cd519d.ngrok.io/analytics/question', {
            day: 1,
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
    onDropdownSelected(e) {
        d3.select("#questioncanvas").remove();
        var selectionData = {
            day: e.target.value,
        }
        axios.post('https://f9cd519d.ngrok.io/analytics/question', selectionData)
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
        .attr("id", "questioncanvas")
	    .attr("width", "70%")
	    .attr("height", canvasHeight)
	    .style("border", "1px solid black")
        .style("background", "#EBDEF0")

    svgCanvas.selectAll("rect")
	    .data(data).enter()
        .append("rect")
        .attr("height", 40)
        .attr("width", (datapoint) => datapoint.occurences * scale)
        .attr("fill", "#A569BD")
        .attr("y", (datapoint, iteration) => iteration * 45)

    svgCanvas.selectAll("text")
	    .data(data).enter()
        .append("text")
        .attr("y", (dataPoint, i) => (i+1) * 45 - 20)
        .text(datapoint => datapoint.question + " (" + datapoint.occurences + ")")
    }
    render() { 
        return <div>
        <div>Top 10 questions since : <select onChange={this.onDropdownSelected.bind(this)} >
        <option key={1} value={1}>Today</option>
        <option key={2} value={2}>Yesterday</option>
        <option key={3} value={7}>Last Week</option>
        <option key={4} value={30}>Last Month</option>
        </select></div>
        <br />
        <div ref="canvas"></div>
        </div> 
    }
}
export default QuestionChart;