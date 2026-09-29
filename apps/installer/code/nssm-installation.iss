procedure NSSMService(Name, Exe, Params, Dir: string);
var
  NSSM: string;
  ResultCode: Integer;
begin
  NSSM := ExpandConstant('{app}\nssm\nssm.exe');

  { Stop existing service if it exists }
  Exec(
    NSSM,
    'stop "' + Name + '"',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );

  { Remove existing service if it exists }
  Exec(
    NSSM,
    'remove "' + Name + '" confirm',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );

  { Create service }
  Exec(
    NSSM,
    'install "' + Name + '" "' + Exe + '"',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );

  { Set parameters }
  Exec(
    NSSM,
    'set "' + Name + '" AppParameters "' + Params + '"',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );

  { Set working directory }
  Exec(
    NSSM,
    'set "' + Name + '" AppDirectory "' + Dir + '"',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );

  { Start service }
  Exec(
    NSSM,
    'start "' + Name + '"',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );
end;


procedure InstallSuperBatchServices;
begin

  NSSMService(
    'SuperBatch Backend',
    ExpandConstant('{app}\java\bin\java.exe'),
    '-jar superbatch-backend.jar --spring.config.location=application.properties',
    ExpandConstant('{app}\backend')
  );

  NSSMService(
    'SuperBatch Frontend',
    ExpandConstant('{app}\node\node.exe'),
    'server.js',
    ExpandConstant('{app}\frontend')
  );

end;


procedure RemoveSuperBatchServices;
var
  NSSM: string;
  ResultCode: Integer;
begin
  NSSM := ExpandConstant('{app}\nssm\nssm.exe');

  if not FileExists(NSSM) then
    Exit;

  Exec(
    NSSM,
    'stop "SuperBatch Backend"',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );

  Exec(
    NSSM,
    'stop "SuperBatch Frontend"',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );

  Exec(
    NSSM,
    'remove "SuperBatch Backend" confirm',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );

  Exec(
    NSSM,
    'remove "SuperBatch Frontend" confirm',
    '',
    SW_HIDE,
    ewWaitUntilTerminated,
    ResultCode
  );
end;


procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
  if CurUninstallStep = usUninstall then
    RemoveSuperBatchServices;
end;