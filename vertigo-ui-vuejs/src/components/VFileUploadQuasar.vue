<template>
    <q-uploader :url="$props.url" 
            auto-upload
            :field-name="$props.fieldName"
            :multiple="$props.multiple"
            :max-files="$props.multiple ? undefined : 1"
            :headers="[{name: 'Accept', value: 'application/json'}]"
            @uploaded="uploadedFiles"
            @failed="failedFiles"
            :readonly="$props.readonly || !globalCanAddFiles([])"
            v-bind="$attrs"
            ref="quasarUploader">
            <template v-if="$props.simple" v-slot:header ></template> 
            <template v-else v-slot:header="slotProps">
                <div class="q-uploader__header-content flex flex-center no-wrap q-gutter-xs">
                    <q-btn v-if="slotProps.queuedFiles.length > 0 && !slotProps.readonly" type="a" :icon="$q.iconSet.uploader.clear_all" flat dense @click="slotProps.removeQueuedFiles">
                       <q-tooltip>{{$q.lang.vui.uploader.clear_all}}</q-tooltip>
                    </q-btn>
                    <div class="col column justify-center">
                      <div v-if="$props.label !== void 0" class="q-uploader__title">{{$props.label}}</div>
                      <div v-if="slotProps.isUploading" class="q-uploader__subtitle">{{getGlobalSizeLabel()}} / {{slotProps.uploadProgressLabel}}</div>
                      <div v-else class="q-uploader__subtitle">{{getGlobalSizeLabel()}}</div>
                    </div>
                    <q-spinner v-if="slotProps.isUploading" class="q-uploader__spinner"></q-spinner>
                    <q-btn v-if="slotProps.isUploading  && !slotProps.readonly" type="a" href="#" :icon="$q.iconSet.uploader.clear" flat dense @click="slotProps.abort">
                        <q-tooltip>{{$q.lang.vui.uploader.abort}}</q-tooltip>
                    </q-btn>
                    <q-btn v-if="globalCanAddFiles(slotProps.files) && !slotProps.readonly" :icon="$q.iconSet.uploader.add" flat dense @click="slotProps.pickFiles">
                        <q-uploader-add-trigger :id="$props.inputId"></q-uploader-add-trigger>
                        <q-tooltip>{{$q.lang.vui.uploader.add}}</q-tooltip>
                    </q-btn>
                </div>
            </template> 
            <template v-slot:list="slotProps">
                <div class="row">
                <q-field :label-width="3"
                            :label="$props.simple ? $props.label : undefined"
                            class="col"
                            orientation="vertical"
                            stack-label
                            borderless>
                        <template v-slot:control>
                        <div class="col column justify-center">
                            <template v-if="!$props.readonly" >
                                <template v-for="file in slotProps.files" :key="file.name">
                                    <div v-if="file.__status !== 'uploaded'"
                                        class="q-uploader__file relative-position" 
                                        :class="{'q-uploader__file--failed': file.__status === 'failed',
                                                'q-uploader__file--uploaded': file.__status === 'uploaded'}">
                                        <div class="q-uploader__file-header row flex-center no-wrap" >
                                            <q-icon v-if="file.__status === 'failed'" class="q-uploader__file-status" :name="$q.iconSet.type.negative" color="negative"></q-icon>
                                            <q-icon class="q-uploader__file-status" 
                                                :name="file.type.indexOf('video/') === 0 ? 'movie': 
                                                (file.type.indexOf('image/') === 0 ? 'photo' :
                                                (file.type.indexOf('audio/') === 0 ? 'audiotrack' : 'insert_drive_file'))" ></q-icon>
                                            <div class="q-uploader__file-header-content col">
                                            <div class="q-uploader__title">{{file.name}}</div>
                                            </div>
                                            <q-circular-progress v-if="file.__status === 'uploading'" :value="file.__progress" :min="0" :max="1" :indeterminate="file.__progress === 0"></q-circular-progress>
                                            <q-btn v-if="file.__status === 'failed'" round dense flat :icon="$q.iconSet.uploader['clear']"  @click="slotProps.removeFile(file)"></q-btn>
                                        </div>
                                    </div>
                                </template>
                            </template>
                            <div v-for="file in files" :key= "file.name" class="q-uploader__file relative-position q-uploader__file--uploaded" >
                                <div class="q-uploader__file-header row flex-center no-wrap">
                                    <q-icon class="q-uploader__file-status" 
                                        :name="file.type.indexOf('video/') === 0 ? 'movie': 
                                        (file.type.indexOf('image/') === 0 ? 'photo' :
                                        (file.type.indexOf('audio/') === 0 ? 'audiotrack' : 'insert_drive_file'))" ></q-icon>
                                    <div class="q-uploader__file-header-content col">
                                    	<div class="q-uploader__title" :id="file.fileUri + '_label'">{{file.name}}</div>
                                    </div>
									<div role="toolbar" :aria-labelledby="file.fileUri + '_label'">
	                                    <q-btn v-if="!$props.readonly" round dense flat icon="delete" @click="removeRemoteFile(file)" :title="$q.lang.vui.uploader.remove"></q-btn>                      
	                                    <q-btn round dense flat icon="file_download" @click="$emit('download-file', file.fileUri)" :title="$q.lang.vui.uploader.download"></q-btn>
									</div>
                                </div>
                            </div>
                        </div>
                        </template> 
                    </q-field>
                    <div class="q-field__after q-field__marginal row no-wrap items-center" v-if="$props.simple && !$props.readonly">
                            <q-spinner v-if="slotProps.isUploading" class="q-uploader__spinner"></q-spinner> 
                            <q-btn v-if="globalCanAddFiles(slotProps.files)" type="a" :icon="$q.iconSet.uploader.add" flat dense>
                                <q-uploader-add-trigger></q-uploader-add-trigger>
                            </q-btn>
                            <q-btn v-if="slotProps.isUploading" type="a" :icon="$q.iconSet.uploader.clear" flat dense 
                                @click="slotProps.abort">
                                <q-tooltip>{{$q.lang.vui.uploader.abort}}</q-tooltip>
                            </q-btn>
                    </div>
                 </div>
				 <slot name="footer"></slot>
            </template>   
        </q-uploader>
