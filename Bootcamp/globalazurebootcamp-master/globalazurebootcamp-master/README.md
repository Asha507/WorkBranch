# Azure Bootcamp Template

This is a fork from Puneet Ghanshani https://github.com/punitganshani/azurebootcamp.

I updated the 2017 source code for .NET Core with Visual Studio Code and is compatible with Visual Studio Professional 2017.
By default is using Singapore data from [AzureBootcamp-Data](https://github.com/azurebootcamp/azurebootcamp-data) the default location is set in the root file config.json.

## Technology Stack

- .NET Core 2.0 SDK (https://www.microsoft.com/net/download/core)
- Razor Pages in ASP.NET Core MVC
- NodeJS (https://nodejs.org/en/)
- HTML5
- jQuery
- CSS3
- Google API 
- Facebook API

## How to use it?

- You don't need to edit HTML code, if you want to translate to your language you need to edit the Views.
- Deploy using [Git](https://git-scm.com/download/), [Visual Studio Code + Git] (https://azure.microsoft.com/en-us/blog/visual-studio-code-and-azure-app-service-a-perfect-fit/) or Visual Studio Code + Azure CLI, Visual Studio 2017 or your preference deployment app.
- Azure Web App Extensions 'ASP.NET Core Extensions'
- You just need to submit a pull request to create a json file with your event details at [AzureBootcamp-Data Wiki](https://github.com/punitganshani/azurebootcamp-data/wiki) or use your GitHub and change the URL in the Controllers source code and voila, the site is up!



## Settings

- Countount Timer : '/source-code/bootcamp/Views/Shared/_Layout.cshtml
' <div id="CountDownTimer" data-bgcolor="#fff" data-date="2018-04-21 00:00:00" class="centered"

- [**UPDATED**] Google Map Key : 
  - I've changed the file /Views/Shared/_Layout.cshtml and /Views/Shared/_Map.cshtml. Now is forcing the map directly instead of reading the information from the json file. You need to set the API KEY and coordinates in /Views/Shared/_Layout.cshtml. The coordinates can be obtained at http://www.mapcoordinates.net/
  - [Before] '/source-code/bootcamp/Views/Shared/_Map.cshtml' If you do not have any Google Maps API, you need to register and replace the key in the source code (AIzaSyCO6AXw4-I0uuUxAKBKMtoB0eUmKfobjH0) with the new Key API created.



## Configuring subdomain like region.azurebootcamp.net

- Login to [Gloabal Site](http://global.azurebootcamp.net)
- Select your host (say, singapore.azurebootcamp.net) and add CNAME to your Azure WebApp (like, azurebootcamp2018.azurewebsites.net/**your-location**)
- Now access sub-domain website (say, singapore.azurebootcamp.net) and it will route to azurebootcamp2018.azurewebsites.net/**your-location**


## Demo

- Demo: http://gabdemo.azurewebsites.net/
