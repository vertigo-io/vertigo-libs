Vue.component('v-comments', {
	template : 
'<span>'
+'	<q-btn round size="lg" color="primary" textColor="white" :icon="count>0?icon:iconNone" @click="commentDrawer = !commentDrawer" class="on-left" >'
+'		<q-chip floating small color="red" v-if="count>0" style="right:-.4em;top:-.4em;">{{count}}</q-chip>'
+'	</q-btn>'
+'	<q-layout-drawer :width="600" v-model="commentDrawer" side="right">'
+'		<q-list >'
+'			<q-list-header><big>Comments</big></q-list-header>'
+'			<q-item>'
+'      		<q-item-main><q-input class="col" type="textarea"  inverted-light color="white" v-model="commentTextArea" stack-label="Leave a comment here"></q-input></q-item-main>'
+'				<q-item-side right class="self-end"><q-btn color="primary" round icon="send" label="Publish" @click="publishComment"></q-btn></q-item-side>'
+'      	</q-item>'
+'			<q-item-separator />'
+'          <q-item v-for="comment in list" :key="comment.uuid" class="items-start">'
+'    			<q-item-side :avatar="baseUrl+\'/x/accounts/api/\'+comment.author+\'/photo\'"></q-item-side>'
+'    			<q-item-main :label="comment.authorDisplayName" :sublabel="comment.msg" label-lines="1" sublabel-lines="4">'    			
+' 					<q-popup-edit v-model="comment.msg" buttons="true" @save="updateComment(comment)">'
+'    					 <q-input type="textarea" v-model="comment.msg" />'
+'    				</q-popup-edit>'
+'				</q-item-main>'
+'    			<q-item-side right>'
+'    				<q-item-tile stamp>{{toDelay(new Date(comment.creationDate))}}</q-item-tile>'
+'    				<q-item-tile icon="edit" v-if="comment.author==connectedAccount"></q-item-tile>'
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
		baseUrl : { type: String, 'default': '/api/', required:true },
		connectedAccount : { type: String }
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
	        	this.count = this.list.length;
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
	        	this.commentTextArea = '';
	        	this.fetchCommentsList();
			});
	    },
	    updateComment: function(newComment) {
	    	this.$http.put(this.baseUrl+'x/comment/api/comments/'+newComment.uuid, newComment)
	        .then( function (response) { //Ok
	        	this.commentTextArea = '';
	        	this.fetchCommentsList();
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
	    	return 'Now';	    	
	    }
	},
})
