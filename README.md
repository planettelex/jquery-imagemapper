# jQuery UI Image Mapper
#### by [Planet Telex][1]

![4]
A jQuery UI widget that builds HTML image maps.

### [Demos and Documentation][1]

#### Requirements
* jQuery 1.6+
* jQueryUI 1.9+ (Core, Widget)

#### Features

* Creates image map markup, including the name and href.
* Draws a rectangular area.
* Draws a circular area.
* Draws a polygon area.


#### Quick start


##### Step 1

Include jQuery and jQuery UI your HTML.

	<script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui-1.11.3.min.js"></script>

Include the PT Imagemapper and its starter CSS in your HTML.

	<script type="text/javascript" src="js/jquery-ui-pt-imagemapper.js"></script>
	<link type="text/css" href="css/jquery-ui-pt-imagemapper.css" rel="stylesheet">

##### Step 2

Add an image to your HTML:
    <img id="imageToMap" alt="Image to Map" src="images/test-01.jpg" />

##### Step 3

Add the JavaScript to your page to hook up the PT Imagemapper to your container.

    <script type="text/javascript">
        $(function () {
            $("#imageToMap").imagemapper();
        });
    </script>

See the accompanying [demo][2] for a more complete example or view [this code][3] hosted on GitHub.

#### License

##### Major components:

* jQuery, jQueryUI: MIT/GPL license

##### Everything else:

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
[2]: http://www.planettelex.com/products/jquery/pt-image-mapper/demos
[3]: http://planettelexinc.github.io/jquery-ui-pt-image-mapper
[4]: http://planettelexinc.github.io/jquery-ui-pt-image-mapper/images/demo.png
