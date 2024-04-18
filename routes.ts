export default [
  function (app: any) {
    app.get('/', (req: any, res: any) => {
      res.send('Hello World');
    });
  }
]
