const production  = 'https://examplePage.com';
const development = 'http://localhost:3000/';
const url = (process.env.NODE_ENV ? production : development);

