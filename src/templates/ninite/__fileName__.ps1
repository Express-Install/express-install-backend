$applications = @{

# WEB BROWSERS
  'Google Chrome'   = 'chrome'
  'Firefox'         = 'firefox'
  'Opera'           = 'operaChromium'

  # UTILITIES
  'Teamviewer 13'   = 'teamviewer13'
  'ImgBurn'         = 'imgburn'
  'RealVNC'         = 'realvnc'
  'TeraCopy'        = 'teracopy'
  'CDBurnerXP'      = 'cdburnerxp'
  'Revo'            = 'revo'
  'Launchy'         = 'launchy'
  'WinDirStat'      = 'windirstat'
  'Glary'           = 'glary'
  'InfraRecorder'   = 'infrarecorder'
  'Classic Start'   = 'classicstart'

  # MESSAGING
  'Discord'         = 'discord'
  'Skype'           = 'skype'
  'Pidgin'          = 'pidgin'
  'Thunderbird'     = 'thunderbird'
  'Trillian'        = 'trillian'

  # COMPRESSION
  '7-Zip'           = '7zip'
  'PeaZip'          = 'peazip'
  'WinRAR'          = 'winrar'

  # MEDIA
  'Itunes'          = 'itunes'
  'VLC'             = 'vlc'
  'AIMP'            = 'aimp'
  'foobar2000'      = 'foobar'
  'Winamp'          = 'winamp'
  'MusicBee'        = 'musicbee'
  'Audacity'        = 'audacity'
  'K-Lite Codecs'   = 'klitecodecs'
  'GOM'             = 'gom'
  'Spotify'         = 'spotify'
  'CCCP'            = 'cccp'
  'MediaMonkey'     = 'mediamonkey'
  'HandBrake'       = 'handbrake'

  # RUNTIMES
  'Java 8'          = 'java8'
  '.NET 4.7.2'      = '.net4.7.2'
  'Silverlight'     = 'silverlight'
  'Air'             = 'air'
  'Shockwave'       = 'shockwave'

  # DEVELOPERTOOLS
  'Python'          = 'python'
  'FileZilla'       = 'filezilla'
  'Notepad++'       = 'notepadplusplus'
  'JDK 8'           = 'jdk8'
  'JDK x64 8'       = 'jdkx8'
  'WinSCP'          = 'winscp'
  'PuTTy'           = 'putty'
  'WinMerge'        = 'winmerge'
  'Eclipse'         = 'eclipse'
  'Vis Studio Code' = 'vscode'

  # IMAGING
  'Krita'           = 'krita'
  'Blender'         = 'blender'
  'Paint.NET'       = 'paint.net'
  'GIMP'            = 'gimp'
  'IrfanView'       = 'irfanview'
  'XnView'          = 'xnview'
  'Inkscape'        = 'inkscape'
  'FastStone'       = 'faststone'
  'GreenShot'       = 'greenshot'
  'ShareX'          = 'sharex'

  # DOCUMENTS
  'Foxit Reader'    = 'foxit'
  'LibreOffice'     = 'libreoffice'
  'SumatraPDF'      = 'sumatrapdf'
  'CutePDF'         = 'cutepdf'
  'PDFCreator'      = 'pdfcreator'
  'OpenOffice'      = 'openoffice'

  # SECURITY
  'MS Essentials'   = 'essentials'
  'Malwarebytes'    = 'malwarebytes'
  'Avast'           = 'avast'
  'AVG'             = 'avg'
  'Spybot 2'        = 'spybot2'
  'Avira'           = 'avira'
  'SPERAntiSpyWare' = 'super'

  # FILE SHARING
  'qBitTorrent'     = 'qbittorrent'

  # OTHER
  'Evernote'        = 'evernote'
  'Google Earth'    = 'googleearth'
  'Steam'           = 'steam'
  'KeePass 2'       = 'keepass2'
  'Everything'      = 'everything'
  'NV Access-'      = 'nvda'

  # ONLINE STORAGE
  'Dropbox'         = 'dropbox'
  'Google Backup'   = 'googlebackupandsync'
  'Mozy'            = 'mozy'
  'OneDrive'        = 'onedrive'
  'SugarSync'       = 'sugarsync'

}

###################### Script Starts Here #############################

$url = "https://ninite.com/$(($selections | % {$applications[$_]}) -join '-')/ninite.exe"
$output = "C:\Scripts\ninite.exe"

# Creates Scripts directory in the root of C:
$scriptspath = 'c:\scripts'
if (!(Test-Path $scriptspath)) {
  New-Item $scriptspath -ItemType Directory
}

# Calls upon Ninite URL to grab .exe
Invoke-WebRequest -Uri $url -OutFile $output

# Starts Ninite.exe
Start-Process -FilePath "C:\Scripts\ninite.exe"
