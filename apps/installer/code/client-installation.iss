var
  ClientServerPage: TWizardPage;
  ClientServerURLEdit: TNewEdit;
  ClientServerPortEdit: TNewEdit;
  ClientTestButton: TNewButton;
  ClientServerTested: Boolean;

procedure TestClientServer(Sender: TObject); forward;
procedure InitializeClientInstallationPage;
var
  L: TNewStaticText;
begin
  ClientServerTested := False;
  ClientServerPage := CreateCustomPage( InstallationTypePage.ID, 'Server Connection', 'Enter the SuperBatch server address and frontend port.');

  { Server IP / Domain }
  L := TNewStaticText.Create(ClientServerPage);
  L.Parent := ClientServerPage.Surface;
  L.Left := 0;
  L.Top := 0;
  L.Caption := 'Server IP Address / Domain';

  ClientServerURLEdit := TNewEdit.Create(ClientServerPage);
  ClientServerURLEdit.Parent := ClientServerPage.Surface;
  ClientServerURLEdit.Left := 0;
  ClientServerURLEdit.Top := 20;
  ClientServerURLEdit.Width := ClientServerPage.SurfaceWidth;
  ClientServerURLEdit.Text := '127.0.0.1';

  { Frontend Port }
  L := TNewStaticText.Create(ClientServerPage);
  L.Parent := ClientServerPage.Surface;
  L.Left := 0;
  L.Top := 55;
  L.Caption := 'Frontend Port';

  ClientServerPortEdit := TNewEdit.Create(ClientServerPage);
  ClientServerPortEdit.Parent := ClientServerPage.Surface;
  ClientServerPortEdit.Left := 0;
  ClientServerPortEdit.Top := 75;
  ClientServerPortEdit.Width := ClientServerPage.SurfaceWidth;
  ClientServerPortEdit.Text := '3000';

  { Test }
  ClientTestButton := TNewButton.Create(ClientServerPage);
  ClientTestButton.Parent := ClientServerPage.Surface;
  ClientTestButton.Left := 0;
  ClientTestButton.Top := 110;
  ClientTestButton.Width := 120;
  ClientTestButton.Caption := 'Test Connection';
  ClientTestButton.OnClick := @TestClientServer;
end;

procedure TestClientServer(Sender: TObject);
var
  ResultCode: Integer;
  Command: string;
  Host: string;
  Port: string;
begin
  ClientServerTested := False;

  Host := Trim(ClientServerURLEdit.Text);
  Port := Trim(ClientServerPortEdit.Text);

  if (Host = '') or (Port = '') then
  begin
    MsgBox('Please enter the server address and frontend port.',mbError,MB_OK);
    Exit;
  end;

  if (Pos('://', Host) > 0) or (Pos('/', Host) > 0) then
  begin
    MsgBox( 'Enter only the server IP address or domain.' + #13#10 + 'Example: 192.168.1.73', mbError, MB_OK);
    Exit;
  end;

  Command :='-NoProfile -Command "' + 'try { ' + 'Invoke-WebRequest -Uri ''http://' + Host + ':' + Port + ''' -UseBasicParsing -TimeoutSec 5 | Out-Null; ' + 'exit 0 ' + '} catch { exit 1 }"';

  if Exec(
    ExpandConstant('{sys}\WindowsPowerShell\v1.0\powershell.exe'),
    Command,
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  ) and (ResultCode = 0) then
  begin
    ClientServerTested := True;
    MsgBox('SuperBatch server connection successful.',mbInformation,MB_OK);
  end
  else
    MsgBox('Unable to connect to the SuperBatch server.' + #13#10 +'Please check the server address and frontend port.',mbError,MB_OK);
end;
