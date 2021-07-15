## Webmaps

---

## <a href="/Portfolio/Maps/Flickr" target="_blank">Flickr Photo Density Map</a>
<a href="/Portfolio/Maps/Flickr" target="_blank"><img src="images/Flickr_Map.png"/></a><br>
Using Flickr’s API, I counted every instance of a geotagged photo for each city and mapped them using a dynamic hex-grid choropleth map. Using the bottom slider or the legend’s inputs, you can change the classification of the data, allowing you to see local variation that would be otherwise invisible in a small-scale (i.e. zoomed out) map. Clicking on any location will show you some photos taken there, as well as a link to Google Street View.
<p style="text-align: center; color:grey;">**<br>
QGIS | Mapbox GL JS | Python | GeoPandas | Javascript </p>

---

## <a href="/Portfolio/Maps/Arizona-Migration" target="_blank">Arizona Border Death Map</a>
<a href="/Portfolio/Maps/Arizona-Migration" target="_blank"><img src="images/Arizona_Map.png"/></a><br>
Every year, hundreds of migrants perish at the Southern border as they make their way across the scorching Sonoran desert. Deaths were rare before the Clinton administration, when the border was first militarized with the use of stadium lights, thermal sensors, check points, vehicle barriers and of course, walls. These efforts have been pushing migrants to increasingly dangerous paths, and even though border crossing has decreased significantly over the last two decades, the number of deaths has not.
This animated map is intended to show the evolving geography of migrant deaths as new patrol stations and border walls are erected. Once the animation is over, a slider will appear that allows you to scroll through time. Zooming in will reveal each victim’s name, age, and location.
<p style="text-align: center; color:grey;">**<br>
QGIS | Mapbox GL JS | Mapbox Studio | Javascript </p>

---

## GIS projects 

---

## <a href="/Open-Source-GIS/lab9" target="_blank">Project 3 Title</a>
<a href="/Open-Source-GIS/lab9" target="_blank"><img src="images/Lab9.png"/></a>br>
Geotagged tweets can be useful in the study of natural disasters and could potentially be used as a tool for emergency responders. I downloaded geotagged tweets to rStudio through the API to perform network and textual analysis and then used PostGIS and GeoDa to for spatial analysis. Specifically, I examined twitter activity during Hurricane Dorian that devastated the Bahamas and affected the East Coast of the United States.
<p style="text-align: center; color:grey;">**<br>
R Studio | GeoDa | PostGIS/PostgreSQL | QGIS </p>

---

## <a href="/Open-Source-GIS/lab8" target="_blank">Reproducibility and replicability</a>
<a href="/Open-Source-GIS/lab8" target="_blank"><img src="images/Lab8.png"/></a><br>
Reproducibility and replicability are arguably the greatest issues that social science (and natural science) research faces at this moment. In geography, studying reproducibility is complicated since no two places are the same (that's the point of the whole discipline!). However, we can test replicability using the same methods and data that authors use in their research (or can we?). Here, I try to replicate a vulnerability assessment of Malawi and compare my results with the authors'.
<p style="text-align: center; color:grey;">**<br>
PostGIS/PostgreSQL | QGIS </p>

---

## <a href="/Open-Source-GIS/lab6" target="_blank">OSM and PostGIS for vulnerability assessment</a>
<a href="/Open-Source-GIS/lab6" target="_blank"><img src="images/Lab6.png"/></a><br>
I used OpenStreetMap (OSM) and Tanzania Resilience Academy (RA) data to quantify a dimension of disaster vulnerability, and create a visualization at the sub-ward level to aid policy action. I specifically looked at the vulnerability caused by the build-up of rubbish in areas that are near existing drain blockages, but are inaccessible by vehicle. The geo-analysis was done using PostGIS.
<p style="text-align: center; color:grey;">**<br>
PostGIS/PostgreSQL | QGIS </p>

---

## <a href="/Open-Source-GIS/lab3" target="_blank">Comparing quality of DEM raster datasets</a>
<a href="/Open-Source-GIS/lab3" target="_blank"><img src="images/Lab3.png"/></a><br>
I compared the data quality of two DEM raster datasets, ASTER and SRTM in my study region of Mount Kilimanjaro using a terrain analysis program SAGA. I made sense of the  areas of low resolution in the SRTM data by looking at its metadata (i.e. data provenance) and by considering the data capture method. I also analyzed how this raster error propagates when performing terrain analysis on the problematic regions.
<p style="text-align: center; color:grey;">**<br>
SAGA | QGIS </p>

---

## <a href="/Open-Source-GIS/lab1" target="_blank">Creating open source tool for QGIS</a>
<a href="/Open-Source-GIS/lab1" target="_blank"><img src="images/Lab1.png"/></a><br>
As an exercise and introduction to open source GIS, I made a QGIS model with an open source license and a help document. The model was designed to be used in urban geography analysis, specifically for distance-decay analysis that conceptualize the urban space as being organized radially out from the central business district. The tool calculates the distance and direction with respect to the central business district for each polygon in the input shapefile. I tested the model with census data and plotted it using DataPlotly.
<p style="text-align: center; color:grey;">**<br>
DataPlotly | QGIS </p>

---
<p style="font-size:11px">Page template forked from <a href="https://github.com/evanca/quick-portfolio">evanca</a></p>
<!-- Remove above link if you don't want to attibute -->
