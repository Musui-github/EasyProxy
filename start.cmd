@echo off
TITLE EasyProxy proxy software for Minecraft: Bedrock Edition

cd /d %~dp0
set initial_path=%cd%

cd software
set software_path=%cd%

echo Loading files...

echo Loading package.json...
if exist package.json (
	echo The package.json file has been found successfully!
) else (
	echo Couldn't find a package.json in software folder!
	pause
	exit 1
)

echo Loading package-lock.json...
if exist package-lock.json (
	echo The package-lock.json file has been found successfully!
) else (
	echo Couldn't find a package-lock.json in software folder!
	pause
	exit 1
)

echo Loading node_modules...
if exist node_modules (
	echo The node_modules folder has been found successfully!
) else (
	echo Couldn't find a node_modules in software folder!
	pause
	exit 1
)

cd node_modules
set node_modules=%cd%

echo Loading bedrock-protocol...
if exist bedrock-protocol (
	echo The bedrock-protocol folder has been found successfully!
) else (
	echo Couldn't find a bedrock-protocol in node_modules folder!
	echo Downloads can be found at https://github.com/Zwuiix-cmd/EasyProxy/releases
	pause
	exit 1
)

cd %software_path%

echo Loading index.js...
if exist index.js (
	echo The index.js file has been found successfully!
) else (
	echo index.js not found
	echo Downloads can be found at https://github.com/Zwuiix-cmd/EasyProxy/releases
	pause
	exit 1
)

node index.js %initial_path%
pause
