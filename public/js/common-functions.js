define(
    [
        'exports',
        'jquery'
    ],
    function(exports, $){
    	exports.makeAjaxGet = function(url, successCallback){
    		$.ajax({
    		    url: url,
    		    type: 'GET',
    		    success: successCallback,
    		    error: function(httpRequest, status, error){
    		        console.log(error);
    		    }
    		});
    	};

    	exports.makeAjaxPost = function(url, postData, successCallback){
    		$.ajax({
    		    url: url,
    		    type: 'POST',
    		    data: postData,
    		    success: successCallback,
    		    error: function(httpRequest, status, error){
    		        console.log(error);
    		    }
    		});
    	};
    }
)    