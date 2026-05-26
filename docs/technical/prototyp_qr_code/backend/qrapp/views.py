# views.py
# Dieses Modul enthält die gesamte Logik für die QR-Code Generierung.
# Es empfängt den Gegenstandsnamen vom Frontend,
# generiert daraus einen QR-Code und schickt ihn als Base64-kodierten
# JSON-String zurück.

import qrcode          # QR-Code Generierung
import io              # Arbeit mit Speicher-Streams (kein Dateisystem nötig)
import base64          # Umwandlung von Bild → Text (Base64)
from django.http import JsonResponse   # Schickt JSON zurück ans Frontend
from django.views.decorators.csrf import csrf_exempt  # Deaktiviert CSRF für Prototyp
import json            # JSON lesen und schreiben

@csrf_exempt  # Für den Prototyp — in Produktion anders lösen!
def generate_qr_code(request):
    """
    Hauptfunktion: Empfängt POST-Anfrage vom Frontend,
    generiert QR-Code und schickt ihn als Base64 zurück.
    
    Ablauf:
    1. Prüfe ob es ein POST Request ist
    2. Lese Gegenstandsname aus dem Request Body
    3. Generiere QR-Code als PNG Bild im Speicher
    4. Wandle PNG in Base64-String um
    5. Schicke Base64-String als JSON zurück
    """

    # Schritt 1: Nur POST Requests erlauben
    # GET Requests werden abgewiesen da wir Daten vom Frontend erwarten
    if request.method != 'POST':
        return JsonResponse(
            {'fehler': 'Nur POST Requests erlaubt'},
            status=405
        )

    # Schritt 2: Gegenstandsname aus dem Request Body lesen
    # Der Body kommt als JSON: {"name": "Laptop-001"}
    try:
        body = json.loads(request.body)       # JSON Text → Python Dictionary
        gegenstand_name = body.get('name')    # "name" Wert aus Dictionary holen

        # Prüfe ob ein Name mitgeschickt wurde
        if not gegenstand_name:
            return JsonResponse(
                {'fehler': 'Kein Name angegeben'},
                status=400
            )
    except json.JSONDecodeError:
        # Falls der Body kein gültiges JSON ist
        return JsonResponse(
            {'fehler': 'Ungültiges JSON Format'},
            status=400
        )

    # Schritt 3: QR-Code generieren
    # qrcode Library erstellt ein PNG Bild aus dem Gegenstandsnamen
    qr = qrcode.QRCode(
        version=1,           # Größe des QR-Codes (1 = kleinste)
        box_size=10,         # Größe jedes QR-Quadrats in Pixeln
        border=4,            # Weißer Rand um den QR-Code
    )
    qr.add_data(gegenstand_name)   # Gegenstandsname wird in QR kodiert
    qr.make(fit=True)              # QR-Code optimal berechnen

    # QR-Code als PNG Bild erstellen
    qr_bild = qr.make_image(
        fill_color="black",  # QR-Punkte schwarz
        back_color="white"   # Hintergrund weiß
    )

    # Schritt 4: PNG Bild in Base64 umwandeln
    # io.BytesIO = Speicher-Stream (wie eine Datei aber im RAM)
    # So müssen wir kein Bild auf die Festplatte speichern
    buffer = io.BytesIO()           # Leerer Speicher-Stream erstellen
    qr_bild.save(buffer, 'PNG')     # PNG Bild in den Stream speichern
    buffer.seek(0)                  # Stream-Zeiger zurück an den Anfang

    # Binäre PNG Daten → Base64 Text
    qr_base64 = base64.b64encode(buffer.read()).decode('utf-8')
    # buffer.read()        → liest binäre PNG Daten
    # base64.b64encode()   → wandelt Binär → Base64 Bytes
    # .decode('utf-8')     → wandelt Base64 Bytes → normaler Text

    # Schritt 5: Base64-String als JSON zurückschicken
    # Frontend empfängt: {"qr_code": "iVBORw0KGgoAAAA..."}
    return JsonResponse({
        'qr_code': qr_base64,      # Base64 kodiertes QR-Bild
        'name': gegenstand_name    # Gegenstandsname zur Bestätigung
    })