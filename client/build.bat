mkdir ..\release_build\7
dotnet publish -c Release -r win-x64 --self-contained -p:PublishSingleFile=true -o ..\release_builds\7