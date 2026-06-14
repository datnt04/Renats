# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files and restore dependencies
COPY ["Renats_BE/Renats_BE/Renats_BE.csproj", "Renats_BE/Renats_BE/"]
RUN dotnet restore "Renats_BE/Renats_BE/Renats_BE.csproj"

# Copy all source files and publish
COPY . .
WORKDIR "/src/Renats_BE/Renats_BE"
RUN dotnet publish "Renats_BE.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Set default URL to listen on 8080 for Railway
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Renats_BE.dll"]
