const bootstrap = ( function () {
    "use strict";

    const t = new Map;
    const e = {
        set ( e, i, n ) {
            t.has( e ) || t.set( e, new Map );
            const s = t.get( e );
            s.has( i ) || 0 === s.size ? s.set( i, n ) : console.error( `Bootstrap doesn't allow more than one instance per element. Bound instance: ${ Array.from( s.keys() )[ 0 ] }.` );
        },
        get: ( e, i ) => t.has( e ) && t.get( e ).get( i ) || null,
        remove ( e, i ) {
            if ( !t.has( e ) ) return;
            const n = t.get( e );
            n.delete( i );
            0 === n.size && t.delete( e );
        }
    };
    const i = "transitionend";
    const n = t => {
        if ( t && window.CSS && window.CSS.escape ) {
            t = t.replace( /#([^\s"#']+)/g, ( t, e ) => `#${ CSS.escape( e ) }` );
        }
        return t;
    };
    const s = t => {
        t.dispatchEvent( new Event( i ) );
    };
    const o = t => {
        if ( !t || "object" != typeof t ) return false;
        if ( void 0 !== t.jquery ) t = t[ 0 ];
        return void 0 !== t.nodeType;
    };
    const r = t => {
        if ( o( t ) ) return t.jquery ? t[ 0 ] : t;
        if ( "string" == typeof t && t.length > 0 ) return document.querySelector( n( t ) );
        return null;
    };
    const a = t => {
        if ( !o( t ) || 0 === t.getClientRects().length ) return false;
        const e = "visible" === getComputedStyle( t ).getPropertyValue( "visibility" );
        const i = t.closest( "details:not([open])" );
        if ( !i ) return e;
        if ( i !== t ) {
            const e = t.closest( "summary" );
            if ( e && e.parentNode !== i ) return false;
            if ( null === e ) return false;
        }
        return e;
    };
    const l = t => {
        if ( !t || t.nodeType !== Node.ELEMENT_NODE ) return true;
        if ( t.classList.contains( "disabled" ) ) return true;
        if ( void 0 !== t.disabled ) return t.disabled;
        return t.hasAttribute( "disabled" ) && "false" !== t.getAttribute( "disabled" );
    };
    const c = t => {
        if ( !document.documentElement.attachShadow ) return null;
        if ( "function" == typeof t.getRootNode ) {
            const e = t.getRootNode();
            return e instanceof ShadowRoot ? e : null;
        }
        return t instanceof ShadowRoot ? t : t.parentNode ? c( t.parentNode ) : null;
    };
    const h = () => { };
    const d = t => {
        t.offsetHeight;
    };
    const u = () => window.jQuery && !document.body.hasAttribute( "data-bs-no-jquery" ) ? window.jQuery : null;
    const f = [];
    const p = () => "rtl" === document.documentElement.dir;
    const m = t => {
        const e = () => {
            const e = u();
            if ( e ) {
                const i = t.NAME;
                const n = e.fn[ i ];
                e.fn[ i ] = t.jQueryInterface;
                e.fn[ i ].Constructor = t;
                e.fn[ i ].noConflict = () => {
                    e.fn[ i ] = n;
                    return t.jQueryInterface;
                };
            }
        };
        if ( "loading" === document.readyState ) {
            if ( !f.length ) {
                document.addEventListener( "DOMContentLoaded", () => {
                    for ( const t of f ) t();
                } );
            }
            f.push( e );
        } else {
            e();
        }
    };
    const g = ( t, e = [], i = t ) => "function" == typeof t ? t( ...e ) : i;
    const _ = ( t, e, n = true ) => {
        if ( !n ) return g( t );
        const o = ( t => {
            if ( !t ) return 0;
            let { transitionDuration: e, transitionDelay: i } = window.getComputedStyle( t );
            const n = Number.parseFloat( e );
            const s = Number.parseFloat( i );
            if ( !n && !s ) return 0;
            e = e.split( "," )[ 0 ];
            i = i.split( "," )[ 0 ];
            return 1e3 * ( Number.parseFloat( e ) + Number.parseFloat( i ) );
        } )( e ) + 5;
        let r = false;
        const a = ( { target: n } ) => {
            if ( n === e ) {
                r = true;
                e.removeEventListener( i, a );
                g( t );
            }
        };
        e.addEventListener( i, a );
        setTimeout( () => {
            if ( !r ) s( e );
        }, o );
    };
    const b = ( t, e, i, n ) => {
        const s = t.length;
        let o = t.indexOf( e );
        if ( -1 === o ) return !i && n ? t[ s - 1 ] : t[ 0 ];
        o += i ? 1 : -1;
        if ( n ) o = ( o + s ) % s;
        return t[ Math.max( 0, Math.min( o, s - 1 ) ) ];
    };
    const v = /[^.]*(?=\..*)\.|.*/;
    const y = /\..*/;
    const w = /::\d+$/;
    const A = {};
    let E = 1;
    const T = { mouseenter: "mouseover", mouseleave: "mouseout" };
    const C = new Set( [
        "click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll",
        "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress",
        "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel",
        "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart",
        "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit",
        "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move",
        "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"
    ] );

    function O ( t, e ) {
        return e && `${ e }::${ E++ }` || t.uidEvent || E++;
    }

    function x ( t ) {
        const e = O( t );
        t.uidEvent = e;
        A[ e ] = A[ e ] || {};
        return A[ e ];
    }

    function k ( t, e, i = null ) {
        return Object.values( t ).find( t => t.callable === e && t.delegationSelector === i );
    }

    function L ( t, e, i ) {
        const n = "string" == typeof e;
        const s = n ? i : e || i;
        let o = I( t );
        if ( !C.has( o ) ) o = t;
        return [ n, s, o ];
    }

    function S ( t, e, i, n, s ) {
        if ( "string" != typeof e || !t ) return;
        let [ o, r, a ] = L( e, i, n );
        if ( e in T ) {
            const t = t => function ( e ) {
                if ( !e.relatedTarget || ( e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains( e.relatedTarget ) ) ) {
                    return t.call( this, e );
                }
            };
            r = t( r );
        }
        const l = x( t );
        const c = l[ a ] || ( l[ a ] = {} );
        const h = k( c, r, o ? i : null );
        if ( h ) {
            h.oneOff = h.oneOff && s;
            return;
        }
        const d = O( r, e.replace( v, "" ) );
        const u = o ? ( function ( t, e, i ) {
            return function n ( s ) {
                const o = t.querySelectorAll( e );
                for ( let { target: r } = s; r && r !== this; r = r.parentNode ) {
                    for ( const a of o ) {
                        if ( a === r ) {
                            P( s, { delegateTarget: r } );
                            if ( n.oneOff ) N.off( t, s.type, e, i );
                            return i.apply( r, [ s ] );
                        }
                    }
                }
            };
        } )( t, i, r ) : ( function ( t, e ) {
            return function i ( n ) {
                P( n, { delegateTarget: t } );
                if ( i.oneOff ) N.off( t, n.type, e );
                return e.apply( t, [ n ] );
            };
        } )( t, r );
        u.delegationSelector = o ? i : null;
        u.callable = r;
        u.oneOff = s;
        u.uidEvent = d;
        c[ d ] = u;
        t.addEventListener( a, u, o );
    }

    function D ( t, e, i, n, s ) {
        const o = k( e[ i ], n, s );
        if ( o ) {
            t.removeEventListener( i, o, Boolean( s ) );
            delete e[ i ][ o.uidEvent ];
        }
    }

    function $ ( t, e, i, n ) {
        const s = e[ i ] || {};
        for ( const [ o, r ] of Object.entries( s ) ) {
            if ( o.includes( n ) ) {
                D( t, e, i, r.callable, r.delegationSelector );
            }
        }
    }

    function I ( t ) {
        t = t.replace( y, "" );
        return T[ t ] || t;
    }

    const N = {
        on ( t, e, i, n ) {
            S( t, e, i, n, false );
        },
        one ( t, e, i, n ) {
            S( t, e, i, n, true );
        },
        off ( t, e, i, n ) {
            if ( "string" != typeof e || !t ) return;
            const [ s, o, r ] = L( e, i, n );
            const a = r !== e;
            const l = x( t );
            const c = l[ r ] || {};
            const h = e.startsWith( "." );
            if ( void 0 === o ) {
                if ( h ) {
                    for ( const i of Object.keys( l ) ) {
                        $( t, l, i, e.slice( 1 ) );
                    }
                }
                for ( const [ i, n ] of Object.entries( c ) ) {
                    const s = i.replace( w, "" );
                    if ( !a || e.includes( s ) ) {
                        D( t, l, r, n.callable, n.delegationSelector );
                    }
                }
            } else {
                if ( !Object.keys( c ).length ) return;
                D( t, l, r, o, s ? i : null );
            }
        },
        trigger ( t, e, i ) {
            if ( "string" != typeof e || !t ) return null;
            const n = u();
            let s = null;
            let o = true;
            let r = true;
            let a = false;
            if ( e !== I( e ) && n ) {
                s = n.Event( e, i );
                n( t ).trigger( s );
                o = !s.isPropagationStopped();
                r = !s.isImmediatePropagationStopped();
                a = s.isDefaultPrevented();
            }
            const l = P( new Event( e, { bubbles: o, cancelable: true } ), i );
            if ( a ) l.preventDefault();
            if ( r ) t.dispatchEvent( l );
            if ( l.defaultPrevented && s ) s.preventDefault();
            return l;
        }
    };

    function P ( t, e = {} ) {
        for ( const [ i, n ] of Object.entries( e ) ) {
            try {
                t[ i ] = n;
            } catch ( e ) {
                Object.defineProperty( t, i, { configurable: true, get: () => n } );
            }
        }
        return t;
    }

    function M ( t ) {
        if ( "true" === t ) return true;
        if ( "false" === t ) return false;
        if ( t === Number( t ).toString() ) return Number( t );
        if ( "" === t || "null" === t ) return null;
        if ( "string" != typeof t ) return t;
        try {
            return JSON.parse( decodeURIComponent( t ) );
        } catch ( e ) {
            return t;
        }
    }

    function j ( t ) {
        return t.replace( /[A-Z]/g, t => `-${ t.toLowerCase() }` );
    }

    const F = {
        setDataAttribute ( t, e, i ) {
            t.setAttribute( `data-bs-${ j( e ) }`, i );
        },
        removeDataAttribute ( t, e ) {
            t.removeAttribute( `data-bs-${ j( e ) }` );
        },
        getDataAttributes ( t ) {
            if ( !t ) return {};
            const e = {};
            const i = Object.keys( t.dataset ).filter( t => t.startsWith( "bs" ) && !t.startsWith( "bsConfig" ) );
            for ( const n of i ) {
                let i = n.replace( /^bs/, "" );
                i = i.charAt( 0 ).toLowerCase() + i.slice( 1, i.length );
                e[ i ] = M( t.dataset[ n ] );
            }
            return e;
        },
        getDataAttribute: ( t, e ) => M( t.getAttribute( `data-bs-${ j( e ) }` ) )
    };

    class H {
        static get Default () {
            return {};
        }
        static get DefaultType () {
            return {};
        }
        static get NAME () {
            throw new Error( 'You have to implement the static method "NAME", for each component!' );
        }
        _getConfig ( t ) {
            t = this._mergeConfigObj( t );
            t = this._configAfterMerge( t );
            this._typeCheckConfig( t );
            return t;
        }
        _configAfterMerge ( t ) {
            return t;
        }
        _mergeConfigObj ( t, e ) {
            const i = o( e ) ? F.getDataAttribute( e, "config" ) : {};
            return {
                ...this.constructor.Default,
                ...( "object" == typeof i ? i : {} ),
                ...( o( e ) ? F.getDataAttributes( e ) : {} ),
                ...( "object" == typeof t ? t : {} )
            };
        }
        _typeCheckConfig ( t, e = this.constructor.DefaultType ) {
            for ( const [ n, s ] of Object.entries( e ) ) {
                const e = t[ n ];
                const r = o( e ) ? "element" : ( e == null ? `${ e }` : Object.prototype.toString.call( e ).match( /\s([a-z]+)/i )[ 1 ].toLowerCase() );
                if ( !new RegExp( s ).test( r ) ) {
                    throw new TypeError( `${ this.constructor.NAME.toUpperCase() }: Option "${ n }" provided type "${ r }" but expected type "${ s }".` );
                }
            }
        }
    }

    class W extends H {
        constructor ( t, i ) {
            super();
            t = r( t );
            if ( t ) {
                this._element = t;
                this._config = this._getConfig( i );
                e.set( this._element, this.constructor.DATA_KEY, this );
            }
        }
        dispose () {
            e.remove( this._element, this.constructor.DATA_KEY );
            N.off( this._element, this.constructor.EVENT_KEY );
            for ( const t of Object.getOwnPropertyNames( this ) ) {
                this[ t ] = null;
            }
        }
        _queueCallback ( t, e, i = true ) {
            _( t, e, i );
        }
        _getConfig ( t ) {
            t = this._mergeConfigObj( t, this._element );
            t = this._configAfterMerge( t );
            this._typeCheckConfig( t );
            return t;
        }
        static getInstance ( t ) {
            return e.get( r( t ), this.DATA_KEY );
        }
        static getOrCreateInstance ( t, e = {} ) {
            return this.getInstance( t ) || new this( t, "object" == typeof e ? e : null );
        }
        static get VERSION () {
            return "5.3.2";
        }
        static get DATA_KEY () {
            return `bs.${ this.NAME }`;
        }
        static get EVENT_KEY () {
            return `.${ this.DATA_KEY }`;
        }
        static eventName ( t ) {
            return `${ t }${ this.EVENT_KEY }`;
        }
    }

    const B = t => {
        let e = t.getAttribute( "data-bs-target" );
        if ( !e || "#" === e ) {
            let i = t.getAttribute( "href" );
            if ( !i || ( !i.includes( "#" ) && !i.startsWith( "." ) ) ) return null;
            if ( i.includes( "#" ) && !i.startsWith( "#" ) ) {
                i = `#${ i.split( "#" )[ 1 ] }`;
            }
            e = i && "#" !== i ? n( i.trim() ) : null;
        }
        return e;
    };

    const z = {
        find: ( t, e = document.documentElement ) => [].concat( ...Element.prototype.querySelectorAll.call( e, t ) ),
        findOne: ( t, e = document.documentElement ) => Element.prototype.querySelector.call( e, t ),
        children: ( t, e ) => [].concat( ...t.children ).filter( t => t.matches( e ) ),
        parents ( t, e ) {
            const i = [];
            let n = t.parentNode.closest( e );
            while ( n ) {
                i.push( n );
                n = n.parentNode.closest( e );
            }
            return i;
        },
        prev ( t, e ) {
            let i = t.previousElementSibling;
            while ( i ) {
                if ( i.matches( e ) ) return [ i ];
                i = i.previousElementSibling;
            }
            return [];
        },
        next ( t, e ) {
            let i = t.nextElementSibling;
            while ( i ) {
                if ( i.matches( e ) ) return [ i ];
                i = i.nextElementSibling;
            }
            return [];
        },
        focusableChildren ( t ) {
            const e = [ "a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]' ]
                .map( t => `${ t }:not([tabindex^="-"])` )
                .join( "," );
            return this.find( e, t ).filter( t => !l( t ) && a( t ) );
        },
        getSelectorFromElement ( t ) {
            const e = B( t );
            return e && z.findOne( e ) ? e : null;
        },
        getElementFromSelector ( t ) {
            const e = B( t );
            return e ? z.findOne( e ) : null;
        },
        getMultipleElementsFromSelector ( t ) {
            const e = B( t );
            return e ? z.find( e ) : [];
        }
    };

    const R = ( t, e = "hide" ) => {
        const i = `click.dismiss${ t.EVENT_KEY }`;
        const n = t.NAME;
        N.on( document, i, `[data-bs-dismiss="${ n }"]`, function ( i ) {
            if ( [ "A", "AREA" ].includes( this.tagName ) ) i.preventDefault();
            if ( l( this ) ) return;
            const s = z.getElementFromSelector( this ) || this.closest( `.${ n }` );
            t.getOrCreateInstance( s )[ e ]();
        } );
    };

    const ot = ".bs.carousel";
    const rt = ".data-api";
    const at = "next";
    const lt = "prev";
    const ct = "left";
    const ht = "right";
    const dt = `slide${ ot }`;
    const ut = `slid${ ot }`;
    const ft = `keydown${ ot }`;
    const pt = `mouseenter${ ot }`;
    const mt = `mouseleave${ ot }`;
    const gt = `dragstart${ ot }`;
    const _t = `load${ ot }${ rt }`;
    const bt = `click${ ot }${ rt }`;
    const vt = "carousel";
    const yt = "active";
    const wt = ".active";
    const At = ".carousel-item";
    const Et = wt + At;
    const Tt = { ArrowLeft: ht, ArrowRight: ct };
    const Ct = { interval: 5000, keyboard: true, pause: "hover", ride: false, touch: true, wrap: true };
    const Ot = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };

    class xt extends W {
        constructor ( t, e ) {
            super( t, e );
            this._interval = null;
            this._activeElement = null;
            this._isSliding = false;
            this.touchTimeout = null;
            this._swipeHelper = null;
            this._indicatorsElement = z.findOne( ".carousel-indicators", this._element );
            this._addEventListeners();
            if ( this._config.ride === vt ) this.cycle();
        }
        static get Default () {
            return Ct;
        }
        static get DefaultType () {
            return Ot;
        }
        static get NAME () {
            return "carousel";
        }
        next () {
            this._slide( at );
        }
        nextWhenVisible () {
            if ( !document.hidden && a( this._element ) ) this.next();
        }
        prev () {
            this._slide( lt );
        }
        pause () {
            if ( this._isSliding ) s( this._element );
            this._clearInterval();
        }
        cycle () {
            this._clearInterval();
            this._updateInterval();
            this._interval = setInterval( () => this.nextWhenVisible(), this._config.interval );
        }
        _maybeEnableCycle () {
            if ( !this._config.ride ) return;
            if ( this._isSliding ) {
                N.one( this._element, ut, () => this.cycle() );
            } else {
                this.cycle();
            }
        }
        to ( t ) {
            const e = this._getItems();
            if ( t > e.length - 1 || t < 0 ) return;
            if ( this._isSliding ) {
                N.one( this._element, ut, () => this.to( t ) );
                return;
            }
            const i = this._getItemIndex( this._getActive() );
            if ( i === t ) return;
            const n = t > i ? at : lt;
            this._slide( n, e[ t ] );
        }
        dispose () {
            if ( this._swipeHelper ) this._swipeHelper.dispose();
            super.dispose();
        }
        _configAfterMerge ( t ) {
            t.defaultInterval = t.interval;
            return t;
        }
        _addEventListeners () {
            if ( this._config.keyboard ) N.on( this._element, ft, t => this._keydown( t ) );
            if ( "hover" === this._config.pause ) {
                N.on( this._element, pt, () => this.pause() );
                N.on( this._element, mt, () => this._maybeEnableCycle() );
            }
            if ( this._config.touch && st.isSupported() ) this._addTouchEventListeners();
        }
        _addTouchEventListeners () {
            for ( const t of z.find( ".carousel-item img", this._element ) ) {
                N.on( t, gt, t => t.preventDefault() );
            }
            const t = {
                leftCallback: () => this._slide( this._directionToOrder( ct ) ),
                rightCallback: () => this._slide( this._directionToOrder( ht ) ),
                endCallback: () => {
                    if ( "hover" === this._config.pause ) {
                        this.pause();
                        if ( this.touchTimeout ) clearTimeout( this.touchTimeout );
                        this.touchTimeout = setTimeout( () => this._maybeEnableCycle(), 500 + this._config.interval );
                    }
                }
            };
            this._swipeHelper = new st( this._element, t );
        }
        _keydown ( t ) {
            if ( /input|textarea/i.test( t.target.tagName ) ) return;
            const e = Tt[ t.key ];
            if ( e ) {
                t.preventDefault();
                this._slide( this._directionToOrder( e ) );
            }
        }
        _getItemIndex ( t ) {
            return this._getItems().indexOf( t );
        }
        _setActiveIndicatorElement ( t ) {
            if ( !this._indicatorsElement ) return;
            const e = z.findOne( wt, this._indicatorsElement );
            e.classList.remove( yt );
            e.removeAttribute( "aria-current" );
            const i = z.findOne( `[data-bs-slide-to="${ t }"]`, this._indicatorsElement );
            if ( i ) {
                i.classList.add( yt );
                i.setAttribute( "aria-current", "true" );
            }
        }
        _updateInterval () {
            const t = this._activeElement || this._getActive();
            if ( !t ) return;
            const e = Number.parseInt( t.getAttribute( "data-bs-interval" ), 10 );
            this._config.interval = e || this._config.defaultInterval;
        }
        _slide ( t, e = null ) {
            if ( this._isSliding ) return;
            const i = this._getActive();
            const n = t === at;
            const s = e || b( this._getItems(), i, n, this._config.wrap );
            if ( s === i ) return;
            const o = this._getItemIndex( s );
            const r = e => N.trigger( this._element, e, {
                relatedTarget: s,
                direction: this._orderToDirection( t ),
                from: this._getItemIndex( i ),
                to: o
            } );
            if ( r( dt ).defaultPrevented ) return;
            if ( !i || !s ) return;
            const a = Boolean( this._interval );
            this.pause();
            this._isSliding = true;
            this._setActiveIndicatorElement( o );
            this._activeElement = s;
            const l = n ? "carousel-item-start" : "carousel-item-end";
            const c = n ? "carousel-item-next" : "carousel-item-prev";
            s.classList.add( c );
            d( s );
            i.classList.add( l );
            s.classList.add( l );
            this._queueCallback( () => {
                s.classList.remove( l, c );
                s.classList.add( yt );
                i.classList.remove( yt, c, l );
                this._isSliding = false;
                r( ut );
            }, i, this._isAnimated() );
            if ( a ) this.cycle();
        }
        _isAnimated () {
            return this._element.classList.contains( "slide" );
        }
        _getActive () {
            return z.findOne( Et, this._element );
        }
        _getItems () {
            return z.find( At, this._element );
        }
        _clearInterval () {
            if ( this._interval ) {
                clearInterval( this._interval );
                this._interval = null;
            }
        }
        _directionToOrder ( t ) {
            return p() ? ( t === ct ? lt : at ) : ( t === ct ? at : lt );
        }
        _orderToDirection ( t ) {
            return p() ? ( t === lt ? ct : ht ) : ( t === lt ? ht : ct );
        }
        static jQueryInterface ( t ) {
            return this.each( function () {
                const e = xt.getOrCreateInstance( this, t );
                if ( "number" != typeof t ) {
                    if ( "string" == typeof t ) {
                        if ( void 0 === e[ t ] || t.startsWith( "_" ) || "constructor" === t ) {
                            throw new TypeError( `No method named "${ t }"` );
                        }
                        e[ t ]();
                    }
                } else {
                    e.to( t );
                }
            } );
        }
    }

    N.on( document, bt, "[data-bs-slide], [data-bs-slide-to]", function ( t ) {
        const e = z.getElementFromSelector( this );
        if ( !e || !e.classList.contains( vt ) ) return;
        t.preventDefault();
        const i = xt.getOrCreateInstance( e );
        const n = this.getAttribute( "data-bs-slide-to" );
        if ( n ) {
            i.to( n );
            i._maybeEnableCycle();
        } else if ( "next" === F.getDataAttribute( this, "slide" ) ) {
            i.next();
            i._maybeEnableCycle();
        } else {
            i.prev();
            i._maybeEnableCycle();
        }
    } );

    N.on( window, _t, () => {
        const t = z.find( '[data-bs-ride="carousel"]' );
        for ( const e of t ) {
            xt.getOrCreateInstance( e );
        }
    } );

    m( xt );

    const U = ".bs.swipe";
    const G = `touchstart${ U }`;
    const J = `touchmove${ U }`;
    const Z = `touchend${ U }`;
    const tt = `pointerdown${ U }`;
    const et = `pointerup${ U }`;
    const it = { endCallback: null, leftCallback: null, rightCallback: null };
    const nt = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };

    class st extends H {
        constructor ( t, e ) {
            super();
            this._element = t;
            if ( t && st.isSupported() ) {
                this._config = this._getConfig( e );
                this._deltaX = 0;
                this._supportPointerEvents = Boolean( window.PointerEvent );
                this._initEvents();
            }
        }
        static get Default () {
            return it;
        }
        static get DefaultType () {
            return nt;
        }
        static get NAME () {
            return "swipe";
        }
        dispose () {
            N.off( this._element, U );
        }
        _start ( t ) {
            if ( this._supportPointerEvents ) {
                if ( this._eventIsPointerPenTouch( t ) ) this._deltaX = t.clientX;
            } else {
                this._deltaX = t.touches[ 0 ].clientX;
            }
        }
        _end ( t ) {
            if ( this._eventIsPointerPenTouch( t ) ) {
                this._deltaX = t.clientX - this._deltaX;
            }
            this._handleSwipe();
            g( this._config.endCallback );
        }
        _move ( t ) {
            this._deltaX = t.touches && t.touches.length > 1 ? 0 : t.touches[ 0 ].clientX - this._deltaX;
        }
        _handleSwipe () {
            const t = Math.abs( this._deltaX );
            if ( t <= 40 ) return;
            const e = t / this._deltaX;
            this._deltaX = 0;
            if ( e ) g( e > 0 ? this._config.rightCallback : this._config.leftCallback );
        }
        _initEvents () {
            if ( this._supportPointerEvents ) {
                N.on( this._element, tt, t => this._start( t ) );
                N.on( this._element, et, t => this._end( t ) );
                this._element.classList.add( "pointer-event" );
            } else {
                N.on( this._element, G, t => this._start( t ) );
                N.on( this._element, J, t => this._move( t ) );
                N.on( this._element, Z, t => this._end( t ) );
            }
        }
        _eventIsPointerPenTouch ( t ) {
            return this._supportPointerEvents && ( "pen" === t.pointerType || "touch" === t.pointerType );
        }
        static isSupported () {
            return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
        }
    }

    return { Carousel: xt };
} )();

// Assign to global scope
if ( typeof window !== "undefined" ) {
    window.bootstrap = bootstrap;
}

// Export for CommonJS
if ( typeof module !== "undefined" && typeof module.exports !== "undefined" ) {
    module.exports = bootstrap;
}

// Support AMD
if ( typeof define === "function" && define.amd ) {
    define( bootstrap );
}