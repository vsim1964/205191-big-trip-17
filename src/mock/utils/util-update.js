const findUpdatePoint = (points, updatePoint) => {
  const index = points.findIndex((point) => point.id === updatePoint.id);

  if (index === -1) {
    return points;
  }

  return [
    ...points.slice(0, index),
    updatePoint,
    ...points.slice(index + 1),
  ];
};

export { findUpdatePoint };
