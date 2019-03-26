
let w = window.innerWidth,
    h = window.innerHeight;

let svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

let data_mini = "data/minidata.json";
let data_tweets_2 = "../sorted_tweet_data_2.json";
let data = null;

d3.json(data_mini, function(error, json) {
    if (error) console.log(error);
    let rawData = json;
    let data = [];
    let connections = [];
    var numTopics = Object.keys(rawData).length; // length of outermost JSON object
    console.log(numTopics);

    //For each topic rawData[i]
    for(var i = 0; i<numTopics; i++){
        data.push({'id': i, 'tweets': rawData[i].tweets, 'words': rawData[i].words});
        // data is a list of objects which contain lists?
    }

    data.forEach(function(d){
        for (var i = 0; i<numTopics; i++){
            for (var j = i+1; j<numTopics; j++){
                if(i != d.id) { //this might be wrong
                    connections.push({source: d.id, target: i});
                }
            }
        }
    });
    console.log(connections);
    dataReady(data, connections);
});

function dataReady(data, connections){
    let radius = 100;

    let force = d3.layout.force()
        .nodes(data)
        .linkDistance(radius)
        .on('tick', tick)
        .start();

    let nodes = svg.selectAll('.node')
        .data(data);

    let links = svg.selectAll('.line')
        .data(connections);

    console.log(links);

    let linkEnter = links.enter().append('line');

    console.log(nodes);

    let nodeEnter = nodes.enter().append('g')
        .attr('class', 'node');

    nodeEnter.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius);

    nodeEnter.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.34em');


    svg.selectAll("circle").on("click", function(){
        d3.select(this).attr('r', radius)
            .style("fill","lightcoral")
            .style("stroke","red");
    });

    function tick() {
        svg.selectAll("circle").attr("cx", function(d) { return d.x = Math.max(radius, Math.min(w - radius, d.x)); })
            .attr("cy", function(d) { return d.y = Math.max(radius, Math.min(h - radius, d.y)); });

        nodes.select('text').text(function(d) {
            return "test text";
        });

        linkEnter.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
    }
}