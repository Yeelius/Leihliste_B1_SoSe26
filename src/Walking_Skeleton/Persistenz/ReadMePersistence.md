# Walking Skeleton – Datenpersistenz (Django + Django REST Framework + SQLite)

Dieses Walking Skeleton ist ein minimaler, aber vollständiger vertikaler Durchstich, der **Datenpersistenz** im Backend nachweist:

- Daten werden über eine REST-API per HTTP **gespeichert (POST)**
- Daten können über eine REST-API **wieder ausgelesen (GET)** werden
- Die Daten werden in einer **SQLite-Datenbank (db.sqlite3)** persistiert
- Nach einem **Server-Neustart** sind die Daten weiterhin vorhanden

---

## Architektur (Vertikaler Schnitt)

```text
Client (curl / Browser / Postman)
  -> HTTP Request
  -> Django URL Routing (config/urls.py)
  -> App URL Routing (persistence/urls.py)
  -> DRF View (persistence/views.py)
  -> DRF Serializer (persistence/serializers.py)
  -> Django ORM (persistence/models.py)
  -> SQLite DB (db.sqlite3)
  -> HTTP Response (JSON)
```

---

## Voraussetzungen (Ubuntu + VS Code)

### Betriebssystem / Tools
- Ubuntu (oder Linux vergleichbar)
- VS Code (optional, empfohlen)
- curl (für den Nachweis)

Installation:
```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip curl
```

> Hinweis: Manche Systeme haben kein `python` Kommando. Dann nutze `python3`.
> In einer aktivierten Virtualenv existiert oft trotzdem `python`.

### VS Code Extensions (empfohlen)
- Python (Microsoft)
- Pylance (für Autocomplete/Typechecking)

---

## Setup & Start

### 1) In den Backend-Ordner wechseln
```bash
cd local_persistence_skeleton/backend
```

### 2) Virtualenv erstellen (falls noch nicht vorhanden)
```bash
python3 -m venv .venv
```

### 3) Virtualenv aktivieren
```bash
source .venv/bin/activate
```

### 4) Dependencies installieren
```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### 5) Datenbank initialisieren (Migrationen)
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6) Server starten
```bash
python manage.py runserver
```

Server läuft danach unter:
- http://127.0.0.1:8000/

---

## Verwendung / API

### Endpoint: Notizen anlegen & auflisten

Basis-URL:
- `http://127.0.0.1:8000/api/persistence/notes/`

#### A) POST – Daten speichern
```bash
curl -s -X POST http://127.0.0.1:8000/api/persistence/notes/ \
  -H "Content-Type: application/json" \
  -d '{"text":"Hallo Persistenz"}'
```

Erwartete Antwort (Beispiel):
```json
{
  "id": 1,
  "text": "Hallo Persistenz",
  "created_at": "2026-05-31T12:34:56.123456Z"
}
```

#### B) GET – Daten auslesen
```bash
curl -s http://127.0.0.1:8000/api/persistence/notes/
```

Erwartete Antwort (Beispiel):
```json
[
  {
    "id": 1,
    "text": "Hallo Persistenz",
    "created_at": "2026-05-31T12:34:56.123456Z"
  }
]
```

---

## Nachweis der Persistenz (Walking Skeleton Proof)

1. Server starten (`python manage.py runserver`)
2. Per POST eine Notiz speichern
3. Per GET prüfen, dass die Notiz zurückkommt
4. Server stoppen (`Ctrl + C`)
5. Server wieder starten
6. Per GET erneut prüfen → **Notiz ist weiterhin da**

Warum ist das ein Persistenznachweis?
- Weil die Daten nicht im RAM liegen, sondern in `db.sqlite3` gespeichert werden.
- `db.sqlite3` bleibt auf der Festplatte erhalten und wird beim Neustart wieder verwendet.

---

## Dateiübersicht: Was macht welche Datei?

### `requirements.txt`
Enthält Python-Abhängigkeiten:
- **Django**: Webframework
- **djangorestframework**: Toolkit zum Erstellen von REST-APIs (Views, Serializer, Request/Response Handling)

### `manage.py`
CLI-Einstiegspunkt für Django-Commands:
- `runserver` startet den Dev-Server
- `makemigrations` erzeugt Migrationen
- `migrate` wendet Migrationen an
- `check` prüft Konfiguration

### `config/settings.py`
Projekt-Konfiguration:
- `INSTALLED_APPS`: hier müssen `rest_framework` und `persistence` eingetragen sein
- `DATABASES`: standardmäßig SQLite (`db.sqlite3`)
- weitere Standard-Django Settings

### `config/urls.py`
Top-Level URL-Routing:
- Verknüpft Pfade wie `/api/persistence/` mit den URLs der App `persistence`

Beispiel:
- `/api/persistence/` -> `include("persistence.urls")`

### `persistence/models.py`
Django-Modelle (Datenstruktur):
- Definiert die Tabelle `Note` in der DB
- Django erzeugt daraus Migrationen und ORM-Zugriff

Kernidee:
- **Model = Daten + Verhalten + ORM-Mapping**

### `persistence/serializers.py`
DRF Serializer:
- Übersetzt zwischen:
  - Python/Django Model Instanzen
  - JSON (Request/Response)
- Validiert Eingabedaten (z.B. `text` muss vorhanden sein)

Kernidee:
- **Serializer = “JSON <-> Model” + Validierung**

### `persistence/views.py`
DRF Views:
- Implementiert API-Logik
- `ListCreateAPIView` liefert bereits:
  - `GET` (Liste)
  - `POST` (Anlegen)
- Greift über Queryset + Serializer auf die DB zu

Kernidee:
- **View = HTTP-Logik (GET/POST) + DB-Zugriff über ORM**

### `persistence/urls.py`
App-spezifisches Routing:
- Definiert `/notes/` innerhalb des Prefix `/api/persistence/`

Ergebnis:
- Voller Endpoint: `/api/persistence/notes/`

### `persistence/migrations/`
Migrationen:
- Python-Dateien, die DB-Änderungen beschreiben
- Werden mit `makemigrations` erstellt und mit `migrate` angewendet

Kernidee:
- **Migrationen = Versionierung des DB-Schemas**

### `db.sqlite3` (wird zur Laufzeit erstellt)
SQLite Datenbank-Datei:
- enthält Tabellen und Datensätze
- ist der Persistenz-Beweis (liegt auf Platte)

---

## Framework-Funktionen (kurz erklärt)

### Django (Webframework)
- URL Routing
- Settings/Configuration
- ORM (Object-Relational Mapping)
- Migrationen
- Development Server (für lokale Entwicklung)

### Django REST Framework (DRF)
- Serializers (Validierung + JSON Transform)
- API Views (generische Views wie ListCreateAPIView)
- Request/Response Abstraktionen
- Content Negotiation (JSON etc.)

---

## Troubleshooting

### `Import 'django.apps' could not be resolved from source (Pylance)`
- VS Code nutzt vermutlich den falschen Interpreter.
- Lösung:
  - `Ctrl+Shift+P` -> **Python: Select Interpreter**
  - wähle `.../backend/.venv/bin/python`
  - dann `Pylance: Restart Language Server`

### `NameError: name 'true' is not defined`
- In Python heißen Booleans `True` / `False` (groß).

### `404 Not Found` auf `/api/persistence/notes/`
- Prüfe `config/urls.py` und `persistence/urls.py` ob `include(...)` korrekt ist.
