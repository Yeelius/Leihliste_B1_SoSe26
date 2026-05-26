# LeihListe Walking Skeleton: Frontend ↔ Backend

Dieses Walking Skeleton zeigt, dass das React-Frontend mit dem Django-Backend kommunizieren kann.

## Enthaltene Funktionen

- Django-Backend mit REST-API
- Inventar-Gegenstände können über `/api/items/` geladen werden
- React-Frontend zeigt die Gegenstände an
- Button "Ausleihe anfragen" sendet einen POST-Request ans Backend
- Backend ändert den Status eines Gegenstands von `available` zu `requested`
- Frontend aktualisiert die Anzeige nach erfolgreicher Anfrage
- Frontend zeigt einen Fehler an, wenn das Backend nicht erreichbar ist

## Testablauf

1. Backend starten.
2. Frontend starten.
3. Im Browser `http://localhost:5173` öffnen.
4. Inventar-Gegenstände werden geladen.
5. Auf "Ausleihe anfragen" klicken.
6. Der Status ändert sich von `available` zu `requested`.

## Hinweis zur Nutzung

Die Terminals können am besten direkt in VS Code geöffnet werden.

Tastenkombination:

```txt
Strg + Shift + Ö
```

Laufende Prozesse können im Terminal mit folgender Tastenkombination beendet werden:

```txt
Strg + C
```



## Backend einmalig einrichten

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
py manage.py migrate
```


## 1. Backend starten

Im ersten Terminal:

```powershell
cd backend
.\.venv\Scripts\Activate.ps1
py manage.py runserver
```

Falls PowerShell die Aktivierung blockiert:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

Das Backend läuft dann unter:

```txt
http://127.0.0.1:8000
```

## Admin-Bereich

Der Admin-Bereich ist erreichbar unter:

```txt
http://127.0.0.1:8000/admin/
```

Für lokale Testdaten kann ein Admin-Account mit folgendem Befehl erstellt werden:

```powershell
py manage.py createsuperuser
```

Die Zugangsdaten werden lokal selbst vergeben und nicht im Repository dokumentiert.


## Testdaten anlegen

Da die lokale Datenbank `db.sqlite3` nicht im Repository gespeichert wird, müssen nach dem ersten Setup Testdaten angelegt werden.

1. Backend starten.
2. Admin-Bereich öffnen:

```txt
http://127.0.0.1:8000/admin/
```

3. Mit dem lokalen Admin-Account einloggen.
4. Unter `Items` zwei Test-Gegenstände anlegen, zum Beispiel:

```txt
Name: Beamer Epson
Category: Technik
Location: Raum A101
Status: available
```

```txt
Name: Kamera Sony
Category: Medien
Location: Labor 2
Status: available
```

Falls noch kein Admin-Account existiert:

```powershell
py manage.py createsuperuser
```

Die Zugangsdaten werden lokal selbst vergeben und nicht im Repository dokumentiert.


## API-Endpunkt

Die Inventar-API ist erreichbar unter:

```txt
http://127.0.0.1:8000/api/items/
```



## 2. Frontend starten

In einem zweiten Terminal:

```powershell
cd frontend
npm install
npm run dev
```

Das Frontend läuft dann unter:

```txt
http://localhost:5173
```

## Technischer Nachweis

Der Walking Skeleton weist nach:

```txt
React-Frontend → HTTP/fetch → Django REST API → Django Model/SQLite → Antwort zurück ans Frontend
```

Damit ist der vertikale Durchstich zwischen Frontend und Backend validiert.
