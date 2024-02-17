# Reading Room

An application where users can join or create book clubs.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Dependencies

* Windows or macOS
* Install the .NET 7.0 SDK from here:
  - https://dotnet.microsoft.com/en-us/download/dotnet/7.0 
* Node 16.0 or higher
  - https://nodejs.org/en

### Installing

* How/where to download your program
* Any modifications needed to be made to files/folders (.env files will need to be included here)

### Executing program

These instructions are for running the program locally.
* Clone the repo and cd into the project folder
```
git clone https://github.com/leanneholmes/readingroom.git
cd readingroom
dotnet build
```

* Start the API server
```
cd API
dotnet watch --no-hot-reload
```

* In a separate terminal, navigate to the client folder and start the client
```
cd ..
cd client
npm install
npm start
```

## Help

If you encounter problems on the server side, try to run the following commands from the project level directory /readingroom
```
dotnet restore
dotnet build
```

## Authors

Contributors names and contact info

ex. Dominique Pizzie  
ex. [@DomPizzie](https://twitter.com/dompizzie)

## Version History

* 0.2
    * Various bug fixes and optimizations
    * See [commit change]() or See [release history]()
* 0.1
    * Initial Release

## License

This project is licensed under the [NAME HERE] License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [awesome-readme](https://github.com/matiassingers/awesome-readme)
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
* [dbader](https://github.com/dbader/readme-template)
* [zenorocha](https://gist.github.com/zenorocha/4526327)
* [fvcproductions](https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46)
