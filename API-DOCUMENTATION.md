# turn.js API DOCUMENTATION

> Copyright © 2012 Emmanuel Garcia - 2019 Raffaele Morganti

The turn.js API was conveniently built as a jQuery plugin, it provides access to a set of features and allows you to define the user interaction.
The API includes properties, methods and events. Most setter and getter functions have the same name.

## Index
* [Requirements](#requirements)
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
	+ [Options](#options)
	+ [Adding options to the constructor:](#adding-options-to-the-constructor)
* [Methods](#methods)
	+ [List of methods](#list-of-methods)
		- [version](#version)
		- [destroy](#destroy)
		- [page](#page-1)
		- [view()](#view)
		- [pages](#pages)
			* [add()](#add)
			* [remove()](#remove)
			* [count](#count)
			* [zoom](#zoom)
			* [size](#size)
		- [animation](#animation)
			* [running](#running)
			* [peel](#peel)
			* [next](#next)
			* [prev](#prev)
			* [turn()](#turn)
		- [event](#event)
			* [List of events](#list-of-events)
		- [settings](#settings)
			* [disabled](#disabled)
			* [autoCenter](#autocenter)
			* [direction](#direction)
			* [display](#display)
			* [duration](#duration)
			* [gradients](#gradients)
			* [elevation](#elevation)
			* [turnCorners](#turncorners)

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

2. Using constructor options, for example:

	```javascript
	flipbook = new TurnJS({width: 800 , height: 600 });
	```

3. Using the size method, for example:

	```javascript
	flipbook.size = {width: 800 , height: 600 };
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

The constructor is the function that will turn the container into a flipbook. Example:

```javascript
flipbook = new TurnJS([options]);
```

Notice that the constructor only has one argument called options and it’s optional.

### Options

The options define characteristics of the flipbook. All the keys are optional.

| Option | Type | Default value | Description |
| --- | --- | --- | --- |
| acceleration | Boolean | true | Sets the hardware acceleration mode, for touch devices this value must be true. |
| autoCenter | Boolean | false | Centers the flipbook depending on how many pages are visible. |
| display | String | single | Sets the display mode. Values: single, double |
| duration | Number | 600 | Sets the duration of the transition in milliseconds |
| gradients | Number | true | Shows gradients and shadows during the transition. |
| height | Number | Height of the selector | Sets the height of the selector |
| elevation | Number | 0 | Sets the elevation of the page during the transition |
| page | Number | 1 | Sets the first page |
| pages | Number | The number of pages in the DOM | Sets the number of pages |
| when | Object | {} | Sets event listeners |
| width | Number | Width of the selector | Sets the width of the page |

### Adding options to the constructor:

```javascript
flipbook = new TurnJS({
	display: ‘double’,
	elevation: 50 ,
	when: {
		turned: function(event, page, pageObj) {
		alert(‘the current page is ’ + page);
		}
	}
});
```

## Methods

Syntax:

```javascript
flipbook.method
```

### List of methods

#### version

```javascript
flipbook.version;
//replaces
$('#flipbook').turn('version');
```

#### destroy

```javascript
flipbook.destroy;
//replaces
$('#flipbook').turn('destroy');
```

#### page

```javascript
flipbook.page;
//replaces
$('#flipbook').turn('page');

flipbook.page = 10;
//replaces
$('#flipbook').turn('page', 10).turn('stop');
```

#### view()

```javascript
flipbook.view(10);
//replaces
$('#flipbook').turn('view', 10);
```

#### pages

##### add()

```javascript
flipbook.pages.add('<div/>', 10);
//replaces
$('#flipbook').turn('addPage', $('<div/>'), 10);
```

##### remove()

```javascript
flipbook.pages.remove(10);
//replaces
$('#flipbook').turn('removePage', 10);
```

##### count

```javascript
flipbook.pages.count;
//replaces
$('#flipbook').turn('pages');
```

##### zoom

```javascript
flipbook.pages.zoom;
//replaces
$('#flipbook').turn('zoom');

flipbook.pages.zoom = 2;
//replaces
$('#flipbook').turn('zoom', 2);
```

##### size

```javascript
flipbook.pages.size;
//replaces
$('#flipbook').turn('size');

flipbook.pages.size = {width: 100, height: 200};
//replaces
$('#flipbook').turn('size', 100, 200);
```

#### animation

##### running

```javascript
flipbook.animation.running;
//replaces
$('#flipbook').turn('animating');
```

##### peel

```javascript
flipbook.animation.peel = 'br';
//replaces
$('#flipbook').turn('peel', 'br');
```

##### next

```javascript
flipbook.animation.next;
//replaces
$('#flipbook').turn('next');
```

##### prev

```javascript
flipbook.animation.prev;
//replaces
$('#flipbook').turn('previous');
```

##### turn()

```javascript
flipbook.animation.turn(10);
//replaces
$('#flipbook').turn('page', 10);
```

#### event

```javascript
flipbook.event.EVENT_NAME = function(){};
//replaces
$('#flipbook').on('EVENT_NAME', function(){} );
```

##### List of events

- first
- last
- missing
- turning
- turned
- zooming

#### settings

##### disabled

```javascript
flipbook.settings.disabled;
//replaces
$('#flipbook').turn('disabled');

flipbook.settings.disabled = true;
//replaces
$('#flipbook').turn('disable', true);
```

##### autoCenter

```javascript
flipbook.settings.autoCenter;
//replaces
$('#flipbook').turn('options').autoCenter;

flipbook.settings.autoCenter = true;
//replaces
$('#flipbook').turn('options',{autoCenter: true});
```

##### direction

```javascript
flipbook.settings.direction;
//replaces
$('#flipbook').turn('direction');

flipbook.settings.direction = 'ltr';
//replaces
$('#flipbook').turn('direction', 'ltr');
```

##### display

```javascript
flipbook.settings.display;
//replaces
$('#flipbook').turn('display');

flipbook.settings.display = 'double';
//replaces
$('#flipbook').turn('display', 'double');
```

##### duration

```javascript
flipbook.settings.duration;
//replaces
$('#flipbook').turn('options').duration;

flipbook.settings.duration = 500;
//replaces
$('#flipbook').turn('options',{duration: 500});
```

##### gradients

```javascript
flipbook.settings.gradients;
//replaces
$('#flipbook').turn('options').gradients;

flipbook.settings.gradients = true;
//replaces
$('#flipbook').turn('options',{gradients: true});
```

##### elevation

```javascript
flipbook.settings.elevation;
//replaces
$('#flipbook').turn('options').elevation;

flipbook.settings.elevation = 50;
//replaces
$('#flipbook').turn('options',{elevation: 50});
```

##### turnCorners

```javascript
flipbook.settings.turnCorners;
//replaces
$('#flipbook').turn('options').turnCorners;

flipbook.settings.turnCorners = 'bl,br';
//replaces
$('#flipbook').turn('options',{turnCorners: 'bl,br'});
```