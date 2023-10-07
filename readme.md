# step to  start app in development
   - Git clone this application  into your local machine
   - Note Local machine should have node js version >16
   - now you need to move to the local directory 
   > cd chat_application_node_js_backend 
   - install the the dependencies
   > npm install
   - copy .env.example file to .env
   > cp .env.example .env
   - Pass all the required value in .env
   - Note -  If you have mongo srv connection you need to pass value in MONGO_DB_CONNECTION_URL
   > MONGO_DB_CONNECTION_URL = mongodb+srv://user:password@mongohost.net/
   - If you have mongo running without srv connection
   you need to pass value for PORT , host , username,password in env for Mongo
   > MONGO_DB_HOST = 

   > MONGO_DB_PORT = 
   
   > MONGO_DB_USER_NAME =
   
   > MONGO_DB_PASSWORD =
   
   > MONGO_DB_CONNECTION_URL =
   
   - Now start application (in development mode)
   > npm run watch
   - App will start at PORT passed in env port by default if you want to change this you can pass --port in while running npm run dev (You can change port in env with this key)
   > PORT =

If you are looking for web app you can find  [here](https://github.com/raza11409652/chat_application_web_app_react) 