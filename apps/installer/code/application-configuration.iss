procedure CreateApplicationProperties;
var
  FileName, Content: string;
  RawContent: AnsiString;
begin
  FileName := ExpandConstant('{app}\backend\application.properties');

  if not LoadStringFromFile(FileName, RawContent) then
  begin
    MsgBox(
      'Unable to read application.properties.',
      mbError,
      MB_OK
    );
    Exit;
  end;

  Content := String(RawContent);

  StringChangeEx(
    Content,
    'server.port=8080',
    'server.port=' + Trim(BackendPortEdit.Text),
    True
  );

  StringChangeEx(
    Content,
    'cors.allowed-origins=${CORS_ALLOWED_ORIGINS:http://localhost:3000,http://127.0.0.1:3000}',
    'cors.allowed-origins=http://' +
      Trim(ServerIPEdit.Text) + ':' +
      Trim(FrontendPortEdit.Text),
    True
  );

  StringChangeEx(
    Content,
    'spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/superbatch}',
    'spring.datasource.url=jdbc:postgresql://' +
      Trim(DBHostEdit.Text) + ':' +
      Trim(DBPortEdit.Text) + '/' +
      Trim(DBNameEdit.Text),
    True
  );

  StringChangeEx(
    Content,
    'spring.datasource.username=${DB_USERNAME:postgres}',
    'spring.datasource.username=' +
      Trim(DBUserEdit.Text),
    True
  );

  StringChangeEx(
    Content,
    'spring.datasource.password=${DB_PASSWORD:root}',
    'spring.datasource.password=' +
      DBPasswordEdit.Text,
    True
  );

  SaveStringToFile(FileName, Content, False);
end;


function GetInstalledHost: string;
begin
  Result := '';

  RegQueryStringValue(
    HKLM,
    'SYSTEM\CurrentControlSet\Control\Session Manager\Environment',
    'HOSTNAME',
    Result
  );

  Result := Trim(Result);

  if Result = '' then
    Result := '127.0.0.1';
end;


function GetInstalledBackendPort: string;
var
  FileName: string;
  Content: string;
  RawContent: AnsiString;
  StartPos: Integer;
  LineEnd: Integer;
begin
  Result := '8080';

  FileName := ExpandConstant(
    '{app}\backend\application.properties'
  );

  if not LoadStringFromFile(FileName, RawContent) then
    Exit;

  Content := String(RawContent);

  StartPos := Pos('server.port=', Content);

  if StartPos = 0 then
    Exit;

  StartPos := StartPos + Length('server.port=');

  LineEnd := Pos(#13, Copy(Content, StartPos, Length(Content)));

  if LineEnd = 0 then
    LineEnd := Pos(#10, Copy(Content, StartPos, Length(Content)));

  if LineEnd = 0 then
    Result := Trim(Copy(Content, StartPos, Length(Content)))
  else
    Result := Trim(Copy(Content, StartPos, LineEnd - 1));

  if Result = '' then
    Result := '8080';
end;


procedure UpdateFrontendConfig;
var
  FileName: string;
  Content: string;
  APIURL: string;
  Host: string;
  BackendPort: string;
  RawContent: AnsiString;
begin
  FileName := ExpandConstant(
    '{app}\frontend\public\config.js'
  );

 if not LoadStringFromFile(FileName, RawContent) then
begin
  MsgBox(
    'Unable to read frontend config:' + #13#10 +
    FileName,
    mbError,
    MB_OK
  );
  Exit;
end;

  Content := String(RawContent);

  if IsUpdate then
  begin
    Host := GetInstalledHost;
    BackendPort := GetInstalledBackendPort;
  end
  else
  begin
    Host := Trim(ServerIPEdit.Text);
    BackendPort := Trim(BackendPortEdit.Text);
  end;

  APIURL :=
    'http://' + Host + ':' + BackendPort + '/api';

  StringChangeEx(
    Content,
    'API_URL: "http://127.0.0.1:8080/api"',
    'API_URL: "' + APIURL + '"',
    True
  );

  SaveStringToFile(FileName, Content, False);
end;