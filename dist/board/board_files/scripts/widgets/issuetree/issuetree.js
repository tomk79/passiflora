(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * widgets: issuetree.js
 */
module.exports = function( app, $widget ){

	$widget
		.append( $('<div>')
			.text('issue tree')
		)
		.append( $('<div>')
			.append( $('<a>')
				.text('OPEN')
				.attr({'href':'javascript:;'})
				.click(function(){

					var $body = $('<div>');
					// $body.find('[name=userName]').val( userInfo.name );
					window.main.modal.dialog({
						'title': 'issue',
						'body': $body,
						'buttons': [
							$('<button>')
								.text('OK')
								.addClass('btn')
								.addClass('btn-primary')
								.click(function(){
									// userInfo.name = $body.find('[name=userName]').val();
									window.main.modal.close();
								})
						]
					});

				})
			)
		)
	;

	/**
	 * widget への配信メッセージを受信
	 */
	this.onmessage = function(content){
	}

	return;
}

},{}]},{},[1])