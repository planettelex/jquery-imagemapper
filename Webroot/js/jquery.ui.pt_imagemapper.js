/*
 * Copyright (c) 2012 Planet Telex Inc. all rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
typeof jQuery != 'undefined' &&
typeof jQuery.ui != 'undefined' &&
(function ($) {
    $.widget('pt.imagemapper', {

        /* Begin Widget Overrides */
        widgetEventPrefix: 'pt.imagemapper',

        _create: function () {
            this._registerEvents();
        },

        destroy: function () {
            this._$divContainer.remove();
            $.Widget.prototype.destroy.call(this);
        },
        /* End Widget Overrides */

        /* Begin Markup Elements */
        _$divControls: $("<div class='imagemapper-controls'></div>"),
        _$lblInstructions: $("<h6 class='imagemapper-instructions'>Start by giving your map a name.</h6>"),
        _$lblMapName: $("<strong>Map Name: </strong>"),
        _$txtMapName: $("<input type='text' />"),
        _$divMapName: $("<div class='imagemapper-mapName-controls'></div>"),
        _$lblMapShape: $("<strong>Map Shape: </strong>"),
        _$rdoMapShapeRect: $("<input name='mapShape' type='radio' checked='checked' />"),
        _$lblMapShapeRect: $("<label>Rectangle</label>"),
        _$rdoMapShapeCircle: $("<input name='mapShape' type='radio' />"),
        _$lblMapShapeCircle: $("<label>Circle</label>"),
        _$rdoMapShapePoly: $("<input name='mapShape' type='radio' />"),
        _$lblMapShapePoly: $("<label>Polygon</label>"),
        _$divMapShape: $("<div class='imagemapper-mapShape-controls'></div>"),
        _$lblMapUrl: $("<strong>Map URL: </strong>"),
        _$txtMapUrl: $("<input type='text' />"),
        _$divMapUrl: $("<div class='imagemapper-mapUrl-controls'></div>"),
        _$btnStartStop: $("<input type='button' value='Start' />"),
        _$btnReset: $("<input type='button' value='Reset' />"),
        _$divButtons: $("<div class='imagemapper-buttons'></div>"),
        _$hdnCoordinates: $("<input type='hidden' />"),
        _$lblImageTag: $("<pre></pre>"),
        _$lblMapStartTag: $("<pre></pre>"),
        _$lblMapEndTag: $("<pre></pre>"),
        _$imageMap: $("<pre></pre>"),
        _$divResults: $("<div class='imagemapper-results'></div>"),
        _$divContainer: $("<div class='imagemapper'></div>"),
        /* End Markup Elements */

        _isMapping: false,
        _clickNumber: 0,
        _shape: "rect",
        _mapName: "myImageMap",
        _picWidth: 0,
        _picHeight: 0,

        _buildMarkup: function () {
            console.log(this._picWidth);
            this.element.wrap(this._$divContainer.css("width", this._picWidth + "px"));
            this._$divMapName.append(this._$lblMapName);
            this._$divMapName.append(this._$txtMapName);
            this._$divMapShape.append(this._$lblMapShape);
            this._$divMapShape.append(this._$rdoMapShapeRect);
            this._$divMapShape.append(this._$lblMapShapeRect);
            this._$divMapShape.append(this._$rdoMapShapeCircle);
            this._$divMapShape.append(this._$lblMapShapeCircle);
            this._$divMapShape.append(this._$rdoMapShapePoly);
            this._$divMapShape.append(this._$lblMapShapePoly);
            this._$divMapUrl.append(this._$lblMapUrl);
            this._$divMapUrl.append(this._$txtMapUrl);
            this._$divButtons.append(this._$btnStartStop);
            this._$divButtons.append(this._$btnReset);
            this._$divControls.append(this._$lblInstructions);
            this._$divControls.append(this._$divMapName);
            this._$divControls.append(this._$divMapUrl);
            this._$divControls.append(this._$divMapShape);
            this._$divControls.append(this._$divButtons);
            this._$divControls.append(this._$hdnCoordinates);
            this.element.before(this._$divControls);
            this._$divResults.append(this._$lblImageTag);
            this._$divResults.append(this._$lblMapStartTag);
            this._$divResults.append(this._$imageMap);
            this._$divResults.append(this._$lblMapEndTag);
            this.element.after(this._$divResults);
        },

        _registerEvents: function () {
            this.element.bind("load", this._imageLoad.bind(this));
            this.element.bind("click", this._imageClick.bind(this));
            this._$rdoMapShapeRect.bind("click", this._rectClick.bind(this));
            this._$lblMapShapeRect.bind("click", this._rectLabelClick.bind(this));
            this._$rdoMapShapeCircle.bind("click", this._circleClick.bind(this));
            this._$lblMapShapeCircle.bind("click", this._circleLabelClick.bind(this));
            this._$rdoMapShapePoly.bind("click", this._polyClick.bind(this));
            this._$lblMapShapePoly.bind("click", this._polyLabelClick.bind(this));
            this._$btnStartStop.bind("click", this._startStopClick.bind(this));
            this._$btnReset.bind("click", this._resetClick.bind(this));
            this._$txtMapName.bind("keyup", this._mapNameChange.bind(this));

        },

        _imageLoad: function (e) {
            this._picHeight = e.target.height;
            this._picWidth = e.target.width;
            this._buildMarkup();
        },

        _imageClick: function (e) {
            if (this._isMapping) {
                this._clickNumber++;
                var coords = this._$hdnCoordinates.val();
                var x = e.pageX - this.element.offset().left;
                var y = e.pageY - this.element.offset().top;
                if (coords != "") {
                    coords += ",";
                }
                if (this._clickNumber == 2 && this._shape == "circle") {
                    coords = coords + this._calculateRadius(x, y);
                }
                else {
                    coords = coords + x + "," + y;
                }
                this._$hdnCoordinates.val(coords);
                if (this._clickNumber >= 2 && (this._shape == "rect" || this._shape == "circle")) {
                    this._stopMapping();
                }
                this._writeInstructions();
            }
        },

        _rectClick: function () {
            this._shape = "rect";
        },

        _rectLabelClick: function () {
            this._$rdoMapShapeRect.click();
        },

        _circleClick: function () {
            this._shape = "circle";
        },

        _circleLabelClick: function () {
            this._$rdoMapShapeCircle.click();
        },

        _polyClick: function () {
            this._shape = "poly";
        },

        _polyLabelClick: function () {
            this._$rdoMapShapePoly.click();
        },

        _startStopClick: function () {
            if (this._$btnStartStop.val() == "Stop") {
                this._stopMapping();
            }
            else {
                this._buildMapTags();
                this._startMapping();
            }
        },

        _resetClick: function () {
            this._stopMapping();
            this._resetMapper();
        },

        _mapNameChange: function () {
            this._mapName = this._$txtMapName.val();
            this._buildMapTags();
            this._writeInstructions();
        },

        _startMapping: function () {
            this._isMapping = true;
            this._$btnStartStop.val("Stop");
            this._writeInstructions();
        },

        _stopMapping: function () {
            this._updateResults();
            this._isMapping = false;
            this._clickNumber = 0;
            this._$btnStartStop.val("Start");
            this._$hdnCoordinates.val("");
            this._writeInstructions();
        },

        _resetMapper: function () {
            this._$lblImageTag.empty();
            this._$lblMapStartTag.empty();
            this._$lblMapEndTag.empty();
            this._$imageMap.empty();
            this._writeInstructions();
        },

        _buildMapTags: function () {
            var imageSrc = this.element.attr("src");
            var imageTag = "&lt;img alt='' src='" + imageSrc + "' usemap='#" + this._mapName + "' /&gt;";
            var mapStartTag = "&lt;map id='" + this._mapName + "' name='" + this._mapName + "' &gt;";
            var mapEndTag = "&lt;/map&gt;";
            this._$lblImageTag.html(imageTag);
            this._$lblMapStartTag.html(mapStartTag);
            this._$lblMapEndTag.html(mapEndTag);
        },

        _updateResults: function () {
            var coords = this._$hdnCoordinates.val();
            var url = this._$txtMapUrl.val();
            var areaTag = "&nbsp;&nbsp;&nbsp;&lt;area alt='' shape='" + this._shape + "' coords='" + coords + "' href='" + url + "' /&gt;";
            this._$imageMap.append(areaTag);
            this._$imageMap.append("<br/>");
            this._trigger("markupupdated");
        },

        _calculateRadius: function (x2, y2) {
            var x1 = this._$hdnCoordinates.val().split(",")[0];
            var y1 = this._$hdnCoordinates.val().split(",")[1];
            var xVal = Math.pow(x2 - x1, 2);
            var yVal = Math.pow(y2 - y1, 2);
            return Math.round(Math.sqrt(xVal + yVal));
        },

        _writeInstructions: function () {
            if (!this._isMapping && this._clickNumber == 0) {
                if (this._mapName == "myImageMap") {
                    this._$lblInstructions.html("Start by giving your map a name.");
                }
                else {
                    this._$lblInstructions.html("Click 'Start' to begin creating a map area, specifying the appropriate shape and URL.");
                }
            }
            else if (this._isMapping && this._clickNumber == 0) {
                if (this._shape == "rect") {
                    this._$lblInstructions.html("Click the top left corner of the rectangle area.");
                }
                else if (this._shape == "circle") {
                    this._$lblInstructions.html("Click the center of the circle area.");
                }
                else {
                    this._$lblInstructions.html("Click the starting point of the polygon area.");
                }
            }
            else if (this._isMapping && this._clickNumber == 1) {
                if (this._shape == "rect") {
                    this._$lblInstructions.html("Click the bottom right corner of the rectangle area.");
                }
                else if (this._shape == "circle") {
                    this._$lblInstructions.html("Click anywhere along the circle area's edge.");
                }
                else {
                    this._$lblInstructions.html("Click the second point of the polygon area.");
                }
            }
            else if (this._isMapping && this._clickNumber >= 2) {
                var pointNumber = this._clickNumber + 1;
                this._$lblInstructions.html("Click point " + pointNumber + " of the polygon area, or 'Stop' to finish mapping the area.");
            }
        }

    });
})(jQuery);