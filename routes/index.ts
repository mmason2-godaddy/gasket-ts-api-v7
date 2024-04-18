function defaultRoute(app: any) {
  /**
  * @swagger
  *
  * /:
  *   get:
  *     summary: "Get default route"
  *     produces:
  *       - "application/json"
  *     responses:
  *       "200":
  *         description: "Returns welcome message."
  *         content:
  *           application/json
  */
  app.get('/', async (req: any, res: any, next: any) => {
    res.status(200).json({
      message: 'Welcome to your default route...'
    });
  });
}

function customRoute(app: any) {
  /**
  * @swagger
  *
  * /custom:
  *   get:
  *     summary: "Get custom route"
  *     produces:
  *       - "application/json"
  *     responses:
  *       "200":
  *         description: "Returns welcome message."
  *         content:
  *           application/json
  */
  app.get('/custom', async (req: any, res: any, next: any) => {
    res.status(200).json({
      message: 'Welcome to your custom route...'
    });
  });
};

export default [
  defaultRoute,
  customRoute
];
