$(document).ready(function(){
	var $bookList=$('#wholeTable');
	var $allBookList=$('#allBookList');
	var $Bookheading=$('#Bookheading').html();
	var template=$('#allBookList').html();
	var searchVal=null;
	var urlCondition="";
	var pageStart=0, 
		pageEnd=21;
	/*Ajax GET event*/
	var ajaxGet=function(){
		$.ajax({
			type:"GET",
			url : 'http://localhost:8080/Books/'+urlCondition,
			success: function(result){
				pagination(result);
			},
			error: function(){
				alert("Invalid search");
			}
		});
	};
	/*Ajax POST event*/
	var ajaxPost=function(bookPost){
		$.ajax({
			type:"POST",
			url : 'http://localhost:8080/Books/'+posturlCondition,
			data: bookPost,
			success: function(result){
				alert("Successfully inserted data");
				$('#myModal').modal('toggle');
			},
			error: function(){
				alert("Error on inserting the data");
			}
		});
	};
	/*Ajax put event*/
	var ajaxPUT=function(bookPost){
		$.ajax({
			type:"PUT",
			url : 'http://localhost:8080/Books/'+posturlCondition,
			data: bookPost,
			success: function(result){
				alert("Successfully inserted data");
				$('#myModal').modal('toggle');
				$bookList.html("");
				ajaxGet();
			},
			error: function(){
				console.log("error");
				alert("Error on inserting the data");
			}
		});
	};	
	/*Load complete data*/
    $("#loadDetails").click(function(){
    	$bookList.html("");
    	searchVal==null;
    	pageStart=0;
    	urlCondition='?_start='+pageStart+'&_limit=51';
		ajaxGet();
	});
	/*Search*/
	$('#search').click(function(){
		$bookList.html("");
		searchVal=$('#searchtextbox').val();
    	pageStart=0;
    	urlCondition='?Book_name_like='+searchVal+'&_start='+pageStart+'&_limit=51';
		ajaxGet();
	});
	/*Add new book*/
	$('#inputForm').on('submit',function(e){
		console.log("Inside add new");
		e.preventDefault();
		var $bookname=$('#bookname').val();
		var $authorname=$('#authorname').val();
		var $publishername=$('#publishername').val();
		var $type=$('#type').val();
		var $genres=$('#Genres').val();
		var $publishedyear=$('#publishedyear').val();
		var $language=$('#language').val();
		var $price=$('#price').val();
		var bookPost={
    				"Book_name": $bookname,
    				"Author_name": $authorname,
    				"Publisher_name": $publishername,
    				"Type": $type,
    				"Genres": $genres,
    				"Language": $language,
    				"Book_cover": "http://placehold.it/32x32",
    				"Published_year": $publishedyear,
    				"Price": $price
  			};
  		posturlCondition="";
  		ajaxPost(bookPost);
	});
	// Value of modal window to empty
	$('#addBooks').click(function(){
		$('#bookname').val("");
		$('#authorname').val("");
		$('#publishername').val("");
		$('#type').val("");
		$('#Genres').val("");
		$('#publishedyear').val("");
		$('#language').val("");
		$('#price').val("");
		posturlCondition="";
		$('.editFooter').html('<button class="btn btn-primary" role="button" data-dismiss="modal">Cancel</button><button type="submit" class="btn btn-success" role="button" id="addBook">Add Book</button>');
	});
	/*Edit*/
	$('#inputForm').on('submit',function(e){
		console.log("Inside edit");
		e.preventDefault();
		var $bookname=$('#bookname').val();
		var $authorname=$('#authorname').val();
		var $publishername=$('#publishername').val();
		var $type=$('#type').val();
		var $genres=$('#Genres').val();
		var $publishedyear=$('#publishedyear').val();
		var $language=$('#language').val();
		var $price=$('#price').val();
		var bookPost={
    				"Book_name": $bookname,
    				"Author_name": $authorname,
    				"Publisher_name": $publishername,
    				"Type": $type,
    				"Genres": $genres,
    				"Language": $language,
    				"Book_cover": "http://placehold.it/32x32",
    				"Published_year": $publishedyear,
    				"Price": $price
  			};
  		ajaxPUT(bookPost);
	});
	/*Delete */
	$bookList.delegate('#deleteButton','click',function(){
		var id=$(this).attr('data-id');
		var tr=$(this).closest('tr');
		var check=confirm("Do you want to delete the data  ? ");
		if(check==true){
		$.ajax({
			type:"DELETE",
			url : 'http://localhost:8080/Books/'+id,
			success: function(result){
				alert("Data deleted successfully");
				tr.fadeOut(200,function(){
					$(this).remove();
				});
			},
			error: function(){
				alert("Oops.. Error on deleting the record.");
			}
		});	
		}
	});
	// Edit 
	$bookList.delegate('#editButton','click',function(){
		var id=$(this).attr('data-id');
		tr=$(this).closest('tr');
		posturlCondition=id;
		$.ajax({
			type:"GET",
			url : 'http://localhost:8080/Books/'+id,
			success: function(result){
					$('#bookname').val(result.Book_name);
					$('#authorname').val(result.Author_name);
					$('#publishername').val(result.Publisher_name);
					$('#type').val(result.Type);
					$('#Genres').val(result.Genres);
					$('#publishedyear').val(result.Published_year);
					$('#language').val(result.Language);
					$('#price').val(result.Price);
					$('.editFooter').html('<button class="btn btn-primary" role="button" data-dismiss="modal">Cancel</button><button type="submit" class="btn btn-success" role="button" id="saveEdit">Save</button>')
				},
			error: function(){
				alert("Invalid search");
			}
		});
	});
	/*Hide both next and prev */
	$('.prevButton').hide();
	$('.nextButton').hide();
	/*Pagination*/
	/*Next button click*/
	$('.nextButton').click(function(){
		$bookList.html("");
		goNext();
	});
	/*Next function*/
	var goNext=function(){
		pageStart=pageStart+50;
		if(searchVal==null){
			urlCondition='?_start='+pageStart+'&_limit=51';
		}
		else{
			urlCondition='?Book_name_like='+searchVal+'&_start='+pageStart+'&_limit=51';
		}
		ajaxGet();
		$('.prevButton').show();
	}
	/*Prev button click*/
	$('.prevButton').click(function(){
		$bookList.html("");
		goPrevious();

	});
	/*Prev function*/
	var goPrevious=function(){
		pageStart=pageStart-50;
		if(searchVal==null){
			urlCondition='?_start='+pageStart+'&_limit=51';
		}
		else{
			urlCondition='?Book_name_like='+searchVal+'&_start='+pageStart+'&_limit=51';
		}
		ajaxGet();
		if(pageStart==0){
			$('.prevButton').hide();
		}
	}
	/*Pagination function*/
	var pagination=function(data){
				if(data.length!=0){
				if(data.length==51){
					$('.nextButton').show();
				}
				else{
					$('.nextButton').hide();
				}
				if(pageStart==0){
					$('.prevButton').hide();
				}
				$bookList.append(Mustache.render($Bookheading));
				var counter=0;
				$.each(data,function(i,book){
					$bookList.append(Mustache.render(template,book));
					counter++;
					if(counter==50){
						return false;
					}
				});
			}
			else{
				$bookList.append('<h1>No data</h1>');
			}
	}
});