var
  ServerConfigurationPage: TWizardPage;
  ServerIPEdit: TNewEdit;
  BackendPortEdit: TNewEdit;
  FrontendPortEdit: TNewEdit;
  PortTestButton: TNewButton;
  ServerPortsTested: Boolean;


procedure TestServerPorts(Sender: TObject); forward;


procedure InitializeServerInstallationPage;
var
  LabelControl: TNewStaticText;
begin
  ServerPortsTested := False;

  ServerConfigurationPage := CreateCustomPage(
    InstallationTypePage.ID,
    'Server Configuration',
    'Configure the SuperBatch server.'
  );

  { Server IP }

  LabelControl := TNewStaticText.Create(ServerConfigurationPage);
  LabelControl.Parent := ServerConfigurationPage.Surface;
  LabelControl.Left := 0;
  LabelControl.Top := 0;
  LabelControl.Caption := 'Server IP Address';

  ServerIPEdit := TNewEdit.Create(ServerConfigurationPage);
  ServerIPEdit.Parent := ServerConfigurationPage.Surface;
  ServerIPEdit.Left := 0;
  ServerIPEdit.Top := 20;
  ServerIPEdit.Width := ServerConfigurationPage.SurfaceWidth;
  ServerIPEdit.Text := '127.0.0.1';


  { Backend Port }

  LabelControl := TNewStaticText.Create(ServerConfigurationPage);
  LabelControl.Parent := ServerConfigurationPage.Surface;
  LabelControl.Left := 0;
  LabelControl.Top := 55;
  LabelControl.Caption := 'Backend Port';

  BackendPortEdit := TNewEdit.Create(ServerConfigurationPage);
  BackendPortEdit.Parent := ServerConfigurationPage.Surface;
  BackendPortEdit.Left := 0;
  BackendPortEdit.Top := 75;
  BackendPortEdit.Width := ServerConfigurationPage.SurfaceWidth;
  BackendPortEdit.Text := '8080';


  { Frontend Port }

  LabelControl := TNewStaticText.Create(ServerConfigurationPage);
  LabelControl.Parent := ServerConfigurationPage.Surface;
  LabelControl.Left := 0;
  LabelControl.Top := 110;
  LabelControl.Caption := 'Frontend Port';

  FrontendPortEdit := TNewEdit.Create(ServerConfigurationPage);
  FrontendPortEdit.Parent := ServerConfigurationPage.Surface;
  FrontendPortEdit.Left := 0;
  FrontendPortEdit.Top := 130;
  FrontendPortEdit.Width := ServerConfigurationPage.SurfaceWidth;
  FrontendPortEdit.Text := '3000';


  { Test Ports }

  PortTestButton := TNewButton.Create(ServerConfigurationPage);
  PortTestButton.Parent := ServerConfigurationPage.Surface;
  PortTestButton.Left := 0;
  PortTestButton.Top := 170;
  PortTestButton.Width := 120;
  PortTestButton.Caption := 'Test Ports';
  PortTestButton.OnClick := @TestServerPorts;
end;


procedure TestServerPorts(Sender: TObject);
var
  ResultCode: Integer;
  Command: string;
  BackendPort: string;
  FrontendPort: string;
begin
  ServerPortsTested := False;

  BackendPort := Trim(BackendPortEdit.Text);
  FrontendPort := Trim(FrontendPortEdit.Text);

  { Validate backend port }

  if BackendPort = '' then
  begin
    MsgBox(
      'Please enter the backend port.',
      mbError,
      MB_OK
    );
    Exit;
  end;


  { Validate frontend port }

  if FrontendPort = '' then
  begin
    MsgBox(
      'Please enter the frontend port.',
      mbError,
      MB_OK
    );
    Exit;
  end;


  { Backend and frontend cannot use same port }

  if BackendPort = FrontendPort then
  begin
    MsgBox(
      'Backend and frontend ports must be different.',
      mbError,
      MB_OK
    );
    Exit;
  end;


  { Check Backend Port }

  Command :=
    '-NoProfile -ExecutionPolicy Bypass -Command "' +
    '$p=Get-NetTCPConnection -LocalPort ' +
    BackendPort +
    ' -ErrorAction SilentlyContinue; ' +
    'if ($p) { exit 1 } else { exit 0 }"';

  if not (
    Exec(
      ExpandConstant('{sys}\WindowsPowerShell\v1.0\powershell.exe'),
      Command,
      '',
      SW_HIDE,
      ewWaitUntilTerminated,
      ResultCode
    ) and (ResultCode = 0)
  ) then
  begin
    MsgBox(
      'Backend port ' + BackendPort + ' is already in use.',
      mbError,
      MB_OK
    );
    Exit;
  end;


  { Check Frontend Port }

  Command :=
    '-NoProfile -ExecutionPolicy Bypass -Command "' +
    '$p=Get-NetTCPConnection -LocalPort ' +
    FrontendPort +
    ' -ErrorAction SilentlyContinue; ' +
    'if ($p) { exit 1 } else { exit 0 }"';

  if not (
    Exec(
      ExpandConstant('{sys}\WindowsPowerShell\v1.0\powershell.exe'),
      Command,
      '',
      SW_HIDE,
      ewWaitUntilTerminated,
      ResultCode
    ) and (ResultCode = 0)
  ) then
  begin
    MsgBox(
      'Frontend port ' + FrontendPort + ' is already in use.',
      mbError,
      MB_OK
    );
    Exit;
  end;


  ServerPortsTested := True;

  MsgBox(
    'Ports are available.' + #13#10#13#10 +
    'Backend: ' + BackendPort + #13#10 +
    'Frontend: ' + FrontendPort,
    mbInformation,
    MB_OK
  );
end;