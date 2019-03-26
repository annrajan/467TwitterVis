<!--import * as d3 from "./lib/http_cdnjs.cloudflare.com_ajax_libs_d3_3.5.3_d3";-->

let w = window.innerWidth,
    h = window.innerHeight;

let svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height', h);

let data_mini = "data/minidata.json";
let data_mini_local = {"0": {"tweets": ["I spy with my little eye...the unique eyes of the aquatic animal world! Zoom in for some eye contact with this week's #FanPhotos.\n", "New digs for the gators! We recently moved our American alligators to a larger habitat in our Islands and Lakes gallery, where they have plenty of room to swim around and bask on the rocks.\n", "From the flame-red wattled jacana to the finely spotted garden eel, there's a world of aquatic wonder to experience at Shedd. Check out these #FanPhotos for your weekly dose of underwater inspiration.\n", "In honor of #StPatricksDay, we present: the color green. You'll find most green animals up in tree branches, where they blend right in with emerald leaves, while green aquatic animals are relatively rare!\n", "For #WorldFrogDay, take a look at Shedd's partnership with @ChicagoBotanic\u2014together, we're removing invasive plants to study the benefit to local amphibian habitats. Read more on our blog! https://www.sheddaquarium.org/blog/2019/march/flowers-and-frogs-plants-and-animals-benefit-from-new-collaboration-with-the-chicago-botanic-garden/ \n", "We love sunny days in Lake Michigan creeks! Look at how gorgeous this restored ravine creek is! Kudos to the Park District of Highland Park for your hard work of restoring connectivity in this creek and others! The suckers thank you too as they can access spawning habitat!\n", "Aquatic animals come in all shapes and sizes, just like our #FanPhotos! Whether slinky like the honeycomb moray or compact like the blue blubber jelly, we celebrate the diversity of the underwater animal world every day.\n", "It's #NationalWildlifeWeek, and what better way to celebrate than to help keep aquatic habitats pollution free for the animals that call them home? Stand with Shedd as we work to protect lakes, streams and wetlands across the nation: https://www.sheddaquarium.org/raiseyourvoice  #WOTUS #CleanWaterAct\n", "For #WorldWetlandsDay, we're taking a look at the Amazon. Aquarist Evan Kinn says of our River Channel habitat: \"River channels support 1000s of animals, each with its own unique survival strategy for fast-flowing whitewaters or deeper, slower pools with low visibility.\"\n", "Looking for the perfect #SpringBreak plans? Travel the world of aquatic wonder right here in Chicago! Grab your tickets: https://www.sheddaquarium.org/plan-a-visit/Advance-Ticket-Options-Tickets/ \n"], "words": ["habitat", "aquatic", "world", "fanphotos", "lake", "celebrate", "these", "today", "dolphinawarenessmonth", "learn"]}, "1": {"tweets": ["\u201cOur oceans are suffocating.\u201d \u2014 @Skilling shares staggering statistics about how our oceans have grown more acidic as our planet\u2019s climate changes at today\u2019s #ClimateResiliency forum with @RepMikeQuigley. It\u2019s time for us all to #ActOnClimate.\n", "WGN\u2019s @Skilling joins us for our #ClimateResiliency forum with @RepMikeQuigley this morning. He shared that while Chicago experienced #extremecold this week, Alaska had to cancel a sled dog race because it was raining and they didn\u2019t have snow.\n", "#Live now! @RepMikeQuigley is sharing a feed from today's #ClimateResiliency summit at Shedd with @Skilling, @MaryGade and Shedd coral researcher @jrcunning. Tune in at https://www.facebook.com/repmikequigley/videos/1063304593838462/ \n", "Ready to see more of Shedd? Upgrade your next visit with a Private Personalized Tour! Tell us your favorite animals, from giant Pacific octopus Rizzo to sea otter Ellie, and we'll design the perfect tour just for you. Learn more: http://bit.ly/2EXm760 \n", "Are you prepared for a 50F temperature range this week? #ExtremeWeather is not the norm. Tomorrow, join us, @RepMikeQuigley and @Skilling to talk about #ClimateChange and #ClimateResiliency & to #ActOnClimate https://www.eventbrite.com/e/climate-resiliency-forum-tickets-54867060856 \n", "With #FacebookDown, it's the perfect time to catch up on your Shedd blog reading! Here are a handful of our favorites:\n", "Warm up with the bright stripes of the copperband butterflyfish and deep hues of the vermilion sea star in this week's #FanPhotos! Tag us in your favorite photos from your visit for a chance to be featured next week.\n", "Time for an underwater close-up! This week's #FanPhotos bring you eye-to-eye with the mantis shrimp, squirrelfish and suckermouth catfish. Don't forget to tag us in your favorite shots for a chance to be featured next week.\n", "Oceans are soaking up 93% of excess heat from #ClimateChange\u2014and the impacts are here. Join us today to learn about these impacts and #ClimateAction with @RepMikeQuigley and @Skilling\n", " https://www.eventbrite.com/e/climate-resiliency-forum-tickets-54867060856 \u2026 #ClimateResiliency\n"], "words": ["favorite", "fanphotos", "climateresiliency", "repmikequigley", "skilling", "perfect", "about", "learn", "today", "otter"]}};
let data_tweets_2 = "../sorted_tweet_data_2.json";
let country = "data/cumulative_country_subs.json";
let data = null;

// $.getJSON(data_mini, function(json){
//     data = json;
//
//     console.log(data.length);
//     console.log(json.length);
//
//     for(var i = 0; i< data.length; i++){
//         console.log(data[i]);
//     }
//     dataReady();
// });

d3.json(data_mini, function(error, json) {
    if (error) console.log(error);
    let rawData = json;
    var numTopics = Object.keys(rawData).length; // length of outermost JSON object
    console.log(numTopics);

    // For each topic
    for(var i = 0; i<numTopics; i++){
        console.log(rawData[i]);
        // for(var j = 0; j<rawData[i].tweets.length; j++){
        //
        // }
    }

    dataReady();
});

// parseLocalJson(data_mini_local);
//
// function parseLocalJson(input) {
//     let rawData = JSON.parse(input);
//
//     // For each topic
//     for(var i = 0; i<rawData.length; i++){
//         console.log(rawData[i]);
//         // for(var j = 0; j<rawData[i].tweets.length; j++){
//         //
//         // }
//     }
//
//     dataReady();
// };

function dataReady(){
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