var mongoose    =  require("mongoose");
var Campground  =  require("./models/campground");	
var Comment     =  require("./models/comment");
var data = [
	{
		name: "Camping Tent",
		image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852547849772e72d39345_340.jpg",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu turpis egestas. Fringilla urna porttitor rhoncus dolor. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Vitae nunc sed velit dignissim sodales ut eu sem integer. In fermentum posuere urna nec tincidunt praesent semper."
	},
	{
		name: "Lake Canyon",
		image: "https://pixabay.com/get/52e3d5404957a514f1dc84609620367d1c3ed9e04e507440752d7add9049cd_340.jpg",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu turpis egestas. Fringilla urna porttitor rhoncus dolor. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Vitae nunc sed velit dignissim sodales ut eu sem integer. In fermentum posuere urna nec tincidunt praesent semper."
	},
	{
		name: "Cloud's Rest",
		image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507440752d7add9049cd_340.jpg",
		description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet tellus cras adipiscing enim eu turpis egestas. Fringilla urna porttitor rhoncus dolor. Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada. Vitae nunc sed velit dignissim sodales ut eu sem integer. In fermentum posuere urna nec tincidunt praesent semper."
	}
];
function seedDB(){
	Campground.remove({},function(err){
		Comment.remove({},function(err){
			console.log("Removed Campgrounds");
			data.forEach(function(seed){
				Campground.create(seed,function(err,newCampground){
					if(err)
						console.log(err);
					else{
						console.log("Campground added");
						Comment.create({
							text:"The place is great, but I wish there was Internet",
							author:"Homer"
							},function(err,comment){
							if(err)
								console.log(err);
							else{
								newCampground.comments.push(comment);
								newCampground.save();
								console.log("Comment added");
							}
						});
					}
				});
			});
		});
	});
};

module.exports=seedDB;




