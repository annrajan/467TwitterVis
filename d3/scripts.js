
let w = window.innerWidth,
    h = window.innerHeight;

let svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height', h);

let data_mini = "data/minidata.json";
let data_tweets_2 = "../sorted_tweet_data_2.json";
let data = null;

d3.json(data_mini, function(error, json) {
    if (error) console.log(error);
    let rawData = json;
    let data = [];
    var numTopics = Object.keys(rawData).length; // length of outermost JSON object
    console.log(numTopics);

    //For each topic rawData[i]
    for(var i = 0; i<numTopics; i++){
        data.push({'tweets': rawData[i].tweets, 'words': rawData[i].words});
    }

    dataReady(data);
});

function dataReady(data){
    let force = d3.layout.force()
        .nodes(data)
        .charge(-100)
        .on('tick', tick)
        .start();

    let nodes = svg.selectAll('.node')
        .data(data);

    let nodeEnter = nodes.enter().append('g')
        .attr('class', 'node');

    nodeEnter.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 30);

    nodeEnter.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.34em');

    svg.selectAll("circle").on("click", function(){
        d3.select(this).attr('r', 25)
            .style("fill","lightcoral")
            .style("stroke","red");
    });

    function tick() {
        nodes.attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });
        nodes.select('text').text(function(d) {
            return "test text";
        });
    }
}