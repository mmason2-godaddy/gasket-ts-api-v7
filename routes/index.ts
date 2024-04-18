export default function routes(app: any) {
  /**
  * @swagger
  *
  * /default:
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
  app.get('/default', async (req: any, res: any, next: any) => {
    res.status(200).json({
      message: 'Welcome to your default route...'
    });
  });
};
