VUiExtensions.methods.fromCalendarTime = function(date) {
    //return date.day+'/'+date.month+'/'+date.year+' '+date.hour+':'+date.minute;
    //2022-01-23T22:22:39.124Z
    ;
    return date.date + 'T' + date.time + ':00.000Z';
}

//var PARSE_REGEX = /^(\d{1,2})\/(\d{1,2})\/(\d{4})?([^\d]+(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?(.(\d{1,3}))?$/;
//var PARSE_REGEX = /^(\d{1,4})-(\d{1,2})-(\d{2})?([^\d]+(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?(.(\d{1,3}))Z?$/;
var PARSE_REGEX_ISO = /^(\d{1,4})-(\d{1,2})-(\d{2})$/;
var PARSE_REGEX_FMT = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
VUiExtensions.methods.toCalendarDate = function(vDate, minutesOfDay) {
    if(!vDate) return null;
    if(vDate.includes('-')) {
        return this.toCalendarDateIso(vDate, minutesOfDay);
    }
    return this.toCalendarDateFmt(vDate, minutesOfDay);
}
VUiExtensions.methods.toCalendarDateIso = function(vDate, minutesOfDay) {
    
    // YYYY-MM-DD hh:mm
    var parts = PARSE_REGEX_ISO.exec(vDate);
    if (!parts) { return null }

    return {
        date: parts[1] + '-' + parts[2] + '-' + parts[3],
        time: Math.floor(minutesOfDay/60) + ':' + minutesOfDay%60,
        year: parseInt(parts[1], 10),
        month: parseInt(parts[2], 10),
        day: parseInt(parts[3], 10) || 1,
        hour: Math.floor(minutesOfDay/60) || 0,
        minute: minutesOfDay%60 || 0,
        weekday: 0,
        doy: 0,
        workweek: 0,
        hasDay: true,
        hasTime: !!(minutesOfDay),
        past: false,
        current: false,
        future: false,
        disabled: false
    }
}

VUiExtensions.methods.toCalendarDateFmt= function(vDate, minutesOfDay) {
    // DD/MM/YYYY hh:mm
    var parts = PARSE_REGEX_FMT.exec(vDate);
    if (!parts) { return null }

    return {
        date: parts[3] + '-' + parts[2] + '-' + parts[1],
        time: Math.floor(minutesOfDay/60) + ':' + minutesOfDay%60,
        year: parseInt(parts[3], 10),
        month: parseInt(parts[2], 10),
        day: parseInt(parts[1], 10) || 1,
        hour: Math.floor(minutesOfDay/60) || 0,
        minute: minutesOfDay%60 || 0,
        weekday: 0,
        doy: 0,
        workweek: 0,
        hasDay: true,
        hasTime: !!(minutesOfDay),
        past: false,
        current: false,
        future: false,
        disabled: false
    }
}

VUiExtensions.methods.isCssColor = function(color) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
};

VUiExtensions.methods.badgeClasses = function(event, type) {
    const cssColor = this.isCssColor(event.bgcolor);
    const plageState = event.nbPublie>0 ? "publie" 
    : event.nbPlanifie>0?"planifie"
    : event.nbNonPublie>0?"nonPublie" : "none";
    const isHeader = type === 'header'
    return {
        [`bg-trh-${plageState}`]: !cssColor,
        'full-width': !isHeader && (!event.side || event.side === 'full'),
        'left-side': !isHeader && event.side === 'left',
        'right-side': !isHeader && event.side === 'right'
    }
};

VUiExtensions.methods.badgeStyles = function(event, type, timeStartPos, timeDurationHeight) {
    const s = {}
    if (this.isCssColor(event.bgcolor)) {
        s['background-color'] = event.bgcolor
        s.color = luminosity(event.bgcolor) > 0.5 ? 'black' : 'white'
    }
    if (timeStartPos) {
        s.top = timeStartPos(event.eventCalendar.time,false) + 'px'
    }
    if (timeDurationHeight) {
        let endMinuteOfDay = event.eventEndCalendar.hour*60+event.eventEndCalendar.minute;
        let startMinuteOfDay = event.eventCalendar.hour*60+event.eventCalendar.minute;
        s.height = (timeDurationHeight(endMinuteOfDay - startMinuteOfDay) - 3) + 'px'
    }
    //s['align-items'] = 'flex-start'
    return s
};

VUiExtensions.methods.intervalStart = function(allEvents) {
    var minTime = (7*60+30); //7h30
    for (let i = 0; i < allEvents.length; ++i) {
        minTime = Math.min(minTime, allEvents[i].minutesDebut);
    }
    return minTime/30; //30min per interval 
}

VUiExtensions.methods.intervalCount = function(allEvents) {
    var maxTime = (18*60+30); //18h30
    for (let i = 0; i < allEvents.length; ++i) {
        maxTime = Math.max(maxTime, allEvents[i].minutesFin);
    }
    var maxInterval = maxTime/30; //30min per interval 
    var minInterval = this.intervalStart(allEvents); 
    return maxInterval-minInterval; //18h30 - 7h30
}

