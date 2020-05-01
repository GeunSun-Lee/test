  var vmap;
  var selectMarker;
  
  vw.ol3.MapOptions = {
      basemapType: vw.ol3.BasemapType.GRAPHIC
    , controlDensity: vw.ol3.DensityType.EMPTY
    , interactionDensity: vw.ol3.DensityType.BASIC
    , controlsAutoArrange: true
    , homePosition: vw.ol3.CameraPosition
    , initPosition: vw.ol3.CameraPosition
   }; 
     
  vmap = new vw.ol3.Map("vmap",  vw.ol3.MapOptions); 
  
  vmap.on('pointermove', function(evt) {
   var feature = vmap.forEachFeatureAtPixel(evt.pixel, function(feature,layer) {
    if (layer != null && layer.className == 'vw.ol3.layer.Marker') {
     $('#param').val('');
     $('#param').val(feature.get('id'));
     selectMarker = feature;
    } else {
     return false;
    }
   });
  });
  
  var markerLayer;
  function addMarkerLayer() {
   if (markerLayer != null) {
    vmap.removeLayer(markerLayer);
    markerLayer = null;
    vmap.getView().setCenter([ 14129709.590359, 4512313.7639686 ]);
    vmap.getView().setZoom(15);
   } else {
    markerLayer = new vw.ol3.layer.Marker(vmap);
    vmap.addLayer(markerLayer);
    addMarker();
    vmap.getView().setCenter([ 14115633.03459599, 4492228.092116951 ]);
    vmap.getView().setZoom(9);
   }
  }

  function addMarker() {
   vw.ol3.markerOption = {
    x : 126.24,
    y : 37.4,
    epsg : "EPSG:4326",
    title : '테스트마커1',
    contents : '테스트마커1 본문내용',
    iconUrl : 'http://map.vworld.kr/images/ol3/marker_blue.png', 
  text : {
    offsetX: 0.5, //위치설정
    offsetY: 20,   //위치설정
    font: '12px Calibri,sans-serif',
    fill: {color: '#000'},
    stroke: {color: '#fff', width: 2},
    text: '테스트마커1'
  },
  attr: {"id":"maker01","name":"속성명1"}  
   };
   markerLayer.addMarker(vw.ol3.markerOption);

   vw.ol3.markerOption = {
    x : 14164292.00853613,
    y : 4495009.258626321,
    epsg : "EPSG:900913",
    title : '테스트마커2',
    contents : '테스트마커2 본문내용<br>테스트마커2 본문내용',
    iconUrl : 'http://map.vworld.kr/images/ol3/btn_area.png', 
  text : {
    offsetX: 0.5, //위치설정
    offsetY: 20,   //위치설정
    font: '12px Calibri,sans-serif',
    fill: {color: '#000'},
    stroke: {color: '#fff', width: 2},
    text: '테스트마커2'
  },
  attr: {"id":"maker02","name":"속성명2"}  
   };
   markerLayer.addMarker(vw.ol3.markerOption);

   vw.ol3.markerOption = {
    x : 14129709.590359,
    y : 4442313.7639686,
    epsg : "EPSG:3857",
    title : '브이월드로 가자',
    contents : "<a href='http://map.vworld.kr' target='_blank'>브이월드로 GOGOGO</a><br><br><a href='http://dev.vworld.kr' target='_blank'>개발자센터 GOGOGO</a>", 
  text : {
    offsetX: 0.5, //위치설정
    offsetY: 20,   //위치설정
    font: '12px Calibri,sans-serif',
    fill: {color: '#000'},
    stroke: {color: '#fff', width: 2},
    text: '테스트마커3'
  },
  attr: {"id":"maker03","name":"속성명3"}
   };
   markerLayer.addMarker(vw.ol3.markerOption);
  }

  function checkMarkerParam() {
   if (markerLayer == null) {
    alert("마커레이어가 생성되지 않았습니다.\n마커입력버튼을 먼저 실행하십시요.");
    return false;
   }
   vw.ol3.markerOption = {
    epsg : "EPSG:5179",
    title : '네이버좌표계',
    contents : '덕수초등학교', 
  text : {
    offsetX: 0.5, //위치설정
    offsetY: 20,   //위치설정
    font: '12px Calibri,sans-serif',
    fill: {color: '#000'},
    stroke: {color: '#fff', width: 2},
    text: '테스트마커4'
  },
  attr: {"id":"maker04","name":"속성명4"}
   };
   markerLayer.addMarker(vw.ol3.markerOption);
  }

  function isSelectMarker(){
   if (markerLayer == null) {
    alert("마커레이어가 생성되지 않았습니다.\n마커입력버튼을 먼저 실행하십시요.");
    return false;
   } else {
    if (this.markerLayer.getSource().getFeatures().length < 1) {
     alert("생성된 마커가 없습니다.");
     return false;
    } else {
     if($('#param').val() == ''){
      alert("선택된 마커가 없습니다. 마커에 마우스를 올리세요.");
      return false;
     }else{
      return true;
     }
    }
   }
  }
  function showPopup(){
   if(isSelectMarker()){
    this.markerLayer.showPop(selectMarker);
   }
  }
  function hidePopup(){
   if(isSelectMarker()){
    this.markerLayer.hidePop(selectMarker);
   }
  }
  
  function hideMarker() {
   if(isSelectMarker()){
    this.markerLayer.hideMarker(selectMarker);
   }
  }
  function showMarker() {
   if(isSelectMarker()){
    this.markerLayer.showMarker(selectMarker);
    $('#param').val('');
   }
  }

  function hideAllMarker() {
   if(markerLayer == null){
    alert("마커레이어가 생성되지 않았습니다.\n마커입력버튼을 먼저 실행하십시요.");
   } else {
    this.markerLayer.hideAllMarker();
   }
  }

  function showAllMarker() {
   if(markerLayer == null){
    alert("마커레이어가 생성되지 않았습니다.\n마커입력버튼을 먼저 실행하십시요.");
   } else {
    this.markerLayer.showAllMarker();
   }
  }

  function removeMarker() {
   if(isSelectMarker()){
    var features = this.markerLayer.getSource().getFeatures();
    for(var i=0; i<features.length; i++){
     if($('#param').val() == features[i].get('id')){
      this.markerLayer.removeMarker(selectMarker);
      $('#param').val('');
      selectMarker = null;
     }
    }
   }
  }

  function removeAllMarker() {
   if(markerLayer == null){
    alert("마커레이어가 생성되지 않았습니다.\n마커입력버튼을 먼저 실행하십시요.");
   } else {
    this.markerLayer.removeAllMarker();
   }
  }
