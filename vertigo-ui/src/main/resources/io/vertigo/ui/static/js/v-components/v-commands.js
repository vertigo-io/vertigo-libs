Vue.component('v-commands', {
	template : `
	<div>
		<q-search v-if="!isCommandCommited" v-model="text" @keydown="commitCommand" autofocus :debounce="100" class="bg-white" inverted-light color="white" placeholder="Type / to show available commands" >
			<q-autocomplete @search="searchCommands" @selected="selectCommand" ></q-autocomplete>
			<span v-if="text !== '' && selectedCommand.commandName && selectedCommand.commandName.startsWith(text)" style="z-index= -1; line-height: 38px; padding-left: 36px; opacity:0.5">{{selectedCommand.commandName}}</span>
		</q-search>
		<div v-else class="row col-12 justify-between bg-white round-borders overflow-hidden shadow-2 text-black" >
			<div class="bg-grey-4 text-center vertical-middle text-bold q-px-md" style="line-height: 38px;">{{selectedCommand.commandName}}</div>
			<div v-if="!isExecuted" class="row col items-center">
				<template v-if="selectedCommand.commandParams.length > 0" v-for="(param, index) in selectedCommand.commandParams" >
					<template v-if="param.paramType.rawType === 'io.vertigo.commons.command.GenericUID'">
						<q-input class="col" color="secondary" @keydown.delete="function(event) {backIfNeeded(event, index === 0)}" @keyup.esc="function(event) {backIfNeeded(event, index === 0)}" :autofocus="index === 0" @keyup.enter="handleEnter(index)" >
							<q-autocomplete  @search="function(terms, done) { autocompleteParam(param, terms, done);}" @selected="function(selection, isKeyboard) {return selectParam(selection, isKeyboard, index) }" value-field="label" >
						</q-input>
					</template>
					<template v-else>
						<q-input class="col" color="secondary" v-model="commandParamsValues[index].value" @keydown.delete="function(event) {backIfNeeded(event, index === 0)}" @keyup.esc="function(event) {backIfNeeded(event, index === 0)}" :autofocus="index === 0" @keyup.enter="handleEnter(index)" >
					</template>
				</template>
				<div class="col" v-if="selectedCommand.commandParams.length === 0" @keyup.enter="executeCommand">Press enter to execute command</div>
				<q-btn @click="executeCommand" flat icon="play_arrow" size="sm" round></q-btn>
			</div>
			<div v-else class="row col items-center" >
				<div class="col shadow-2 bg-secondary text-white q-px-md" style="line-height: 38px;">{{commandResult.display}}</div>
				<q-btn v-if="commandResult.targetUrl" type="a" :href="baseUrl + commandResult.targetUrl" flat  >View details</q-btn>
				<q-btn @click="reset" flat icon="cancel" size="sm" round></q-btn>
			</div>
		</div>
	</div>
	`
	,
	data: function() {
		return {
			text: "",
			commandParamsValues: [],
			commands : [],
			isCommandCommited: false,
			selectedCommand: {},
			isExecuted: false,
			commandResult : {}
		}
	},
	props : {
		baseUrl : { type: String, 'default': '/' },
	},
	methods : {
		searchCommands : function(terms, done) {
			this.$data.selectedCommand = {};
			this.$http.post(this.baseUrl+'api/vertigo/commands/_search', {prefix: terms} )
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
		        	if (this.$data.commands.length > 0) {
		        		this.chooseCommand(this.$data.commands[0], false);
		        	}
				});
			
		},
		selectCommand : function (selection, isKeyboard) {
			this.chooseCommand(selection.command, !isKeyboard);
		},
		chooseCommand: function (command, commitCommand) {
			this.$data.selectedCommand = command;
			this.$data.commandParamsValues = this.$data.selectedCommand.commandParams.map(function(param)  {
				// we prepare params
				return {
					value:""
				};	
			});
			this.$data.isCommandCommited = commitCommand;
		},
		commitCommand : function(keyEvent) {
			if (this.$data.selectedCommand && this.$data.selectedCommand.commandName) {
				switch(keyEvent.keyCode) {
					case 9:
					case 13:
						this.$data.isCommandCommited = true;
						keyEvent.preventDefault();
				}
			}
		},
		executeCommand : function() {
			var actualParams = this.$data.commandParamsValues.map(function (param) {
				return param.value;
			});
			
			this.$http.post(this.baseUrl+'api/vertigo/commands/_execute', {command: this.$data.selectedCommand.commandName, params: actualParams} )
		        .then( function (response) { //Ok
		        	this.$data.isExecuted = true;
		        	this.$data.commandResult = response.body;
				});
			
		},
		handleEnter: function (index) {
			if (index === this.$data.selectedCommand.commandParams.length - 1 && this.$data.commandParamsValues[index].value) {
				this.executeCommand();
			}
			// otherwise nothing particular
		},
		autocompleteParam : function(param, terms, done) {
			this.$http.get(this.baseUrl+'api/vertigo/commands/params/autocomplete', {params : {terms: terms, entityClass: param.paramType.actualTypeArguments[0]}})
				.then( function (response) {
					done(response.body.map(function(element) {
						return {
							label: element.label,
							guid: element.urn
						}
					}));
				});
			
		},
		selectParam : function (selection, isKeyboard, index) {
			if (!isKeyboard) {
				var newParams = this.$data.commandParamsValues.slice();
				newParams[index] = { 
					value: selection.guid,
					label: selection.label,
				}
				this.$data.commandParamsValues = newParams;
			}
			
		},
		backIfNeeded: function (index, isFirst) {
			if (isFirst && !this.$data.commandParamsValues[0].value) {
				this.back();
			}
			// otherwise nothing particular
		},
		back: function () {
			this.$data.commandParamsValues = [];
			this.$data.commands = [];
			this.$data.isCommandCommited = false;
			this.$data.selectedCommand = {};
			this.$data.isExecuted = false;
			this.$data.commandResult = {};
			
		},
		reset: function() {
			this.back();
			this.$data.text = "";
		}
	} 
})
