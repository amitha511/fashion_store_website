window.fbAsyncInit = function () {
	FB.init({
	  appId: 'XXXXXX',
	  status: true,
	  cookie: true,
	  xfbml: true
	});
  };
  
  (function (doc) {
	var js;
	var id = 'facebook-jssdk';
	var ref = doc.getElementsByTagName('script')[0];
	if (doc.getElementById(id)) {
	  return;
	}
	js = doc.createElement('script');
	js.id = id;
	js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
  }(document));

FB.api(
	'/103914885705757/feed',
	'POST',
	{"message":"Test API massage\nTest API massage\nTest API massage"},
	function(response) {
		if(response)
			console.log("Test API - send post");
	}
  );