<script>
  //import 'leaflet/dist/leaflet.css';
  import {LeafletMap} from '../services/leaflet-map';
  import {getContext, onMount} from "svelte";

  const monumentService = getContext("MonumentService");
  let monuments;
  const mapConfig = {
    location: {lat: 53.160858, lng: -7.152420},
    zoom: 50,
    minZoom: 1,
  };
  let map = null;

  onMount(async () => {
    map = new LeafletMap("monument-map", mapConfig);

    monuments = await monumentService.getMonuments();

    map.showZoomControl();
    map.addLayerGroup('Monuments');

    monuments.forEach(monument => {
        map.addLayerGroup(`${monument.category.typeMonument}`);
    });
    map.showLayerControl();

    
    
    console.log(monuments)
     monuments.forEach(monument => {
        addMonumentMarker(monument);
    });


  })
    export function addMonumentMarker(monument) {
      const monumentStr = `${monument.name} ${monument.category.typeMonument}`
      map.addMarker({lat: monument.location.lat, lng: monument.location.lng}, monumentStr, "Monuments");
      monuments.forEach(monument => {
        const monumentStrByCat = `${monument.name} ${monument.category.typeMonument}`
        map.addMarker({lat: monument.location.lat, lng: monument.location.lng}, monumentStrByCat, `${monument.category.typeMonument}`);
    });
      map.moveTo(9, {lat: monument.location.lat, lng: monument.location.lng});
    }
  
  </script>
  
  <div class="box" id="monument-map" style="height:800px">
  </div>