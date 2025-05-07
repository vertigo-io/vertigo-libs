<template>
    <div class="v-fileupload">
        <div v-if="$slots.header" class="header">
        {{ $slots.header.$attrs }}
            <slot name="header" v-bind="{...$data, ...$props, canAddFiles, addFiles, abortUpload, removeFile, downloadFile, getGlobalSize, getGlobalSizeLabel, humanStorageSize}"/>
        </div>
        
        <div class="content">
            <slot v-bind="{...$data, ...$props, canAddFiles, addFiles, abortUpload, removeFile, downloadFile, getGlobalSize, getGlobalSizeLabel, humanStorageSize}">
                <div class="files">
                    <slot name="files" v-bind="{...$data, ...$props, canAddFiles, addFiles, abortUpload, removeFile, downloadFile, getGlobalSize, getGlobalSizeLabel, humanStorageSize}">
                        <span v-for="file in files" class="file" style="display: flex; flex-flow: row wrap; column-gap: 50px;">
                            <span :style="{color: file.status === 'IN_PROGRESS' ? 'blue' : file.status == 'ERROR' ? 'red' : ''}">{{ file.name }}</span>
                            <span v-if="file.status === 'ERROR'" style="color:red">{{ file.errorMessage }}</span>
                            <span style="color: grey">{{ humanStorageSize(file.size) }}</span>
                            <span v-if="file.status === 'IN_PROGRESS'">{{ $vui.i18n().uploader.progress }} : {{ (file.progress * 100).toFixed() }} %</span>
                            <span v-if="file.status === 'IN_PROGRESS' && file.estimated != null">{{ $vui.i18n().uploader.estimated }} : {{ (file.estimated).toFixed() }} s</span>
                            
                            <a v-if="file.status === 'OK'" @click="downloadFile(file)" :href="downloadUrl + file.uri">
                                {{ $vui.i18n().uploader.download }}
                            </a>
                            <button v-if="file.status === 'IN_PROGRESS'" @click.prevent="abortUpload(file)">
                                {{ $vui.i18n().uploader.abort }}
                            </button>
                            <button v-if="!this.readonly && file.status !== 'IN_PROGRESS'" style="color: red" @click.prevent="removeFile(file)">
                                {{ $vui.i18n().uploader.remove }}
                            </button>
                        </span>
                    </slot>
                </div>
                <div class="input" v-show="canAddFiles()">
                    <slot name="input" v-bind="{...$data, ...$props, canAddFiles, addFiles, abortUpload, removeFile, downloadFile, getGlobalSize, getGlobalSizeLabel, humanStorageSize}">
                        <input :id="$props.inputId" ref="input"
                               type="file" :accept="$props.accept" :multiple="$props.multiple"
                               @change="evt => addFiles(evt.target.files)"
                               v-bind="$props.inputProps" />
                    </slot>
                </div>
            </slot>
        </div>
        <div v-if="$slots.footer" class="footer" v-bind="{...$data, ...$props, canAddFiles, addFiles, abortUpload, removeFile, downloadFile, getGlobalSize, getGlobalSizeLabel, humanStorageSize}">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
        inputId: String,
        readonly: Boolean,
        fileInfoUris: Array,
        fieldName: String,
        url : String,
        downloadUrl: String,
        accept: String,
        multiple: { type : Boolean, default : true  },
        maxFiles: Number,
        callbackOnDelete: { default : false },
        inputProps: { type: Object }
  },
  emits: ["update:file-info-uris", "download-file", "file-ok", "file-failed", "init-ok", "init-ko"],
  computed: {
      
  },
  mounted() {
      if (this.fileInfoUris.length > 0) {
        // load previously uploaded files infos from server
        let xhrParams = new URLSearchParams()
        this.fileInfoUris.forEach((fileInfoUri) => {
            xhrParams.append(this.fieldName, fileInfoUri);
        });
        
        this.$http.get(this.url + '/fileInfos', { params: xhrParams, credentials: false })
              .then(function (response) { //Ok
                      let uiFileInfos = response.data;
        
                      this.files = uiFileInfos.map((uiFileInfo) => {
                          return {...uiFileInfo, status: "OK"};
                      })
                      this.$emit('init-ok');
                  }.bind(this))
              .catch(function (error) { //Ko
                      this.$emit('update:file-info-uris', []); // reset
                      this.$emit('init-ko');
                      if (this.$q) {
                          if(error.response) {
                              this.$q.notify(error.response.status + ":" + error.response.statusText + " Can't load file "+xhrParams);
                          } else {
                              this.$q.notify(error + " Can't load file "+xhrParams);
                          }
                      }
                  }.bind(this)
          );
      };
        
      if (typeof this.callbackOnDelete !== 'function' && typeof this.callbackOnDelete !== 'boolean') {
          console.error('callback-on-delete must be a function or a boolean');
      }
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
    canAddFiles() {
        if (this.$props.readonly) return false;
        
        let resolvedMaxFiles = this.multiple ? this.maxFiles : 1;
        
        return resolvedMaxFiles == null || this.$data.files.filter(file => file.status != "ERROR").length < resolvedMaxFiles;
    },
    reset() {
      this.files.length = 0
    },
    addFiles(files) {
        // clear old errors
        this.files = this.files.filter(file => file.status != "ERROR");
        
        // add new files
        for (let file of files) {
            if(this.canAddFiles()) {
                let vFile = ref({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    status: "IN_PROGRESS",
                    errorMessage: null,
                    progress: 0,
                    estimated: null,
                    file: file
                }).value;
                this.$data.files.push(vFile);
                doUploadfile.call(this, vFile);
            }
        }
        
        if (this.$refs.input) {
            this.$refs.input.value = null;
        }
    },
    abortUpload(file) {
        file.abortController.abort();
        
        let indexOfFile = this.files.indexOf(file);
        this.files.splice(indexOfFile, 1);
    },
    removeFile(removedFile) {
        if (this.$props.readonly) return;
        
        let indexOfFile = this.files.indexOf(removedFile);
        this.files.splice(indexOfFile, 1);
        let newFileInforUris = [...this.fileInfoUris];
        newFileInforUris.splice(indexOfFile, 1);
        this.$emit('update:file-info-uris', newFileInforUris);
        
        let callbackIsFunction = typeof this.callbackOnDelete === 'function';
        if (this.callbackOnDelete === true || callbackIsFunction) {
            let xhrParams = {};
            xhrParams[this.fieldName] = removedFile.fileUri;
            
            let promise = this.$http.delete(this.url, { params: xhrParams, credentials: false });
            if (callbackIsFunction) {
                this.callbackOnDelete(this, promise);
            }
        }
    },
    downloadFile(file) {
        this.$emit('download-file', file.fileUri);
    },
    getGlobalSize() {
        let fileSize = this.files
            .filter( file => file.status != "ERROR")
            .reduce( (totalSize, file) => {
                    return totalSize + file.size;
                }, 0);

        return fileSize;
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

// private methods

function doUploadfile(vFile) {
    let controller = new AbortController();
    vFile.abortController = controller;
    
    let formData = new FormData();
    formData.append("file", vFile.file);
    
    this.$http.post(this.url, formData,
             { credentials: false,
               headers: { 'Content-Type': 'multipart/form-data',
                          'Accept': 'application/json' },
               signal: controller.signal,
               onUploadProgress: function (evt) {
                   vFile.progress = evt.progress;
                   vFile.estimated = evt.estimated;
               }.bind(this)
             })
        .then(function (response) { //Ok
            this.$emit('file-ok', response.data);
            let newUri = response.data;
            vFile.status = "OK";
            vFile.fileUri = newUri;
            this.$emit('update:file-info-uris', [...this.fileInfoUris, newUri]);
        }.bind(this))
        .catch(function (error) { //Ko
            this.$emit('file-failed', error);
            vFile.status = "ERROR";
            if (error?.response?.status === 413) {
                vFile.errorMessage = this.$vui.i18n().uploader.fileErrorTooBig;
            }
        }.bind(this));
}

</script>