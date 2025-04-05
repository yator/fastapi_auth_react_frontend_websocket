import uvicorn
from fastapi import FastAPI, Depends, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from backend.db.database import Base, engine, get_db
from backend.schemas.user import UserCreate, UserLogin
from backend.services.auth_logic import register_user, login_user
from backend.routers import auth
from backend.websocket.manager import manager

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except:
        manager.disconnect(websocket)
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)