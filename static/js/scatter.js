/**
 * @class Scatter
 */
class Scatter {

    // Vars
    data_bins = [];

    // Elements
    svg = null;
    g = null;
    xAxisG = null;
    yAxisG = null;

    // Configs
    svgW = 360;
    svgH = 360;
    gMargin = {top: 50, right: 25, bottom: 75, left: 75};
    gW = this.svgW - (this.gMargin.right + this.gMargin.left);
    gH = this.svgH - (this.gMargin.top + this.gMargin.bottom);
    radius = Math.min(360, 360) / 3;  // donut radius
    // colors

    // Tools
    scX = d3.scaleLinear()
            .range([0, this.gW]);
    scY = d3.scaleLinear()
            .range([this.gH, 0]);
    histogram = d3.histogram();
    yAxis = d3.axisLeft().ticks(5);
    xAxis = d3.axisBottom();

    /*
    Constructor
     */
    constructor(_data, _target) {
        // Assign parameters as object fields
        this.data = _data;
        this.target = _target;

        // Now init
        this.init();
    }

    /** @function init()
     * Perform one-time setup function
     *
     * @returns void
     */
    init() {
        // Define this vis
        const vis = this;

        // Set up the svg/g work space
        vis.svg = d3.select(`#${vis.target}`)
            .append('svg')
            .attr('width', vis.svgW)
            .attr('height', vis.svgH)
        vis.g = vis.svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${vis.gMargin.left}px, ${vis.gMargin.top}px)`);

        // Append axes
        vis.xAxisG = vis.g.append('g')
            .attr('class', 'axis axisX')
            .style('transform', `translateY(${vis.gH + 35}px)`);
        vis.xAxisG.append('text')
            .attr('class', 'label labelX')
            .style('transform', `translate(${vis.gW / 2}px, 40px)`)
            .text('Years of Experience (radius = Age)');
        vis.yAxisG = vis.g.append('g')
            .attr('class', 'axis axisY')
            .style('transform', 'translateX(-15px)');
        vis.yAxisG.append('text')
            .attr('class', 'label labelY')
            .style('transform', `rotate(-90deg) translate(-${vis.gH / 2}px, -30px)`)
            .text('HW1 Hours');

        // Now wrangle
        vis.wrangle();
    }

    /** @function wrangle()
     * Preps data for vis
     *
     * @returns void
     */
    wrangle() {
        // Define this vis
        const vis = this;

        // Map ages
        const xData = vis.data.map(d => d.experience_yr);
        const yData = vis.data.map(d => d.hw1_hrs);
        const rData = vis.data.map(d => d.age);
        var newData=[];
        for(var i=0;i<xData.length;i++){
           newData.push( [xData[i], yData[i] ]);
        };
        console.log(newData);
        console.log(vis.data);

        var r = d3.scaleLinear()
            .domain([0, d3.max(vis.data, function (d) { return d.age; })])
            .range([0, 12]);

        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 30, bottom: 100, left: 60},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 15])
            .range([ 0, width]);
        vis.g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 15])
            .range([ height, 0]);
        vis.g.append("g")
            .call(d3.axisLeft(y));
        
        //Generate groups
        var dots = vis.g.selectAll("dot")
            .data(vis.data)
            .enter()
            .append("circle")
                .attr("cx", function (d) { return x(d.experience_yr); } )
                .attr("cy", function (d) { return y(d.hw1_hrs); } )
                .attr("r", function (d) { return r(d.age);}) //radius
                .style("fill", "#69b3a2")
            

        // Now render
        vis.render();
    }

    /** @function render()
     * Builds, updates, removes elements in vis
     *
     * @returns void
     */
    render() {
        // Define this vis
        const vis = this;

       

    }
}