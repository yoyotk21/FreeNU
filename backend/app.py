from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from validate_data import DataValidator, InvalidDataError, is_valid_email

# TODO:
# DELETE events after end time passes or if enough people say it doesn't exist.

app = Flask(__name__)
CORS(app)  # This will allow cross-origin requests from any origin

db_file = "events.db"

validator = DataValidator()

# Route to add a new event
@app.route('/add_event', methods=['POST'])
def add_event():
    json = request.get_json()
    eventObj = {
        "title": json.get('title').strip(),
        "description": json.get('description').strip(),
        "end_time": json.get('end_time'),
        "location": json.get('location').strip(),
        "latitude": float(json.get('latitude')),
        "longitude": float(json.get('longitude')),
    }

    try:
        data = validator.is_valid_event(eventObj)
    except InvalidDataError:
        print("didn't add event", eventObj["title"])
        return jsonify({"error": "Bad argument"}), 450
    

    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO events (title, description, end_time, location, latitude, longitude, counter) VALUES (?, ?, ?, ?, ?, ?, ?)",
                       (data["title"], data["description"], data["end_time"], data["location"], data["latitude"], data["longitude"], 0))
        conn.commit()
        event_id = cursor.lastrowid

    print("added event", eventObj["title"])
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
    action = data.get('isStillHere')
    if type(action) is not bool:
        return jsonify({"error": "Invalid action. Use 'increase' or 'decrease'"}), 400

    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT counter FROM events WHERE id = ?", (event_id,))
        row = cursor.fetchone()
        if row is None:
            return jsonify({"error": "Event not found"}), 404

        counter = row[0]
        if action:
            counter += 1
        elif not action and counter > 0:
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

    if not is_valid_email(email):
        print("bad email form")
        return jsonify({"error": "Email is not of valid form"}), 450

    # Check if the email already exists
    with sqlite3.connect(db_file) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({"error": "Email already exists"}), 400  # Return an error if email already exists

        cursor.execute("INSERT INTO users (email) VALUES (?)", (email,))
        conn.commit()
        return jsonify({"message": "User added successfully"}), 200


# Route to delete a user
@app.route('/remove_user/<int:user_id>', methods=['GET'])
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
                email TEXT NOT NULL
            )
        ''')
    app.run(debug=True)