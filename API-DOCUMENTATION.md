# turn.js API DOCUMENTATION

> Copyright © 2012 Emmanuel Garcia - 2019 Raffaele Morganti

The turn.js API was conveniently built as a jQuery plugin, it provides access to a set of features and allows you to define the user interaction.
The API includes properties, methods and events. Most setter and getter functions have the same name.

## Index

* [Essentials](#essentials)
* [Browser Support](#browser-support)
* [Preparing the HTML](#preparing-the-html)
* [Performance](#performance)
* [CSS Classes](#css-classes)
	+ [List of classes](#list-of-classes)
		- [even](#even)
		- [fixed](#fixed)
		- [hard](#hard)
		- [odd](#odd)
		- [own-size](#own-size)
		- [page](#page)
		- [p[0-9]+](#p0-9)
		- [shadow](#shadow)
		- [sheet](#sheet)
* [Setting the size of the flipbook](#setting-the-size-of-the-flipbook)
* [Display](#display)
* [Views](#views)
* [Ignoring elements in the flipbook](#ignoring-elements-in-the-flipbook)
* [Corners](#corners)
* [Constructor](#constructor)
* [Options](#options)
	+ [Adding options to the constructor:](#adding-options-to-the-constructor)
* [Properties](#properties)
	+ [List of properties](#list-of-properties)
		- [animating](#animating)
		- [display](#display)
		- [page](#page-1)
		- [pages](#pages)
		- [size](#size)
		- [view](#view)
		- [zoom](#zoom)
* [Methods](#methods)
	+ [List of methods](#list-of-methods)
		- [addPage](#addpage)
		- [display](#display-1)
		- [disable](#disable)
		- [destroy](#destroy)
		- [hasPage](#haspage)
		- [next](#next)
		- [is](#is)
		- [page](#page-2)
		- [pages](#pages-1)
		- [peel](#peel)
		- [previous](#previous)
		- [range](#range)
		- [removePage](#removepage)
		- [resize](#resize)
		- [size](#size-1)
		- [stop](#stop)
		- [zoom](#zoom-1)
* [Events](#events)
	+ [List of events](#list-of-events)
		- [end](#end)
		- [first](#first)
		- [last](#last)
		- [missing](#missing)
		- [start](#start)
		- [turning](#turning)
		- [turned](#turned)
		- [zooming](#zooming)

## Requirements

- jQuery 1.7.0 or later (Except 2.2.0, 3.0.* and 3.1.*)

## Browser Support

All modern browsers. For old browsers support refer to the original version:
- [3rd release](https://github.com/blasten/turn.js/) 
- [4th release](https://github.com/blasten/Turn.js-4th-release)



## Preparing the HTML

Turn.js uses a DOM element as a container for all the pages. This DOM element is typically the flipbook. There are three ways to add pages to your flipbook:

1. Adding pages directly in the container. The HTML contains all the content of your flipbook. For example:

	```html
	<div id=”flipbook”>
		<div>Page 1</div>
		<div>Page 2</div>
		<div>Page 3 </div>
		<div>Page 4 </div>
	</div>
	```

2. Adding pages dynamically through the API. The HTML contains only the container and all the pages will be dynamically added after getting the data through an Ajax Request. For example:

	```html
	<div id=”flipbook”>
		<!— Load the content here-->
	</div>
	```

3. A combination of both. Sometimes it’s a better idea to have some pages in the HTML and another loaded dynamically. For example:

	```html
	<div id=”flipbook”>
		<div>Front1</div>
		<div>Front 2</div>
		<!— Load the content here-->
		<div>Back 2</div>
		<div>Back 1</div>
	</div>
	```

## Performance

Turn.js can work with very long flipbooks. That is, there’s no limit regarding the amount of pages that it can contain. This is because turn.js only keeps in DOM the last 6 pages no matter how long the book is. There will still be references to the content that was previously loaded, but it’s possible to reduce the cache in order to release memory.

## CSS Classes

Turn.js uses classes to define the way a page or the flipbook as a whole should look. The classes also allow you to add CSS rules or use them as a selector for that page.

#### List of classes

##### even

This class describes even pages when display is set to double. For example: Page 2, Page 4, and so on. Notice that even pages will always be in the right of the flipbook.

##### fixed

Indicates that a page should not be removed from the DOM even when the page is out of range.

##### hard

Sets a hard transition effect for a page. By setting all the pages as hard you will create the same effect as in Flipboard. For example:

```html
<div id=”flipbook”>
	<div class=”hard”>Page 1</div>
	<div class=”hard”>Page 2 </div>
</div>
```

##### odd

This class describes odd pages when display is set to double. For example: Page 1 , Page 3 , and so on. Notice that odd pages will always be in the left of the flipbook.


##### own-size

Customizes the size of a page. The size rules can be added directly to the page selector or using the style parameter. For example:

```html
<div id=”flipbook”>
	<div>Page 1 with default size</div>
	<div class=”own-size” style=”width:100; height:100px;”>
		Page 2 with own size
	</div>
</div>
```

##### page

This class describes every page. It provides a unique subclass for all the pages no matter its number. This subclass allows you to set the size of all the pages:

```css
.flipbook{
	width: 800 px;
	height: 600 px;
}

.flipbook .page{
	width: 400 px;
	height: 600 px;
}
```

##### p[0-9]+

This class describes a particular page. For instance, .p1 refers to the first page, .p2 to the second page and so on. You can change the number of a page no matter its order in the HTML:

```html
<div id=”flipbook”>
	<div class=”p100”>Page 1 00 </div>
	<div class=”p1”>Page 1</div>
</div>
```

You can also use it as a jQuery selector:

```javascript
$(‘#flipbook .p100’).doSomething();
```

##### shadow

This class describes the visible area of the flipbook. That is, because it surrounds the flipbook, it’s suitable for a shadow around the flipbook. For example:


```css
.flipbook .shadow{
	box-shadow:  0 4 px 10 px #666;
}
```

##### sheet

Makes the page looks like a sheet of paper. This is the default style for all the pages.

## Setting the size of the flipbook

There’re three ways to set the size of a flipbook.

1. Using CSS, for example:

	```css
	.flipbook{
		width: 800 px;
		height: 600 px;
	}

	.flipbook .page{
		width: 400 px;
		height: 600 px;
	}
	```

	Notice that the width of the page is half the size of the flipbook.

2. Using options, for example:

	```javascript
	$(‘#flipbook’).turn({width: 800 , height: 600 });
	```

3. Using the size method, for example:

	```javascript
	$(‘#flipbook’).turn(‘size’, 800 , 600 );
	```

## Display

The display defines how many pages are visible in the flipbook. While using turn.js on an iPad or iPhone, there would be some problems to turn pages if the orientation of the device is portrait. For that reason, turn.js introduces a new view called single. There are two views: double, which shows two pages and single, which shows only one page.

## Views

A view is a set of pages that are visible on the screen; in general that moment depends on the current page. For example, when the display of a flipbook of 10 pages is set to double, the pages would be grouped like this:

1 - (2 3) - (4 5) - (6 7) - (8 9) - 10

This flipbook has 6 views. The general relation is: totalPages/2 + Therefore, if the current page is 5, the view in double display would be: [4,5] Using display single, the view will always have only one page. So, there will be the same number of pages and views.

## Ignoring elements in the flipbook

Turn.js reserves an HTML attribute called ignore which can be added to some elements in the flipbook to not select them as pages. For example:

```html
<div id=”flipbook”>
	<div ignore=”1”> Something else </div>
	<div>Page 1</div>
	<div>Page 2</div>
	<div ignore=”1”> Something else </div>
	<div>Page 3</div>
</div>
```

## Corners

The corners identify every interactive region on the flipbook. For example:

| tl | | tr |
|---|---|---|
| __l__ | | __r__ |
| __bl__ | | __br__ | 

- tl: Top Left.
- tr: Top right.
- r: Right (hard pages only)
- br: Bottom right.
- bl: Bottom left.
- l: Left (hard pages only)

## Constructor

The constructor is the function that will turn the container into a flipbook. Because turn.js uses a single instance, it’s not necessary to have an external reference to it. Example:

```javascript
$(‘#flipbook’).turn([options]);
```

Notice that the constructor only has one argument called options and it’s optional.

## Options

The options define characteristics of the flipbook. All the keys are optional.

| Option | Type | Default value | Description |
| --- | --- | --- | --- |
| acceleration | Boolean | true | Sets the hardware acceleration mode, for touch devices this value must be true. |
| autoCenter | Boolean | false | Centers the flipbook depending on how many pages are visible. |
| display | String | single | Sets the display mode. Values: single, double |
| duration | Number | 600 | Sets the duration of the transition in milliseconds |
| gradients | Number | true | Shows gradients and shadows during the transition. |
| height | Number | Height of the selector | Sets the height of the selector |
| inclination | Number | 0 | Sets the inclination of the page during the transition |
| page | Number | 1 | Sets the first page |
| pages | Number | The number of pages in the DOM | Sets the number of pages |
| when | Object | {} | Sets event listeners |
| width | Number | Width of the selector | Sets the width of the page |

### Adding options to the constructor:

```javascript
$(‘#flipbook’).turn({
	display: ‘double’,
	inclination: 50 ,
	when: {
		turned: function(event, page, pageObj) {
		alert(‘the current page is ’ + page);
		}
	}
});
```

## Properties

Syntax:

```javascript
$(‘#flipbook’).turn(‘propertyName’);
```

### List of properties

#### animating

Returns true when animating a page.

```javascript
$(‘#flipbook’).turn(‘animation’);
```

#### display

Gets the current display. It can be single or double.

```javascript
$(‘#flipbook’).turn(‘display’);
```

#### page

Gets the current page.

```javascript
$(‘#flipbook’).turn(‘page’);
```

#### pages

Gets the number of pages within the flipbook

```javascript
$(‘#flipbook’).turn(‘pages’);
```

#### size

Gets the size of the flipbook. It would be an object with two keys, width and height.

```javascript
$(‘#flipbook’).turn(‘size’);
```

#### view

Gets the current view.

```javascript
$(‘#flipbook’).turn(‘view’);
```

#### zoom

Gets the current zoom. The default value is 1.

```javascript
$(‘#flipbook’).turn(‘zoom’);
```

## Methods

Syntax:

```javascript
$(‘#flipbook’).turn(‘method name’[, argument1, argument2]);
```

When a method doesn’t return a value, it can be connected to another methods, for example:

```javascript
$(‘#flipbook’).turn(‘method1’).turn(‘method2’);
```

### List of methods

#### addPage

Adds a page to the flipbook.

| Parameter | Type | Description |
| --- | --- | --- |
| element | jQuery element | DOM element for the page. |
| pageNumber | Number | This parameter is optional and the default value is: `$(‘#flipbook’).turn(‘pages’)+1` |

For example:

```javascript
element = $(‘<div />’, {class: ‘p10’});
$(‘#flipbook’).turn(‘addPage’, element);
```

The above code is equivalent to:

```javascript
element = $(‘<div />’);
$(‘#flipbook’).turn(‘addPage’, element, 10 );
```

#### display

Set the display.

| Parameter | Type | Description |
| --- | --- | --- |
| displayMode | String | It can be single or double. Single means one page per view, meanwhile double two pages per view. |

```javascript
$(‘#flipbook’).turn(‘display’, ‘single’);
```

#### disable

Disables and enables the effect. If it’s disabled, users won’t be able to change the current page.

| Parameter | Type | Description |
| --- | --- | --- |
| disable | Boolean | True to disable the effect or false to enable. |

```javascript
$(‘#flipbook’).turn(‘display’, ‘single’);
```

#### destroy

Destroys the flipbook. That is, it removes all the pages from the DOM and memory. For example:

```javascript
$(‘#flipbook’).turn(‘destroy’);
$(‘#flipbook’).turn(‘page’, 1 );
```

The last line will throw an error. You can also remove the container, for example:

```javascript
$(‘#flipbook’).turn(‘destroy’).remove();
```

#### hasPage

Returns true if a page is in memory.

| Parameter | Type | Description |
| --- | --- | --- |
| pageNumber | Number | Page number. |

For example:

```javascript
if ($(‘#flipbook’).turn(‘hasPage’, 1 )) {
alert(‘Page 1 is already in the flipbook’);
}
```

#### next

Turns the view to the next one. For example:

```javascript
$(‘#flipbook’).turn(‘next’);
```
#### is

Detects if a selector has an instance of turn.js. For example:

```javascript
if (!$(‘#flipbook’).turn(‘is’)) {
// Create a new flipbook
$(‘#flipbook’).turn();
}
```

#### page

Turns the page.

| Parameter | Type | Description |
| --- | --- | --- |
| page | Number | Page number. |

For example, the following example will turn the page to 10.

```javascript
$(‘#flipbook’).turn(‘page’, 10 );
```

#### pages

Sets the number of pages that the flipbook has. If the number of pages is less than the current one, it will remove the pages out of range.

| Parameter | Type | Description |
| --- | --- | --- |
| pages | Number | Number of pages. |

For example:

```javascript
$(‘#flipbook’).turn(‘hasPage’, 10 ); // It’s true.
$(‘#flipbook’).turn(‘pages’, 5 ); // Sets 5 pages
$(‘#flipbook’).turn(‘hasPage’, 10 ); // Returns false
```

#### peel

Shows a peeling corner.

| Parameter | Type | Description |
| --- | --- | --- |
| corner | String | Corner type. The corners can be: tl, tr, bl, br, r, l. |

For example:

```javascript
// To show the br corner
$(‘#flipbook’).turn(‘peel’, ‘br’);
// To hide all the corners
$(‘#flipbook’).turn(‘peel’, false);
```

#### previous

Turns the view to the previous one. For example:

```javascript
$(‘#flipbook’).turn(‘previous’);
```

#### range

It returns an array of two values where the first element refers to a page from which next pages should be contained in DOM. The second element refers to the last page of the range. That is, the current range always has the following relationship: range[0] <= current page <= range[1]

| Parameter | Type | Description |
| --- | --- | --- |
| pageNumber | Number | A page number within a range. This parameter is optional and the default value is `$(‘#flipbook’).turn(‘page’);` |

For example, in order to add new pages dynamically, it’s necessary to use the range method:

```javascript
var range = $(‘#flipbook’).turn(‘range’, 10 );
for (var page = range[ 0 ]; page<=range[ 1 ]; page++){
	if (!$(‘#flipbook’).turn(‘hasPage’, page)) {
		$(‘#flipbook’).turn(‘addPage’,
		$(‘<div />’), page);
	}
}
```

The last example will add the pages that are closest to the page 10. Assuming that display is double, those pages would be [8, 9, 10, 11, 12, 13].

#### removePage

Removes a page from the DOM and all its references.

| Parameter | Type | Description |
| --- | --- | --- |
| pageNumber | Number | Number of the page to remove. |


For example:

```javascript
$(‘#flipbook’).turn(‘removePage’, 10 );
```

#### resize

Recalculate the position of all the pages.

```javascript
$(‘#flipbook’).turn(‘resize’);
```

#### size

Sets the size of the flipbook.

| Parameter | Type | Description |
| --- | --- | --- |
| width | Number | New width for the flipbook. |
| height | Number | New height for the flipbook. |

For example:

```javascript
$(‘#flipbook’).turn(‘size’, 1000 , 600 );
```

#### stop

Stop the current animation. For example, it’s possible to turn to a page without having animation.

```javascript
$(‘#flipbook’).turn(‘page’, 10 ).turn(‘stop’);
```

#### zoom

Increases or reduces the size of the flipbook.

| Parameter | Type | Description |
| --- | --- | --- |
| factor | Number | Factor of multiplication. For example, 2 would increase in twice the size of the flipbook; meanwhile 0.5 would reduce the size to half of its current size. |
| duration | Number | Duration in milliseconds of the scaling animation. The default value is 500. |

For example, to zoom out without animation:

```javascript
$(‘#flipbook’).turn(‘zoom’, 0.5, 0 );
```

## Events

The events allow you to define behaviors to specific moments. It’s possible to define events in two different ways:

1. Using the when key of options

	While adding event listeners, it will require to add the listeners before the constructor creates the flipbook. For example:

	```javascript
	$(‘#flipbook’).turn({
		when: {
			turning: function(event, page, pageObject) {
			
			}
		}
	});
	```

2. Using on

	jQuery provides a on function in order to add listeners to elements. You can use on to add as many listener as you need for an event. For example:

	```javascript
	$(‘#flipbook’).on(‘turning’,
		function(event, page, obj){
			alert(‘Page ’+ page);
	});
	```

3. Using the event object

	The first argument that all the listener functions share is the event object, which allows you to manipulate the propagation and default action of the event. Some events are followed by an action that can be, for instance, to turn the page. Therefore, it’s possible to prevent that action by using `event.preventDefault();` within the event function. It’s not necessary to return false to prevent the default action.

### List of events

#### end

This event is triggered after ending the motion of a page.

| Parameter | Type | Description |
| --- | --- | --- |
| event | Event | Event object. |
| page | Number | The page number |

#### first

This event is triggered when the current page is 1.

| Parameter | Type | Description |
| --- | --- | --- |
| event | Event | Event object. |

#### last

This event is triggered when the current page is `$(‘#flipbook’).turn(‘pages’)`. That is, the last page.

| Parameter | Type | Description |
| --- | --- | --- |
| event | Event | Event object. |

#### missing

This event is triggered when some pages are required in the current range.

| Parameter | Type | Description |
| --- | --- | --- |
| event | Event | Event object. |
| pages | Array | Pages that must be added. |

You can use this event to add pages through addPage. For example:

```javascript
$(‘#flipbook’).on(‘missing’, function(event, pages){
	for (var i = 0 ; i < pages.length; i++) {
		$(this).turn(‘addPage’,
		$(‘<div />’), pages[i]);
	}
});
```

#### start

This event is triggered before starting the motion of a page.

| Parameter | Type | Description |
| --- | --- | --- |
| event | Event | The event object. The default action is to start the animation. Preventing the default action, there wouldn’t be interaction with any corner. |
| pageObject | Object | The page object. |
| corner | String | Corner Type. The corners can be: tl, tr, bl, br. |

For instance, if you want to allow only corners at the bottom of the page, you can use the start event:

```javascript
$(‘#flipbook’).on(‘start’,
	function(event, pageObject, corner){
		if (corner==’tl’ || corner==’tr’) {
			event.preventDefault();
		}
});
```

You can also use the start event to change the next page of the current page:

```javascript
$(‘#flipbook’).on(‘start’,
	function(event, pageObject, corner){
		if (pageObject.page== 1 ) {
			// pageObject.next of the 1st page is 2,
			// but let’s change it:
			pageObject.next = 4 ;
		}
});
```

#### turning

This event is triggered before the flipbook turns the page.

| Parameter | Type | Description |
| --- | --- | --- |
| event | Event | The event object. The default action is to allow the flipbook to turn to a page. |
| page | Number | The new page number |
| view | Array | The new view |


#### turned

This event is triggered after the flipbook turned the page.

| Parameter | Type | Description |
| --- | --- | --- |
| event | Event | The event object. |
| page | Number | The new page number |
| view | Array | The new view |

#### zooming

This event is triggered when the zoom factor is changed.

| Parameter | Type | Description |
| --- | --- | --- |
| event | Event | The event object. The default action is to zoom. |
| newFactor | Number | The new zoom factor |
| current | Number | The current zoom factor |
