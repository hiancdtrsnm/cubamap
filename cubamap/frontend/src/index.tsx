// @ts-nocheck
/*eslint-disable */
import { Streamlit } from "./streamlit"
import * as L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Cuba } from "./cubamap.tsx"

const map = document.createElement("div")
map.style.height = "600px"
map.setAttribute("id", "mapid")
document.body.appendChild(map)



// L.tileLayer(
//   "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
//   {
//     attribution:
//       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: "mapbox/streets-v11",
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: "use.your.mapbox.token",
//   }
// ).addTo(mymap)


function onRender(event: Event): void {
  const data = (event as CustomEvent<RenderData>).detail
  var mun_map = data.args["mun_map"]

  function getColor(feature) {
    // console.log(mapValues[feature.properties.DPA_municipality_code]);
    // return "rgba(0,0,255," + "200" + ")";
    return "rgba(0,0,255," + mun_map[feature.properties.DPA_municipality_code] + ")";
  }

  var geojson = L.geoJSON(Cuba, {
    style: function (feature) {
      return {
        weight: 0.5,
        opacity: 0.8,
        color: 'white',
        fillOpacity: 1,
        fillColor: getColor(feature),
      }
    }
  });

  const mymap = L.map("mapid", {
    center: [21.5, -79.371124],
    zoom: 16,
    layers: [geojson],
    keyboard: false,
    dragging: false,
    zoomControl: false,
    boxZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    tap: false,
    touchZoom: false,
    zoomSnap: 0.15
  });

  mymap.fitBounds(geojson.getBounds());


  function onMapClick(e: any) {
    L.popup()
      .setLatLng(e.latlng)
      .setContent(e.latlng.toString())
      .openOn(mymap)
    Streamlit.setComponentValue(e.latlng)
    Streamlit.setFrameHeight()
  }
  mymap.on("click", onMapClick)


  Streamlit.setFrameHeight()
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

Streamlit.setComponentReady()
Streamlit.setFrameHeight()
