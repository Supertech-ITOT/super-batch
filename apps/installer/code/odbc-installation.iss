function IsODBCDriverInstalled: Boolean;
var
  ResultCode: Integer;
begin
  Result :=
    Exec(
      ExpandConstant('{sys}\WindowsPowerShell\v1.0\powershell.exe'),
      '-NoProfile -Command "' +
      'if (Get-OdbcDriver -Name ''PostgreSQL Unicode(x64)'' ' +
      '-ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"',
      '',
      SW_HIDE,
      ewWaitUntilTerminated,
      ResultCode
    ) and (ResultCode = 0);
end;

function IsSuperBatchDSN: Boolean;
var
  ResultCode: Integer;
begin
  Result :=
    Exec(
      ExpandConstant('{sys}\WindowsPowerShell\v1.0\powershell.exe'),
      '-NoProfile -Command "' +
      'if (Get-OdbcDsn -Name ''SuperBatchDB'' -DsnType System ' +
      '-ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }"',
      '',
      SW_HIDE,
      ewWaitUntilTerminated,
      ResultCode
    ) and (ResultCode = 0);
end;

function InstallODBCDriver: Boolean;
var
  Installer: string;
  ResultCode: Integer;
begin
  Result := False;

  ExtractTemporaryFile('psqlodbc-setup.exe');

  Installer := ExpandConstant(
    '{tmp}\psqlodbc-setup.exe'
  );

  if not FileExists(Installer) then
    Exit;

  Result :=
    Exec(
      Installer,
      '/quiet /norestart',
      '',
      SW_HIDE,
      ewWaitUntilTerminated,
      ResultCode
    ) and (ResultCode = 0);
end;

function CreateSuperBatchDSN: Boolean;
var
  ResultCode: Integer;
  Command: string;
begin
  Command :=
    '-NoProfile -Command "' +
    'Add-OdbcDsn ' +
    '-Name ''SuperBatchDB'' ' +
    '-DriverName ''PostgreSQL Unicode(x64)'' ' +
    '-DsnType System ' +
    '-SetPropertyValue @(' +
    '''Server=' + Trim(DBHostEdit.Text) + ''',' +
    '''Port=' + Trim(DBPortEdit.Text) + ''',' +
    '''Database=' + Trim(DBNameEdit.Text) + '''' +
    ')"';

  Result :=
    Exec(
      ExpandConstant('{sys}\WindowsPowerShell\v1.0\powershell.exe'),
      Command,
      '',
      SW_HIDE,
      ewWaitUntilTerminated,
      ResultCode
    ) and (ResultCode = 0);
end;

procedure InstallSuperBatchODBC;
begin
  if not IsServerInstallation then
    Exit;

  { Install driver only if missing }
  if not IsODBCDriverInstalled then
  begin
    if not InstallODBCDriver then
    begin
      MsgBox(
        'PostgreSQL ODBC driver installation failed.',
        mbError,
        MB_OK
      );
      Abort;
    end;
  end;

  { Create DSN only if missing }
  if not IsSuperBatchDSN then
  begin
    if not CreateSuperBatchDSN then
    begin
      MsgBox(
        'SuperBatchDB ODBC DSN creation failed.',
        mbError,
        MB_OK
      );
      Abort;
    end;
  end;
end;