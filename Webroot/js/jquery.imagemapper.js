$(document).ready(function() {
    var isMapping = false;
    var clickNumber = 0;
    var shape = "rect";
    var mapName = "MyImageMap";
    $("#ImageMapper img").click(function(e) {
        if (isMapping) {
            clickNumber++;
            var coords = $("#ImageMapper #Coordinates").val();
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
            $("#ImageMapper #Coordinates").val(coords);
            if (clickNumber >= 2 && (shape == "rect" || shape == "circle")) {
                stopMapping();
            }
            writeInstructions();
        }
    });
    $("#ImageMapper input:radio").click(function() {
        shape = $(this).attr("id").toLowerCase();
    });
    $("#ImageMapper #Start").click(function() {
        if ($(this).val() == "Stop") {
            stopMapping();
        }
        else {
            buildMapTags();
            startMapping();
        }
    });
    $("#ImageMapper #Reset").click(function() {
        stopMapping();
        resetMapper();
    });
    $("#ImageMapper #MapName").change(function() {
        mapName = $(this).val();
        buildMapTags();
        writeInstructions();
    });
    function startMapping() {
        isMapping = true;
        $("#ImageMapper #Start").val("Stop");
        writeInstructions();
    }
    function stopMapping() {
        updateResults();
        isMapping = false;
        clickNumber = 0;
        $("#ImageMapper #Start").val("Start");
        $("#ImageMapper #Coordinates").val("");
        writeInstructions();
    }
    function resetMapper() {
        $("#ImageMapper #Results").empty();
        $("#ImageMapper #MapStartTag").empty();
        $("#ImageMapper #MapEndTag").empty();
        $("#ImageMapper #ImageTag").empty();
        writeInstructions();
    }
    function buildMapTags() {
        $("#ImageMapper #MapStartTag").html("&lt;map id='" + mapName + "' name='" + mapName + "' &gt;");
        $("#ImageMapper #MapEndTag").html("&lt;/map&gt;");
        $("#ImageMapper #ImageTag").html("&lt;img alt='' src='" + $("#ImageMapper img").attr("src") + "' usemap='#" + mapName + "' /&gt;");
    }
    function updateResults() {
        $("#ImageMapper #Results").append("&nbsp;&nbsp;&nbsp;&lt;area alt='' shape='" + shape + "' coords='" + $("#ImageMapper #Coordinates").val() + "' href='" + $("#ImageMapper #Url").val() + "' /&gt;<br/>");
    }
    function calculateRadius(x2, y2) {
        var x1 = $("#ImageMapper #Coordinates").val().split(",")[0];
        var y1 = $("#ImageMapper #Coordinates").val().split(",")[1];
        var xVal = Math.pow(x2 - x1, 2);
        var yVal = Math.pow(y2 - y1, 2);
        return Math.round(Math.sqrt(xVal + yVal));
    }
    function writeInstructions() {
        if (!isMapping && clickNumber == 0) {
            if (mapName == "MyImageMap") {
                $("#ImageMapper #Instructions").html("Start by giving your map a name.");
            }
            else {
                $("#ImageMapper #Instructions").html("Click 'Start' to begin creating a map area, specifying the appropriate shape and URL.");
            }
        }
        else if (isMapping && clickNumber == 0) {
            if (shape == "rect") {
                $("#ImageMapper #Instructions").html("Click the top left corner of the rectangle area.");
            }
            else if (shape == "circle") {
                $("#ImageMapper #Instructions").html("Click the center of the circle area.");
            }
            else {
                $("#ImageMapper #Instructions").html("Click the starting point of the polygon area.");
            }
        }
        else if (isMapping && clickNumber == 1) {
            if (shape == "rect") {
                $("#ImageMapper #Instructions").html("Click the bottom right corner of the rectangle area.");
            }
            else if (shape == "circle") {
                $("#ImageMapper #Instructions").html("Click anywhere along the circle area's edge.");
            }
            else {
                $("#ImageMapper #Instructions").html("Click the second point of the polygon area.");
            }
        }
        else if (isMapping && clickNumber >= 2) {
            var pointNumber = clickNumber + 1;
            $("#ImageMapper #Instructions").html("Click point " + pointNumber + " of the polygon area, or 'Stop' to finish mapping the area.");
        }
    }
});