#include "code\app-info.iss"

[Code]

#include "code\installation-type.iss"
#include "code\client-installation.iss"
#include "code\server-installation.iss"
#include "code\database-installation.iss"
#include "code\postgresql-installation.iss"
#include "code\application-configuration.iss"
#include "code\nssm-installation.iss"
#include "code\odbc-installation.iss"

procedure InitializeWizard;
begin
  InitializeInstallationTypePage;
  InitializeClientInstallationPage;
  InitializeServerInstallationPage;
  InitializeDatabasePage;
 
end;

function ShouldSkipPage(PageID: Integer): Boolean;
begin
  Result := False;

  if IsServerInstallation and
     (PageID = ClientServerPage.ID) then
    Result := True;

  if IsClientInstallation and
     (PageID = ServerConfigurationPage.ID) then
    Result := True;

  if IsClientInstallation and
     (PageID = DatabasePage.ID) then
    Result := True;
end;

function NextButtonClick(CurPageID: Integer): Boolean;
begin
  Result := True;

  { Server ports }
  if (CurPageID = ServerConfigurationPage.ID) and
     not ServerPortsTested then
  begin
    MsgBox(
      'Please test the backend and frontend ports before continuing.',
      mbError,
      MB_OK
    );
    Result := False;
    Exit;
  end;

  { Client server connection }
  if (CurPageID = ClientServerPage.ID) and
     not ClientServerTested then
  begin
    MsgBox(
      'Please test the SuperBatch server connection successfully before continuing.',
      mbError,
      MB_OK
    );
    Result := False;
    Exit;
  end;

  { Database }
  if CurPageID = DatabasePage.ID then
  begin
    if IsExistingDatabase and not DBTested then
    begin
      MsgBox(
        'Please test the PostgreSQL connection successfully before continuing.',
        mbError,
        MB_OK
      );
      Result := False;
      Exit;
    end;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if IsServerInstallation then
  begin
    if CurStep = ssInstall then
    begin
      if not IsExistingDatabase then
        if not InstallPostgreSQL then
          Abort;

      if not CreateSuperBatchDatabase then
        Abort;
    end;

    if CurStep = ssPostInstall then
    begin
      CreateApplicationProperties;
      UpdateFrontendConfig;
      InstallSuperBatchServices;
      InstallSuperBatchODBC;
    end;
  end;
end;

function GetHost(Param: string): string;
begin
  if IsServerInstallation then
    Result := Trim(ServerIPEdit.Text)
  else
    Result := Trim(ClientServerURLEdit.Text);
end;

function GetPort(Param: string): string;
begin
  if IsServerInstallation then
    Result := Trim(FrontendPortEdit.Text)
  else
    Result := Trim(ClientServerPortEdit.Text);
end;

[Files]

Source: "dist\v1.0.0\postgres\postgresql-16.15-2-windows-x64.exe"; \
    Flags: dontcopy

Source: "dist\v1.0.0\postgres\init.sql"; \
    Flags: dontcopy
  
Source: "dist\v1.0.0\backend\*"; \
    DestDir: "{app}\backend"; \
    Flags: recursesubdirs createallsubdirs; \
    Check: IsServerInstallation

Source: "dist\v1.0.0\frontend\*"; \
    DestDir: "{app}\frontend"; \
    Flags: recursesubdirs createallsubdirs; \
    Check: IsServerInstallation

Source: "dist\v1.0.0\java\*"; \
    DestDir: "{app}\java"; \
    Flags: recursesubdirs createallsubdirs; \
    Check: IsServerInstallation

Source: "dist\v1.0.0\node\*"; \
    DestDir: "{app}\node"; \
    Flags: recursesubdirs createallsubdirs; \
    Check: IsServerInstallation

Source: "dist\v1.0.0\nssm\nssm.exe"; \
    DestDir: "{app}\nssm"; \
    Flags: ignoreversion; \
    Check: IsServerInstallation

Source: "dist\v1.0.0\desktop\*"; \
    DestDir: "{app}\desktop"; \
    Flags: recursesubdirs createallsubdirs; \

Source: "dist\v1.0.0\psqlodbc-setup.exe"; \
    Flags: dontcopy

[Run]

Filename: "{cmd}"; \
Parameters: "/C setx HOSTNAME ""{code:GetHost}"" /M"; \
Flags: runhidden waituntilterminated; \

Filename: "{cmd}"; \
Parameters: "/C setx PORT ""{code:GetPort}"" /M"; \
Flags: runhidden waituntilterminated; \

[Icons]

Name: "{autodesktop}\SuperBatch"; \
Filename: "{app}\desktop\SuperBatch.exe"; \
WorkingDir: "{app}\desktop"; \

