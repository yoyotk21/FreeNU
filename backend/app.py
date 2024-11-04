from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # This will allow cross-origin requests from any origin

db_file = "events.db"

# Route to add a new event
@app.route('/add_event', methods=['POST'])
def add_event():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    end_time = data.get('end_time')
    location = data.get('location')
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    if not title or not end_time or not location or latitude is None or longitude is None:
        return jsonify({"error": "Title, end time, location, latitude, and longitude are required"}), 400

    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO events (title, description, end_time, location, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)",
                       (title, description, end_time, location, latitude, longitude))
        conn.commit()
        event_id = cursor.lastrowid

    return jsonify({"message": "Event added successfully", "event_id": event_id}), 201

# Route to get the list of events
@app.route('/get_events', methods=['GET'])
def get_events():
    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM events")
        events = [
            {"id": row[0], "title": row[1], "description": row[2], "end_time": row[3], "location": row[4], "latitude": row[5], "longitude": row[6]}
            for row in cursor.fetchall()
        ]
    return jsonify(events), 200

# Route to delete an event
@app.route('/delete_event/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM events WHERE id = ?", (event_id,))
        if cursor.rowcount == 0:
            return jsonify({"error": "Event not found"}), 404
        conn.commit()
    return jsonify({"message": "Event deleted successfully"}), 200

if __name__ == '__main__':
    # Ensure the database schema includes the new latitude and longitude fields
    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                end_time TEXT NOT NULL,
                location TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL
            )
        ''')
    app.run(debug=True)
