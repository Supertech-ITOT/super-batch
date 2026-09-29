var
  IsUpdate: Boolean;

function IsUpdateInstallation: Boolean;
begin
  Result :=
    RegKeyExists(
      HKLM,
      'Software\Microsoft\Windows\CurrentVersion\Uninstall\{#AppId}_is1'
    );
end;

function IsNotUpdate: Boolean;
begin
  Result := not IsUpdate;
end;

function PrepareToInstall(
  var NeedsRestart: Boolean
): String;
var
  ResultCode: Integer;
begin
  Result := '';

  if not IsUpdate then
    Exit;

  Exec(
    ExpandConstant('{cmd}'),
    '/C net stop "SuperBatch Backend"',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );

  Exec(
    ExpandConstant('{cmd}'),
    '/C net stop "SuperBatch Frontend"',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );
end;