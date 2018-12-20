Vue.component('v-notifications', {
	template : 
'<q-btn round dense color="primary" :icon="icon" class="on-left" >'
+'	<q-chip floating color="red" v-if="count>0" >{{count}}</q-chip>'
+'	<q-popover>'
+'		<q-list link>'
+'			<q-item v-for="notif in list" :key="notif.uuid" >'
+'				<q-btn type="a" flat :href="notif.targetUrl">'
+'    			<q-item-side><q-icon :name="toIcon(notif.type)" size="2rem"></q-icon></q-item-side>'
+'    			<q-item-main :label="notif.title" :sublabel="notif.content" label-lines="1" sublabel-lines="4">'
+'    			</q-item-main>'
+'    			<q-item-side right>'
+'    				<q-item-tile stamp>{{toDelay(new Date(notif.creationDate))}}</q-item-tile>'
+'    				<q-item-tile icon="cancel" color="grey"></q-item-tile>'
+'    			</q-item-side>'
+'    		</q-btn></q-item>'
+'  	</q-list>'
+'	</q-popover>'
+'</q-btn>'
	,
	props : {
		icon : { type: String, 'default': 'notifications' },
		baseUrl : { type: String, 'default': '/api/', required:true }
	},
	data: function() {
	    return {
	        list: [],
	        count: 0,
	        timer: ''
	    }
	},
	created: function() {
	    this.fetchNotificationsList();
	    this.timer = setInterval(this.fetchNotificationsList, 5000)

	},
	methods: {
		fetchNotificationsList: function() {
	        this.$http.get(this.baseUrl+'x/notifications/api/messages')
	        .then( function (response) { //Ok
	        	this.list = response.body;
	            this.count = this.list.length;
			}, function(response) { //Ko
				this.$q.notify(response.status + ":" +response.statusText+ " Can't reload notifications");
			});
	    },
	    cancelAutoUpdate: function() { clearInterval(this.timer) },
	    toIcon : function(type) {
	    	if(type == 'MARS-LOGIN') {
	    		return 'verified_user';
	    	} else {
	    		return 'mail';
	    	}
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
	beforeDestroy() {
	  clearInterval(this.timer)
	}
})
