Vue.component('v-comments', {
	template : 
'<span>'
+'	<q-btn round size="lg" color="primary" textColor="white" :icon="count>0?icon:iconNone" @click="commentDrawer = !commentDrawer" class="on-left" >'
+'		<q-chip floating small color="red" v-if="count>0" style="right:-.4em;top:-.4em;">{{count}}</q-chip>'
+'	</q-btn>'
+'	<q-drawer overlay behavior="mobile" :width="600" v-model="commentDrawer" side="right">'
+'		<q-list >'
+'			<q-item-label header><big>Comments</big></q-item-label>'
+'			<q-item>'
+'      		<q-item-section><q-input class="col" type="textarea"  inverted-light color="white" v-model="commentTextArea" stack-label="Leave a comment here"></q-input></q-item-section>'
+'				<q-item-section side><q-btn color="primary" round icon="send" label="Publish" @click="publishComment"></q-btn></q-item-section>'
+'      	</q-item>'
+'			<q-separator />'
+'          <q-item v-for="comment in list" :key="comment.uuid" class="items-start">'
+'    			<q-item-section avatar> <q-avatar><img :src="baseUrl+\'/x/accounts/api/\'+comment.author+\'/photo\'"></q-avatar></q-item-section>'
+'    			<q-item-section>'
+'					<q-item-label>{{comment.authorDisplayName}}<q-item-label>'
+'					<q-item-label caption>{{comment.msg}}"<q-item-label>'			
+' 					<q-popup-edit v-if="comment.author==connectedAccount" v-model="comment.msg" buttons="true" @save="updateComment(comment)" label-cancel="Cancel" label-set="Save">'
+'    					 <q-input type="textarea" v-model="comment.msg" />'
+'    				</q-popup-edit>'
+'				</q-item-section>'
+'    			<q-item-section side>'
+'    				<q-item-label stamp>{{toDelay(new Date(comment.creationDate))}}</q-item-label>'
+'    				<q-icon name="edit" v-if="comment.author==connectedAccount"></q-icon>'
+'    			</q-item-section>'
+'    		</q-item>'
+'  	</q-list>'
+'	</q-drawer>'
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
