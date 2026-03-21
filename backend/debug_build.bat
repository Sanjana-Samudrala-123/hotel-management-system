@echo off
set "MAVEN_HOME=%~dp0apache-maven-3.9.6"
set "PATH=%MAVEN_HOME%\bin;%PATH%"
echo Using Maven at: %MAVEN_HOME%
mvn -version
echo Running Maven clean compile...
mvn clean compile -DskipTests -e
pause
