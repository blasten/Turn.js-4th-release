/**

TurnJS 5 

Actually an abstraction layer of turn js 4.


TurnJS
	.version
	.destroy
	.page
	.view()
	
	.pages
		.add()
		.remove()
		.count
		.zoom
		.size
	
	.animation
		.running
		.peel
		.next
		.prev
		.turn()
	
	.event
		.end
		.first
		.last
		.missing
		.start
		.turning
		.turned
		.zooming 
	
	.settings
		.disabled
		.autoCenter
		.direction	
		.display
		.duration
		.gradients
		.elevation
		.turnCorners
 
**/

class TurnJS {

/** new TurnJS: create new turnjs book **/
	constructor( selector, options = '' ) {
		this.jQueryObject = $(selector);
		this.jQueryObject.turn(options);
		this.__setup__();
	}

/** TurnJS.version: get turnjs version **/
	get version() {
		return this.jQueryObject.turn('version');
	}

/** TurnJS.destroy: destroy turnjs book **/
	get destroy() {
		this.jQueryObject.turn('destroy');
		this.jQueryObject = undefined;
	}

/** TurnJS.page: get current page **/
	get page() {
		return this.jQueryObject.turn('page');
	}

/** TurnJS.page = $: go to page $ without animation **/
	set page( page ) {
		return this.jQueryObject.turn('page', page).turn('stop');
	}

/** TurnJS.view($): get visible pages when page $ is shown **/
	view( page = this.pages ) {
		return this.jQueryObject.turn('view', page).filter( (page) => page != 0 )
	}
	
