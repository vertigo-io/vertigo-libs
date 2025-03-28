<template>
    <q-btn round :flat="!hasNew" dense :color="hasNew?colorNew:color" :text-color="hasNew?textColorNew:textColor"
	       :icon="wasError?iconError:count>0?icon:iconNone" :title="wasError?$q.lang.vui.notifications.serverLost:''">
        <q-badge color="red" text-color="white" floating v-if="count>0" >{{count}}</q-badge>
        <q-menu class="notifications">
            <q-list style="width:300px">
                <q-item v-for="notif in list" :key="notif.uuid" tag="a" :href="targetUrlPrefix + notif.targetUrl" >
                    <q-item-section avatar><q-icon :name="toIcon(notif.type)" size="2rem"></q-icon></q-item-section>
                    <q-item-section><q-item-label>{{notif.title}}</q-item-label><q-item-label caption lines="3">{{notif.content}}</q-item-label></q-item-section>
                    <q-item-section side top>
                        <q-item-label caption>{{toDelay(new Date(notif.creationDate))}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>
<script>
import * as Quasar from "quasar"

export default {
    props : {
        icon : { type: String, 'default': 'notifications' },
        iconNone : { type: String, 'default': 'notifications_none' },
		iconError : { type: String, 'default': 'warning' },
        color : { type: String, 'default': 'secondary' },
        colorNew : { type: String, 'default': 'accent' },
        textColor : { type: String, 'default': 'secondary-inverted' },
        textColorNew : { type: String, 'default': 'accent-inverted' },
        typeIconMap : { type: Object, 'default': function() { return {} } },
        baseUrl : { type: String, 'default': '/api/', required:true },
        targetUrlPrefix : { type: String, 'default': '/', required:true }
    },
    data: function() {
        return {
            firstCall : true,
            list: [],
            hasNew : false,
            wasError : false,
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
            this.$http.get(this.baseUrl+'x/notifications/api/messages', { timeout:5*1000, vNoDefaultErrorHandler:true})
            .then( function (response) { //Ok
                this.updateNotificationsData(response.data);
                if(this.wasError) {
                    clearInterval(this.timer);
                    this.timer = setInterval(this.fetchNotificationsList, 5000);
                }
                this.wasError = false;
            }.bind(this))
            .catch(function  () { //Ko
                if(!this.wasError) {
                    clearInterval(this.timer);
                    this.timer = setInterval(this.fetchNotificationsList, 60000);
                }
                this.wasError = true;
            }.bind(this));
        },
        updateNotificationsData : function (newList) {
            // Tri par ordre décroissant de date de création
            const sortedList = newList.sort(function(a,b) {return  b.creationDate - a.creationDate});
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
            if(!this.firstCall) {
                this.hasNew = newElements.length>0;
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
            } else {
                // firstcall hasnew is true only if last notif is recent enough (2 times the polling interval)
                this.hasNew = newElements.length > 0 && Quasar.date.getDateDiff(Date.now(), newElements[0].creationDate, 'seconds') < 2 * 5  
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
            let diff = Quasar.date.getDateDiff(Date.now(),creationDate, 'days');
            if(diff>0)
                return diff+' '+ this.$q.lang.vui.notifications.days;
            diff = Quasar.date.getDateDiff(Date.now(),creationDate, 'hours');
            if(diff>0)
                return diff+' '+ this.$q.lang.vui.notifications.hours;
            diff = Quasar.date.getDateDiff(Date.now(),creationDate, 'minutes');
            if(diff>0)
                return diff+' ' +this.$q.lang.vui.notifications.minutes;
            diff = Quasar.date.getDateDiff(Date.now(),creationDate, 'seconds');
            return diff+' '+this.$q.lang.vui.notifications.seconds;	    	
        }
        

    },
    beforeDestroy : function() {
      clearInterval(this.timer)
    }
}
</script>