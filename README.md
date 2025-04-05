# fastapi_auth_react_frontend_websocket

FastAPI Setup
Dependencies
Python 3.10+(i used python 3.13)
Steps
1.Navigate  to the backend directory
   cd backend
2.Create a virtual environemt
   python -m venv .venv
  source .venv/bin/activate  
  On Windows: .venv\Scripts\activate
3.install dependecies in requirement.txt file
  pip install -r requirements.txt
4.Run server
  python3 main.py
     or 
  uvicorn main:app --reload
you can access the api under: http://localhost:8000/docs


FRONTEND SETUP(react)
reurements
Node.js and npm
Steps
1 Navigate to the frontend directory:
  cd frontend
2.Install dependencies:
   .npm install
    .npm install axios
3 Start the React app:
  npm start
your app will run locally with  Default: http://localhost:3000

