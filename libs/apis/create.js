/**
 * create.js
 */
module.exports = function(conf){
	delete(require.cache[require('path').resolve(__filename)]);
	var fs = require('fs');
	var fsX = require('fs-extra');
	var utils79 = require('utils79');


	return function(req, res, next){
		// console.log(req);
		// console.log(req.method);
		// console.log(req.body);
		// console.log(req.originalUrl);
		// console.log(req.app);
		// console.log(req.app.board);
		// console.log( JSON.stringify(userInfo) );
		var result = {
			result: true,
			message: null,
			boardId: null
		};

		res.status(200);
		res.set('Content-Type', 'text/json')

		utils79.validate(
			req.body,
			{
				"board_theme": [
					['!isNull', '空白です。']
				]
			},
			function(err){
				if(err){
					result.result = false;
					result.message = err;

					res.send(JSON.stringify(result)).end();
					return;
				}

				req.app.board.createNewBoard(
					{
						"theme": req.body.board_theme
					} ,
					function( boardId ){
						result.boardId = boardId;

						res.send(JSON.stringify(result)).end();
						return;
					}
				);
			}
		);

		return;
	};


}