var
  PostgreSQLPassword: string;


function InstallPostgreSQL: Boolean;
var
  Installer: string;
  DataDir: string;
  Params: string;
  ResultCode: Integer;
begin
  Result := False;

  ExtractTemporaryFile('postgresql-16.15-2-windows-x64.exe');
  Installer := ExpandConstant('{tmp}\postgresql-16.15-2-windows-x64.exe');

  if not FileExists(Installer) then
  begin
    MsgBox('PostgreSQL installer not found.',mbError,MB_OK);
    Exit;
  end;

  PostgreSQLPassword := Trim(DBPasswordEdit.Text);

  if PostgreSQLPassword = '' then
  begin
    MsgBox('Please enter a PostgreSQL password.',mbError,MB_OK);
    Exit;
  end;

  DataDir := ExpandConstant('{commonappdata}\Supertech\SuperBatch\PostgreSQL\data');
  ForceDirectories(DataDir);
  Params :=
    '--mode unattended ' +
    '--unattendedmodeui minimal ' +
    '--superaccount postgres ' +
    '--superpassword "' + PostgreSQLPassword + '" ' +
    '--servicepassword "' + PostgreSQLPassword + '" ' +
    '--serverport "' + Trim(DBPortEdit.Text) + '" ' +
    '--datadir "' + DataDir + '"';

  WizardForm.StatusLabel.Caption := 'Installing PostgreSQL...';

  if Exec(
    Installer,
    Params,
    '',
    SW_SHOWNORMAL,
    ewWaitUntilTerminated,
    ResultCode
  ) and (ResultCode = 0) then
  begin
    WizardForm.StatusLabel.Caption := 'PostgreSQL installation completed.';
    Result := True;
  end
  else
  begin
    MsgBox('PostgreSQL installation failed.' + #13#10 +'Exit code: ' + IntToStr(ResultCode),mbError,MB_OK);
  end;
end;

function CreateSuperBatchDatabase: Boolean;
var
  PSQLPath: string;
  Command: string;
  DatabaseName: string;
  CheckFile: string;
  Output: AnsiString;
  ResultCode: Integer;
begin
  Result := False;

  { Get password for both Existing and Install modes }
  PostgreSQLPassword := Trim(DBPasswordEdit.Text);

  DatabaseName := Trim(DBNameEdit.Text);
  PSQLPath := FindPSQL;

  if PostgreSQLPassword = '' then
  begin
    MsgBox('Please enter a PostgreSQL password.',mbError,MB_OK);
    Exit;
  end;

  if DatabaseName = '' then
  begin
    MsgBox('Please enter a database name.',mbError,MB_OK);
    Exit;
  end;

  if PSQLPath = '' then
  begin
    MsgBox('PostgreSQL psql.exe was not found.',mbError,MB_OK);
    Exit;
  end;

  { Temporary file for database check }
  CheckFile := ExpandConstant('{tmp}\superbatch-db-check.txt');
  DeleteFile(CheckFile);

  { Check whether database exists }
  Command :=
    '/C set "PGPASSWORD=' + PostgreSQLPassword + '" && ' +
    '"' + PSQLPath + '" ' +
    '-h "' + Trim(DBHostEdit.Text) + '" ' +
    '-p "' + Trim(DBPortEdit.Text) + '" ' +
    '-U "' + Trim(DBUserEdit.Text) + '" ' +
    '-d "postgres" ' +
    '-tAc "SELECT 1 FROM pg_database WHERE datname = ''' +
    DatabaseName +
    ''';" > "' + CheckFile + '" 2>&1';

  if not (
    Exec(
      ExpandConstant('{cmd}'),
      Command,
      '',
      SW_HIDE,
      ewWaitUntilTerminated,
      ResultCode
    ) and (ResultCode = 0)
  ) then
  begin
    MsgBox('Unable to check the PostgreSQL database.' + #13#10 +'Exit code: ' + IntToStr(ResultCode),mbError,MB_OK);
    Exit;
  end;

  { Read database check result }
  if not LoadStringFromFile(CheckFile, Output) then
  begin
    MsgBox('Unable to read PostgreSQL database check result.',mbError,MB_OK);
    Exit;
  end;

  { Database already exists }
  if Trim(String(Output)) = '1' then
  begin
    WizardForm.StatusLabel.Caption := 'SuperBatch database already exists.';
    Result := True;
    Exit;
  end;

  { Database does not exist - create it }
  WizardForm.StatusLabel.Caption := 'Creating SuperBatch database...';

  Command :=
    '/C set "PGPASSWORD=' + PostgreSQLPassword + '" && ' +
    '"' + PSQLPath + '" ' +
    '-h "' + Trim(DBHostEdit.Text) + '" ' +
    '-p "' + Trim(DBPortEdit.Text) + '" ' +
    '-U "' + Trim(DBUserEdit.Text) + '" ' +
    '-d "postgres" ' +
    '-c "CREATE DATABASE "' + DatabaseName + '";"';

  if Exec(
    ExpandConstant('{cmd}'),
    Command,
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  ) and (ResultCode = 0) then
  begin
    WizardForm.StatusLabel.Caption := 'SuperBatch database created.';
    Result := True;
  end
  else
  begin
    MsgBox('Unable to create the SuperBatch database.' + #13#10 +'Exit code: ' + IntToStr(ResultCode),mbError,MB_OK);
  end;
end;