</template>
<script>

export default {
  props: {
        inputId: Number,
		readonly: Boolean,
        label: String,
        simple : {type: Boolean, default: false},
        fileInfoUris: Array,
        fieldName: String,
        url : String,
        downloadUrl : { type : String, default : (props) => props.baseUrl + '/download'},
        multiple: { type : Boolean, default : true  }
  },
  emits: ["update:file-info-uris", "download-file", "init-ok", "init-ko"],
  computed: {
      
  },
  mounted() {
      this.changeIcon();
      if (this.fileInfoUris.length > 0) {
        var xhrParams = new URLSearchParams()
        this.fileInfoUris.forEach((fileInfoUri) => {
            xhrParams.append(this.fieldName, fileInfoUri);
        });
        
        this.$http.get(this.url + '/fileInfos', { params: xhrParams, credentials: false })
              .then(function (response) { //Ok
                      var uiFileInfos = response.data;
        
                      this.files = uiFileInfos.map((uiFileInfo) => {
                          return uiFileInfo;
                      })
                      this.$emit('init-ok');
                  }.bind(this))
              .catch(function (error) { //Ko
                      this.$emit('update:file-info-uris', []); // reset
                      this.$emit('init-ko');
                      if(error.response) {
                          this.$q.notify(error.response.status + ":" + error.response.statusText + " Can't load file "+xhrParams);
                      } else {
                          this.$q.notify(error + " Can't load file "+xhrParams);
                      }
                  }.bind(this)
          );
      };
  },
  data : function() {
      return {
          files:[],
          units: [this.$vui.i18n().uploader.unit_b,
                  this.$vui.i18n().uploader.unit_kb,
                  this.$vui.i18n().uploader.unit_mb,
                  this.$vui.i18n().uploader.unit_gb]
      }
  },
  methods: {
    uploadedFiles(uploadInfo) {
        var newFileInforUris = [...this.fileInfoUris];
        uploadInfo.files.forEach(function (file) {
            this.files.push(file);
            file.fileUri = file.xhr.response;
            newFileInforUris.push(file.fileUri)
            this.$refs.quasarUploader.removeFile(file)
            this.$emit('update:file-info-uris', newFileInforUris);
        }.bind(this));
    },
    failedFiles(info) {
        if (info.xhr.status === 413) {
             this.$q.notify({
                type: 'negative', message: this.$q.lang.vui.uploader.fileErrorTooBig,
                multiLine: true, timeout: 2500,
               });
        } else {
            this.$q.notify({
                type: 'negative', message: this.$q.lang.vui.uploader.fileErrorUnknown,
                multiLine: true, timeout: 2500,
               });
        }
    },
    start(a,b,c){
        this.$refs.quasarUploader;
    },
    removeRemoteFile(removedFile) {
            var indexOfFile = this.files.indexOf(removedFile);
            var newFileInforUris = [...this.fileInfoUris];
            var xhrParams = {};
            xhrParams[this.fieldName] = removedFile.fileUri;
            this.$http.delete(this.url, { params: xhrParams, credentials: false })
                .then(function (/*response*/) { //Ok
                    if (this.multiple) {
                        this.files.splice(indexOfFile, 1)
                        newFileInforUris.splice(indexOfFile, 1);
                    } else {
                        this.files.splice(0);
                        newFileInforUris.splice(0);
                    }
                    this.$emit('update:file-info-uris', newFileInforUris);
                    //this.uploader_forceComputeUploadedSize(componentId);
                }.bind(this))
                .catch(function (error) { //Ko
                    this.$q.notify(error.response.status + ":" + error.response.statusText + " Can't remove temporary file");
                }.bind(this));
            
    },
    globalCanAddFiles(quasarFiles) {
        if (this.multiple) {
            return !this.$props.readonly
        } else {
            return !this.$props.readonly && 
            (quasarFiles.filter( file => file.__status != "uploaded").length //client-side
            + this.fileInfoUris.length) // server-side
            < 1
        }
    }, 
    changeIcon () {
        this.$q.iconSet.uploader.removeUploaded = 'delete_sweep'
        this.$q.iconSet.uploader.done = 'delete'
    },
    addFiles(files) {
        var quasarUploader = this.$refs.quasarUploader;
        if(this.globalCanAddFiles(quasarUploader.files)) {
         this.$refs.quasarUploader.addFiles(files);
        }
    },
    getGlobalSize() {
        var quasarFileSize = this.files
        .filter( file => file.__status != "uploaded")
        .reduce( (totalSize, file) => {
            return totalSize + file.size;
        },0 )

        var remoteFilesSize = this.files.reduce( (totalSize, file) => {
            return totalSize + file.size;
        },0 )
        return quasarFileSize + remoteFilesSize;
    },
    getGlobalSizeLabel() {
        return this.humanStorageSize(this.getGlobalSize());
    },
    humanStorageSize(bytes, decimals = 1) {
        let u = 0;
        
        while (parseInt(bytes, 10) >= 1024 && u < this.$data.units.length - 1) {
          bytes /= 1024;
          ++u;
        }
        
        return `${ bytes.toFixed(decimals) } ${ this.$data.units[ u ] }`;
    }
  }
}
</script>