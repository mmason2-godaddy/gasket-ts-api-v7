export default {
  name: 'howdy-middleware',
  hooks: {
    middleware(gasket: any) {
      gasket.logger.debug('howdy-middleware middleware hook');
      return (req: any, res: any, next: any) => {
        gasket.logger.debug('howdy-middleware middleware hook called');
        res.setHeader('X-Howdy', 'Howdy!');
        next();
      };
    },
    express(gasket: any, app: any) {
      app.get('/howdy', (req: any, res: any) => {
        gasket.logger.debug('/howdy route handler called');
        res.send('Well Howdy!');
      });
    }
  }
}
