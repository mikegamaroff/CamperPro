/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * 2019-01-23T16:52:12
 */
!(function (o, n, i, e, t, r, c, s, a, l, u, d, p, m) {
	for (
		u = o.Ionic = o.Ionic || {},
			(d = n.createElement('style')).innerHTML = a + '{visibility:hidden}.hydrated{visibility:inherit}',
			d.setAttribute('data-styles', ''),
			p = n.head.querySelector('meta[charset]'),
			n.head.insertBefore(d, p ? p.nextSibling : n.head.firstChild),
			(function (o, n, i) {
				(o['s-apps'] = o['s-apps'] || []).push('Ionic'),
					i.componentOnReady ||
						(i.componentOnReady = function () {
							var n = this;
							function i(i) {
								if (n.nodeName.indexOf('-') > 0) {
									for (var e = o['s-apps'], t = 0, r = 0; r < e.length; r++)
										if (o[e[r]].componentOnReady) {
											if (o[e[r]].componentOnReady(n, i)) return;
											t++;
										}
									if (t < e.length) return void (o['s-cr'] = o['s-cr'] || []).push([n, i]);
								}
								i(null);
							}
							return o.Promise ? new o.Promise(i) : { then: i };
						});
			})(o, 0, l),
			t = t || u.resourcesUrl,
			d = (p = n.querySelectorAll('script')).length - 1;
		d >= 0 && !(m = p[d]).src && !m.hasAttribute('data-resources-url');
		d--
	);
	(p = m.getAttribute('data-resources-url')),
		!t && p && (t = p),
		!t && m.src && (t = (p = m.src.split('/').slice(0, -1)).join('/') + (p.length ? '/' : '') + 'ionic/'),
		(d = n.createElement('script')),
		(function (o, n, i, e) {
			return (
				!(n.search.indexOf('core=esm') > 0) &&
				(!(
					!(n.search.indexOf('core=es5') > 0 || 'file:' === n.protocol) &&
					o.customElements &&
					o.customElements.define &&
					o.fetch &&
					o.CSS &&
					o.CSS.supports &&
					o.CSS.supports('color', 'var(--c)') &&
					'noModule' in i
				) ||
					(function (o) {
						try {
							return new Function('import("")'), !1;
						} catch (o) {}
						return !0;
					})())
			);
		})(o, o.location, d)
			? (d.src = t + 'ionic.ofkibcsd.js')
			: ((d.src = t + 'ionic.b4jcyc36.js'), d.setAttribute('type', 'module'), d.setAttribute('crossorigin', !0)),
		d.setAttribute('data-resources-url', t),
		d.setAttribute('data-namespace', 'ionic'),
		n.head.appendChild(d);
})(
	window,
	document,
	0,
	0,
	0,
	0,
	0,
	0,
	'ion-action-sheet,ion-action-sheet-controller,ion-alert,ion-alert-controller,ion-anchor,ion-app,ion-avatar,ion-back-button,ion-backdrop,ion-badge,ion-button,ion-buttons,ion-card,ion-card-content,ion-card-header,ion-card-subtitle,ion-card-title,ion-checkbox,ion-chip,ion-col,ion-content,ion-datetime,ion-fab,ion-fab-button,ion-fab-list,ion-footer,ion-grid,ion-header,ion-icon,ion-img,ion-infinite-scroll,ion-infinite-scroll-content,ion-input,ion-item,ion-item-divider,ion-item-group,ion-item-option,ion-item-options,ion-item-sliding,ion-label,ion-list,ion-list-header,ion-loading,ion-loading-controller,ion-menu,ion-menu-button,ion-menu-controller,ion-menu-toggle,ion-modal,ion-modal-controller,ion-nav,ion-nav-pop,ion-nav-push,ion-nav-set-root,ion-note,ion-picker,ion-picker-column,ion-picker-controller,ion-popover,ion-popover-controller,ion-progress-bar,ion-radio,ion-radio-group,ion-range,ion-refresher,ion-refresher-content,ion-reorder,ion-reorder-group,ion-ripple-effect,ion-route,ion-route-redirect,ion-router,ion-router-outlet,ion-row,ion-searchbar,ion-segment,ion-segment-button,ion-select,ion-select-option,ion-select-popover,ion-skeleton-text,ion-slide,ion-slides,ion-spinner,ion-split-pane,ion-tab,ion-tab-bar,ion-tab-button,ion-tabs,ion-text,ion-textarea,ion-thumbnail,ion-title,ion-toast,ion-toast-controller,ion-toggle,ion-toolbar,ion-virtual-scroll',
	HTMLElement.prototype
);
