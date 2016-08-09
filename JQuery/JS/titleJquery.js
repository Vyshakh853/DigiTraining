$(document).ready(function(){
	var $movieList=$('#movieList');
	var $allMovieList=$('#allMovieList');
	var moviess=$('#allMovieList').html();
	var page=1;
	var load=function(result){

	}
    $("#search").click(function(){
    	$movieList.html("");
        var title=$('#movieTitle').val();
        console.log(page);
        page=1;
		$.ajax({
			type:"GET",
			url : 'http://www.omdbapi.com/?s='+title+'&page='+page,
			success: function(result){
				var obj=result;
				var Search=obj.Search;
				console.log(obj);
				// Fetching the no of total results
				var totalResult=obj.totalResults;
				// One page includes 10 records, so calculating page number
				var j=parseInt(totalResult)/10;
				/*Appending first page data*/
				$.each(Search,function(i,movie){
					$movieList.append(Mustache.render(moviess,movie));
				})
				/*Calling load function for getting all data at a time*/
				for(var i=1;i<=j;i++){
					load();
				}
			},
		error: function(){
			alert("Invalid search");
		}
			
			
		});
    });
    /*Function to load complete data*/
    var load=function(){
        var title=$('#movieTitle').val();
        console.log(page);
        /*Increasing page by 1*/
        page=page+1;
        /*Calling Ajax for getting all data*/
		$.ajax({
			type:"GET",
			url : 'http://www.omdbapi.com/?s='+title+'&page='+page,
			success: function(result){
				var obj=result;
				var Search=obj.Search;
				console.log(obj);
				$.each(Search,function(i,movie){
					$movieList.append(Mustache.render(moviess,movie));
				})
			},
		error: function(){
			alert("Invalid search");
		}
			
			
		});
    };
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