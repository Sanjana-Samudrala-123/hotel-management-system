@echo off
cd /d %~dp0
echo Starting Maven Build...
.\apache-maven-3.9.6\bin\mvn.cmd clean spring-boot:run -DskipTests
pause
