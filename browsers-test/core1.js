var Module=typeof Module!="undefined"?Module:{};try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;function logExceptionOnExit(e){if(e instanceof ExitStatus)return;let toLog=e;err("exiting due to exception: "+toLog)}if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(ENVIRONMENT_IS_WORKER){scriptDirectory=nodePath.dirname(scriptDirectory)+"/"}else{scriptDirectory=__dirname+"/"}read_=(filename,binary)=>{var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror)=>{var ret=tryParseAsDataURI(filename);if(ret){onload(ret)}filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,function(err,data){if(err)onerror(err);else onload(data.buffer)})};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/")}arguments_=process["argv"].slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{if(keepRuntimeAlive()){process["exitCode"]=status;throw toThrow}logExceptionOnExit(toThrow);process["exit"](status)};Module["inspect"]=function(){return"[Emscripten Module object]"}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;function assert(condition,text){if(!condition){abort(text)}}var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function keepRuntimeAlive(){return noExitRuntime}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile;wasmBinaryFile="data:application/octet-stream;base64,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CwuXAgAgAEUEQEEADwsCfwJAIAAEfyABQf8ATQ0BAkBB/BYoAgAoAgBFBEAgAUGAf3FBgL8DRg0DDAELIAFB/w9NBEAgACABQT9xQYABcjoAASAAIAFBBnZBwAFyOgAAQQIMBAsgAUGAQHFBgMADRyABQYCwA09xRQRAIAAgAUE/cUGAAXI6AAIgACABQQx2QeABcjoAACAAIAFBBnZBP3FBgAFyOgABQQMMBAsgAUGAgARrQf//P00EQCAAIAFBP3FBgAFyOgADIAAgAUESdkHwAXI6AAAgACABQQZ2QT9xQYABcjoAAiAAIAFBDHZBP3FBgAFyOgABQQQMBAsLQeAVQRk2AgBBfwVBAQsMAQsgACABOgAAQQELCxUAIABFBEBBAA8LQeAVIAA2AgBBfwu6AgACQAJAAkACQAJAAkACQAJAAkACQAJAIAFBCWsOEgAICQoICQECAwQKCQoKCAkFBgcLIAIgAigCACIBQQRqNgIAIAAgASgCADYCAA8LIAIgAigCACIBQQRqNgIAIAAgATIBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATMBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATAAADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATEAADcDAA8LIAIgAigCAEEHakF4cSIBQQhqNgIAIAAgASsDADkDAA8LIAAaIAIaAAsPCyACIAIoAgAiAUEEajYCACAAIAE0AgA3AwAPCyACIAIoAgAiAUEEajYCACAAIAE1AgA3AwAPCyACIAIoAgBBB2pBeHEiAUEIajYCACAAIAEpAwA3AwALawEEfyAAKAIALAAAEAVFBEBBAA8LA0AgACgCACEDQX8hASACQcyZs+YATQRAQX8gAywAAEEwayIEIAJBCmwiAWogBCABQf////8Hc0obIQELIAAgA0EBajYCACABIQIgAywAARAFDQALIAEL9RQCE38CfkGACCELIwBB0ABrIgYkACAGQYAINgJMIAZBN2ohFSAGQThqIRECQAJAAkACQANAIAshCCAEIA1B/////wdzSg0BIAQgDWohDQJAAkACQCAIIgQtAAAiBQRAA0ACQAJAIAVB/wFxIgtFBEAgBCELDAELIAtBJUcNASAEIQUDQCAFLQABQSVHBEAgBSELDAILIARBAWohBCAFLQACIQkgBUECaiIL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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else{if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response))},reject)})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["d"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["g"];addOnInit(Module["asm"]["e"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync();return{}}var ASM_CONSTS={1920:()=>{return Module.getRandomValue()},1956:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){if(ASSERTIONS){assert(false,"Character code "+chr+" ("+String.fromCharCode(chr)+")  at offset "+i+" not in 0x00-0xFF.")}chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}var ASSERTIONS=false;var decodeBase64=typeof atob=="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2)}if(enc4!==64){output=output+String.fromCharCode(chr3)}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE=="boolean"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"b":_emscripten_asm_const_int,"c":_emscripten_memcpy_big,"a":_fd_write};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["e"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["f"]).apply(null,arguments)};var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
