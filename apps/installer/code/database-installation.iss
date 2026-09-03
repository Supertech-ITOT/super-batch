var
  DatabasePage: TWizardPage;
  ExistingDBRadio, InstallDBRadio: TNewRadioButton;
  DBHostEdit, DBPortEdit, DBNameEdit, DBUserEdit, DBPasswordEdit: TNewEdit;
  DBTestButton: TNewButton;
  DBTested: Boolean;

procedure TestDatabaseConnection(Sender: TObject); forward;

procedure InitializeDatabasePage;
var
  L: TNewStaticText;
  ColWidth: Integer;
begin
  DBTested := False;

  DatabasePage := CreateCustomPage( ServerConfigurationPage.ID, 'Database Configuration', 'Configure PostgreSQL.');
  ColWidth := (DatabasePage.SurfaceWidth - 25) div 2;

ExistingDBRadio := TNewRadioButton.Create(DatabasePage);
ExistingDBRadio.Parent := DatabasePage.Surface;
ExistingDBRadio.Left := 0;
ExistingDBRadio.Top := 5;
ExistingDBRadio.Caption := 'Use Existing';
ExistingDBRadio.Checked := True;

InstallDBRadio := TNewRadioButton.Create(DatabasePage);
InstallDBRadio.Parent := DatabasePage.Surface;
InstallDBRadio.Left := ColWidth + 20;
InstallDBRadio.Top := 5;
InstallDBRadio.Caption := 'Install PostgreSQL';

L := TNewStaticText.Create(DatabasePage);
L.Parent := DatabasePage.Surface;
L.Left := 0;
L.Top := 45;
L.Caption := 'Database Host';

DBHostEdit := TNewEdit.Create(DatabasePage);
DBHostEdit.Parent := DatabasePage.Surface;
DBHostEdit.SetBounds(0, 65, ColWidth, 21);
DBHostEdit.Text := '127.0.0.1';

L := TNewStaticText.Create(DatabasePage);
L.Parent := DatabasePage.Surface;
L.Left := ColWidth + 20;
L.Top := 45;
L.Caption := 'Database Port';

DBPortEdit := TNewEdit.Create(DatabasePage);
DBPortEdit.Parent := DatabasePage.Surface;
DBPortEdit.SetBounds(ColWidth + 20, 65, ColWidth, 21);
DBPortEdit.Text := '5432';

L := TNewStaticText.Create(DatabasePage);
L.Parent := DatabasePage.Surface;
L.Left := 0;
L.Top := 110;
L.Caption := 'Database Name';

DBNameEdit := TNewEdit.Create(DatabasePage);
DBNameEdit.Parent := DatabasePage.Surface;
DBNameEdit.SetBounds(0, 130, ColWidth, 21);
DBNameEdit.Text := 'superbatch';

L := TNewStaticText.Create(DatabasePage);
L.Parent := DatabasePage.Surface;
L.Left := ColWidth + 20;
L.Top := 110;
L.Caption := 'Username';

DBUserEdit := TNewEdit.Create(DatabasePage);
DBUserEdit.Parent := DatabasePage.Surface;
DBUserEdit.SetBounds(ColWidth + 20, 130, ColWidth, 21);
DBUserEdit.Text := 'postgres';

L := TNewStaticText.Create(DatabasePage);
L.Parent := DatabasePage.Surface;
L.Left := 0;
L.Top := 175;
L.Caption := 'Password';

DBPasswordEdit := TNewEdit.Create(DatabasePage);
DBPasswordEdit.Parent := DatabasePage.Surface;
DBPasswordEdit.SetBounds(0, 195, ColWidth, 21);
DBPasswordEdit.PasswordChar := '*';

DBTestButton := TNewButton.Create(DatabasePage);
DBTestButton.Parent := DatabasePage.Surface;
DBTestButton.SetBounds(ColWidth + 20, 195, ColWidth, 25);
DBTestButton.Caption := 'Test Connection';
DBTestButton.OnClick := @TestDatabaseConnection;
end;

function FindPSQL: string;
var
  I: Integer;
begin
  for I := 18 downto 12 do
  begin
    Result := 'C:\Program Files\PostgreSQL\' + IntToStr(I) + '\bin\psql.exe';
    if FileExists(Result) then
      Exit;
  end;
  Result := '';
end;

procedure TestDatabaseConnection(Sender: TObject);
var
  PSQLPath, Command: string;
  ResultCode: Integer;
begin
  DBTested := False;
  PSQLPath := FindPSQL;
  if PSQLPath = '' then
  begin
    MsgBox('PostgreSQL psql.exe not found.', mbError, MB_OK);
    Exit;
  end;

  Command :=
    '/C set "PGPASSWORD=' + DBPasswordEdit.Text +
    '" && "' + PSQLPath +
    '" -h "' + DBHostEdit.Text +
    '" -p "' + DBPortEdit.Text +
    '" -U "' + DBUserEdit.Text +
    '" -d "' + DBNameEdit.Text +
    '" -c "SELECT 1;"';

  if Exec(
    ExpandConstant('{cmd}'),
    Command,
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  ) and (ResultCode = 0) then
  begin
    DBTested := True;
    MsgBox('PostgreSQL connection successful.', mbInformation, MB_OK);
  end
  else
    MsgBox('Unable to connect to PostgreSQL.', mbError, MB_OK);
end;

function IsExistingDatabase: Boolean;
begin
  Result := ExistingDBRadio.Checked;
end;

function IsInstallDatabase: Boolean;
begin
  Result := InstallDBRadio.Checked;
end;