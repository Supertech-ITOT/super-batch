````md
# SuperBatch Installer – Java Runtime

SuperBatch uses a custom Java 21 runtime created with `jlink`.

## JDK

```text
C:\Program Files\Java\jdk-21.0.11
```
````

## Runtime Output

```text
apps\installer\dist\v1.0.0\java
```

## Build Runtime

Run in PowerShell:

```powershell
& "C:\Program Files\Java\jdk-21.0.11\bin\jlink.exe" `
  --module-path "C:\Program Files\Java\jdk-21.0.11\jmods" `
  --add-modules java.base,java.desktop,java.logging,java.sql,java.naming,java.management,java.security.jgss,java.instrument,java.compiler,jdk.unsupported `
  --output "C:\Users\Admin\Desktop\Code\super-batch\apps\installer\dist\v1.0.0\java"
```

## Verify

```cmd
java\bin\java.exe -version
```

## Run Backend

```cmd
java\bin\java.exe -jar backend\superbatch-1.0.0.jar
```

The bundled runtime means the customer does **not** need Java installed separately.

```

```
