const iamController = {
  async authenticateUser(req, res) {
    const userData = req.body;
    const user = await authenticateUser(userData);
    if (user) {
      res.send({ token: generateToken(user) });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  }
};