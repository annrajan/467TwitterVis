let data_mini = 'data/minidata.json';
let data_tweets_2 = '../sorted_tweet_data_2.json';
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

    dataReady(data, connections);
});

function dataReady(data, connections){
    let w = window.innerWidth,
        h = window.innerHeight;

    let radius = 100;

    let svg = d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

    let force = d3.layout.force()
        .nodes(data)
        .links(connections)
        .linkDistance(radius * 3 )
        .on('tick', tick)
        .start();

    let nodes = svg.selectAll('.node')
        .data(data)
        .enter().append('g')
        .attr('class', 'node');

    nodes.append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius);

    nodes.append('text')
        .attr('text-anchor', 'middle')
        .text(function() {
            console.log(nodes.data);
            return 'aaa';
        });


    let links = svg.selectAll('.line')
        .data(connections)
        .enter().append('line');

    svg.selectAll('g').on('click', function(){
        d3.select(this).select('text')
            .text(function() {
                return 'aaaaaaaaaaaa';
            });
        //data.tweets
    });

    function tick() {
        svg.selectAll('circle')
            .attr('cx', function(d) { return d.x = Math.max(radius, Math.min(w - radius, d.x)); })
            .attr('cy', function(d) { return d.y = Math.max(radius, Math.min(h - radius, d.y)); });

        svg.selectAll('text')
            .attr('x', function(d) { return d.x = Math.max(radius, Math.min(w - radius, d.x)); })
            .attr('y', function(d) { return d.y = Math.max(radius, Math.min(h - radius, d.y)); });

        links.attr('x1', function(d) { return d.source.x; })
            .attr('y1', function(d) { return d.source.y; })
            .attr('x2', function(d) { return d.target.x; })
            .attr('y2', function(d) { return d.target.y; });
    }
}