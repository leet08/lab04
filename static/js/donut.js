/**
 * @class Donut
 */
class Donut {

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
            .attr('transform', 'translate(' + (vis.svgW / 5) + ',' + (vis.svgH / 5) + ')');
        vis.g = vis.svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${vis.gMargin.left}px, ${vis.gMargin.top}px)`);


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
        const ageMap = vis.data.map(d => d.prog_lang);
        console.log(ageMap);

        // count into the sections
        var counts = [];
        counts = [0,0,0,0,0,0];

        for (var i = 0; i < ageMap.length; i++){
            if (ageMap[i] == "php") {counts[0] = counts[0]+1}
            if (ageMap[i] == "js") {counts[1] = counts[1]+1}
            if (ageMap[i] == "other") {counts[2] = counts[2]+1}
            if (ageMap[i] == "py") {counts[3] = counts[3]+1}
            if (ageMap[i] == "java") {counts[4] = counts[4]+1}
            if (ageMap[i] == "cpp") {counts[5] = counts[5]+1}
        }
        console.log(counts);

        // pie
        // Generate the pie
        var pie = d3.pie();
        var radius = Math.min(180, 180) / 2

        var color = d3.scaleOrdinal(['#FF0000','#00FF00','#0000FF','#FFFF00','#00FFFF','#FF00FF']);
            

        // Generate the arcs
        var arc = d3.arc()
            .innerRadius(radius-35)
            .outerRadius(radius);

        var div = d3.select("body").append("div")
            .attr("class", "tooltip-donut")
            .style("opacity", 0);

        
        //Generate groups
        var arcs = vis.g.selectAll("arc")
            .data(pie(counts))
            .enter()
            .append("g")
            .attr("class", "arc")

            .on('mouseover', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '.85');
                //Makes the new div appear on hover:
                div.transition()
                    .duration(50)
                    .style("opacity", 1);
                let num = (Math.round(d.value).toString());
                div.html(num)
                    .style("left", (d3.event.pageX - 50) + "px")
                    .style("top", (d3.event.pageY - 15) + "px");

            })
            .on('mouseout', function (d, i) {
                d3.select(this).transition()
                    .duration('50')
                    .attr('opacity', '1');
                //Makes the new div disappear:
                div.transition()
                    .duration('50')
                    .style("opacity", 0);
            });

                //Draw arc paths
        arcs.append("path")
            .attr("fill", function(d, i) {
            return color(i);
            })
            .attr("d", arc);
            

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