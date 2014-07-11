@echo off

REM # Download files in a Metalink with aria2 (http://aria2.sourceforge.net/).
REM #
REM # Your browser can be instructed to open a Metalink with this batch file.
REM # At the minimum, the path to aria2c.exe and the location to save files
REM # must be specified.

REM #
REM # The complete path to aria2c.exe
REM #
set ARIA2_EXE=c:\bin\aria2c.exe

REM #
REM # The location where files should be saved
REM #
set SAVE_PATH=%USERPROFILE%\Downloads\Coursera


@echo on
%ARIA2_EXE% ^
  --dir=%SAVE_PATH% ^
  --max-concurrent-downloads=5 ^
  --metalink-file=%1 ^
  --check-certificate=false
