mkdir ..\release_build\1
dotnet publish -c Release -r win-x64 --self-contained -p:PublishSingleFile=true -o ..\release_build\1