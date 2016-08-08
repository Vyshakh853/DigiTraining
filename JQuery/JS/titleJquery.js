$(document).ready(function(){
	var $movieList=$('#movieList');
	var $allMovieList=$('#allMovieList');
	var moviess=$('#allMovieList').html();
    $("#search").click(function(){
    	$movieList.html("");
        var title=$('#movieTitle').val();
        console.log(title);
		$.ajax({
			type:"GET",
			url : 'http://www.omdbapi.com/?s='+title,
			success: function(result){
				var obj=result;
				var Search=obj.Search;
				console.log(obj);
				//$movieList.remove();
				$.each(Search,function(i,movie){
					$movieList.append(Mustache.render(moviess,movie));
					/*$movieList.append('<li>Title: '+movie.Title+', Type: '+movie.Type+'</li>');*/
				})
			},
		error: function(){
			alert("Invalid search");
		}
			
			
		});
    });
});

/*$("#title").val("Hello world!");*/
/*$(function(){

});*/

/*$('document').ready(function(){
	$("#search").click(function(){
	$('#title').val("Hello");
	$("p").text("Hello World");
});
});*/
/*var search= function(){
	$('hi').html("Hello");
}*/