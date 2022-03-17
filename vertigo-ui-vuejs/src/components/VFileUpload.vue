<template>
    <q-uploader :url="$props.url" 
            auto-upload
            :field-name="$props.fieldName"
            :multiple="$props.multiple"
            :headers="[{name: 'Accept', value: 'application/json'}]"
            @uploaded="uploadedFiles"
            @failed="failedFiles"
            v-bind="$attrs">
            <template v-slot:header ></template> 
            <template v-slot:list="slotProps">
               <div class="row">
                <q-field :label-width="3"
                            :label="slotProps.label"
                            class="col"
                            orientation="vertical"
                            stack-label
                            borderless>				        
                        <template v-slot:control>
                        <div class="col column justify-center">
                            <template v-if="!$props.readonly" >
                                <template v-for="file in slotProps.files" :key="file.name">
                                    <div v-if="file.__status === 'failed' || file.__status === 'uploading' "
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
                                    <div class="q-uploader__title">{{file.name}}</div>
                                    </div>
                                    <q-btn v-if="!$props.readonly" round dense flat icon="delete" @click="removeRemoteFile(file)"></q-btn>                      
                                    <q-btn round dense flat icon="file_download"  @click="$emit('download-file', file.fileUri)" ></q-btn>
                                </div>
                            </div>
                        </div>
                        </template> 
                    </q-field>
                    <div class="q-field__after q-field__marginal row no-wrap items-center" v-if="!$props.readonly">
                            <q-spinner v-if="slotProps.isUploading" class="q-uploader__spinner"></q-spinner> 
                            <q-btn v-if="slotProps.canAddFiles" type="a" :icon="$q.iconSet.uploader.add" flat dense>
                                <q-uploader-add-trigger></q-uploader-add-trigger>
                                <q-tooltip>{{$q.lang.vui.uploader.add}}</q-tooltip>
                            </q-btn>
                            <q-btn v-if="slotProps.hideUploadBtn === false && slotProps.canUpload === true" type="a" :icon="$q.iconSet.uploader.upload" flat dense 
                                @click="slotProps.upload">
                                <q-tooltip>{{$q.lang.vui.uploader.upload}}</q-tooltip>
                            </q-btn>
                            <q-btn v-if="slotProps.isUploading" type="a" :icon="$q.iconSet.uploader.clear" flat dense 
                                @click="slotProps.abort">
                                <q-tooltip>{{$q.lang.vui.uploader.clear}}</q-tooltip>
                            </q-btn>
                    </div>
                 </div>
            </template>   
        </q-uploader>
</template>
<script>
export default {
  props: {
        readonly: Boolean,
        fileInfoUris: Array,
        fieldName: String,
        url : String,
        downloadUrl : { type : String, default : (props) => props.baseUrl + '/download'},
        multiple: { type : Boolean, default : true  }
  },
  emits: ["toogle-facet"],
  computed: {
  },
  mounted() {
      this.changeIcon();
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
                }.bind(this))
            .catch(function (error) { //Ko
                    if(error.response) {
                        this.$q.notify(error.response.status + ":" + error.response.statusText + " Can't load file "+uri);
                    } else {
                        this.$q.notify(error + " Can't load file "+uri);
                    }
                }.bind(this)
        );
  },
  data : function() {
      return {
          files:[],
      }
  },
  methods: {
    uploadedFiles(uploadInfo) {
        var newFileInforUris = [...this.fileInfoUris];
        uploadInfo.files.forEach(function (file) {
            this.files.push(file);
            file.fileUri = file.xhr.response;
            newFileInforUris.push(file.fileUri)
            this.$emit('update:file-info-uris', newFileInforUris);
        }.bind(this));
    },
    failedFiles(uploadInfo) {
        uploadInfo.files.forEach(function (file) {
           /*  this.onAjaxError({
                status : file.xhr.status,
                statusText : file.xhr.statusText,
                data : JSON.parse(file.xhr.response)
                }
            ); */
            //server can return : a response with a uiMessageStack object or directly the uiMessageStack
            /*let uiMessageStack = response.globalErrors?response:response.uiMessageStack;
            Object.keys(uiMessageStack).forEach(function (key) {
                this.$data.uiMessageStack[key] = uiMessageStack[key];
            }.bind(this));*/
        }.bind(this));
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
    changeIcon () {
        this.$q.iconSet.uploader.removeUploaded = 'delete_sweep'
        this.$q.iconSet.uploader.done = 'delete'
    }
  }
}
</script>