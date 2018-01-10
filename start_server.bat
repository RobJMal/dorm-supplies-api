cd "C:\Program Files\MongoDB\Server\3.6\bin"
START mongod --dbpath "C:\mongodb\dorm-supplies-api\data\db" --port 5000
TIMEOUT 1
cd "C:\Users\robjm\Desktop\HSA_Bootcamp\dorm-supplies-api"
node app.js

rem format:

rem cd "folder containing mondo.exe"
rem START mongod --dbpath "db folder" --port 5000
rem TIMEOUT 1
rem cd "file containing app.js"
rem node app.js