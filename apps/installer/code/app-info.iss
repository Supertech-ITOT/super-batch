#define CompanyName "Supertech"
#define AppName "SuperBatch"
#define AppVersion "1.0.0"
#define AppPublisher "Supertech"
#define AppDescription "SuperBatch is a batch management software for managing production batches, recipes, equipment, parameters, and related operations."

[Setup]
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
OutputBaseFilename=SuperBatchSetupV1.0.0
Compression=lzma
SolidCompression=yes
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
PrivilegesRequired=admin
DisableProgramGroupPage=yes
SetupIconFile=assets\favicon.ico
WizardImageFile=assets\banner.png
WizardSmallImageFile=assets\app-logo.png