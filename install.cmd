@echo off
TITLE EasyProxy proxy software for Minecraft: Bedrock Edition

cd /d %~dp0
set initial_path=%cd%

cd software
set software_path=%cd%

echo Loading...
cd %software_path%
start cmd /k npm i

cd %initial_path%

start start.cmd