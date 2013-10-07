jQuery(document).ready(function($){

	//Comment Model
	window.Comment = Backbone.Model.extend({
		idAttribute: '_id',
		
		defaults: function(){
			return {
				done: false,
				order: Comments.nextOrder()
			};
		},
		
		toggle: function(){
			this.save({done: !this.get('done')});
		}
	});
	
	//Comment Collection
	window.CommentList = Backbone.Collection.extend({
		model: Comment,
		url: '/api/comments',
		done: function(){
			return this.filter(function(comment){ return comment.get('done'); });
		},
		remaining: function(){
			return this.without.apply(this, this.done());
		},
		
		nextOrder: function(){
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},
		
		comparator: function(comment){
			return comment.get('order');
		}
	});
	
	window.Comments = new CommentList;
});