VUiExtensions.methods.getEvents = function(dt, allEvents) {
    const currentDate = QCalendarDay.parsed(dt)
    const selectedEvents = []
    for (let i = 0; i < allEvents.length; ++i) {
        let added = false
        var eventCalendar = this.toCalendarDate(allEvents[i].dateLocale, allEvents[i].minutesDebut );
        var eventEndCalendar = this.toCalendarDate(allEvents[i].dateLocale, allEvents[i].minutesFin );
        //allEvents[i].eventCalendar = eventCalendar;
        //allEvents[i].eventEndCalendar = eventEndCalendar;
        if (eventCalendar.date === dt) {
            if (eventCalendar.time) {
                if (selectedEvents.length > 0) {
                    // check for overlapping times
                    const startTime = QCalendarDay.parsed(eventCalendar.date + ' ' + eventCalendar.time)
                    const endTime = QCalendarDay.parsed(eventCalendar.date + ' ' + eventEndCalendar.time)
                    for (let j = 0; j < selectedEvents.length; ++j) {
                        if (selectedEvents[j].eventCalendar.time) {
                            const startTime2 = QCalendarDay.parsed(selectedEvents[j].eventCalendar.date + ' ' + selectedEvents[j].eventCalendar.time)
                            const endTime2 = QCalendarDay.parsed(selectedEvents[j].eventEndCalendar.date + ' ' + selectedEvents[j].eventEndCalendar.time)
                            
                            if (startTime.date != endTime2.date && startTime2.date != endTime.date && (
                               QCalendarDay.isBetweenDates(startTime, startTime2, endTime2, true) || QCalendarDay.isBetweenDates(endTime, startTime2, endTime2, true) 
                            )) {
                                selectedEvents[j].side = 'left'
                                selectedEvents.push({...allEvents[i], side:'right', eventCalendar,eventEndCalendar })
                                added = true
                                break
                            }
                        }
                    }
                }
            }
            if (!added) {
               selectedEvents.push({...allEvents[i], eventCalendar,eventEndCalendar })
            }
        }
        else if (eventCalendar.days) {
            // check for overlapping dates
            const startDate = QCalendarDay.parsed(eventCalendar.date)
            const endDate = QCalendarDay.addToDate(startDate, { day: eventCalendar.days })
            if (QCalendarDay.isBetweenDates(currentDate, startDate, endDate)) {
                selectedEvents.push({...allEvents[i], eventCalendar,eventEndCalendar })
                added = true
            }
        }
    }
    return selectedEvents
};

// Week-Agenda

VUiExtensions.methods.formatMinutes= function(minutes) {
            let min = '' + minutes % 60;
            let heure = '' + (minutes - min) / 60
            return heure.padStart(2, '0') + ':' + min.padStart(2, '0')
        }
VUiExtensions.methods.searchDefaultPlageHoraireForm = function(dateLocale, weekday, minutesOfDay) {            
            for (var defaultPlageIdx in this.$data.vueData.defaultPlageHoraire) {
               let defaultPlage = this.$data.vueData.defaultPlageHoraire[defaultPlageIdx];
               if(defaultPlage.jourDeSemaine === weekday 
                    && defaultPlage.minutesDebut <= minutesOfDay 
                    && defaultPlage.minutesFin >= minutesOfDay) {
                    return { 
                            'dateLocale' : dateLocale,
                            'minutesDebut' : this.formatMinutes(defaultPlage.minutesDebut),
                            'minutesFin' : this.formatMinutes(defaultPlage.minutesFin),
                            'nbGuichet' : defaultPlage.nbGuichet,
                            };
               }
            }
            return;
        }    
VUiExtensions.methods.onCreatePlageHoraireDefault = function() {
            var plageHoraireForm = this.$data.vueData.creationPlageHoraireForm;
            let dateTime = this.toCalendarDate(this.$data.vueData.agendaRange.firstDate,0);
            let day = '' + dateTime.day;
            let month = '' + dateTime.month;
            plageHoraireForm.dateLocale = day.padStart(2, '0')+'/'+month.padStart(2, '0')+'/'+dateTime.year
            
            var defaultPlage = this.$data.vueData.defaultPlageHoraire[0];
            plageHoraireForm.minutesDebut = this.formatMinutes(defaultPlage.minutesDebut);
            plageHoraireForm.minutesFin = this.formatMinutes(defaultPlage.minutesFin);
            plageHoraireForm.nbGuichet = defaultPlage.nbGuichet;
            this.$data.componentStates.createItemModal.opened = true;
        }
