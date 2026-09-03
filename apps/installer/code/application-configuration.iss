procedure CreateApplicationProperties;
var
  FileName, Content: string;
  RawContent: AnsiString;
begin
  FileName := ExpandConstant('{app}\backend\application.properties');

  if not LoadStringFromFile(FileName, RawContent) then
  begin
    MsgBox('Unable to read application.properties.', mbError, MB_OK);
    Exit;
  end;

  Content := String(RawContent);

  StringChangeEx(Content,
    'server.port=8080',
    'server.port=' + Trim(BackendPortEdit.Text), True);

  StringChangeEx(Content,
    'cors.allowed-origins=${CORS_ALLOWED_ORIGINS:http://localhost:3000,http://127.0.0.1:3000,http://192.168.1.125:3000}',
    'cors.allowed-origins=http://' + Trim(ServerIPEdit.Text) + ':' +
    Trim(FrontendPortEdit.Text), True);

  StringChangeEx(Content,
    'spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/superbatch}',
    'spring.datasource.url=jdbc:postgresql://' +
    Trim(DBHostEdit.Text) + ':' + Trim(DBPortEdit.Text) + '/' +
    Trim(DBNameEdit.Text), True);

  StringChangeEx(Content,
    'spring.datasource.username=${DB_USERNAME:postgres}',
    'spring.datasource.username=' + Trim(DBUserEdit.Text), True);

  StringChangeEx(Content,
    'spring.datasource.password=${DB_PASSWORD:root}',
    'spring.datasource.password=' + DBPasswordEdit.Text, True);

  SaveStringToFile(FileName, Content, False);
end;

procedure UpdateFrontendConfig;
var
  FileName, Content, APIURL: string;
  RawContent: AnsiString;
begin
  FileName := ExpandConstant(
    '{app}\frontend\public\config.js'
  );

  if not LoadStringFromFile(FileName, RawContent) then
    Exit;

  Content := String(RawContent);

  APIURL :=
    'http://' + Trim(ServerIPEdit.Text) + ':' +
    Trim(BackendPortEdit.Text) + '/api';

  StringChangeEx(
    Content,
    'API_URL: "http://192.168.1.125:8080/api"',
    'API_URL: "' + APIURL + '"',
    True
  );

  SaveStringToFile(FileName, Content, False);
end;