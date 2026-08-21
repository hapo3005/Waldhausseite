# Google Earth Studio – Waldhaus-Zoom

**Exakter Zielpunkt des Hauses:** `50°20'55.2"N 6°30'49.8"E`  
**Dezimal:** `50.3486667, 6.5138333`

## Vorbereitetes Earth-Studio-Projekt

`Waldhaus_Kerschenbach_ZoomTo.esp`

- 1920 × 1080
- 30 fps
- 12 Sekunden
- senkrechter Satelliten-Zoom
- Start bei ca. 8.000 km Kamerahöhe
- Ende bei ca. 95 m Kamerahöhe
- Zielkoordinate bleibt während des gesamten Zooms exakt im Bildzentrum

Die Höhenkurve ist bewusst nicht linear, sondern für einen ruhigen, zunehmend präzisen Anflug gestaffelt.

## Rendern in Google Earth Studio

1. Google Earth Studio im Desktop-Chrome öffnen und anmelden.
2. `File → Import` wählen und `Waldhaus_Kerschenbach_ZoomTo.esp` importieren.
3. Im letzten Frame kontrollieren, dass das Dach an `50.3486667, 6.5138333` exakt getroffen wird.
4. Nur falls die lokale Satelliten-/3D-Darstellung eine andere Endhöhe verlangt, den letzten **Altitude**-Keyframe geringfügig anpassen. Die Zielkoordinate bleibt unverändert.
5. Rendern. Die von Google automatisch erzeugte Attribution muss sichtbar bleiben.
6. Das gerenderte Video als `assets/google-earth-waldhaus.mp4` in die Website übernehmen.

`Waldhaus_Target.kml` dient als zusätzliche Zielkontrolle. Der Marker gehört nicht zwingend in den finalen Film.

## Warum dieser Schritt accountgebunden ist

Google Earth Studio rendert Googles Satelliten-/3D-Bildmaterial innerhalb eines angemeldeten Google-Kontos. Das Projekt und die exakten Kameradaten sind hier vorbereitet; der eigentliche Earth-Studio-Render muss in einem Konto mit Earth-Studio-Zugriff ausgeführt werden.
