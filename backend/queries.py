import mysql.connector

def create_request(cursor, request_id, request_data):
    """
    Create a new request in the outstandingRequest table
    and update the requestReceived table.
    """
    try:
        # Insert into outstandingRequest table
        cursor.execute(
            """
            INSERT INTO outstandingRequest (request_id, request_data)
            VALUES (%s, %s)
            """,
            (request_id, request_data)
        )

        # Update the requestReceived table
        cursor.execute(
            """
            INSERT INTO requestReceived (request_id, status)
            VALUES (%s, %s)
            """,
            (request_id, 'Received')
        )

        print("Request created successfully.")
    except mysql.connector.Error as err:
        print(f"Error: {err}")

def edit_request(cursor, request_id, new_request_data):
    """
    Edit an existing request in the outstandingRequest table.
    """
    try:
        cursor.execute(
            """
            UPDATE outstandingRequest
            SET request_data = %s
            WHERE request_id = %s
            """,
            (new_request_data, request_id)
        )
        print("Request updated successfully.")
    except mysql.connector.Error as err:
        print(f"Error: {err}")

def delete_request(cursor, request_id):
    """
    Delete a request from the outstandingRequest table.
    """
    try:
        cursor.execute(
            """
            DELETE FROM outstandingRequest
            WHERE request_id = %s
            """,
            (request_id,)
        )

        print("Request deleted successfully.")
    except mysql.connector.Error as err:
        print(f"Error: {err}")

def main():
    # Replace with your database connection details
    connection = mysql.connector.connect(
        host="121.7.174.81:3306",
        user="guest",
        password="Password123",
        database="TechTrek2025"
    )

    cursor = connection.cursor()

    try:
        # Example operations
        # create_request(cursor, "req123", "Sample request data")
        # edit_request(cursor, "req123", "Updated request data")
        # delete_request(cursor, "req123")
        # Commit the changes
        connection.commit()
    except Exception as e:
        print(f"Transaction failed: {e}")
        connection.rollback()
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
    main()
