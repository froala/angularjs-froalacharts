# angularjs-froalacharts

A simple and lightweight official AngularJS component for Froalacharts JavaScript charting library. angularjs-froalacharts enables you to add JavaScript charts in your AngularJS application without any hassle.

## [Demo](https://fusioncharts.github.io/angularjs-fusioncharts/)

- Github Repo: [https://github.com/froala/angularjs-froalacharts](https://github.com/froala/angularjs-froalacharts)
- Documentation: [https://www.fusioncharts.com/dev/getting-started/angular/angularjs/your-first-chart-using-angularjs](https://www.fusioncharts.com/dev/getting-started/angular/angularjs/your-first-chart-using-angularjs)
- Support: [https://www.fusioncharts.com/contact-support](https://www.fusioncharts.com/contact-support)
- FusionCharts
  - Official Website: [https://www.fusioncharts.com/](https://www.fusioncharts.com/)
  - Official NPM Package: [https://www.npmjs.com/package/fusioncharts](https://www.npmjs.com/package/fusioncharts)
- Issues: [https://github.com/froala/angularjs-fusioncharts/issues](https://github.com/froala/angularjs-fusioncharts/issues)

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Working with chart API](#working-with-apis)
  - [Working with events](#working-with-events)
- [Quick Start](#quick-start)
- [Going Beyond Charts](#going-beyond-charts)
- [Usage and Integration of FusionTime](#usage-and-integration-of-fusiontime)
- [Special note for IE Users](#special-note)
- [For Contributors](#for-contributors)
- [Licensing](#licensing)

## Getting Started

### Requirements

- **Node.js**, **NPM/Yarn** installed globally in your OS.
- You've an **AngularJS** Application.
- **FroalaCharts** installed in your project, as detailed below:

### Installation

To install `angularjs-froalacharts` library, run:

```bash
$ npm install angularjs-froalacharts --save
```

To install `froalacharts` library:

```bash
$ npm install froalacharts --save
```

## Quick Start

#### Step 1: Include angular-froalacharts.js and froalacharts

In your index.html

```xml
  <script type="text/javascript" src="node_modules/froalacharts/froalacharts.js"></script>
  <script type="text/javascript" src="node_modules/froalacharts/themes/froalacharts.theme.froala.js"></script>
  <script type="text/javascript" src="node_modules/angular/angular.js"></script>
  <script type="text/javascript" src="node_modules/angularjs-froalacharts/dist/angular-froalacharts.js"></script>
```

### Step 2: Include ng-froalacharts in your module

In the app, include ng-froalacharts as a dependency. If you looking for where to add the dependency, look for the call to angular.module in your code.

```javascript
angular.module('myApp', ['ng-froalacharts']);
```

### Step 3: Add the froalacharts directive

In your HTML, find the section where you wish to add the chart and add a <div> with the froalacharts directive. We are assuming it's inside a controller called MyController which would change based on your usage.

```xml
  <body ng-app='myApp'>
    ...
    <div  ng-controller="MyController">
      <div
        froalacharts
        width="600"
        height="400"
        type="pie"
        datasource="{{dataSource}}">
      </div>
    </div>
    ...
  </body>
```

### Step 4: Populate required variables in controller

In the previous code, we are binding to a scope variable myDataSource, but that hasn't been defined yet. In your controller, set the DataSource as you would for a regular FroalaCharts JSON format DataSource ([see this](http://docs.fusioncharts.com/tutorial-getting-started-your-first-charts-building-your-first-chart.html) tutorial for a general introduction to this format).

```javascript
app.controller('MyController', function($scope) {
  $scope.dataSource = {
    chart: {
      caption: 'Countries With Most Oil Reserves [2017-18]',
      subCaption: 'In MMbbl = One Million barrels',
      xAxisName: 'Country',
      yAxisName: 'Reserves (MMbbl)',
      numberSuffix: 'K',
      theme: 'froala'
    },
    data: [
      { label: 'Venezuela', value: '290' },
      { label: 'Saudi', value: '260' },
      { label: 'Canada', value: '180' },
      { label: 'Iran', value: '140' },
      { label: 'Russia', value: '115' },
      { label: 'UAE', value: '100' },
      { label: 'US', value: '30' },
      { label: 'China', value: '30' }
    ]
  };
});
```

And your chart should display when you load the page.

### Using `require()` syntax

In script.js

```javascript
//  Require AngularJS
var angular = require('angular');

// Require FroalaCharts
var FroalaCharts = require('froalacharts');

// Include angularjs-froalacharts
require('angularjs-froalacharts');

// Initialize Charts with FroalaCharts instance
Charts(FroalaCharts);

var app = angular.module('myApp', ['ng-froalacharts']);

app.controller('MyController', [
  '$scope',
  function($scope) {
    $scope.dataSource = {
      chart: {
        caption: 'Countries With Most Oil Reserves [2017-18]',
        subCaption: 'In MMbbl = One Million barrels',
        xAxisName: 'Country',
        yAxisName: 'Reserves (MMbbl)',
        numberSuffix: 'K'
      },
      data: [
        { label: 'Venezuela', value: '290' },
        { label: 'Saudi', value: '260' },
        { label: 'Canada', value: '180' },
        { label: 'Iran', value: '140' },
        { label: 'Russia', value: '115' },
        { label: 'UAE', value: '100' },
        { label: 'US', value: '30' },
        { label: 'China', value: '30' }
      ]
    };
  }
]);
```

Use a bundler like `browserify` to bundle the script  
See the installation docs [here](http://browserify.org/)

```bash
$ browserify script.js -o bundle.js
```

In `index.html`

```xml
<html>
  <head>

    <!-- Include compiled bundle in script tag -->
    <script type="text/javascript" src="./bundle.js"></script>
  </head>

  <body ng-app="myApp">
    <div ng-controller="MyController">
      <div
        froalacharts
        width="600"
        height="400"
        type="pie"
        datasource="{{dataSource}}">
      </div>
    </div>
  </body>
</html>
```

Load it in browser , Chart should get displayed

## Working with Events

Fusincharts events can be subscribed by attaching scope functions to event attributes.
All the events attributes start with `fcevent-`
followed by the event name in lowercase

Usage in template :

```xml
<froalacharts
  width="400"
  height="400"
  type="pie"
  datasource="{{myDataSource}}"
  fcevent-dataplotrollover="rollover(event, args)">
</froalacharts>
```

In the given above template, `rollover` is the scope function that needs to be defined in the controller's code.

For more on this read [here](https://www.fusioncharts.com/dev/api/fusioncharts/fusioncharts-events)

```js
var app = angular.module('myApp', ['ng-froalacharts']);

app.controller('MyController', function($scope) {
  $scope.myDataSource = {
    chart: {
      caption: 'Countries With Most Oil Reserves [2017-18]',
      subCaption: 'In MMbbl = One Million barrels',
      xAxisName: 'Country',
      yAxisName: 'Reserves (MMbbl)',
      numberSuffix: 'K',
      theme: 'fusion'
    },
    data: [
      { label: 'Venezuela', value: '290' },
      { label: 'Saudi', value: '260' },
      { label: 'Canada', value: '180' },
      { label: 'Iran', value: '140' },
      { label: 'Russia', value: '115' },
      { label: 'UAE', value: '100' },
      { label: 'US', value: '30' },
      { label: 'China', value: '30' }
    ]
  };

  $scope.rollover = function(event, data) {
    console.log(event, data);
  };
});
```

Get the list of froalacharts' [events](https://www.fusioncharts.com/dev/advanced-chart-configurations/events/classifying-events)

## Working with APIs

FroalaCharts chart instance is made available from the `initialized` event. It provides the chart instance as a parameter which can be used to call FroalaCharts methods.

In template, we add `initialized` event

```xml
<froalacharts
  width="400"
  height="400"
  type="pie"
  datasource="{{myDataSource}}"
  initialized="onInitialized(chart)">
</froalacharts>
<button ng-click="changeCaption()">Change Chart Caption</button>
```

In order to use the chart instance, we need to store it.

```js
var app = angular.module('myApp', ['ng-froalacharts']);

app.controller('MyController', function($scope){
    var chart;
    $scope.datasource = {
       ...// same data as above
      };

      $scope.onInitialized = function(chartObj){
        chart = chartObj;
      }

      $scope.changeCaption = function(){
          chart.setChartAttribute('caption', 'Caption changed');
      }
});
```

In the given above example, clicking the button changes the caption text to `Caption changed`

Get the list of froalacharts' [methods](https://www.fusioncharts.com/dev/api/fusioncharts/fusioncharts-methods)

## Usage and integration of FroalaTime

From `froalacharts@1.0.4` and `angularjs-froalacharts@1.0.0`, You can visualize timeseries data easily with angular.

Learn more about FroalaTime [here](https://www.fusioncharts.com/fusiontime).

### Sample code for FroalaTime

If you've included angular-froalacharts.js and froalacharts in your `html`
then add the following `script` tag:

In your `index.html`

```xml
  ...
  <script type="text/javascript" src="node_modules/froalacharts/froalacharts.js"></script>
  ...
```

In your `script.js`

```js
// If you haven't imported angulajs, angularjs-froalacharts and froalacharts in your html file and used require() syntax instead then add the following code from START to END:

// START
var angular = require('angular');
var FroalaCharts = require('froalacharts');
require('angularjs-froalacharts');

var app = angular.module('myApp', ['ng-froalacharts']);
// END

var jsonify = res => res.json();
var dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);
var schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

var app = angular.module('myApp', ['ng-froalacharts']);

app.controller('MyController', function($scope) {
  $scope.dataSource = {
    data: null,
    caption: {
      text: 'Sales Analysis'
    },
    subcaption: {
      text: 'Grocery'
    },
    yAxis: [
      {
        plot: {
          value: 'Grocery Sales Value',
          type: 'line'
        },
        format: {
          prefix: '$'
        },
        title: 'Sale Value'
      }
    ]
  };

  Promise.all([dataFetch, schemaFetch]).then(res => {
    const data = res[0];
    const schema = res[1];
    const froalaTable = new FroalaCharts.DataStore().createDataTable(
      data,
      schema
    );
    $scope.$apply(function() {
      $scope.dataSource.data = froalaTable;
    });
  });
});
```

Use a bundler like `browserify` to bundle the script  
See the installation docs [here](http://browserify.org/)

```bash
$ browserify script.js -o bundle.js
```

Again in your `index.html`

```xml
<html>
  <head>
    <!-- Include compiled bundle in script tag -->
    <script type="text/javascript" src="./bundle.js"></script>
  </head>

  <body ng-app="myApp">
    <div ng-controller="MyController">
      <div
        froalacharts
        width="600"
        height="400"
        type="timeseries"
        datasource-dt="dataSource">
        // When using TimeSeries pass your dataSource in "datasource-dt" attribute not in "datasource".
      </div>
    </div>
  </body>
</html>
```

**Important note :- If the chart's datasource has an instance of dataStore like in case of timeseries then you must use the new `datasource-dt` attribute for passing the data in html**

Useful links for FroalaTime

- [How FroalaTime works](https://www.fusioncharts.com/dev/fusiontime/getting-started/how-fusion-time-works)
- [Create your first chart](https://www.fusioncharts.com/dev/fusiontime/getting-started/create-your-first-chart-in-fusiontime)

## Special Note

If you want to support your application on IE(11 and below), then you need to take following steps:

### Firstly

You have to update your `angularjs-froalacharts` and `froalacharts` modules to latest versions. For `angularjs-froalacharts` install `v1.0.0` and above; for `froalacharts` install `1.0.6` and above.

### Secondly

In your template, modify your code like so,

```html
<div
  froalacharts
  width="600"
  height="400"
  type="ANY_CHART_TYPE"
  datasource-dt="dataSource"
>
  // Instead of passing data in datasouce, use datasource-dt.
</div>
```

## For Contributors

- Clone the repository and install dependencies

```
$ git clone https://github.com/froala/angularjs-froalacharts.git
$ cd angularjs-froalacharts
$ npm i
$ npm run dev
```

## Going Beyond Charts

- Explore 20+ pre-built business specific dashboards for different industries like energy and manufacturing to business functions like sales, marketing and operations [here](https://www.fusioncharts.com/explore/dashboards).
- See [Data Stories](https://www.fusioncharts.com/explore/data-stories) built using FroalaCharts’ interactive JavaScript visualizations and learn how to communicate real-world narratives through underlying data to tell compelling stories.

## Licensing

The FroalaCharts React component is open-source and distributed under the terms of the MIT/X11 License. However, you will need to download and include FroalaCharts library in your page separately, which has a [separate license](https://www.fusioncharts.com/buy).