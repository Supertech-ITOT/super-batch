var
  InstallationTypePage: TWizardPage;
  ServerRadio: TNewRadioButton;
  ClientRadio: TNewRadioButton;

procedure InitializeInstallationTypePage;
begin

  InstallationTypePage := CreateCustomPage(wpWelcome,'Installation Type','Choose how you want to install SuperBatch.');

  { Server Installation }
  ServerRadio := TNewRadioButton.Create(InstallationTypePage);
  ServerRadio.Parent := InstallationTypePage.Surface;
  ServerRadio.Left := 10;
  ServerRadio.Top := 25;
  ServerRadio.Width := InstallationTypePage.SurfaceWidth;
  ServerRadio.Caption := 'Server Installation';
  ServerRadio.Checked := True;

  { Client Installation }
  ClientRadio := TNewRadioButton.Create(InstallationTypePage);
  ClientRadio.Parent := InstallationTypePage.Surface;
  ClientRadio.Left := 10;
  ClientRadio.Top := 65;
  ClientRadio.Width := InstallationTypePage.SurfaceWidth;
  ClientRadio.Caption := 'Client Installation';

end;

function IsServerInstallation: Boolean;
begin
  Result := ServerRadio.Checked;
end;

function IsClientInstallation: Boolean;
begin
  Result := ClientRadio.Checked;
end;
