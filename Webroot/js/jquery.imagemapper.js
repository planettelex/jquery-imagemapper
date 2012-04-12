$(document).ready(function() {
    var isMapping = false;
    var clickNumber = 0;
    var shape = "rect";
    var mapName = "myImageMap";
    $("#imageMapper img").click(function(e) {
        if (isMapping) {
            clickNumber++;
            var coords = $("#imageMapper #coordinates").val();
            var x = e.pageX - $(this).offset().left;
            var y = e.pageY - $(this).offset().top;
            if (coords != "") {
                coords += ",";
            }
            if (clickNumber == 2 && shape == "circle") {
                coords = coords + calculateRadius(x, y);
            }
            else {
                coords = coords + x + "," + y;
            }
            $("#imageMapper #coordinates").val(coords);
            if (clickNumber >= 2 && (shape == "rect" || shape == "circle")) {
                stopMapping();
            }
            writeInstructions();
        }
    });
    $("#imageMapper input:radio").click(function() {
        shape = $(this).attr("id").toLowerCase();
    });
    $("#imageMapper #start").click(function() {
        if ($(this).val() == "Stop") {
            stopMapping();
        }
        else {
            buildMapTags();
            startMapping();
        }
    });
    $("#imageMapper #reset").click(function() {
        stopMapping();
        resetMapper();
    });
    $("#imageMapper #mapName").change(function() {
        mapName = $(this).val();
        buildMapTags();
        writeInstructions();
    });
    function startMapping() {
        isMapping = true;
        $("#imageMapper #start").val("Stop");
        writeInstructions();
    }
    function stopMapping() {
        updateResults();
        isMapping = false;
        clickNumber = 0;
        $("#imageMapper #start").val("Start");
        $("#imageMapper #coordinates").val("");
        writeInstructions();
    }
    function resetMapper() {
        $("#imageMapper #results").empty();
        $("#imageMapper #mapStartTag").empty();
        $("#imageMapper #mapEndTag").empty();
        $("#imageMapper #imageTag").empty();
        writeInstructions();
    }
    function buildMapTags() {
        $("#imageMapper #mapStartTag").html("&lt;map id='" + mapName + "' name='" + mapName + "' &gt;");
        $("#imageMapper #mapEndTag").html("&lt;/map&gt;");
        $("#imageMapper #imageTag").html("&lt;img alt='' src='" + $("#imageMapper img").attr("src") + "' usemap='#" + mapName + "' /&gt;");
    }
    function updateResults() {
        $("#imageMapper #results").append("&nbsp;&nbsp;&nbsp;&lt;area alt='' shape='" + shape + "' coords='" + $("#imageMapper #coordinates").val() + "' href='" + $("#imageMapper #url").val() + "' /&gt;<br/>");
    }
    function calculateRadius(x2, y2) {
        var x1 = $("#imageMapper #coordinates").val().split(",")[0];
        var y1 = $("#imageMapper #coordinates").val().split(",")[1];
        var xVal = Math.pow(x2 - x1, 2);
        var yVal = Math.pow(y2 - y1, 2);
        return Math.round(Math.sqrt(xVal + yVal));
    }
    function writeInstructions() {
        if (!isMapping && clickNumber == 0) {
            if (mapName == "myImageMap") {
                $("#imageMapper #instructions").html("Start by giving your map a name.");
            }
            else {
                $("#imageMapper #instructions").html("Click 'Start' to begin creating a map area, specifying the appropriate shape and URL.");
            }
        }
        else if (isMapping && clickNumber == 0) {
            if (shape == "rect") {
                $("#imageMapper #instructions").html("Click the top left corner of the rectangle area.");
            }
            else if (shape == "circle") {
                $("#imageMapper #instructions").html("Click the center of the circle area.");
            }
            else {
                $("#imageMapper #instructions").html("Click the starting point of the polygon area.");
            }
        }
        else if (isMapping && clickNumber == 1) {
            if (shape == "rect") {
                $("#imageMapper #instructions").html("Click the bottom right corner of the rectangle area.");
            }
            else if (shape == "circle") {
                $("#imageMapper #instructions").html("Click anywhere along the circle area's edge.");
            }
            else {
                $("#imageMapper #instructions").html("Click the second point of the polygon area.");
            }
        }
        else if (isMapping && clickNumber >= 2) {
            var pointNumber = clickNumber + 1;
            $("#imageMapper #instructions").html("Click point " + pointNumber + " of the polygon area, or 'Stop' to finish mapping the area.");
        }
    }
});