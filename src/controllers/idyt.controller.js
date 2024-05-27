import idYT from '../models/idyt.model.js';

export const getIds = async (req, res) => {
  const ids = await idYT
    .find({
      user: req.user.id,
    })
    .populate('user');
  res.json(ids);
};

export const createId = async (req, res) => {
  const { id_yt, option } = req.body;

  const id = new idYT({
    id_yt,
    option,
    user: req.user.id,
  });
  const savedId = await id.save();
  res.json(savedId);
};

export const getId = async (req, res) => {
  const id = await idYT.findById(req.params.id).populate('user');
  if (!id) return res.status(404).json({ message: 'Id not found' });
  res.json(id);
};

export const deleteId = async (req, res) => {
  const id = await idYT.findByIdAndDelete(req.params.id);
  if (!id) return res.status(404).json({ message: 'Id not found' });
  return res.sendStatus(204);
};

export const updateId = async (req, res) => {
  const id = await idYT.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!id) return res.status(404).json({ message: 'Id not found' });
  res.json(id);
};
