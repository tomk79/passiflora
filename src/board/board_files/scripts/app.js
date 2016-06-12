window.app = new (function(){
	// app "board"
	var _this = this;
	var $ = require('jquery');
	var Promise = require('es6-promise').Promise;
	var utils79 = require('utils79');
	var it79 = require('iterate79');
	var twig = require('twig');
	var socket,
		Keypress,
		userInfo = {
			'name': 'new Commer'
		};
	var $timeline;

	/**
	 * 初期化
	 */
	this.init = function(callback){
		callback = callback || function(){};

		new Promise(function(rlv){rlv();})
			.then(function(){ return new Promise(function(rlv, rjt){
				// DOM Setup
				$timeline = $('.board__timeline .board__timeline_list');
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				// init biflora framework
				socket = _this.socket = window.biflora
					.createSocket(
						new (function(){

						})(),
						io,
						{
							'showSocketTest': function( data, callback, main, socket ){
								console.log(data);
								// alert(data.message);
								console.log(callback);
								callback(data);
								return;
							}
						}
					)
				;
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				// (biflora 送信テスト)
				socket.send(
					'api1',
					{
					} ,
					function(rtn){
						console.log(rtn);
						rlv();
					}
				);
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				// キーボードイベントセット
				var cmdKeyName = (function(ua){
					// console.log(ua);
					var idxOf = ua.indexOf( 'Mac OS X' );
					if( idxOf >= 0 ){
						return 'cmd';
					}
					return 'ctrl';
				})(window.navigator.userAgent);
				// console.log(cmdKeyName);

				Keypress = new window.keypress.Listener();
				_this.Keypress = Keypress;
				Keypress.simple_combo("backspace", function(e) {
					switch(e.target.tagName.toLowerCase()){
						case 'input': case 'textarea':
						return true; break;
					}
					e.preventDefault();
				});
				Keypress.simple_combo("delete", function(e) {
					switch(e.target.tagName.toLowerCase()){
						case 'input': case 'textarea':
						return true; break;
					}
					e.preventDefault();
				});
				Keypress.simple_combo("escape", function(e) {
					switch(e.target.tagName.toLowerCase()){
						case 'input': case 'textarea':
						return true; break;
					}
					e.preventDefault();
				});
				Keypress.simple_combo("enter", function(e) {
					switch(e.target.tagName.toLowerCase()){
						case 'input': case 'textarea':
							// alert('enter');
							var $this = $(e.target);
							var msg = {
								'content': $this.val() ,
								'userName': userInfo.name
							};
							socket.send(
								'message',
								msg,
								function(rtn){
									console.log('Your message was sent.');
									console.log(rtn);
									_this.addMessageToTimeline(rtn);
									$this.val('').focus();
								}
							);
							return true; break;
					}
					e.preventDefault();
				});
				// Keypress.simple_combo(cmdKeyName+" x", function(e) {
				// 	px.message('cmd x');
				// 	e.preventDefault();
				// });
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjt){
				// 返却
				console.log('standby.');
				callback(rtn);
				rlv();
			}); })
		;

		return;
	}

	/**
	 * タイムラインにメッセージを追加
	 */
	this.addMessageToTimeline = function(message){
		$timeline.append( $('<div>')
			.text( message.content )
		);
		return;
	}

})();
