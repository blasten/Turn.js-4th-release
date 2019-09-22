turn.js
=========

### Make a flip book with HTML5

Turn.js is a plugin for jQuery that adds a beautiful transition similar to real pages in a book or magazine. It works in all modern browsers including touch devices.


#### Usage

**CSS code:**
```css
#magazine{
	width: 800px;
	height: 400px;
}
#magazine .turn-page{
	background-color:#ccc;
}
```

**HTML code:**
```html
<div id="magazine">
	<div><span class="text">Page 1</span></div>
	<div><span class="text">Page 2</span></div>
	<div><span class="text">Page 3</span></div>
</div>
```

**JavaScript code:**
```javascript
$('#magazine').turn({gradients: true, acceleration: true});
```

#### Requirements

jQuery 1.7 or later


#### License

Released under a non-commercial BSD license

[Full documentation](API-DOCUMENTATION.md)
