#define AppId "05eeaebd-8d19-4b3c-ba43-f7bc3f3f7d24"
#define CompanyName "Supertech"
#define AppName "SuperBatch"
#define AppVersion "1.1.0"
#define AppPublisher "Supertech"
#define AppDescription "SuperBatch is a batch management software for managing production batches, recipes, equipment, parameters, and related operations."

[Setup]
AppId={#AppId}
AppName={#AppName}
AppVersion={#AppVersion}
AppPublisher={#AppPublisher}
AppPublisherURL=
AppSupportURL=
AppUpdatesURL=
AppCopyright="Copyright © 2026 {#CompanyName}"
AppComments={#AppDescription}
DefaultDirName={autopf}\{#CompanyName}\{#AppName}
OutputDir=out
OutputBaseFilename=SuperBatchSetupV1.1.0
Compression=lzma
SolidCompression=yes
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
PrivilegesRequired=admin
DisableProgramGroupPage=yes
SetupIconFile=assets\favicon.ico
WizardImageFile=assets\banner.png
WizardSmallImageFile=assets\app-logo.png