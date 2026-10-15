@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script (Windows)
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set SCRIPT_DIR=%~dp0
set WRAPPER_JAR=%SCRIPT_DIR%.mvn\wrapper\maven-wrapper.jar
set WRAPPER_PROPS=%SCRIPT_DIR%.mvn\wrapper\maven-wrapper.properties

@REM Find java executable
if defined JAVA_HOME (
  set JAVA_EXEC=%JAVA_HOME%\bin\java.exe
) else (
  set JAVA_EXEC=java
)

@REM Download wrapper jar if it does not exist
if not exist "%WRAPPER_JAR%" (
  for /f "tokens=2 delims==" %%G in ('findstr /i "wrapperUrl" "%WRAPPER_PROPS%"') do set DOWNLOAD_URL=%%G
  echo Downloading Maven Wrapper from %DOWNLOAD_URL%
  powershell -Command "Invoke-WebRequest -Uri '%DOWNLOAD_URL%' -OutFile '%WRAPPER_JAR%' -UseBasicParsing"
  if errorlevel 1 (
    echo ERROR: Failed to download Maven Wrapper.
    exit /b 1
  )
)

"%JAVA_EXEC%" ^
  -classpath "%WRAPPER_JAR%" ^
  "-Dmaven.multiModuleProjectDirectory=%SCRIPT_DIR%" ^
  org.apache.maven.wrapper.MavenWrapperMain ^
  %*

endlocal
