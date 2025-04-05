
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_register_and_login():
    response = client.post("/register", json={"email": "test@example.com", "password": "password123"})
    assert response.status_code == 200

    response = client.post("/login", json={"email": "test@example.com", "password": "password123"})
    assert response.status_code == 200
    assert "access_token" in response.json()
