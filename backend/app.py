from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

# TODO:
# DELETE events after end time passes or if enough people say it doesn't exist.

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
    if title.strip() == '' or location.strip() == '':
        return jsonify({"error": "Title and location cannot be blank"}), 400
    

    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO events (title, description, end_time, location, latitude, longitude, counter) VALUES (?, ?, ?, ?, ?, ?, ?)",
                       (title, description, end_time, location, latitude, longitude, 0))
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
            {"id": row[0], "title": row[1], "description": row[2], "end_time": row[3], "location": row[4], "latitude": row[5], "longitude": row[6], "counter": row[7]}
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

# Route to update the counter for an event
@app.route('/update_counter/<int:event_id>', methods=['POST'])
def update_counter(event_id):
    data = request.get_json()
    action = data.get('action')

    if action not in ['increase', 'decrease']:
        return jsonify({"error": "Invalid action. Use 'increase' or 'decrease'"}), 400

    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT counter FROM events WHERE id = ?", (event_id,))
        row = cursor.fetchone()
        if row is None:
            return jsonify({"error": "Event not found"}), 404

        counter = row[0]
        if action == 'increase':
            counter += 1
        elif action == 'decrease' and counter > 0:
            counter -= 1

        cursor.execute("UPDATE events SET counter = ? WHERE id = ?", (counter, event_id))
        conn.commit()

    return jsonify({"message": "Counter updated successfully", "counter": counter}), 200

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Check if the email already exists
    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"error": "Email already exists"}), 400  # Return an error if email already exists

        cursor.execute("INSERT INTO users (email) VALUES (?)", (email,))
        conn.commit()
        return jsonify({"message": "User added successfully"}), 201


# Route to delete a user
@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
        if cursor.rowcount == 0:
            return jsonify({"error": "User not found"}), 404
        conn.commit()
    return jsonify({"message": "User deleted successfully"}), 200

if __name__ == '__main__':
    # Ensure the database schema includes the new latitude, longitude, counter, and users table
    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        # uncomment to restart the database
        # cursor.execute('DROP TABLE events')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                end_time TEXT NOT NULL,
                location TEXT NOT NULL,
                latitude REAL NOT NULL,
                longitude REAL NOT NULL,
                counter INTEGER DEFAULT 0
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
            )
        ''')
    app.run(debug=True)