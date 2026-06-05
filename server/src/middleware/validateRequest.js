export const validateRequest = (schemas) => async (req, res, next) => {
  try {
    const validated = {
      params: req.params,
      query: req.query,
      body: req.body,
    };

    if (schemas.params) {
      validated.params = await schemas.params.parseAsync(req.params);
    }

    if (schemas.query) {
      validated.query = await schemas.query.parseAsync(req.query);
    }

    if (schemas.body) {
      validated.body = await schemas.body.parseAsync(req.body);
    }

    req.validated = validated;
    next();
  } catch (error) {
    next(error);
  }
};
