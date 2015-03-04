# jQuery UI Image Mapper
#### by [Planet Telex][1]

![4]
A jQuery UI widget that builds HTML image maps.
#### [View Demos and Complete Documentation][2]

#### Requirements:
* jQuery 1.6+
* jQueryUI 1.9+ (Core, Widget)

#### Features:

* Creates image map markup, including the name and href.
* Draws a rectangular area.
* Draws a circular area.
* Draws a polygon area.


#### Quick Start:


##### Step 1

Include jQuery and jQuery UI in your HTML:

	<script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.11.3.min.js"></script>

Include jQuery Image Mapper and its CSS:

	<script type="text/javascript" src="js/jquery-ui-imagemapper.min.js"></script>
	<link type="text/css" href="css/jquery-ui-imagemapper.css" rel="stylesheet">

##### Step 2

Have an image in your HTML:

	<span>
		<img id="imageToMap" alt="Image to Map" src="images/test-01.jpg" />
	</span>

##### Step 3

Add the JavaScript make that image an image mapper:

    <script type="text/javascript">
        $(function () {
            $("#imageToMap").imagemapper();
        });
    </script>

[See the demo in action][3] for a complete example.

#### License

##### Major Components:

* jQuery, jQueryUI: MIT/GPL license

##### Everything Else:

    Copyright 2015 Planet Telex, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

[1]: http://www.planettelex.com
[2]: http://www.planettelex.com/products/jquery-imagemapper
[3]: http://planettelex.github.io/jquery-imagemapper
[4]: http://planettelex.github.io/jquery-imagemapper/images/demo.png
