Vue.component('v-notifications', {
	template : 
'<q-btn round dense :color="hasNew?\'primary\':\'white\'" :textColor="hasNew?\'white\':\'primary\'" :icon="count>0?icon:iconNone" class="on-left" >'
+'	<q-chip floating color="red" v-if="count>0" >{{count}}</q-chip>'
+'	<q-popover>'
+'		<q-list link style="width:300px">'
+'			<q-list-header class="q-py-none row items-center justify-between">Notifications<q-btn round flat icon="settings"></q-btn></q-list-header>'
+'			<q-item-separator />'
+'          <q-item v-for="notif in list" :key="notif.uuid" class="q-py-none" >'
+'    			<q-item-side><q-icon :name="toIcon(notif.type)" size="2rem"></q-icon></q-item-side>'
+'    			<q-item-main :label="notif.title" :sublabel="notif.content" label-lines="1" sublabel-lines="4">'
+'				</q-item-main>'
+'    			<q-item-side right>'
+'    				<q-item-tile stamp>{{toDelay(new Date(notif.creationDate))}}</q-item-tile>'
+'    				<q-item-tile icon="cancel" color="grey"></q-item-tile>'
+'    			</q-item-side>'
+'    		</q-item>'
+'  	</q-list>'
+'	</q-popover>'
+'</q-btn>'
	,
	props : {
		icon : { type: String, 'default': 'notifications' },
		iconNone : { type: String, 'default': 'notifications_none' },
		typeIconMap : { type: Object, 'default': function() { return {} } },
		baseUrl : { type: String, 'default': '/api/', required:true }
	},
	data: function() {
	    return {
	    	firstCall : true,
	        list: [],
	        hasNew : false,
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
	        	this.updateNotificationsData(response.body);
			}, function(response) { //Ko
				this.$q.notify(response.status + ":" +response.statusText+ " Can't reload notifications");
			});
	    },
	    updateNotificationsData : function (newList) {
	    	// Tri par ordre décroissant de date de création
	    	const sortedList = newList.sort((a,b) => b.creationDate - a.creationDate);
	    	var newElements = [];	    	
	    	// Traverse both arrays simultaneously.
	    	var lastOldElement = this.list[0];
	    	if(!lastOldElement) {
	    		newElements = sortedList;
	    	} else {
	    		for(var newIdx = 0; newIdx < sortedList.length; newIdx++) {
		        	if( sortedList[newIdx].uuid != lastOldElement.uuid) {
			        	if(sortedList[newIdx].creationDate < lastOldElement.creationDate) {
			        		break;
			        	} else {
			        		newElements.push(sortedList[newIdx]);
			        	}
		        	}
		        }
	    	}
	        // Mise à jour des notifications
	    	this.list = sortedList;
	    	// Met à jour le nombre total de notifications
	    	this.count = sortedList.length;
	    	this.hasNew = newElements.length>0;
	    	if(!this.firstCall) {
	    		newElements.forEach(function(notif) {
	    			this.$q.notify({ 
	    				type : 'info',
	    				icon : this.toIcon(notif.type),
	    				message : notif.title,
	    				detail : notif.content,
	    				timeout : 3000,
	    				position : 'bottom-right'
	    			})
	    		}.bind(this));
	    	}
	    	
	    	// Booléen indiquant s'il s'agit du premier appel à la MaJ des notifications
	    	this.firstCall = false;	    	
	    },	    
	    cancelAutoUpdate: function() { clearInterval(this.timer) },
	    toIcon : function(type) {
	    	var typeIcon = this.typeIconMap[type];
	    	return typeIcon?typeIcon:'mail';
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
