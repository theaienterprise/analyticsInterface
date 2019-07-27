import React, { Component } from 'react'
import * as d3 from 'd3'
import axios from 'axios';

var varmonth = 1;
var varyear = 2019;
var varcity = "";

class PlatformChart extends Component {
  constructor(props) {
        super(props);
        this.state = {
            cityList: [],
            data: []
        };
    }

    componentDidMount() {
        axios.get('https://f9cd519d.ngrok.io/analytics/citylist')
            .then(response => {
                this.setState({
                    cityList: response.data.details,
                });
                varcity = this.state.cityList[0].location;
                var selectionData = {
                    city: varcity,
                    month: varmonth,
                    year: varyear
                }
            axios.post('https://f9cd519d.ngrok.io/analytics/platform', selectionData)
                        .then(res => {
                            // console.log(response.data.details);
                            // console.log(response.data.details.length);
                            this.setState({
                              data: res.data.details,
                            });
                            this.drawBarChart(this.state.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

            })
            .catch(function (error) {
                console.log(error);
            });
        
    }

    onDropdownSelected(e) {
        d3.select("#locationcanvas").remove();
        var selectionData = {
            city: e.target.value,
            month: varmonth,
            year: varyear,
        }
        axios.post('https://f9cd519d.ngrok.io/analytics/platform', selectionData)
            .then(response => {
                this.setState({
                  data: response.data.details,
                });
                this.drawBarChart(this.state.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    monthChanged(e) {
        d3.select("#locationcanvas").remove();
        varmonth = e.target.value;
        var selectionData = {
            city: varcity,
            month: varmonth,
            year: varyear,
        }
        axios.post('https://f9cd519d.ngrok.io/analytics/platform', selectionData)
            .then(response => {
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
        d3.select("#locationcanvas").remove();
        varyear = e.target.value;
        var selectionData = {
            city: varcity,
            month: varmonth,
            year: varyear,
        }
        axios.post('https://f9cd519d.ngrok.io/analytics/platform', selectionData)
            .then(response => {
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
    	const svgCanvas = d3.select(this.refs.canvasloc)
    	.append("svg")
        .attr("id", "locationcanvas")
	    .attr("width", "70%")
	    .attr("height", canvasHeight)
	    .style("border", "1px solid black")
        .style("background", "#D6EAF8")

    svgCanvas.selectAll("rect")
	    .data(data).enter()
        .append("rect")
        .attr("height", 40)
        .attr("width", (datapoint) => datapoint.occurences * scale)
        .attr("fill", "#3498DB")
        .attr("y", (datapoint, iteration) => iteration * 45)

    svgCanvas.selectAll("text")
	    .data(data).enter()
        .append("text")
        .attr("y", (dataPoint, i) => (i+1) * 45 - 20)
        .text(datapoint => datapoint.platform + " (" + datapoint.occurences + ")")
    }
    render() {
        let optionItems = this.state.cityList.map((datapoint) =>
                <option key={datapoint.location}>{datapoint.location}</option>
            );

        return (<div>
            <div>Platform wise distribution || Filter by top 5 cities : <select onChange={this.onDropdownSelected.bind(this)} >{optionItems}</select> for <select onChange={this.monthChanged.bind(this)}>
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
        </select><br /></div><br />
            
            <div ref="canvasloc"></div>
            </div>
            )
      }
}
export default PlatformChart;