VUiExtensions.methods.onCreatePlageHoraireDateTime = function(data) {
                let dateTime = data.scope.timestamp;
                let day = '' + dateTime.day;
                let month = '' + dateTime.month;
                let minutesOfDay = dateTime.hour*60+dateTime.minute;
                
                var plageHoraireForm = this.$data.vueData.creationPlageHoraireForm;
                plageHoraireForm.dateLocale = day.padStart(2, '0')+'/'+month.padStart(2, '0')+'/'+dateTime.year
                
                let dureeCreneau = plageHoraireForm.dureeCreneau;
                var mod = minutesOfDay % dureeCreneau;
                minutesOfDay += mod < (dureeCreneau+1)/2 ? -mod : (dureeCreneau-mod);
                
                var defaultPlage = this.searchDefaultPlageHoraireForm(plageHoraireForm.dateLocale, dateTime.weekday, minutesOfDay);
                if(defaultPlage) {
                    plageHoraireForm.minutesDebut = defaultPlage.minutesDebut;
                    plageHoraireForm.minutesFin = defaultPlage.minutesFin;
                    plageHoraireForm.nbGuichet = defaultPlage.nbGuichet;
                } else {
                    plageHoraireForm.minutesDebut = this.formatMinutes(minutesOfDay)
                    plageHoraireForm.minutesFin = this.formatMinutes(minutesOfDay+240)
                    plageHoraireForm.nbGuichet = 1;            
                }
                this.$data.componentStates.createItemModal.opened = true;
        } 
VUiExtensions.methods.onPublishPlageHoraires = function() {
                this.$data.vueData.publicationTrancheHoraireForm.publicationMinutesDebut = this.$data.vueData.publicationTrancheHoraireForm.publicationMinutesDebut_fmt;
                this.$data.componentStates.publishItemModal.opened = true;
        }
VUiExtensions.methods.doPublishPlageHoraires = function() {
            let formFull = this.$data.vueData.publicationTrancheHoraireForm;
            let formData = {
                'vContext[publicationTrancheHoraireForm][publishNow]': this.$data.componentStates.publishItemModal.selectedTab==='publie',
                'vContext[publicationTrancheHoraireForm][dateLocaleDebut]': formFull.dateLocaleDebut,
                'vContext[publicationTrancheHoraireForm][dateLocaleFin]': formFull.dateLocaleFin,
                'vContext[publicationTrancheHoraireForm][publicationDateLocale]': formFull.publicationDateLocale,
                'vContext[publicationTrancheHoraireForm][publicationMinutesDebut]': formFull.publicationMinutesDebut,
            };
            this.httpPostAjax('_publishPlage', formData, {
                 onSuccess: function() {
                    this.$q.notify({message: 'Publication effectuée', type :'positive'});
                    this.$data.componentStates.publishItemModal.opened = false
                }.bind(this)
            });
        } 
VUiExtensions.methods.onDuplicateWeek= function() {
                this.httpPostAjax('_prepareDuplicateSemaine', {}, {
                 onSuccess: function() {
                    this.$data.componentStates.duplicateWeekModal.opened = true;
                }.bind(this)
            })
        }
VUiExtensions.methods.doDuplicateWeek = function() {
            let formData = this.vueDataParams(['duplicationSemaineForm']);
            this.httpPostAjax('_duplicateSemaine', formData, {
                 onSuccess: function() {
                    this.$q.notify({message: 'Duplication effectuée', type :'positive'});
                    this.$data.componentStates.duplicateWeekModal.opened = false
                }.bind(this)
            });
        } 
VUiExtensions.methods.createPlageHoraire = function() {
            let formData = this.vueDataParams(['creationPlageHoraireForm']);
            formData.delete('vContext[creationPlageHoraireForm][dureeCreneau]');
            this.httpPostAjax('_createPlage', formData, {
                 onSuccess: function() {
                    this.$q.notify({message: 'Plage horaire créée', type :'positive'});
                    this.$data.componentStates.createItemModal.opened = false
                }.bind(this)
            });
        }
VUiExtensions.methods.confirmDeletePlageHoraire = function(event) {
            this.$data.componentStates.editedPlageHoraire = event;
            this.$data.componentStates.confirmDeleteItemModal.opened = true;
        }
VUiExtensions.methods.deletePlageHoraire = function(plhId) {
            this.httpPostAjax('_deletePlage', {plhId: plhId}, {
                 onSuccess: function() {
                    this.$q.notify({message: 'Plage horaire supprimée', type :'positive'});
                    this.$data.componentStates.confirmDeleteItemModal.opened = false;
                }.bind(this)
            });
        }
VUiExtensions.methods.onSelectPlageHoraire = function(event) {
            this.$data.componentStates.editedPlageHoraire = event;
            this.httpPostAjax('_loadPlageHoraireDetail', {plhId: event.plhId}, {
                 onSuccess: function() {
                     this.$data.componentStates.trancheHorairesList.pagination.rowsNumber = this.$data.vueData.trancheHoraires.length;
                     this.$data.componentStates.viewItemDrawer.opened = true;
                }.bind(this)
            })
        }
        
window.addEventListener('vui-before-plugins', function(event) {
		event.detail.vuiAppInstance.component("QCalendarDay", QCalendarDay.QCalendarDay);
	}
)