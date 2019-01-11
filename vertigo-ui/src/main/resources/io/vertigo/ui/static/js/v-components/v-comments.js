Vue.component('v-comments', {
	template : 
'<span>'
+'	<q-btn round size="lg" color="primary" textColor="white" :icon="count>0?icon:iconNone" @click="commentDrawer = !commentDrawer" class="on-left" >'
+'		<q-chip floating color="red" v-if="count>0" >{{count}}</q-chip>'
+'	</q-btn>'
+'	<q-layout-drawer v-model="commentDrawer" side="right">'
+'		<q-input type="textarea" v-model="commentTextArea" stack-label="Type your comment here"/>'
+'		<q-btn label="Publish" icon="send" @click="publishComment"/>'		
+'		<q-list link style="width:300px">'
+'			<q-list-header class="q-py-none row items-center justify-between">Comments</q-list-header>'
+'			<q-item-separator />'
+'          <q-item v-for="comment in list" :key="comment.uuid" class="q-py-none" >'
+'    			<q-item-side :avatar="baseUrl+\'/x/accounts/api/\'+comment.author+\'/photo\'"></q-item-side>'
+'    			<q-item-main :label="comment.authorDisplayName" :sublabel="comment.msg" label-lines="1" sublabel-lines="4">'
+'				</q-item-main>'
+'    			<q-item-side right>'
+'    				<q-item-tile stamp>{{toDelay(new Date(comment.creationDate))}}</q-item-tile>'
+'    				<q-item-tile icon="edit" color="grey" v-if="comment.uuid==null"></q-item-tile>'
+'    			</q-item-side>'
+'    		</q-item>'
+'  	</q-list>'
+'	</q-layout-drawer>'
+'</span>'
	,
	props : {
		concept : { type: String },
		id : { type: String },
		icon : { type: String, 'default': 'comment' },
		iconNone : { type: String, 'default': 'add_comment' },
		baseUrl : { type: String, 'default': '/api/', required:true }
	},
	data: function() {
	    return {
	    	list: [],
	        count: 0,
	        commentDrawer: false,
	        commentTextArea :""	    
	    }
	},
	created: function() {
	    this.fetchCommentsList();

	},
	methods: {
		fetchCommentsList: function() {
	        this.$http.get(this.baseUrl+'x/comment/api/comments?concept='+this.concept+'&id='+this.id)
	        .then( function (response) { //Ok
	        	this.list = response.body;
			});
	    },
	    publishComment: function() {
	    	var newComment = {
	    			msg : this.commentTextArea
	    	};
	    	newComment.concept = this.concept;
	    	newComment.id = this.id;
	        this.$http.post(this.baseUrl+'x/comment/api/comments?concept='+this.concept+'&id='+this.id, newComment)
	        .then( function (response) { //Ok
	        	this.list.unshift(newComment);
			});
	    }, 
	    toDelay : function(creationDate) {
	    	let diff = Quasar.utils.date.getDateDiff(Date.now(),creationDate, 'days');
	    	if(diff>0)
	    		return diff+' days';
	    	diff = Quasar.utils.date.getDateDiff(Date.now(),creationDate, 'hours');
	    	if(diff>0)
	    		return diff+' hours';
	    	diff = Quasar.utils.date.getDateDiff(Date.now(),creationDate, 'minutes');
	    	if(diff>0)
	    		return diff+' min';
	    	diff = Quasar.utils.date.getDateDiff(Date.now(),creationDate, 'seconds');
	    	return diff+' s';	    	
	    }
	},
})
