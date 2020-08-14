# Notes App
Simple command-line app created with Node.js

## Table of contents
* [Setup](#setup)
* [How to use](#how-to-use)

## Setup
Before running the app install required packages using this command
```
npm install
```  

## How to use
### Adding Note
To add a new note run the following command
```
node app.js add --title='note title' --body='note body'
```

### Reading Note
To read an existing note run the following command
```
node app.js read --title='note title'
```

### Listing all notes
To list out all the notes run the following command
```
node app.js list
```

### Removing note
To remove an existing note run the following command
```
node app.js remove --title='note title'
```

### Printing Help
To print the help for the app run the following command
```
node app.js help
```

