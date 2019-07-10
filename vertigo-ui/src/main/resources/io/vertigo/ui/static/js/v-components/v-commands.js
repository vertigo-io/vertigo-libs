Vue.component('v-commands', {
	template : `
	<div class="bg-white">
		<q-search v-if="!isCommandSelected" @keyup.delete="resetIfNeeded" @keyup.enter="commitCommand" @keyup="hanleKeyUp" autofocus >
			<q-autocomplete @search="searchCommands" @selected="selectCommand" ></q-autocomplete>
			<span>{{selectedCommand.commandName}}</span>
		</q-search>
		<div v-else class="row col-12 justify-between" >
			<div class="bg-grey-4 text-italic text-center vertical-middle text-bold q-px-xs" style="line-height: 38px;">{{selectedCommand.commandName}}</div>
			<div v-if="!isExecuted" class="row col">
				<template v-if="selectedCommand.commandParams.length > 0" v-for="(param, index) in selectedCommand.commandParams" >
					<q-input v-if="index === 0 " class="col"   v-model="commandParamsValues[index]" @keyup.delete="resetIfNeeded" autofocus @keyup.enter="handleEnter(index)" ></q-input>
					<q-input v-else class="col"  v-model="commandParamsValues[index]" @keyup.enter="handleEnter(index)"></q-input>
				</template>
				<div class="col" v-if="selectedCommand.commandParams.length === 0" @keyup.enter="executeCommand">Press enter to execute command</div>
				<q-btn @click="executeCommand"></q-btn>
			</div>
			<div v-else class="row col" @click="reset">
				{{commandResult.display}}
			</div>
		</div>
	</div>
	`
	,
	data: function() {
		return {
			commandParamsValues: [],
			commands : [],
			isCommandSelected: false,
			selectedCommand: {},
			isExecuted: false,
			commandResult : {}
		}
	},
	props : {
		baseUrl : { type: String, 'default': '/api/' },
	},
	methods : {
		searchCommands : function(terms, done) {
			this.$http.post(this.baseUrl+'vertigo/commands/_search', {prefix: terms} )
		        .then( function (response) { //Ok
		        	this.$data.commands = response.body;
		        	done(this.$data.commands.map(function(command) {
						 return {
							 label: command.commandName,
							 sublabel: command.descpription,
							 value: command.commandName,
							 command : command
						 }
					}));
					this.$data.selectedCommand = this.$data.commands[0];
				});
			
		},
		selectCommand : function (selection, isKeyboard) {
			this.$data.selectedCommand = selection.command;
			if(!isKeyboard) {
				this.$data.isCommandSelected = true;
			}
		},
		commitCommand : function() {
			this.$data.isCommandSelected = true;
		},
		executeCommand : function() {
			this.$http.post(this.baseUrl+'vertigo/commands/_execute', {command: this.$data.selectedCommand.commandName, params: this.$data.commandParamsValues} )
		        .then( function (response) { //Ok
		        	this.$data.isExecuted = true;
		        	this.$data.commandResult = response.body;
				});
			
		},
		resetIfNeeded: function (index) {
			if (!this.$data.commandParamsValues[0]) {
				this.reset();
			}
			// otherwise nothing particular
		},
		hanleKeyUp: function(key) {
			if(key === '9') {
			}
		},
		handleEnter: function (index) {
			if (index === this.$data.selectedCommand.commandParams.length - 1 && this.$data.commandParamsValues[index]) {
				// if we are the last param and this param is not empty
				this.executeCommand();
			}
			// otherwise nothing particular
		},
		reset: function () {
			this.$data.text = "";
			this.$data.commandParamsValues = [];
			this.$data.commands = [];
			this.$data.isCommandSelected = false;
			this.$data.selectedCommand = {};
			this.$data.isExecuted = false;
			this.$data.commandResult = {};
			
		}
	} 
})
