authors.aggregate([
	{
		$lookup : {
			from : "books",
			localField: "email",
			foreignField: "authorEmail",
			as : "books_of_author"
		}
	}, {
		$match: {
			books_of_author : {
				$ne : []
			}
		}
	},{
		$project : {
			name : 1,
			first_book : {
				$ifNull : [  {
					$arrayElemAt: ["$books_of_author" , 0]
				},
					"No Books"
				]
			},
			first_book_title : {
				$switch : {
					branches : [
						case : 
			},
			total_books : {
				$size : "$books_of_author"
			}
		}
	}
])
