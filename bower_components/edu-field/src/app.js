'use strict';
// Angular Init
var app = angular.module('app', [
	'eduField'
]);

app.controller('appController', ['$scope','$http', function ($scope,$http) {
     $scope.selectedTema=(typeof $scope.result!=='undefined' ?$scope.result.CODIGO_TEMA:'');
	
     $scope.result={};
	 $scope.municipios=[
						{
							"value":"ABANILLA",
							"name": "Abanilla"	
						},{
							"value":"ABARAN",
							"name": "Abarán"	
						},{
							"value":"MURCIA",
							"name": "Murcia"	
						},{
							"value":"CARTAGENA",
							"name": "Cartagena"
						},{
							"value":"ALCANTARILLA",
							"name": "Alcantarilla"
						},
						{
							"value":"ALBUDEITE",
							"name": "Albudeite"
						}
				];		
     $scope.fields=[
	                {key: 'oculto',type: 'hidden',value:"campo oculto",name:"nombre",id:"id" },
					//{key: 'fecha',type: 'date-ag-ui',col:'col-md-2',lines: 5,label:'Fecha',placeholder: 'Fecha',autofocus:'',required: true,showPopupCalendar:true,format:"dd/MM/yyyy"}, 
					{key: 'literal',type: 'literal',col:'col-md-12',label:'campo literal',text:"*Nota: campo literal para que podamos colocar textos en cualquier parte del formulario",id:"id" },
					{key: 'button',type: 'button',col:'col-md-3',label:'button',icon:'fa fa-external-link-square fa-2x',state:"danger",size:"",disabled:false,onClick:function(){ 
																									console.log("botón clickado");
																										if($scope.fields[10].fieldControl.filesInQueue()>0){
																				
																											$scope.fields[10].fieldControl.clearQueue();
																											var c=$scope.fields[10].fieldControl.filesInQueue();
																										}
																								   } 
					},
					
					{key: 'iban',type: 'iban',col:'col-md-4',inputSize:"lg",typebutton:"warning",label: 'Nº cuenta cliente',placeholder: 'Texto',autofocus:'',required: true,name:"nombre",id:"id"  },
					{key: 'nif',type: 'nifniecif',col:'col-md-4',inputSize:"sm",label: 'NIF',textbutton:'NIF',placeholder: 'NIF',autofocus:'',required: true },
					{key: 'nie',type: 'nifniecif',col:'col-md-4',inputSize:"sm",label: 'NIE',textbutton:'NIE',placeholder: 'NIE',autofocus:'',required: true },
					{key: 'cif',type: 'nifniecif',col:'col-md-4',inputSize:"sm",typebutton:"danger",label: 'CIF',textbutton:'Cif',placeholder: 'CIF',autofocus:'',required: true },
	                {key: 'texto',type: 'text',default:'texto por defecto',
						fieldListeners:{
							onChange:function(value){
								console.log("cambio texto:"+value);
							},
							onFocus:function(value){
								console.log("entrada al control:"+value);
							},
							onBlur:function(value){
								console.log("salida del control:"+value);
							}
						},col:'col-md-6',label: 'Texto',placeholder: 'Texto',autofocus:'',required: true },
					{key: 'textobtn',type: 'textbutton',inputSize:"lg",default:'texto por def.',showbutton:true,typebutton:'info',icon:'search',textbutton:'texto',
						fieldListeners:{
						    onClick:function(value){
								console.log("click on button: "+value);
							},
							onChange:function(value){
								console.log("cambio texto:"+value);
							},
							onFocus:function(value){
								console.log("entrada al control:"+value);
							},
							onBlur:function(value){
								console.log("salida del control:"+value);
							}
						},col:'col-md-6',label: 'Texto',placeholder: 'Texto',autofocus:'',required: true },
					{key: 'upload',fieldListeners:{
																
																onAfterAddingFile:function(item){
																	var a = item;
																},
																onBeforeUploadItem:function(item){
																	var b=item;
																},onSuccessItem:function(item){
																	if(typeof item!=='undefined'){
																		if($scope.fields[10].fieldControl.filesInQueue()>0){
																			
																			$scope.optionsCrud.formFields.tabs[10].fieldControl.clearQueue();
																		    var c=$scope.fields[4].fieldControl.filesInQueue();
																		}
																	}
																	
																	}
																	}
							,type: 'upload',typeButton:'info',inputSize:'lg',showprogressbar:true,showbuttons:true,url:"/api/v1/upload",iconButton:'folder-open',labelButton:'Sel. fichero',col:'col-md-12',label: 'Subida fichero',placeholder: 'Upload',autofocus:'' },
					{key: 'numeroentero',type: 'number',col:'col-md-4',min:1,max:12,pattern:"",label: 'Número entero',placeholder: 'Número entero',autofocus:'',required: true },
					{key: 'numerodecimal',type: 'number',col:'col-md-4',min:1,max:12,pattern:"/^-?[0-9]+([,\.][0-9]*)?$/",label: 'Número decimal',placeholder: 'Número decimal',autofocus:'',required: true },
					
					{key: 'email',type: 'email',col:'col-md-4',label: 'Email',placeholder: 'Email',autofocus:'',required: true },
					{key: 'url',type: 'url',col:'col-md-4',label: 'Url',placeholder: 'Url',autofocus:'',required: true },
					{key: 'password',type: 'password',col:'col-md-4',label: 'Password',placeholder: 'Password',autofocus:'',required: true },
				   
					{key: 'ckeckbox',type: 'checkbox',inputSizeClass:"input-lg",col:'col-md-4',label: 'Checkbox',placeholder: 'Checkbox',autofocus:'',disabled:false,required: true },
					{key: 'radio',type: 'radio',col:'col-md-4',inputSizeClass:"input-sm",label: 'Radio',options:[{"name":"perro","value":"1"},{"name":"gato","value":"2"}],placeholder: 'Checkbox',autofocus:'',required: true },
					{key: 'rango',type: 'range',col:'col-md-6',label: 'Slider',min:100,max:500,placeholder: 'Slider',autofocus:'',required: true },
					
					
					{key: 'fecha',type: 'date',col:'col-md-4',lines: 5,label:'Fecha',placeholder: 'Fecha',autofocus:'',required: true}, 
					{key: 'fechahora',type: 'date-time',col:'col-md-4',label:'Fecha Hora',placeholder: 'Fecha Hora',autofocus:'',required: true,disabled:false},					 
					{key: 'mes',type: 'month',col:'col-md-4',label: 'Fecha mes',placeholder: 'Fecha mes',autofocus:'',required: true },
					{key: 'semana',type: 'week',col:'col-md-4',label: 'Semana',placeholder: 'Semana',autofocus:'',required: true },
					{key: 'hora',type: 'time',col:'col-md-4',label: 'Hora',placeholder: 'Hora',autofocus:'',required: true },
					
					{key: 'autocompletelocal',type: 'autocomplete',inputSize:"sm",autofocus:'autofocus',col:'col-md-4',required:true,label: 'Autocomplete datos locales',autoclocaldata:$scope.municipios,autocsearchfields:"name",autocminlength:3,autocfieldtitle:"value,name",autocfielddescription:"",autocfieldvalue:"value",autocpause:300},
				    {key: 'autocompleteremoto',type: 'autocomplete',col:'col-md-4',required:true,label: 'Autocomplete datos remotos',autocurldata: 'api/v1/municipios?filter=',autocsearchfields:"name",autocminlength:3,autocfieldtitle:"value,name",autocfielddescription:"",autocfieldvalue:"value",autocpause:300},											   
					{key: 'autocompleteremotoloadall',type: 'autocomplete',col:'col-md-4',required:true,label: 'Autocomplete datos remotos load all',autocurldataloadall: 'api/v1/municipios',autocsearchfields:"name",autocminlength:3,autocfieldtitle:"value,name",autocfielddescription:"",autocfieldvalue:"value",autocpause:300},											   
				    {key: 'button2',type: 'button',col:'col-md-3',label:'show loading select',icon:'fa fa-external-link-square fa-2x',state:"danger",size:"",disabled:false,onClick:function(){ 
																									console.log("botón clickado");
																										$scope.fields[28].loading=true;
																								   } 
					},
					{key: 'button3',type: 'button',col:'col-md-3',label:'hide loading select',icon:'fa fa-external-link-square fa-2x',state:"danger",size:"",disabled:false,onClick:function(){ 
																									console.log("botón clickado");
																										$scope.fields[28].loading=false;
																								   } 
					}, 
					{key: 'selectlocal',type: 'select',inputSize:"sm",loading:false,col:'col-md-4',required:true,label: 'Select datos locales',selecttypesource:'array',selectsource: $scope.municipios,optionname:"name",optionvalue:"value",selectconcatvaluename:true},
					{key: 'selectremoto', type: 'select',col:'col-md-4',required:true,label: 'Select datos remotos',selecttypesource:'url',selectsource: 'api/v1/municipios',optionname:"name",optionvalue:"value",selectconcatvaluename:true},
					
					{key: 'CODIGO_TEMA',
						fieldListeners:{
							onChange:function(value){
								// There are a method 'clean' for empty select options.  Example:
								// $scope.fields[23].fieldControl.clean();
								console.log("cambio tema:"+value);
								$scope.fields[23].fieldControl.refresh("fieldFk=TEMA&valueFk="+value);
							}
						
						},
						type: 'select',col:'col-md-6',label: 'Tema',selecttypesource:'url', selectsource:'services/temasservice/temas?limit=100000&offset=0&order=asc&orderby=CODIGO' ,optionvalue:'CODIGO',optionname:'TEMA',selectconcatvaluename:true,placeholder: '',autofocus:'',required: false,disabled:false },						
					
					{key: 'CODIGO_SUBTEMA',type: 'select',autoload:false,col:'col-md-6',label: 'Subtema depende de tema',selecttypesource:'url', selectsource:'services/subtemasservice/subtemas?limit=100000&offset=0&order=asc&orderby=DESCRIPCION',optionvalue:'SUBTEMA',optionname:'DESCRIPCION',selectconcatvaluename:true,placeholder: '',autofocus:'',required: false,disabled:false },
											
					
					{key: 'areatexto',type: 'textarea',col:'col-md-4',rows: 5,label: 'Área de texto',placeholder: 'Área de texto',autofocus:'',required: true	},
    	            {key: 'areatextoedit',type: 'textedit',col:'col-md-4',rows: 5,toolbar:[['bold','italics']],  label: 'Área de texto rico',placeholder: 'Área de texto rico',autofocus:'',required: true	}
    	                     
					
					
					];
					
					
										

}])