	__setup__() {
		this.pages = {
			__parent__: this,

	/** TurnJS.pages.add($1,$2): add a new page containing $1 in position $2 **/	
			add : function( element, pageNumber = this.pages + 1 ) {
				return this.__parent__.jQueryObject.turn('addPage', $(element), pageNumber)
			},

	/** TurnJS.pages.remove($): remove page number $ **/
			remove: function( pageNumber = this.page ) {
				return this.__parent__.jQueryObject.turn('removePage', pageNumber);
			},

	/** TurnJS.pages.count: how many pages have the book **/
			get pages() {
				return this.__parent__.jQueryObject.turn('pages');
			},

	/** TurnJS.pages.zoom: get current zoom factor **/
			get zoom() {
				return this.__parent__.jQueryObject.turn('zoom');
			},

	/** TurnJS.pages.zoom = $: zoom of $ **/
			set zoom( factor ) {
				return this.__parent__.jQueryObject.turn('zoom', factor);
			},

	/** TurnJS.pages.size: get current width and height **/
			get size() {
				return this.__parent__.jQueryObject.turn('size');
			},

	/** TurnJS.pages.size = $: set with and height to $ **/
			set size( size ) {
				return this.__parent__.jQueryObject.turn('size', size.width, size.height);
			}
		}

		this.animation = {
			__parent__: this,

	/** TurnJS.animation.turn($): turn to page $ **/
			turn: function( page ) {
				return this.__parent__.jQueryObject.turn('page', page);
			},

	/** TurnJS.animation.prev: turn to previous page **/
			get prev() {
				return this.__parent__.jQueryObject.turn('previous');
			},
	/** TurnJS.animation.next: turn to next page **/
			get next() {
				return this.__parent__.jQueryObject.turn('next');
			},

	/** TurnJS.animation.running: get if there is an animation in progress **/
			get running() {
				return this.__parent__.jQueryObject.turn('animating');
			},

	/** TurnJS.animation.peel = $: peel $ border **/
			set peel( corner ) {
				return this.__parent__.jQueryObject.turn('peel', corner);
			}
		}

		this.event = {
			__parent__: this,

	/** TurnJS.event.end: get current on end event action **/
			get end() {
				return this.__parent__.jQueryObject.turn('options').when.end;
			},

	/** TurnJS.event.end = $: set on end event action to $ **/
			set end( action ) {
				return this.__parent__.jQueryObject.turn('options',{when:{end: action }});
			},

	/** TurnJS.event.first: get current on first event action **/
			get first() {
				return this.__parent__.jQueryObject.turn('options').when.first;
			},

	/** TurnJS.event.first = $: set on first event action to $ **/
			set first( action ) {
				return this.__parent__.jQueryObject.turn('options',{when:{first: action }});
			},

	/** TurnJS.event.last: get current on last event action **/
			get last() {
				return this.__parent__.jQueryObject.turn('options').when.last;
			},

	/** TurnJS.event.last = $: set on last event action to $ **/
			set last( action ) {
				return this.__parent__.jQueryObject.turn('options',{when:{last: action }});
			},

	/** TurnJS.event.missing: get current on missing event action **/
			get missing() {
				return this.__parent__.jQueryObject.turn('options').when.missing;
			},

	/** TurnJS.event.missing = $: set on missing event action to $ **/
			set missing( action ) {
				return this.__parent__.jQueryObject.turn('options',{when:{missing: action }});
			},

	/** TurnJS.event.start: get current on start event action **/
			get start() {
				return this.__parent__.jQueryObject.turn('options').when.start;
			},

	/** TurnJS.event.start = $: set on start event action to $ **/
			set start( action ) {
				return this.__parent__.jQueryObject.turn('options',{when:{start: action }});
			},

	/** TurnJS.event.turning: get current on turning event action **/
			get turning() {
				return this.__parent__.jQueryObject.turn('options').when.turning;
			},

	/** TurnJS.event.turning = $: set on turning event action to $ **/
			set turning( action ) {
				return this.__parent__.jQueryObject.turn('options',{when:{turning: action }});
			},

	/** TurnJS.event.turned: get current on turned event action **/
			get turned() {
				return this.__parent__.jQueryObject.turn('options').when.turned;
			},

	/** TurnJS.event.turned = $: set on turned event action to $ **/
			set turned( action ) {
				return this.__parent__.jQueryObject.turn('options',{when:{turned: action }});
			},

	/** TurnJS.event.zooming: get current on zooming event action **/
			get zooming() {
				return this.__parent__.jQueryObject.turn('options').when.zooming;
			},

	/** TurnJS.event.zooming = $: set on zooming event action to $ **/
			set zooming( action ) {
				return this.__parent__.jQueryObject.turn('options',{when:{zooming: action }});
			}
		}

		this.settings = {
			__parent__: this,

	/** TurnJS.settings.disabled: get disabled option value **/
			get disabled() {
				return this.__parent__.jQueryObject.turn('disabled');
			},

	/** TurnJS.settings.disabled = $: set disabled option to $ **/
			set disabled( value ) {
				return this.__parent__.jQueryObject.turn('disable', value);
			},

	/** TurnJS.settings.direction: get direction option value **/
			get direction() {
				return this.__parent__.jQueryObject.turn('direction');
			},

	/** TurnJS.settings.direction = $: set direction option to $ **/
			set direction( value ) {
				return this.__parent__.jQueryObject.turn('direction', value);
			},

	/** TurnJS.settings.display: get display option value **/
			get display() {
				return this.__parent__.jQueryObject.turn('display');
			},

	/** TurnJS.settings.display = $: set display option to $ **/
			set display( value ) {
				return this.__parent__.jQueryObject.turn('display', value);
			},

	/** TurnJS.settings.autoCenter: get autoCenter option value **/
			get autoCenter() {
				return this.__parent__.jQueryObject.turn('options').autoCenter;
			},

	/** TurnJS.settings.autoCenter = $: set autoCenter option to $ **/
			set autoCenter( value ) {
				return this.__parent__.jQueryObject.turn('options',{autoCenter: value});
			},

	/** TurnJS.settings.duration: get duration option value **/
			get duration() {
				return this.__parent__.jQueryObject.turn('options').duration;
			},

	/** TurnJS.settings.duration = $: set duration option to $ **/
			set duration( value ) {
				return this.__parent__.jQueryObject.turn('options',{duration: value});
			},

	/** TurnJS.settings.gradients: get gradients option value **/
			get gradients() {
				return this.__parent__.jQueryObject.turn('options').gradients;
			},

	/** TurnJS.settings.gradients = $: set gradients option to $ **/
			set gradients( value ) {
				return this.__parent__.jQueryObject.turn('options',{gradients: value});
			},

	/** TurnJS.settings.elevation: get elevation option value **/
			get elevation() {
				return this.__parent__.jQueryObject.turn('options').elevation;
			},

	/** TurnJS.settings.elevation = $: set elevation option to $ **/
			set elevation( value ) {
				return this.__parent__.jQueryObject.turn('options',{elevation: value});
			},

	/** TurnJS.settings.turnCorners: get turnCorners option value **/
			get turnCorners() {
				return this.__parent__.jQueryObject.turn('options').turnCorners;
			},

	/** TurnJS.settings.turnCorners = $: set turnCorners option to $ **/
			set turnCorners( value ) {
				return this.__parent__.jQueryObject.turn('options',{turnCorners: value});
			}
		}
	}
}