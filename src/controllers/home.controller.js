export const homeApi = (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: 'Bienvenido a la API',
  });
};
