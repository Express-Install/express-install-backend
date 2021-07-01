param([switch]$admin)
# $scriptPath = $myinvocation.MyCommand.Definition

function checkAdminPrivileges {
  $isAdmin = New-Object Security.Principal.WindowsPrincipal $([Security.Principal.WindowsIdentity]::GetCurrent())
  return $isAdmin.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}

function checkCommandExists ($cmd) {
  return !!$(Get-Command -errorAction SilentlyContinue $cmd);
}

function Install-ChocoPkg ($pkg, $opt) {
  if (!(checkCommandExists "choco")) {
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
  }
  [array]$chocoCMD = "choco", "install", $pkg, "-y", $opt
  Invoke-Expression("$chocoCMD")
  if ( $LastExitCode -ne 0 ) {
    Write-Output "$($pkg.ToUpper()) installation failed!"
  }
  else {
    Write-Output "$($pkg.ToUpper()) is installed with the latest version!"
  }
}

if (!(checkAdminPrivileges)) {
  Write-Error "Required running script as Administrator"
}
else{
  Install-ChocoPkg "__package__" "-f"
}
